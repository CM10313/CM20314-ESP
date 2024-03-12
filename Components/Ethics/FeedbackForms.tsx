import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { fetchDocumentById, updateDocument } from '../../firebase/firestore';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import StarIcon from '@mui/icons-material/Star';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
const FeedbackForms = ({ userId , destinationName,usersName,markAsRated,ratingStatus }: { userId :string , destinationName: string, usersName:string,markAsRated:()=>void,ratingStatus:boolean }) => {
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0);
    const [open, setOpen] = useState(false);

    const handleRatingChange = (event: React.ChangeEvent<{}>, newRating: number | null) => {
        if (newRating !== null) {
            setRating(newRating);
        }
    };

    const handleSubmit = () => {
        if (!description || !usersName || rating === 0) {
            console.error('Please fill in all fields before submitting.');
            return;
        }
        setOpen(false)
        const review = { description: description, name: usersName, rating: rating };
        alterRating(review);
        setDescription('');
        setRating(0);
    };
    const alterRating= async(review:{description:string,name:string,rating:number})=>{
        try{
        const userData:any= await fetchDocumentById("users",userId );
        const currentReviewObject = userData.reviewObject;
        const updatedUserDoc = {...userData};
        const updatedReviewsList = [...currentReviewObject.reviews,review];
        const originalNumberOfRatings = currentReviewObject.numberOfRatings;
        updatedUserDoc.reviewObject.numberOfRatings = originalNumberOfRatings + 1;
        updatedUserDoc.reviewObject.overallRating = (((currentReviewObject.overallRating*originalNumberOfRatings)+rating)/updatedUserDoc.reviewObject.numberOfRatings).toFixed(2);;
        updatedUserDoc.reviewObject.reviews = updatedReviewsList;
        updateDocument('users',userId,updatedUserDoc);
        markAsRated();
        } catch (error) {
        console.error("Error rating user", error);
        }
    }

    return (
        <>
            <Button variant="contained"
          onClick={() => setOpen(ratingStatus?false:true)}
          sx={{
            backgroundColor: ratingStatus?"#D7BE69":"#1F5095",
            fontWeight: "bold",
            height: "80px",
            width: "96%",
            maxWidth:'250px',
            borderRadius: "0.6em",
          }}>
          <Typography>{ratingStatus?"Rated":"Rate"}</Typography>
          <Typography>...</Typography>
        </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>
        <Grid container justifyContent="center" alignItems="center" >
            <Grid item xs={12} sm={8} md={6}>
                <Paper elevation={3} style={{ padding: 20 }}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography fontSize={25} fontWeight="bold"  sx={{mt:1}}>
                                Feedback
                            </Typography>
                        </Grid> 
                        <Grid item xs={6} >
                            <DialogActions >
                                <Button data-testid="close-button" onClick={() => setOpen(false) } sx={{color:'black'}}><CloseIcon></CloseIcon></Button>
                            </DialogActions>
                        </Grid>                    
                    </Grid>
                    <Typography fontSize={15} fontWeight="bold" >
                        How would you rate the study by {destinationName} ?
                    </Typography>
                    <form>
                        <Grid container spacing={2}>
                        <Grid item xs={12}>
                                <Box display="flex" alignItems="center">
                                    <Box mr={2}>Rating:</Box>
                                    <Rating
                                        name="rating"
                                        value={rating}
                                        precision={0.5}
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                        onChange={handleRatingChange}
                                        aria-label="Rating"
                                    />
                                </Box>
                            </Grid>
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
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </Grid>
        </DialogContent>
               
            </Dialog>
        </>
    );
};

export default FeedbackForms;