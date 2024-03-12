import { useState } from 'react';
import { Card, CardContent, Grid, Box, Typography, CardMedia, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Image from 'next/image';
import bathLogo from '../public/images/bath-icon.svg';
import smileyFace from '../public/images/smiley.png';
import StarIcon from '@mui/icons-material/Star';

export default function Cards() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <>
        <Card sx={{ backgroundColor: "#C6CFD8", border: "solid darkblue 8px", borderRadius: "15px", maxWidth: "12em" }} onClick={handleClickOpen}>
          <CardContent>
            <Grid container direction="row" alignItems="center" justifyContent="space-between">
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="body1">John Doe</Typography>
                <Typography variant="body1" fontWeight="bold">
                  4.98 <StarIcon />
                </Typography>
              </Box>
              <Image src={smileyFace} alt="Bath Logo" width={40} />
            </Grid>
            <Grid container justifyContent="flex-end">
              <Image src={bathLogo} alt="Bath Logo" width={80} />
            </Grid>
            <Box sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: '5em', whiteSpace: 'normal' }}>
              <Typography variant="body2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus fermentum diam id rhoncus aliquet. 
                Ut quis orci luctus, sollicitudin metus quis, sodales arcu. 
              </Typography>
            </Box>
          </CardContent>
        </Card>
        

        {/* This runs when the card is clicke */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Card Details</DialogTitle>
          <DialogContent>
            {/* Content for the card details */}
            {/* You can include any additional information about the card here */}
            <Typography>
              Card details will be displayed here.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </>
    );
}