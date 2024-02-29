import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person'; // Assuming you have an appropriate icon imported

interface progressBarProps{
  joinedCount: number, 
  requiredCount: number, 
  title:string
}

const ProgressBar: React.FC<progressBarProps> = ({ joinedCount, requiredCount, title }) => {
  const maxCount = requiredCount; // Set a maximum count for demonstration purposes
  const progress = (joinedCount / maxCount) * 88 ; // Calculate progress percentage
  const progressWidth = progress > 88 ? 88 : progress


  return (
    <Grid container justifyContent="center">
      <Grid item xs={11}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '2em',
            backgroundColor: '#C5DBE7', // Light gray background
            borderRadius: '5px',
            position: 'relative',
            overflow: 'hidden', // Hide overflow to prevent text overflow
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '8px', // Padding to separate icon and text from the progress bar
              flex: 1, // Expand to take remaining space
            }}
          >
            <PersonIcon sx={{ marginRight: '4px' }} />
            <Typography variant="body1">{title}</Typography>
          </Box>
          <Box
            sx={{
              height: '100%',
              backgroundColor: '#5293B7', // Default blue color
              borderRadius: '5px',
              width: `${progressWidth}%`, // Dynamic width based on progress
              transition: 'width 0.5s ease', // Smooth transition for width change
              position: 'absolute',
              top: 0,
              left: 90, // Align to the right
              display: 'flex',
              justifyContent: 'flex-end', // Align progress number to the right side
              alignItems: 'center',
              paddingRight: '8px', // Padding for the progress number
            }}
          >
            <Typography variant="body1" sx={{ color: 'white' }}>
              {joinedCount} / {requiredCount}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProgressBar;
