import { Card, CardActionArea, CardMedia, CardContent, Typography, Box, Grid } from '@mui/material';
import * as React from 'react';
import StarIcon from '@mui/icons-material/Star';
export interface StudyMediumCardProps {
  name:string;
  rating:number;
  title:string;
  borderColour:string;
  onCardClick: (id: string,publisherId:string,department:string) => void;
  department:string;
  id:string;
  publisherId:string;
}

export default function StudyMediumCard({
  name,
  rating,
  title,
  borderColour,
  onCardClick,
  department,
  id,
  publisherId,
}: StudyMediumCardProps) {
 
  return (
    <>
    <Card variant="outlined" sx={{ height: '160px',width:'450px',borderColor:borderColour,borderRadius:'10px',borderWidth:'5px',backgroundColor:'#FFFCFC',boxShadow: '0px 4px 4px 0px #00000040'}}>
      <CardActionArea onClick={()=>onCardClick(id,publisherId,department)}>
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
                            <Typography fontSize={24}>
                    {           name}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                        <Box sx={{height:'30px',width:'100%',display:'flex',justifyContent:'end'}}>{department}</Box>   
                        </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography  fontSize={14} sx={{maxHeight:'70px',overflowY:'auto',mb:2}}>
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