import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

interface Reason {
    name: string;
    description: string;
    date: string;
}

interface ResolveDescriptionProps {
    disabled: boolean;
    reasons: Reason[]; // Array of Reason objects
}

const ResolveDescription: React.FC<ResolveDescriptionProps> = ({ disabled, reasons }) => {
    const [currentReasonIndex, setCurrentReasonIndex] = useState(0);

    const handlePrevious = () => {
        if (currentReasonIndex > 0) {
            setCurrentReasonIndex(currentReasonIndex - 1);
        }
    };
    console.log(reasons)
    const handleNext = () => {
        if (currentReasonIndex < reasons.length - 1) {
            setCurrentReasonIndex(currentReasonIndex + 1);
        }
    };
  
    return (
        <Box
            sx={{
                backgroundColor: disabled ? '#d8d8d8' : '#e8e9eb',
                padding: '20px',
                border: `4px solid ${disabled ? '#808080' : 'purple'}`,
                borderRadius: '30px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                maxWidth: '350px',
                height: '300px',
                fontFamily: 'Roboto,sans-serif',
                fontWeight: 'bold',
                color: disabled ? '#808080' : 'inherit',
                display: 'flex',
                flexDirection: 'column', // Align items in column direction
                justifyContent: 'space-between', // Space evenly
            }}
        >
           {reasons!=undefined?( <><Typography variant="body1" sx={{ marginBottom: '20px', fontWeight: 'bold' , fontFamily: 'Roboto, sans-serif',  fontSize : 20}}>
                Researcher / Ethics Communication
            </Typography>
            <Box sx={{ marginBottom: '20px', overflowY: 'auto', height: '250px', width: '350px' }}>
               <Typography variant="body1" sx={{ marginBottom: '20px', backgroundColor: 'white', border: '4px solid black', borderRadius: '10px', padding: '10px', wordWrap: 'break-word', whiteSpace: 'pre-line' }}>
                    <div style={{ backgroundColor: 'purple', border: '5px black solid', borderRadius: '10px', textAlign: 'center', marginBottom: '10px', color: 'white', fontWeight: 'bold' }}>Message by {reasons.length !=0 ? reasons[currentReasonIndex].name : ''}</div>
                    {reasons.length != 0 ? reasons[currentReasonIndex].description : ''}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="outlined" onClick={handlePrevious} disabled={disabled || currentReasonIndex === 0}>
                    OLDER
                </Button>
                <Button style={{ marginLeft: 20 }} variant="outlined" onClick={handleNext} disabled={disabled || currentReasonIndex === reasons.length - 1}>
                    NEWER
                </Button>
            </Box>
            <Typography variant="body2" sx={{ textAlign: 'center' }}>
                {reasons.length != 0 ? reasons[currentReasonIndex].date : ''}
            </Typography></>):<><Typography variant="body1" sx={{ marginBottom: '20px', fontWeight: 'bold' , fontFamily: 'Roboto, sans-serif',  fontSize : 20}}>
               There are no previous edits
            </Typography></>}
        </Box>
    );
};

export default ResolveDescription;
export type { Reason };