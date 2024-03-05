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

export interface HealthDisplayProps {
 hasPreExisting?:boolean;
 hasAllergies?:boolean;
 hasDisabilities?:boolean;
 hasMedication?:boolean;
 preExisitng?:string;
 allergies?:string;
 disabilities?:string;
 medication?:string;

}

export default function HealthDisplay({
hasAllergies,hasDisabilities,hasMedication,hasPreExisting,preExisitng,allergies,disabilities,medication
}: HealthDisplayProps) {

  return (
    <Box
    sx={{
      width: '90%',
      maxWidth:'500px',
      height: '100%',
      overflowY: 'auto',
      display: 'flex', justifyContent: 'center',
    }}
  >
    <Grid container rowSpacing={6} sx={{display:'flex',justifyContent:'center'}}>
      {hasPreExisting?<Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{width:'100%',height:'100px'}}><Typography fontSize={24}>Pre-Existing Conditions</Typography><Box sx={{height:'100px',width:'100%',backgroundColor:"#DAE1E9",borderRadius:'5px',overflowY:'scroll',overflowWrap: 'break-word'}}><Typography fontSize={15} sx={{ml:1}}>{preExisitng}</Typography></Box></Box></Grid>:null}
    {hasAllergies?<Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{width:'100%',height:'100px'}}><Typography fontSize={24}>Allergies</Typography><Box sx={{height:'100px',width:'100%',backgroundColor:"#DAE1E9",borderRadius:'5px',overflowY:'auto',overflowWrap: 'break-word'}}><Typography fontSize={15} sx={{ml:1}}>{allergies}</Typography></Box></Box></Grid>:null}
    {hasDisabilities?<Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{width:'100%',height:'100px'}}><Typography fontSize={24}>Disabilities</Typography><Box sx={{height:'100px',width:'100%',backgroundColor:"#DAE1E9",borderRadius:'5px',overflowY:'auto',overflowWrap: 'break-word'}}><Typography fontSize={15} sx={{ml:1}}>{disabilities}</Typography></Box></Box></Grid>:null}
    {hasMedication?<Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{width:'100%',height:'100px'}}><Typography fontSize={24}>Medication</Typography><Box sx={{height:'100px',width:'100%',backgroundColor:"#DAE1E9",borderRadius:'5px',overflowY:'auto',overflowWrap: 'break-word'}}><Typography fontSize={15} sx={{ml:1}}>{medication}</Typography></Box></Box></Grid>:null}
    
    </Grid>
  
  </Box>
  );
}
