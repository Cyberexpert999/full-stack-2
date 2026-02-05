import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  TextField,
  Box,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';
import { contactInfoSchema } from '../schemas/validationSchema';

const ContactInfo = ({ formData, updateFormData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: formData,
    resolver: yupResolver(contactInfoSchema),
    mode: 'onChange'
  });

  React.useEffect(() => {
    const subscription = watch((value) => {
      updateFormData(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, updateFormData]);

  return (
    <Box component="form" sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Contact Information
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          fullWidth
          label="Email Address"
          type="email"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        
        <TextField
          fullWidth
          label="Phone Number"
          {...register('phone')}
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />
        
        <TextField
          fullWidth
          label="Address"
          multiline
          rows={3}
          {...register('address')}
          error={!!errors.address}
          helperText={errors.address?.message}
        />
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            label="City"
            {...register('city')}
          />
          
          <FormControl fullWidth>
            <InputLabel>Country</InputLabel>
            <Select
              label="Country"
              defaultValue={formData.country || ''}
              {...register('country')}
            >
              <MenuItem value="US">United States</MenuItem>
              <MenuItem value="UK">United Kingdom</MenuItem>
              <MenuItem value="CA">Canada</MenuItem>
              <MenuItem value="AU">Australia</MenuItem>
              <MenuItem value="IN">India</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            fullWidth
            label="Postal Code"
            {...register('postalCode')}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ContactInfo;