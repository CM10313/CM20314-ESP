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
 
 export interface  OtherRequirementDisplayProps {
  hasAccessToDevice?:boolean;
  hasNativeLanguage?:boolean;
  hasOtherLanguages?:boolean;
  hasNearestCity?:boolean;
  hasMaxTravelTime?:boolean;
  hasAnonymityLevel?:boolean;
  hasAccessRequirements?:boolean;
  accessToDevice?:string;
  nativeLanguage?:string;
  otherLanguages?:string;
  nearestCity?:string;
  maxTravelTime?:string;
  anonymityLevel?:string;
  accesRequirements?:string;
  hasOtherProps:boolean;
 }
 
 export default function OtherRequirementDisplay({
 hasAccessRequirements,hasAccessToDevice,hasAnonymityLevel,hasMaxTravelTime,hasNearestCity,hasNativeLanguage,hasOtherLanguages,accesRequirements,accessToDevice,anonymityLevel,maxTravelTime,nativeLanguage,nearestCity,otherLanguages,hasOtherProps
 }:  OtherRequirementDisplayProps) {
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
      {hasAccessRequirements?<Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{width:'100%',height:'100px'}}><Typography fontSize={24}>Accessibility Requirements</Typography><Box sx={{height:'100px',width:'100%',backgroundColor:"#DAE1E9",borderRadius:'5px',overflowY:'scroll',overflowWrap: 'break-word'}}><Typography fontSize={15} sx={{ml:1}}>{accesRequirements}</Typography></Box></Box></Grid>:null}
    {hasAccessToDevice?<Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{width:'100%',height:'100px'}}><Typography fontSize={24}>Access to Device</Typography><Box sx={{height:'100px',width:'100%',backgroundColor:"#DAE1E9",borderRadius:'5px',overflowY:'auto',overflowWrap: 'break-word'}}><Typography fontSize={15} sx={{ml:1}}>{accessToDevice?accessToDevice.toString().charAt(0).toUpperCase() + accessToDevice.toString().slice(1):"None"}</Typography></Box></Box></Grid>:null}
    {hasAnonymityLevel?<Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{width:'100%',height:'100px'}}><Typography fontSize={24}>Anonymity Level</Typography><Box sx={{height:'100px',width:'100%',backgroundColor:"#DAE1E9",borderRadius:'5px',overflowY:'auto',overflowWrap: 'break-word'}}><Typography fontSize={15} sx={{ml:1}}>{anonymityLevel}</Typography></Box></Box></Grid>:null}
    {hasMaxTravelTime?<Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{width:'100%',height:'100px'}}><Typography fontSize={24}>Max Travel Time</Typography><Box sx={{height:'100px',width:'100%',backgroundColor:"#DAE1E9",borderRadius:'5px',overflowY:'auto',overflowWrap: 'break-word'}}><Typography fontSize={15} sx={{ml:1}}>{maxTravelTime}</Typography></Box></Box></Grid>:null}
    {hasNearestCity?<Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{width:'100%',height:'100px'}}><Typography fontSize={24}>Nearest City</Typography><Box sx={{height:'100px',width:'100%',backgroundColor:"#DAE1E9",borderRadius:'5px',overflowY:'auto',overflowWrap: 'break-word'}}><Typography fontSize={15} sx={{ml:1}}>{nearestCity}</Typography></Box></Box></Grid>:null}
    {hasNativeLanguage?<Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{width:'100%',height:'100px'}}><Typography fontSize={24}>Native Language</Typography><Box sx={{height:'100px',width:'100%',backgroundColor:"#DAE1E9",borderRadius:'5px',overflowY:'auto',overflowWrap: 'break-word'}}><Typography fontSize={15} sx={{ml:1}}>{nativeLanguage}</Typography></Box></Box></Grid>:null}
    {hasOtherLanguages?<Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{width:'100%',height:'100px'}}><Typography fontSize={24}>Other Languages</Typography><Box sx={{height:'100px',width:'100%',backgroundColor:"#DAE1E9",borderRadius:'5px',overflowY:'auto',overflowWrap: 'break-word'}}><Typography fontSize={15} sx={{ml:1}}>{otherLanguages}</Typography></Box></Box></Grid>:null}
    {hasOtherProps?null:<Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{width:'100%',height:'100px'}}><Typography fontSize={24}>Other</Typography><Box sx={{height:'100px',width:'100%',backgroundColor:"#DAE1E9",borderRadius:'5px',overflowY:'auto',overflowWrap: 'break-word'}}><Typography fontSize={15} sx={{ml:1}}>No Data Available, as you did not set any requirements for this study</Typography></Box></Box></Grid>}
    </Grid>
  
  </Box>
   );
 }