import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

interface RejectionCardProps {
    onReject: (reason: string) => void;
    disabled: boolean;
}

const RejectionCard: React.FC<RejectionCardProps> = ({ onReject, disabled }) => {
    const [rejectionReason, setRejectionReason] = useState('');

    const handleReject = () => {
        if (rejectionReason.trim() !== '') {
            onReject(rejectionReason);
            setRejectionReason('');
        } else {
            alert('Please provide a reason for rejection.');
        }
    };

    return (
        <Box
            sx={{
                
                backgroundColor: disabled ? '#d8d8d8' : '#e8e9eb',
                padding: '20px',
                border: `2px solid ${disabled ? '#808080' : 'red'}`, // Set dark grey color for border when disabled
                borderRadius: '30px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                maxWidth: '600px',
                fontFamily: 'Roboto,sans-serif',
                fontWeight: 'bold',
                color: disabled ? '#808080' : 'inherit', // Adjust text color when disabled
            }}
        >
            <Typography variant="body1" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
                Please provide details of what there is to dispute over or completely reject this advert:
            </Typography>
            <TextField
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                sx={{ marginBottom: '20px' }}
                disabled={disabled}
            />
            <Button
                variant="contained"
                color="error"
                onClick={handleReject}
                disabled={disabled}
            >
                Reject
            </Button>
        </Box>
    );
};

export default RejectionCard;