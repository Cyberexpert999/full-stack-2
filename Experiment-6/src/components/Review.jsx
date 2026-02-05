import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
  Chip
} from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';

const Review = ({ formData }) => {
  const formatDate = (date) => {
    if (!date) return 'Not provided';
    return new Date(date).toLocaleDateString();
  };

  const formatFile = (file) => {
    if (!file) return 'Not provided';
    return file.name;
  };

  const sections = [
    {
      title: 'Personal Information',
      fields: [
        { label: 'Name', value: `${formData.firstName || ''} ${formData.lastName || ''}` },
        { label: 'Date of Birth', value: formatDate(formData.dateOfBirth) },
        { label: 'Title', value: formData.title || 'Not provided' },
      ],
    },
    {
      title: 'Contact Information',
      fields: [
        { label: 'Email', value: formData.email || 'Not provided' },
        { label: 'Phone', value: formData.phone || 'Not provided' },
        { label: 'Address', value: formData.address || 'Not provided' },
        { label: 'City', value: formData.city || 'Not provided' },
        { label: 'Country', value: formData.country || 'Not provided' },
        { label: 'Postal Code', value: formData.postalCode || 'Not provided' },
      ],
    },
    {
      title: 'Preferences',
      fields: [
        { label: 'Gender', value: formData.gender || 'Not provided' },
        { 
          label: 'Interests', 
          value: formData.interests?.length 
            ? formData.interests.map(int => (
                <Chip key={int} label={int} size="small" sx={{ mr: 0.5 }} />
              ))
            : 'Not provided' 
        },
        { label: 'Newsletter', value: formData.newsletter ? 'Subscribed' : 'Not subscribed' },
        { label: 'Notifications', value: formData.notifications || 'Not provided' },
        { label: 'Profile Image', value: formatFile(formData.profileImage) },
      ],
    },
  ];

  const allFieldsFilled = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'gender'];
    return requiredFields.every(field => formData[field]);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Review Your Information
      </Typography>
      
      {allFieldsFilled() ? (
        <Alert icon={<CheckCircle />} severity="success" sx={{ mb: 3 }}>
          All required fields are completed. You can submit the form.
        </Alert>
      ) : (
        <Alert icon={<Error />} severity="warning" sx={{ mb: 3 }}>
          Some required fields are missing. Please go back and complete them.
        </Alert>
      )}
      
      {sections.map((section, index) => (
        <Paper key={index} elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom color="primary">
            {section.title}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {section.fields.map((field, fieldIndex) => (
              <ListItem key={fieldIndex} divider={fieldIndex < section.fields.length - 1}>
                <ListItemText
                  primary={field.label}
                  secondary={field.value}
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                  secondaryTypographyProps={{ component: 'div' }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      ))}
    </Box>
  );
};

export default Review;