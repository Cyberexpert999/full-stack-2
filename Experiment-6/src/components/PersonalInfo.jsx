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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { personalInfoSchema } from '../schemas/validationSchema';

const PersonalInfo = ({ formData, updateFormData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch
  } = useForm({
    defaultValues: formData,
    resolver: yupResolver(personalInfoSchema),
    mode: 'onChange'
  });

  const onSubmit = (data) => {
    updateFormData(data);
  };

  React.useEffect(() => {
    const subscription = watch((value) => {
      updateFormData(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, updateFormData]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            label="First Name"
            {...register('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <TextField
            fullWidth
            label="Last Name"
            {...register('lastName')}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        </Box>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date of Birth"
            value={formData.dateOfBirth || null}
            onChange={(newValue) => {
              setValue('dateOfBirth', newValue);
              updateFormData({ ...formData, dateOfBirth: newValue });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth?.message}
              />
            )}
          />
        </LocalizationProvider>

        <FormControl fullWidth>
          <InputLabel>Title</InputLabel>
          <Select
            label="Title"
            defaultValue={formData.title || ''}
            {...register('title')}
          >
            <MenuItem value="Mr">Mr</MenuItem>
            <MenuItem value="Mrs">Mrs</MenuItem>
            <MenuItem value="Ms">Ms</MenuItem>
            <MenuItem value="Dr">Dr</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default PersonalInfo;