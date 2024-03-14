import React, { useEffect, useState } from 'react';
import {    FeedbackListViewer , FeedbackViewingContainer, FeedbackViewingContainerProps} from './RatingFeedBackViewer';
import { fetchDocumentById } from '../../firebase/firestore';

import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import SentenceGrid from './SentenceGrid';

interface WebinarViewerProps {
   WebinarProps:{
        title:string;
        publisherRating:number;
        department:string;
        studyDescription: string;
        joinedParticipants:number;
        subjectRelatedFields: string[];
        approvalStatus:string;
        dates: string[];
        externalLink:string;
    }
}
const WebinarViewer: React.FC<WebinarViewerProps> = ({
WebinarProps
}) => {
    const isMobile = useMediaQuery('(max-width:1000px)')
    return (
       
       <Box sx={{width:"100%",maxWidth:'800px',height:"600px",overflowY:"auto",backgroundColor:"#FFFFFF",border:"5px solid #C6CFD8",boxShadow:'0px 4px 0px 4px #00000040',borderRadius:'5px'}}>
            <Grid container sx={{display:'flex',height:'100%'}}>
                <Grid item xs={isMobile?12:8} sx={{display:'flex'}}>
                    <Grid container rowSpacing={2}  sx={{display:'flex'}}>
                        <Grid item xs={12} sx={{display:'flex'}}>
                            <Grid container  sx={{display:'flex'}}>
                                
                                <Grid item xs={12} sx={{display:'flex'}}>
                                    <Typography fontSize={20} sx={{color:"#000000",ml:3}}>{WebinarProps.publisherRating}</Typography>
                                </Grid>
                                <Grid item xs={12} sx={{display:'flex',mt:1}}>
                                <Box sx={{ width: '100%', height: '2px', backgroundColor: '#1870A0',ml:3,mr:3}} ></Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{display:'flex'}}>
                            <Grid container  sx={{display:'flex',}}>
                                <Grid item xs={12} sx={{display:'flex'}}>
                                    <Typography fontSize={16} sx={{color:"#535151",width:'50%',ml:3,mt:2}}>{WebinarProps.title}</Typography>
                                </Grid>
                                
                                <Grid item xs={12} sx={{display:'flex'}}>
                                    <Typography fontSize={13} sx={{color:"#535151",width:'65%',overflowY:"auto",height:'200px',ml:3,mt:1}}>{WebinarProps.studyDescription}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{display:'flex'}}>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={isMobile?12:4} sx={{display:'flex',backgroundColor:"#1F5095"}}>
                    <Grid container >
                        <Grid item xs={12}>
                            <Typography sx={{ml:3,color:"#FFFFFF",fontSize:18,mt:2}}>Department: {WebinarProps.department}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={{ml:3,color:"#FFFFFF",fontSize:18}}>Key Dates</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <SentenceGrid sentences={WebinarProps.dates} rowSpacing={0} numberOfItemsPerRow={1}></SentenceGrid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={{ml:3,color:"#FFFFFF",fontSize:18}}>Related Fields</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <SentenceGrid sentences={WebinarProps.subjectRelatedFields} rowSpacing={0} numberOfItemsPerRow={2}></SentenceGrid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={{ml:3,color:"#FFFFFF",fontSize:18}}>Approved by Bath Ethics Team: {WebinarProps.approvalStatus}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Box></Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={{ml:3,color:"#FFFFFF",fontSize:18}}>External Link</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography  sx={{ml:3,color:"#FFFFFF",fontSize:18}}>{WebinarProps.externalLink}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
      
    );
};

export default WebinarViewer;