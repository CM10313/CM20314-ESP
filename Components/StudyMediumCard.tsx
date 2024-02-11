import { Card, CardActionArea, CardMedia, CardContent, Typography, Box, Grid } from '@mui/material';
import * as React from 'react';
import StarIcon from '@mui/icons-material/Star';
interface StudyMediumCardProps {
  name:string;
  rating:number;
  pfp:string;
  title:string;
  link:string;
  borderColour:string;
  onCardClick: (title: string) => void;
}

export default function StudyMediumCard({
  name,
  rating,
  pfp,
  title,
  link,
  borderColour,
  onCardClick,
}: StudyMediumCardProps) {
 
  return (
    <>
    <Card variant="outlined" sx={{ height: '160px',width:'150px',borderColor:borderColour,borderRadius:'10px',borderWidth:'5px',backgroundColor:'#FFFCFC',boxShadow: '0px 4px 4px 0px #00000040'}}>
      <CardActionArea onClick={()=>onCardClick(title)}>
        <CardContent style={{ padding: '5px' }}>
        <Grid
                container
                rowSpacing={2}
                columnSpacing={0}
                sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}
                >
            <Grid item xs={12}>
                <Grid
                        container
                        rowSpacing={0}
                        columnSpacing={0}
                        sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}
                        >
                        <Grid item xs={6}>
                            <Typography fontSize={12}>
                    {           name}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                        <Box sx={{height:'30px',width:'100%',backgroundColor:'red',display:'flex',justifyContent:'end'}}>Pfp</Box>   
                        </Grid>
                </Grid>
                <Grid container item xs={12} alignItems="center">
                    <Typography fontSize={12} sx={{ display: 'flex', alignItems: 'center' }}>
                        {rating}
                        <StarIcon sx={{ fontSize: 12, verticalAlign: 'middle', marginLeft: '2px' }} />
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography  fontSize={11} sx={{maxHeight:'70px',overflowY:'auto',mb:2}}>
                {title}
                </Typography> 
            </Grid>  
        </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
    </>
  );
}