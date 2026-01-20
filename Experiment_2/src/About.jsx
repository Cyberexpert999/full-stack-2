import React from 'react';
import MuiSelect from './components/Select';
import Box from '@mui/material/Box';

export default function About() {
  return (
    <Box sx={{ p: 2 }}>
      <h2>About Page</h2>
      <p>Select your Country and Age:</p>

      <MuiSelect />
    </Box>
  );
}
