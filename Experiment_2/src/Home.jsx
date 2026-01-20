import React, { useState } from 'react';
import MuiTextField from './components/TextField';
import MuiCheckbox from './components/Checkbox';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function Home() {
  const [name, setName] = useState('');
  const [accepted, setAccepted] = useState(false);

  return (
    <Box sx={{ p: 2 }}>
      <h2>Home Page</h2>

      <MuiTextField
        label="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
<br></br>
      <MuiCheckbox
        label="I accept terms"
        checked={accepted}
        onChange={(e) => setAccepted(e.target.checked)}
      />
      <br></br>

      <Button
        variant="contained"
        onClick={() => alert(`Hello ${name}`)}
        disabled={!accepted}
      >
        Submit
      </Button>
    </Box>
  );
}
