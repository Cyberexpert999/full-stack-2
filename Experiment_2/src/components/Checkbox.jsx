import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function CheckboxBasic() {
  return (
    <>
      <FormControlLabel control={<Checkbox />} label="Accept Terms" />
      <FormControlLabel control={<Checkbox defaultChecked />} label="Subscribe" />
      
    </>
  );
}
