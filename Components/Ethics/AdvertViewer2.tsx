import React, { useEffect, useState } from 'react';
import {    FeedbackListViewer , FeedbackViewingContainer, FeedbackViewingContainerProps} from './RatingFeedBackViewer';
import { fetchDocumentById } from '../../firebase/firestore';

import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import SentenceGrid from './SentenceGrid';

interface AdvertViewerProps {
    AdvertProps:{
        name: string;
        title:string;
        publisherRating:number;
        department:string;
        studyDescription: string;
        joinedParticipants:number;
        maxNoParticipants:number;
        subjectRelatedFields: string[];
        approvalStatus:string;
        dates: string[];
        contactDetails: string[];
        externalLink:string;
        Compensation : string[];
        ResearcherFeedBack?: FeedbackViewingContainerProps[];
        minimumAge:number;
        organsiation:string;
        location:string;
    }
}
const AdvertViewer: React.FC<AdvertViewerProps> = ({
AdvertProps
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
                                    <Typography fontSize={29} sx={{color:"#000000",ml:3,mt:3}}>{AdvertProps.name}</Typography>
                                </Grid>
                                <Grid item xs={12} sx={{display:'flex'}}>
                                    <Typography fontSize={20} sx={{color:"#000000",ml:3}}>{AdvertProps.publisherRating}</Typography>
                                </Grid>
                                <Grid item xs={12} sx={{display:'flex',mt:1}}>
                                <Box sx={{ width: '100%', height: '2px', backgroundColor: '#1870A0',ml:3,mr:3}} ></Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{display:'flex'}}>
                            <Grid container  sx={{display:'flex',}}>
                            <Grid item xs={3} sx={{display:'flex',justifyContent:'end',ml:3,mr:isMobile?3:0}}>
                                    <Box sx={{display:'flex',width:"160px",height:'40px',backgroundColor:"#C5DBE7",borderRadius:'5px',justifyContent:"start",alignItems:'center',overflow:'auto'}}>
                                        <Typography fontSize={16} sx={{color:"#000000",whiteSpace: 'nowrap',ml:1}}>{`${AdvertProps.joinedParticipants}/${AdvertProps.maxNoParticipants} Participants`}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={3} sx={{display:'flex',justifyContent:'end',ml:isMobile?0:3,mr:isMobile?3:0}}>
                                    <Box sx={{display:'flex',width:"160px",height:'40px',backgroundColor:"#C5DBE7",borderRadius:'5px',justifyContent:"start",alignItems:'center',overflow:'auto'}}>
                                        <Typography fontSize={16} sx={{color:"#000000",ml:1,whiteSpace: 'nowrap'}}>{AdvertProps.location}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={3} sx={{display:'flex',justifyContent:'end',ml:isMobile?0:3,mr:isMobile?3:0}}>
                                    <Box sx={{display:'flex',width:"160px",height:'40px',backgroundColor:"#C5DBE7",borderRadius:'5px',justifyContent:"start",alignItems:'center',overflow:'auto'}}>
                                        <Typography fontSize={16} sx={{color:"#000000",ml:1,whiteSpace: 'nowrap'}}>Min Age: {AdvertProps.minimumAge}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sx={{display:'flex'}}>
                                    <Typography fontSize={16} sx={{color:"#535151",width:'50%',ml:3,mt:2}}>{AdvertProps.title}</Typography>
                                </Grid>
                                
                                <Grid item xs={12} sx={{display:'flex'}}>
                                    <Typography fontSize={13} sx={{color:"#535151",width:'65%',overflowY:"auto",height:'200px',ml:3,mt:1}}>{AdvertProps.studyDescription}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{display:'flex'}}>
                        <Grid container  sx={{display:'flex'}}>
                                <Grid item xs={12} sx={{display:'flex'}}>
                                    <Typography fontSize={22} sx={{color:"#000000",width:'100%',ml:3}}>Here is what others had to say</Typography>
                                </Grid>
                                {AdvertProps.ResearcherFeedBack?<Grid item xs={12} sx={{display:'flex',mt:1,ml:3,justifyContent:'center'}}>
                                    <Box sx={{width:'90%',backgroundColor:'#F6F6F6',mr:3,mb:1}}>
                                        <FeedbackListViewer feedbackList={AdvertProps.ResearcherFeedBack}></FeedbackListViewer>
                                    </Box>
                                </Grid>: <Box sx={{width:'90%',backgroundColor:'#F6F6F6',mr:3,mb:1}}>
                                       <Typography>There are no reviews for this publisher</Typography>
                                    </Box>}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={isMobile?12:4} sx={{display:'flex',backgroundColor:"#1F5095"}}>
                    <Grid container >
                        <Grid item xs={12}>
                            <Typography sx={{ml:3,color:"#FFFFFF",fontSize:18,mt:2}}>Department: {AdvertProps.department}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={{ml:3,color:"#FFFFFF",fontSize:18}}>Key Dates</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <SentenceGrid sentences={AdvertProps.dates} rowSpacing={0} numberOfItemsPerRow={1}></SentenceGrid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={{ml:3,color:"#FFFFFF",fontSize:18}}>Related Fields</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <SentenceGrid sentences={AdvertProps.subjectRelatedFields} rowSpacing={0} numberOfItemsPerRow={2}></SentenceGrid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={{ml:3,color:"#FFFFFF",fontSize:18}}>Compensation</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <SentenceGrid sentences={AdvertProps.Compensation} rowSpacing={0} numberOfItemsPerRow={2}></SentenceGrid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={{ml:3,color:"#FFFFFF",fontSize:18}}>Approved by Bath Ethics Team: {AdvertProps.approvalStatus}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Box></Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={{ml:3,color:"#FFFFFF",fontSize:18}}>Contact Info</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <SentenceGrid sentences={AdvertProps.contactDetails} rowSpacing={0} numberOfItemsPerRow={1}></SentenceGrid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={{ml:3,color:"#FFFFFF",fontSize:18}}>External Link</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography  sx={{ml:3,color:"#FFFFFF",fontSize:18}}>{AdvertProps.externalLink}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
      
    );
};

export default AdvertViewer;