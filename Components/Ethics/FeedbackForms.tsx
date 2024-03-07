import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { updateDocumentWithArray } from '../../firebase/firestore';

const FeedbackForms = ({ destinationUserId , destinationName }: { destinationUserId :string , destinationName: string }) => {
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [rating, setRating] = useState(0);

    const handleRatingChange = (event: React.ChangeEvent<{}>, newRating: number | null) => {
        if (newRating !== null) {
            setRating(newRating);
        }
    };

    const handleSubmit = () => {
        if (!description || !name || rating === 0) {
            // Show an error message or perform any other action to handle empty submissions
            console.error('Please fill in all fields before submitting.');
            return;
        }

        // Perform actions with description, name, and rating
        console.log('Submitted Feedback:', { description, name, rating });

        const feedbackArray = [
            { description: description, name: name, rating: rating }
        ];

        updateDocumentWithArray('users', destinationUserId , 'Feedback', feedbackArray);

        setDescription('');
        setName('');
        setRating(0);
    };

    return (
        <Grid container justifyContent="center" alignItems="center" minHeight="100vh">
            <Grid item xs={12} sm={8} md={6}>
                <Paper elevation={3} style={{ padding: 20 }}>
                    <Typography variant="h5" gutterBottom>
                        Want to give feedback on your experience with {destinationName}
                    </Typography>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    variant="outlined"
                                    multiline
                                    rows={3}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    variant="outlined"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center">
                                    <Box mr={2}>Rating:</Box>
                                    <Rating
                                        name="rating"
                                        value={rating}
                                        precision={0.5}
                                        onChange={handleRatingChange}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={handleSubmit}
                                >
                                    SUBMIT FEEDBACK FOR OTHERS TO SEE
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default FeedbackForms;