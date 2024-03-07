import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useAuth } from '../../Context/AuthContext';

interface ApprovalCardProps {
    onApprove: () => void;
    disabled: boolean;
}

const ApprovalCard: React.FC<ApprovalCardProps> = ({ onApprove, disabled }) => {
    return (
        <Box
            sx={{
                
                backgroundColor: disabled ? '#d8d8d8' : '#e8e9eb',
                padding: '20px',
                border: `2px solid ${disabled ? '#808080' : 'green'}`,
                borderRadius: '30px',
                boxShadow: '20px 6px 8px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                maxWidth: '250px',
                maxHeight: '100px',
                fontFamily: 'sans-serif',
                color: disabled ? '#808080' : 'inherit', // Adjust text color when disabled
            }}
        >
            <Typography variant="body1" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
                If you approve this advert, it will be published to all users.
            </Typography>
            <Button variant="contained" color="success" onClick={onApprove} disabled={disabled}>
                Approve
            </Button>
        </Box>
    );
};

export default ApprovalCard;