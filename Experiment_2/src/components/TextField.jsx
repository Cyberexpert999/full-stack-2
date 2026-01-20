import TextField from '@mui/material/TextField';

export default function TextFieldBasic() {
  return (
    <>
      <TextField label="Enter Name" variant="outlined" />
      <br /><br />
      <TextField label="Enter Email" variant="filled" />
    </>
  );
}
