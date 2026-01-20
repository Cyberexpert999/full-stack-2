import React, { useState } from 'react';
import MuiTextField from './components/TextField';
import MuiButton from './components/Button';
import MuiRating from './components/Rating';
import Box from '@mui/material/Box';

export default function Contact() {
    const [message, setMessage] = useState('');
    const [rating, setRating] = useState(0);

    return (
        <Box sx={{ p: 2 }}>
            <h2>Contact Page</h2>
            <MuiTextField label="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
            <MuiRating value={rating} onChange={setRating} />
            <MuiButton text="Send" onClick={() => alert('Message Sent')} color="secondary" />
        </Box>
    );
}
