import React, { useState } from 'react';
import { Typography, Divider, Rating, IconButton, Paper } from '@mui/material';
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
        <Paper elevation={3} style={{ borderRadius: '20px', backgroundColor: '#0d5382', padding: '15px', marginBottom: '20px', maxWidth: maxContainerWidth, width: '100%', height: '100%', position: 'relative' }}>
            <IconButton onClick={handlePrev} style={{ position: 'absolute', top: '50%', left: '-30px', transform: 'translateY(-50%)', color: 'white' }}>
                <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" gutterBottom style={{ color: 'white' }}>
                Here's What Others Have to Say About the Researcher
            </Typography>
            <Divider style={{ marginBottom: '10px', backgroundColor: 'white' }} />
            <div style={{ overflowY: 'auto', maxHeight: `${100}px`, padding: '0px', borderRadius: '10px', backgroundColor: 'silver', overflowX: 'hidden' }}>
                <Typography variant="body1" paragraph  style ={{fontWeight:'bold'}}>
                    {description}
                </Typography>
            </div>
            <div style={{ marginTop: '10px', backgroundColor: 'silver', padding: '10px', borderRadius: '10px'}}>
                <Typography variant="subtitle1">
                    - {name}
                </Typography>
            </div>
            <Rating name="rating" value={rating} precision={0.5} readOnly />
            <IconButton onClick={handleNext} style={{ position: 'absolute', top: '50%', right: '-30px', transform: 'translateY(-50%)', color: 'white' }}>
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
            <FeedbackViewingContainer {...feedbackList[currentIndex]} handleNext={handleNext} handlePrev={handlePrev} />
        </div>
    );
};

export { FeedbackViewingContainer, FeedbackListViewer };
export type { FeedbackViewingContainerProps };
