import * as React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box
} from '@mui/material';

export default function SelectBasic() {
  const [age, setAge] = React.useState('');
  const [country, setCountry] = React.useState('');

  const isAgeError = age === '';
  const isCountryError = country === '';

  return (
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>

      {/* ===== Select Country ===== */}
      <FormControl sx={{ minWidth: 220 }} error={isCountryError}>
        <InputLabel>Select Country</InputLabel>

        <Select
          value={country}
          label="Select Country"
          onChange={(e) => setCountry(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">
            <em></em>
          </MenuItem>

          <MenuItem value="IN">India</MenuItem>
          <MenuItem value="US">USA</MenuItem>
          <MenuItem value="UK">UK</MenuItem>
          <MenuItem value="BD">Bangladesh</MenuItem>
        </Select>

        <FormHelperText>
          {isCountryError ? 'Please select your country' : 'Looks good!'}
        </FormHelperText>
      </FormControl>

     
      <FormControl sx={{ minWidth: 220 }} error={isAgeError}>
        <InputLabel>Select Age</InputLabel>

        <Select
          value={age}
          label="Select Age"
          onChange={(e) => setAge(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">
            <em></em>
          </MenuItem>

          <MenuItem value={10}>10 Years</MenuItem>
          <MenuItem value={20}>20 Years</MenuItem>
          <MenuItem value={30}>30 Years</MenuItem>
          <MenuItem value={40}>40 Years</MenuItem>
        </Select>

        <FormHelperText>
          {isAgeError ? 'Please select your age' : 'Looks good!'}
        </FormHelperText>
      </FormControl>

    </Box>
  );
}
