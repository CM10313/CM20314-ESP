import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import { Button } from '@mui/material';
import { ReactNode, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export interface  DemoGraphicDisplayProps {
 hasFaculty?:boolean;
 hasGender?:boolean;
 hasRace?:boolean;
 hasSexuality?:boolean;
 hasYOFS?:boolean;
 hasReligion?:boolean;
 hasIncome?:boolean;
 hasAge?:boolean;
 hasOccupation?:boolean;
 hasHLOFE?:boolean;
 faculty?:string;
 gender?:string;
 race?:string;
 sexuality?:string;
 yofs?:string;
 religion?:string;
 income?:string;
 age?:string;
 occupation?:string; 
 hlofe?:string;
 hasDemoProps:boolean;
}

export default function DemoGraphicDisplay({
hasAge,hasFaculty,hasGender,hasIncome,hasOccupation,hasRace,hasReligion,hasSexuality,hasYOFS,hasHLOFE,age,hlofe,yofs,faculty,gender,sexuality,race,religion,income,occupation,hasDemoProps
}:  DemoGraphicDisplayProps) {

  return (
    <Box
      sx={{
        width: '90%',
        height: '100%',
        maxWidth:'500px',
        overflowY: 'auto',
        display: 'flex', justifyContent: 'center',
      }}
    >
      <Grid container rowSpacing={6} sx={{display:'flex',justifyContent:'center'}}>
        {hasAge?<Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{width:'100%',height:'100px'}}><Typography fontSize={24}>Age</Typography><Box sx={{height:'100px',width:'100%',backgroundColor:"#DAE1E9",borderRadius:'5px',overflowY:'auto',overflowWrap: 'break-word'}}><Typography fontSize={15} sx={{ml:1}}>{age}</Typography></Box></Box></Grid>:null}
      {hasFaculty?<Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{width:'100%',height:'100px'}}><Typography fontSize={24}>Faculty</Typography><Box sx={{height:'100px',width:'100%',backgroundColor:"#DAE1E9",borderRadius:'5px',overflowY:'auto',overflowWrap: 'break-word'}}><Typography fontSize={15} sx={{ml:1}}>{faculty}</Typography></Box></Box></Grid>:null}
      {hasGender?<Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{width:'100%',height:'100px'}}><Typography fontSize={24}>Gender</Typography><Box sx={{height:'100px',width:'100%',backgroundColor:"#DAE1E9",borderRadius:'5px',overflowY:'auto',overflowWrap: 'break-word'}}><Typography fontSize={15} sx={{ml:1}}>{gender?gender.toString().charAt(0).toUpperCase() + gender.toString().slice(1):"None"}</Typography></Box></Box></Grid>:null}
      {hasIncome?<Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{width:'100%',height:'100px'}}><Typography fontSize={24}>Income</Typography><Box sx={{height:'100px',width:'100%',backgroundColor:"#DAE1E9",borderRadius:'5px',overflowY:'auto',overflowWrap: 'break-word'}}><Typography fontSize={15} sx={{ml:1}}>{income}</Typography></Box></Box></Grid>:null}
      {hasOccupation?<Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{width:'100%',height:'100px'}}><Typography fontSize={24}>Occupation</Typography><Box sx={{height:'100px',width:'100%',backgroundColor:"#DAE1E9",borderRadius:'5px',overflowY:'auto',overflowWrap: 'break-word'}}><Typography fontSize={15} sx={{ml:1}}>{occupation}</Typography></Box></Box></Grid>:null}
      {hasRace?<Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{width:'100%',height:'100px'}}><Typography fontSize={24}>Race</Typography><Box sx={{height:'100px',width:'100%',backgroundColor:"#DAE1E9",borderRadius:'5px',overflowY:'auto',overflowWrap: 'break-word'}}><Typography fontSize={15} sx={{ml:1}}>{race}</Typography></Box></Box></Grid>:null}
      {hasReligion?<Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{width:'100%',height:'100px'}}><Typography fontSize={24}>Religion</Typography><Box sx={{height:'100px',width:'100%',backgroundColor:"#DAE1E9",borderRadius:'5px',overflowY:'auto',overflowWrap: 'break-word'}}><Typography fontSize={15} sx={{ml:1}}>{religion}</Typography></Box></Box></Grid>:null}
      {hasSexuality?<Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{width:'100%',height:'100px'}}><Typography fontSize={24}>Sexuality</Typography><Box sx={{height:'100px',width:'100%',backgroundColor:"#DAE1E9",borderRadius:'5px',overflowY:'auto',overflowWrap: 'break-word'}}><Typography fontSize={15} sx={{ml:1}}>{sexuality}</Typography></Box></Box></Grid>:null}
      {hasYOFS?<Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{width:'100%',height:'100px'}}><Typography fontSize={24}>Year of Studies</Typography><Box sx={{height:'100px',width:'100%',backgroundColor:"#DAE1E9",borderRadius:'5px',overflowY:'auto',overflowWrap: 'break-word'}}><Typography fontSize={15} sx={{ml:1}}>{yofs}</Typography></Box></Box></Grid>:null}
      {hasHLOFE?<Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{width:'100%',height:'100px'}}><Typography fontSize={24}>Highest Level of Education</Typography><Box sx={{height:'100px',width:'100%',backgroundColor:"#DAE1E9",borderRadius:'5px',overflowY:'auto',overflowWrap: 'break-word'}}><Typography fontSize={15} sx={{ml:1}}>{hlofe}</Typography></Box></Box></Grid>:null}
      {hasDemoProps?null:<Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{width:'100%',height:'100px'}}><Typography fontSize={24}>Demographic</Typography><Box sx={{height:'100px',width:'100%',backgroundColor:"#DAE1E9",borderRadius:'5px',overflowY:'auto',overflowWrap: 'break-word'}}><Typography fontSize={15} sx={{ml:1}}>No Data Available, as you did not set any requirements for this study</Typography></Box></Box></Grid>}
      </Grid>
    
    </Box>
  );
}