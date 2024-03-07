import React, { useState } from 'react';
import { Typography, Divider, Rating, IconButton, Paper, Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface FeedbackViewingContainerProps {
    description: string;
    name: string;
    rating: number;
}

const FeedbackViewingContainer: React.FC<FeedbackViewingContainerProps & { handleNext: () => void; handlePrev: () => void }> = ({ description, name, rating, handleNext, handlePrev }) => {
    const maxContainerWidth = 300; // Set a default max width for the container
    const maxContainerHeight = 220; // Set a default max height for the container

    // Calculate the actual height of the description
    const descriptionHeight = description ? description.split('\n').length * 20 : 0;
    const maxHeight = Math.min(maxContainerHeight, descriptionHeight);

    return (
        <Paper elevation={3} style={{ borderRadius: '20px', backgroundColor: '#1F5095', padding: '15px', marginBottom: '0px', maxWidth: maxContainerWidth, width: '100%', height: '100%', position: 'relative' }}>
            <IconButton onClick={handlePrev} data-testid="prev-button" style={{ position: 'absolute', top: '50%', left: '-30px', transform: 'translateY(-50%)', color: '#1F5095' }}>
                <ArrowBackIcon />
            </IconButton>
            <div style={{ overflowY: 'scroll', height: `${90}px`, maxWidth:'100%',padding: '0px',marginLeft:2,marginBottom:5 }}>
                <Typography variant="body1" paragraph  style ={{color:'white',wordBreak: 'break-all'}}>
                    {description}
                </Typography>
            </div>
            <Box sx={{display:'flex',justifyContent:'center',mb:2,mt:1.5}}><Rating name="rating" value={rating} precision={0.5} readOnly /></Box>
            <Box sx={{width:'100%',height:'2px',backgroundColor:"white",mt:1}}></Box>
            <div style={{ marginTop: '10px', padding: '10px'}}>
                <Typography variant="subtitle1" sx={{color:"white"}}>
                    - {name}
                </Typography>
            </div>
            <IconButton onClick={handleNext} data-testid="next-button" style={{ position: 'absolute', top: '50%', right: '-30px', transform: 'translateY(-50%)', color: '#1F5095' }}>
                <ArrowForwardIcon />
            </IconButton>
        </Paper>
    );
};

interface FeedBackListViewerProps {
    feedbackList: FeedbackViewingContainerProps[];
}

const FeedbackListViewer: React.FC<FeedBackListViewerProps> = ({ feedbackList }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % (feedbackList.length || 1));
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + (feedbackList.length || 1)) % (feedbackList.length || 1));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
           {feedbackList.length>0?<FeedbackViewingContainer {...feedbackList[currentIndex]} handleNext={handleNext} handlePrev={handlePrev} />:<Typography>There are no reviews for this publisher</Typography>}
        </div>
    );
};

export { FeedbackViewingContainer, FeedbackListViewer };
export type { FeedbackViewingContainerProps };
