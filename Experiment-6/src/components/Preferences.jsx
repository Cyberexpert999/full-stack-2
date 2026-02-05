import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  TextField,
  Button,
  Alert
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { preferencesSchema } from '../schemas/validationSchema';

const Preferences = ({ formData, updateFormData }) => {
  const [fileError, setFileError] = React.useState('');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    defaultValues: formData,
    resolver: yupResolver(preferencesSchema),
    mode: 'onChange'
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2000000) {
        setFileError('File size must be less than 2MB');
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        setFileError('Only JPEG, PNG, and GIF files are allowed');
        return;
      }
      setFileError('');
      setValue('profileImage', file);
      updateFormData({ ...formData, profileImage: file });
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    let interests = formData.interests || [];
    
    if (checked) {
      interests = [...interests, name];
    } else {
      interests = interests.filter(interest => interest !== name);
    }
    
    setValue('interests', interests);
    updateFormData({ ...formData, interests });
  };

  React.useEffect(() => {
    const subscription = watch((value) => {
      updateFormData(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, updateFormData]);

  return (
    <Box component="form" sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Preferences
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* File Upload */}
        <Box>
          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUpload />}
            sx={{ mb: 1 }}
          >
            Upload Profile Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
          {formData.profileImage && (
            <Typography variant="body2" color="text.secondary">
              Selected: {formData.profileImage.name}
            </Typography>
          )}
          {(fileError || errors.profileImage) && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {fileError || errors.profileImage?.message}
            </Alert>
          )}
        </Box>

        {/* Gender Radio Buttons */}
        <FormControl component="fieldset" error={!!errors.gender}>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            row
            defaultValue={formData.gender || ''}
            {...register('gender')}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
          {errors.gender && (
            <Typography color="error" variant="caption">
              {errors.gender.message}
            </Typography>
          )}
        </FormControl>

        {/* Interests Checkboxes */}
        <FormControl component="fieldset" error={!!errors.interests}>
          <FormLabel component="legend">Interests (Select at least one)</FormLabel>
          <FormGroup row>
            {['Technology', 'Sports', 'Music', 'Travel', 'Food'].map((interest) => (
              <FormControlLabel
                key={interest}
                control={
                  <Checkbox
                    name={interest}
                    checked={(formData.interests || []).includes(interest)}
                    onChange={handleCheckboxChange}
                  />
                }
                label={interest}
              />
            ))}
          </FormGroup>
          {errors.interests && (
            <Typography color="error" variant="caption">
              {errors.interests.message}
            </Typography>
          )}
        </FormControl>

        {/* Newsletter Checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={formData.newsletter || false}
              {...register('newsletter')}
            />
          }
          label="Subscribe to newsletter"
        />

        {/* Notifications Radio */}
        <FormControl component="fieldset">
          <FormLabel component="legend">Notification Preference</FormLabel>
          <RadioGroup
            row
            defaultValue={formData.notifications || 'email'}
            {...register('notifications')}
          >
            <FormControlLabel value="email" control={<Radio />} label="Email" />
            <FormControlLabel value="sms" control={<Radio />} label="SMS" />
            <FormControlLabel value="both" control={<Radio />} label="Both" />
          </RadioGroup>
        </FormControl>

        {/* Terms and Conditions */}
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={formData.termsAccepted || false}
              {...register('termsAccepted')}
            />
          }
          label={
            <Typography color={errors.termsAccepted ? 'error' : 'text.primary'}>
              I accept the terms and conditions
            </Typography>
          }
        />
        {errors.termsAccepted && (
          <Alert severity="error">
            {errors.termsAccepted.message}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default Preferences;