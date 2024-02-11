import { Card, CardActionArea, CardMedia, CardContent, Typography, Box, Grid } from '@mui/material';
import * as React from 'react';
import StarIcon from '@mui/icons-material/Star';
import { ReactNode } from 'react';
interface CardGrouperProps {
  rowSpacing:number;
  cardInputList:ReactNode[];
  numberOfItemsPerRow:number;
}

export default function CardGrouper({
  rowSpacing,
  cardInputList,
  numberOfItemsPerRow,
}: CardGrouperProps) {
 
    return (
    
       <>
                <Grid container rowSpacing={rowSpacing} columnSpacing={{ xs: 0, sm: 0, md: 0}} >
            {cardInputList.map((item, index) => ( 
                <Grid item xs={12/numberOfItemsPerRow} key={index} sx={{display:'flex',justifyContent:'center'}}>
                  {item}
                </Grid>
              ))}
</Grid>
    </>
       
        
      );
}

