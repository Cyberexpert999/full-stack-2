import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function RatingBasic() {
  return (
    <Stack spacing={2}>
      <Rating name="simple-rating" defaultValue={3} />
      <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
    </Stack>
  );
}
