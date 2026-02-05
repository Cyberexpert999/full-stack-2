import * as yup from 'yup';

export const personalInfoSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .required('First name is required'),
  lastName: yup
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .required('Last name is required'),
  dateOfBirth: yup
    .date()
    .max(new Date(), 'Date of birth cannot be in the future')
    .required('Date of birth is required'),
});

export const contactInfoSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  address: yup
    .string()
    .min(10, 'Address must be at least 10 characters')
    .required('Address is required'),
});

export const preferencesSchema = yup.object().shape({
  newsletter: yup.boolean(),
  notifications: yup.boolean().required('Please select notification preference'),
  termsAccepted: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions'),
  gender: yup
    .string()
    .required('Gender is required'),
  interests: yup
    .array()
    .min(1, 'Select at least one interest'),
  profileImage: yup
    .mixed()
    .test('fileSize', 'File too large', (value) => {
      if (!value) return true;
      return value.size <= 2000000; // 2MB
    })
    .test('fileType', 'Unsupported file format', (value) => {
      if (!value) return true;
      return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
    }),
});

export const formSchema = yup.object().shape({
  ...personalInfoSchema.fields,
  ...contactInfoSchema.fields,
  ...preferencesSchema.fields,
});