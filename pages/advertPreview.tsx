import {Button, Box, useMediaQuery, Grid, Typography, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import Navbar from '../Components/navbar';
import TriangleBackground from '../Components/TriangleBackground';
import { useAuth } from '../Context/AuthContext';
import { fetchDocumentById, updateDocument} from '../firebase/firestore';
import { ReviewDetailsObject } from './register';
import { useState, useEffect } from 'react';
import AdvertViewer2 from '../Components/Ethics/AdvertViewer2';
import CircleIcon from '@mui/icons-material/Circle';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { FeedbackViewingContainerProps } from '../Components/Ethics/RatingFeedBackViewer';
import WebinarViewer from '../Components/Ethics/WebinarViewer';
import HighlightDetector from '../Components/Ethics/Highlighter';

interface StudyProps {
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
    };
    interface WebinarProps{
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
 interface RequirementProps{
    hasPreExisting?:boolean;
    hasAllergies?:boolean;
    hasDisabilities?:boolean;
    hasMedication?:boolean;
    hasAccessToDevice?:boolean;
    hasNativeLanguage?:boolean;
    hasOtherLanguages?:boolean;
    hasNearestCity?:boolean;
    hasMaxTravelTime?:boolean;
    hasAnonymityLevel?:boolean;
    hasAccessRequirements?:boolean;
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
}
interface EthicalStatus{
    status:string;
    changedContent:string; 
    isStudy:boolean;
}
const AdvertPreview: React.FC<{ testBypass1?: StudyProps, testBypass2?:RequirementProps,testBypass3?:EthicalStatus,testBypass4?:WebinarProps}> = ({ testBypass1={} as StudyProps, testBypass2 ={} as RequirementProps,testBypass3={}as EthicalStatus,testBypass4={}as WebinarProps })  => {
  const {isLoggedIn,setAuth,username,overallRating,id,accountType} = useAuth();
  const isMobile = useMediaQuery('(max-width:1000px)')
  const [studyProps, setStudyProps]=useState<StudyProps>(testBypass1);
  const [webinarProps, setWebinarProps]=useState<WebinarProps>(testBypass4);
  const [requirementProps, setRequirementProps]=useState<RequirementProps>(testBypass2);
  const [rejectionReason,setRejectionReason]=useState("");
  const [ethicalProps,setEthicalProps]=useState<EthicalStatus>(testBypass3);
  //const [healthProps, setHealthProps]=useState<HealthDisplayProps>(testBypass1);
  //const [demographicProps,setDemographicProps]=useState<DemoGraphicDisplayProps>(testBypass2);
  //const [ otherProps, setOtherProps]=useState<OtherRequirementDisplayProps>(testBypass3);
  const router = useRouter();
let studyId = '';
let department ='';
let publisherId ='';
let eventType ='';
let status = "";

if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    studyId = urlParams.get('studyId') || '';
    department = urlParams.get('department') || '';
    publisherId = urlParams.get('publisherId') || '';
    eventType = urlParams.get('eventType') || '';
    status = urlParams.get('status')|| '';
}
const eventIsStudy = eventType == "study";
const isApproved = status == "Accept";
const addUserToStudyAwaitingApproval = async ()=>{
    try{
        const studyData:any= await fetchDocumentById(`departments/${department}/Researchers/${publisherId}/studies`,studyId);
        const currentAwaitingApprovalList = studyData.studyObj.awaitingApprovalParticipants;
        const updatedAwaitingApprovalList = [...currentAwaitingApprovalList,id];
        const updatedStudyDoc = {...studyData};
        updatedStudyDoc.studyObj.awaitingApprovalParticipants = updatedAwaitingApprovalList;
        updateDocument(`departments/${department}/Researchers/${publisherId}/studies`,studyId,updatedStudyDoc);
        router.push("/participantHome");
        } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error editing user status in study", error);
        }
  } 
  const homepageRedirect =()=>{
    router.push("/participantHome");
  }
  
  useEffect (()=>{
    const fetchStudyData = async ()=> {
        const studyData:any= await fetchDocumentById(`departments/${department}/Researchers/${publisherId}/studies`,studyId);
        const userData:any= await fetchDocumentById("users",publisherId );
        if (studyData && userData) {
            const StudyProps: StudyProps = {
                minimumAge:studyData.minimumAge,
                name: studyData.publisherName,
                studyDescription:studyData.description,
                subjectRelatedFields:studyData.relatedFields,
                dates:[`Closing Date:${studyData.closingDate}`,`Published: ${studyData.dateOfPublish}`,`Date of Study: ${studyData.preliminaryDate}`],
                contactDetails:[`Email: ${userData.email} `,`Mobile: ${userData.phoneNumber}`],
                externalLink:studyData.externalLink,
                Compensation:[`${studyData.studyObj.CompensationObject.amount}`,`${studyData.studyObj.CompensationObject.description}`],
                ResearcherFeedBack:userData.reviewObject.reviews,
                title:studyData.title,
                publisherRating:studyData.publisherRating,
                department:studyData.department,
                organsiation:userData.organisation,
                joinedParticipants:studyData.studyObj.joinedParticipants.length,
                maxNoParticipants:studyData.maxNoParticipants,
                approvalStatus:studyData.studyObj.EthicsApprovalObject.status,
                location:studyData.location,

            }
            const RequirementProps:RequirementProps={
                hasAllergies:studyData.studyObj.RequirementsObject.healthRequirements.includes("Allergies"),
                hasDisabilities:studyData.studyObj.RequirementsObject.healthRequirements.includes("Disabilities"),
                hasMedication: studyData.studyObj.RequirementsObject.healthRequirements.includes("Medication"),
                hasPreExisting:studyData.studyObj.RequirementsObject.healthRequirements.includes("PreExistingConditions"),
                hasAge:studyData.studyObj.RequirementsObject.demoRequirements.includes("Age"),
                hasFaculty:studyData.studyObj.RequirementsObject.demoRequirements.includes("Faculty"),
                hasGender:studyData.studyObj.RequirementsObject.demoRequirements.includes("Gender"),
                hasHLOFE:studyData.studyObj.RequirementsObject.demoRequirements.includes("HighestLevelOfEducation"),
                hasIncome:studyData.studyObj.RequirementsObject.demoRequirements.includes("Income"),
                hasOccupation:studyData.studyObj.RequirementsObject.demoRequirements.includes("Occupation"),
                hasRace:studyData.studyObj.RequirementsObject.demoRequirements.includes("Race"),
                hasReligion:studyData.studyObj.RequirementsObject.demoRequirements.includes("Religion"),
                hasSexuality:studyData.studyObj.RequirementsObject.demoRequirements.includes("Sexuality"),
                hasYOFS:studyData.studyObj.RequirementsObject.demoRequirements.includes("YearOfStudies"),
                hasAccessRequirements:studyData.studyObj.RequirementsObject.accessibilityRequirements.includes("AccessibilityRequirements"),
                hasAccessToDevice:studyData.studyObj.RequirementsObject.techRequirements.includes("AccessToDevice"),
                hasAnonymityLevel:studyData.studyObj.RequirementsObject.privacyRequirements.includes("AnonymityLevel"),
                hasMaxTravelTime:studyData.studyObj.RequirementsObject.geographicRequirements.includes("MaxTravelTime"),
                hasNativeLanguage:studyData.studyObj.RequirementsObject.languageRequirements.includes("NativeLanguage"),
                hasNearestCity:studyData.studyObj.RequirementsObject.geographicRequirements.includes("NearestCity"),
                hasOtherLanguages:studyData.studyObj.RequirementsObject.languageRequirements.includes("OtherLanguages"),
            }
            const EthicalStatus:EthicalStatus={
                status: studyData.hasOwnProperty('studyObj') && studyData.studyObj !== null ?
                (studyData.studyObj?.EthicsApprovalObject?.status) : studyData.EthicsApprovalObject?.status,
                changedContent: studyData.hasOwnProperty('studyObj') && studyData.studyObj !== null ?
                (studyData.studyObj?.EthicsApprovalObject?.changedContent) : studyData.EthicsApprovalObject?.changedContent,
                isStudy:studyData.hasOwnProperty('studyObj') && studyData.studyObj !== null ?true:false,
            };
            setStudyProps(StudyProps);
            setRequirementProps(RequirementProps);
            setEthicalProps(EthicalStatus);
        } else {
            console.error("userData or studyData is null");
        }
      }
      const fetchEventData = async ()=> {
        const studyData:any= await fetchDocumentById(`departments/${department}/Researchers/${publisherId}/webinars`,studyId);
        const userData:any= await fetchDocumentById("users",publisherId );
        if (studyData && userData) {
            const WebinarProps: WebinarProps = {
                studyDescription:studyData.description,
                subjectRelatedFields:studyData.relatedFields,
                dates:[`Closing Date:${studyData.closingDate}`,`Published: ${studyData.dateOfPublish}`,`Date of Study: ${studyData.preliminaryDate}`],
                externalLink:studyData.externalLink,
                title:studyData.title,
                publisherRating:studyData.publisherRating,
                department:studyData.department,
                joinedParticipants:studyData.joinedParticipants.length,
                approvalStatus:studyData.EthicsApprovalObject.status,
            }
            const EthicalStatus:EthicalStatus={
                status: studyData.hasOwnProperty('studyObj') && studyData.studyObj !== null ?
                (studyData.studyObj?.EthicsApprovalObject?.status) : studyData.EthicsApprovalObject?.status,
                changedContent: studyData.hasOwnProperty('studyObj') && studyData.studyObj !== null ?
                (studyData.studyObj?.EthicsApprovalObject?.changedContent) : studyData.EthicsApprovalObject?.changedContent,
                isStudy:studyData.hasOwnProperty('studyObj') && studyData.studyObj !== null ?true:false,
            };
            setWebinarProps(WebinarProps);
            setEthicalProps(EthicalStatus);
        } else {
            console.error("userData or studyData is null");
        }
      }
      if(eventIsStudy){
        fetchStudyData();
      }else{
        fetchEventData();
      }
  },[department, id, publisherId, studyId])
 const approveStudy= async (isStudy:boolean)=>{
        try{
        
        if(isStudy){
            const studyData:any= await fetchDocumentById(`departments/${department}/Researchers/${publisherId}/studies`,studyId);
            const updatedStudyDoc = {...studyData};
            updatedStudyDoc.studyObj.EthicsApprovalObject.status = "Accept";
            updatedStudyDoc.studyObj.EthicsApprovalObject.changedContent = "";
            updatedStudyDoc.studyObj.EthicsApprovalObject.rejectedByID = "";
            updatedStudyDoc.studyObj.EthicsApprovalObject.rejectedByName = "";
            updatedStudyDoc.studyObj.EthicsApprovalObject.rejectedByReason = "";
            updateDocument(`departments/${department}/Researchers/${publisherId}/studies`,studyId,updatedStudyDoc);
        }else{
            const studyData:any= await fetchDocumentById(`departments/${department}/Researchers/${publisherId}/webinars`,studyId);
            const updatedStudyDoc = {...studyData};
            console.log("hey")
            console.log(studyData)
            updatedStudyDoc.EthicsApprovalObject.status = "Accept";
            updatedStudyDoc.EthicsApprovalObject.changedContent = "";
            updatedStudyDoc.EthicsApprovalObject.rejectedByID = "";
            updatedStudyDoc.EthicsApprovalObject.rejectedByName = "";
            updatedStudyDoc.EthicsApprovalObject.rejectedByReason = "";
            updateDocument(`departments/${department}/Researchers/${publisherId}/webinars`,studyId,updatedStudyDoc);
        }
        router.push(`/ethicsHome`);
        } catch (error) {
        console.error("Error rating user", error);
        }
 }
 const rejectStudy= async (isStudy:boolean)=>{
    try{
        if(isStudy){
            const studyData:any= await fetchDocumentById(`departments/${department}/Researchers/${publisherId}/studies`,studyId);
            const updatedStudyDoc = {...studyData};
            updatedStudyDoc.studyObj.EthicsApprovalObject.status = "Rejected";
            updatedStudyDoc.studyObj.EthicsApprovalObject.changedContent = "";
            updatedStudyDoc.studyObj.EthicsApprovalObject.rejectedByID = id;
            updatedStudyDoc.studyObj.EthicsApprovalObject.rejectedByName = username;
            updatedStudyDoc.studyObj.EthicsApprovalObject.rejectedByReason = rejectionReason;
            updateDocument(`departments/${department}/Researchers/${publisherId}/studies`,studyId,updatedStudyDoc);
        }else{
            const studyData:any= await fetchDocumentById(`departments/${department}/Researchers/${publisherId}/webinars`,studyId);
            const updatedStudyDoc = {...studyData};
            updatedStudyDoc.EthicsApprovalObject.status = "Rejected";
            updatedStudyDoc.EthicsApprovalObject.changedContent = "";
            updatedStudyDoc.EthicsApprovalObject.rejectedByID = id;
            updatedStudyDoc.EthicsApprovalObject.rejectedByName = username;
            updatedStudyDoc.EthicsApprovalObject.rejectedByReason = rejectionReason;
            updateDocument(`departments/${department}/Researchers/${publisherId}/webinars`,studyId,updatedStudyDoc);
        }
        router.push(`/ethicsHome`);
        } catch (error) {
        console.error("Error rating user", error);
        }
 }


  return (
    <>
     <Navbar name={ username ?username : 'Guest'} rating={overallRating? overallRating: 0} accountType={accountType?accountType:"Guest Type"} />
            <TriangleBackground />
            {accountType!=="ethics"?(<HighlightDetector/>):null}
      <div style={{ height: '810px',display:'flex',justifyContent:'center',alignItems:'center' }}>
       <Box sx={{width:'90%',display:'flex',justifyContent:'center'}}>
        <Grid container rowSpacing={8} columnSpacing={4}sx={{height:'810px',mt:15}}>
        {eventIsStudy&&(<><Grid item xs={isMobile?12:8}><AdvertViewer2 AdvertProps={studyProps} ></AdvertViewer2></Grid> 
            <Grid item xs={isMobile?12:4}>
            <Box sx={{width:"100%",maxWidth:'800px',height:"600px",overflowY:"auto",backgroundColor:"#FFFFFF",border:"5px solid #C6CFD8",boxShadow:'0px 4px 0px 4px #00000040',borderRadius:'5px'}}>
                <Grid container sx={{display:'flex'}}>
                    <Grid item xs={12}>
                        <Typography fontSize={40} sx={{color:'#C5C5C5',ml:3,mt:1}}>Want to take part ?</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography fontSize={18} sx={{color:'#C5C5C5',ml:3,mt:1}}>This study requires your data, any field listed below will be made available to the publisher when you join.</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}>
                       <Box sx={{width:'80%',height:'330px',backgroundColor:'#DAE1E9',padding:2,overflowY:'scroll',display:'flex',justifyContent:'center', '&::-webkit-scrollbar': { width: '8px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#1F5095', borderRadius: '5px' } }}>
                       <Grid container sx={{display:'flex',justifyContent:'center'}}>
                            <Grid item xs={12} >
                                <Typography fontSize={20} fontWeight={'bold'}sx={{color:'#000000'}}>Demographic</Typography>
                                <Box sx={{width:'100%',backgroundColor:'#1F5095',height:'200px',overflowY:'scroll', '&::-webkit-scrollbar': { width: '8px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: 'white', borderRadius: '5px' } }}>
                                {requirementProps.hasAge?<Typography fontSize={20} sx={{color:'white',ml:2,mt:1}}><CircleIcon sx={{fontSize:'10px',mb:0.45,mr:1}}></CircleIcon>Age</Typography>:null}
                                {requirementProps.hasFaculty?<Typography  fontSize={20}sx={{color:'white',ml:2,mt:1}} ><CircleIcon sx={{fontSize:'10px',mb:0.45,mr:1}}></CircleIcon>Faculty</Typography>:null}
                                {requirementProps.hasGender?<Typography  fontSize={20}sx={{color:'white',ml:2,mt:1}} ><CircleIcon sx={{fontSize:'10px',mb:0.45,mr:1}}></CircleIcon>Gender</Typography>:null}
                                {requirementProps.hasHLOFE?<Typography  fontSize={20}sx={{color:'white',ml:2,mt:1}} ><CircleIcon sx={{fontSize:'10px',mb:0.45,mr:1}}></CircleIcon>Highest Level Of Education</Typography>:null}
                                {requirementProps.hasIncome?<Typography  fontSize={20}sx={{color:'white',ml:2,mt:1}} ><CircleIcon sx={{fontSize:'10px',mb:0.45,mr:1}}></CircleIcon>Income</Typography>:null}
                                {requirementProps.hasOccupation?<Typography  fontSize={20}sx={{color:'white',ml:2,mt:1}} ><CircleIcon sx={{fontSize:'10px',mb:0.45,mr:1}}></CircleIcon>Occupation</Typography>:null}
                                {requirementProps.hasRace?<Typography  fontSize={20}sx={{color:'white',ml:2,mt:1}}><CircleIcon sx={{fontSize:'10px',mb:0.45,mr:1}}></CircleIcon>Race</Typography>:null}
                                {requirementProps.hasReligion?<Typography fontSize={20} sx={{color:'white',ml:2,mt:1}} ><CircleIcon sx={{fontSize:'10px',mb:0.45,mr:1}}></CircleIcon>Religion</Typography>:null}
                                {requirementProps.hasSexuality?<Typography  fontSize={20}sx={{color:'white',ml:2,mt:1}} ><CircleIcon sx={{fontSize:'10px',mb:0.45,mr:1}}></CircleIcon>Sexuality</Typography>:null}
                                {requirementProps.hasYOFS?<Typography fontSize={20} sx={{color:'white',ml:2,mt:1}} ><CircleIcon sx={{fontSize:'10px',mb:0.45,mr:1}}></CircleIcon>Year Of Studies</Typography>:null}
                                {!requirementProps.hasAge&&!requirementProps.hasFaculty&&!requirementProps.hasGender&&!requirementProps.hasHLOFE&&!requirementProps.hasIncome&&!requirementProps.hasOccupation&&!requirementProps.hasRace&&!requirementProps.hasReligion&&!requirementProps.hasSexuality&&!requirementProps.hasYOFS?<Typography fontSize={20} sx={{color:'white',ml:2,mt:1}} >This study has no demographic requirements</Typography>:null}
                                </Box>
                                <Typography fontSize={20} fontWeight={'bold'}sx={{color:'#000000'}}>Heatlh</Typography>
                                <Box sx={{width:'100%',backgroundColor:'#1F5095',height:'200px',overflowY:'scroll', '&::-webkit-scrollbar': { width: '8px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: 'white', borderRadius: '5px' } }}>
                                {requirementProps.hasAllergies?<Typography fontSize={20} sx={{color:'white',ml:2,mt:1}}><CircleIcon sx={{fontSize:'10px',mb:0.45,mr:1}}></CircleIcon>Allergies</Typography>:null}
                                {requirementProps.hasDisabilities?<Typography fontSize={20} sx={{color:'white',ml:2,mt:1}} ><CircleIcon sx={{fontSize:'10px',mb:0.45,mr:1}}></CircleIcon>Disabilities</Typography>:null}
                                {requirementProps.hasMedication?<Typography fontSize={20} sx={{color:'white',ml:2,mt:1}} ><CircleIcon sx={{fontSize:'10px',mb:0.45,mr:1}}></CircleIcon>Medication</Typography>:null}
                                {requirementProps.hasPreExisting?<Typography fontSize={20} sx={{color:'white',ml:2,mt:1}} ><CircleIcon sx={{fontSize:'10px',mb:0.45,mr:1}}></CircleIcon>Pre-Existing Conditions</Typography>:null}
                                {!requirementProps.hasAllergies&&!requirementProps.hasDisabilities&&!requirementProps.hasMedication&&!requirementProps.hasPreExisting?<Typography fontSize={20} sx={{color:'white',ml:2,mt:1}} >This study has no health requirements</Typography>:null}
                                </Box>
                                <Typography fontSize={20} fontWeight={'bold'}sx={{color:'#000000'}}>Other</Typography>
                                <Box sx={{width:'100%',backgroundColor:'#1F5095',height:'200px',overflowY:'scroll', '&::-webkit-scrollbar': { width: '8px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: 'white', borderRadius: '5px' } }}>
                                {requirementProps.hasAccessRequirements?<Typography fontSize={20} sx={{color:'white',ml:2,mt:1}} ><CircleIcon sx={{fontSize:'10px',mb:0.45,mr:1}}></CircleIcon>Access Requirements</Typography>:null}
                                {requirementProps.hasAccessToDevice?<Typography fontSize={20} sx={{color:'white',ml:2,mt:1}} ><CircleIcon sx={{fontSize:'10px',mb:0.45,mr:1}}></CircleIcon>Access To Device</Typography>:null}
                                {requirementProps.hasMaxTravelTime?<Typography fontSize={20} sx={{color:'white',ml:2,mt:1}} ><CircleIcon sx={{fontSize:'10px',mb:0.45,mr:1}}></CircleIcon>Max Travel Time</Typography>:null}
                                {requirementProps.hasNearestCity?<Typography fontSize={20} sx={{color:'white',ml:2,mt:1}} ><CircleIcon sx={{fontSize:'10px',mb:0.45,mr:1}}></CircleIcon>Nearest City</Typography>:null}
                                {requirementProps.hasNativeLanguage?<Typography fontSize={20} sx={{color:'white',ml:2,mt:1}} ><CircleIcon sx={{fontSize:'10px',mb:0.45,mr:1}}></CircleIcon>Native Language</Typography>:null}
                                {requirementProps.hasOtherLanguages?<Typography  fontSize={20}sx={{color:'white',ml:2,mt:1}} ><CircleIcon sx={{fontSize:'10px',mb:0.45,mr:1}}></CircleIcon>Other Languages</Typography>:null}
                                {requirementProps.hasAnonymityLevel?<Typography  fontSize={20}sx={{color:'white',ml:2,mt:1}} ><CircleIcon sx={{fontSize:'10px',mb:0.45,mr:1}}></CircleIcon>Anonymity Level</Typography>:null}
                                {!requirementProps.hasAccessRequirements&&!requirementProps.hasAccessToDevice&&!requirementProps.hasMaxTravelTime&&!requirementProps.hasNearestCity&&!requirementProps.hasNativeLanguage&&!requirementProps.hasOtherLanguages&&!requirementProps.hasAnonymityLevel?<Typography fontSize={20} sx={{color:'white',ml:2,mt:1}} >This study has no other requirements</Typography>:null}

                                </Box>
                            </Grid>
                        </Grid>
                        </Box> 
                    </Grid>
                    {accountType!=="ethics"?(<>
                    <Grid item xs={6} sx={{display:'flex',justifyContent:'start',mt:2}}>
                               <Button  onClick={addUserToStudyAwaitingApproval}variant="contained" sx={{width:"145px",borderRadius:"5px",backgroundColor:"#84C287",ml:1}}><Grid container><Grid item xs={3} sx={{display:'flex',justifyContent:'center'}}><DoneIcon></DoneIcon></Grid><Grid item xs={9} sx={{display:'flex',justifyContent:'start'}}><Box sx={{ml:1}}>Apply</Box></Grid></Grid></Button>
                    </Grid>
                    <Grid item xs={6} sx={{display:'flex',justifyContent:'start',mt:2}}>
                               <Button onClick={homepageRedirect}variant="contained" sx={{width:"145px",borderRadius:"5px",backgroundColor:"#CD386B",ml:1}}><Grid container><Grid item xs={3} sx={{display:'flex',justifyContent:'center'}}><CloseIcon></CloseIcon></Grid><Grid item xs={9} sx={{display:'flex',justifyContent:'start'}}><Box sx={{ml:1}}>Exit</Box></Grid></Grid></Button>
                    </Grid></>):null}
                </Grid>
            </Box>
            </Grid></> )}
            {!eventIsStudy&&(<Grid item xs={isMobile?12:4}><WebinarViewer WebinarProps={webinarProps} ></WebinarViewer></Grid>)}
            {accountType=="ethics"?(<>
            {!isApproved&&(<Grid item xs={isMobile?12:4}><Box sx={{width:"100%",maxWidth:'800px',height:"250px",overflowY:"auto",backgroundColor:"#FFFFFF",border:"5px solid #C6CFD8",boxShadow:'0px 4px 0px 4px #00000040',borderRadius:'5px'}}><Typography fontSize={25}sx={{ml:2,mt:2}}>Once approved this advert will be published to all users </Typography> <Button onClick={()=>approveStudy(ethicalProps.isStudy)}variant="contained" sx={{width:"145px",borderRadius:"5px",backgroundColor:"#84C287",ml:1}}><Grid container><Grid item xs={3} sx={{display:'flex',justifyContent:'center'}}><DoneIcon></DoneIcon></Grid><Grid item xs={9} sx={{display:'flex',justifyContent:'start'}}><Box sx={{ml:1}}>Approve</Box></Grid></Grid></Button></Box></Grid>)}
            {ethicalProps.changedContent!=="" && ethicalProps.changedContent!==undefined?(<Grid item xs={isMobile?12:4}><Box sx={{width:"100%",maxWidth:'800px',height:"250px",overflowY:"auto",backgroundColor:"#FFFFFF",border:"5px solid #C6CFD8",boxShadow:'0px 4px 0px 4px #00000040',borderRadius:'5px'}}><Typography fontSize={20}sx={{ml:2,mt:2}}>Here is what the publisher said they changed </Typography><Box sx={{width:'90%',backgroundColor: "#F6F6F6",ml:2,mt:2,height:'150px'}}><Typography>{ethicalProps.changedContent}</Typography></Box> </Box></Grid>):null}
            {!isApproved&&(<Grid item xs={isMobile?12:4}><Box sx={{width:"100%",maxWidth:'800px',height:"250px",overflowY:"auto",backgroundColor:"#FFFFFF",border:"5px solid #C6CFD8",boxShadow:'0px 4px 0px 4px #00000040',borderRadius:'5px'}}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography fontSize={25}sx={{ml:2,mt:2}}>Please provide details of why you wish to reject this advert </Typography> 
                    </Grid>
                    <Grid item xs={12} sx={{ml:2,mt:4}}>
                    <TextField
                            label="Description"
                            variant="outlined"
                            value={rejectionReason}
                            multiline
                            rows={3}
                            onChange={e=>setRejectionReason(e.target.value)}
                            sx={{width:isMobile?'80%':'90%',padding:0,backgroundColor:'#DAE1E9',borderRadius:1,mt:-2,"&  .MuiFormHelperText-root.Mui-error": {
                                backgroundColor: "#F6F6F6",
                                margin:0,
                              },}}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ml:2}}>
                        <Button disabled={rejectionReason===""}  onClick={()=>rejectStudy(ethicalProps.isStudy)}variant="contained" sx={{width:"145px",borderRadius:"5px",backgroundColor:"#CD386B",ml:1}}>
                            <Grid container>
                                <Grid item xs={3} sx={{display:'flex',justifyContent:'center'}}>
                                    <CloseIcon></CloseIcon></Grid><Grid item xs={9} sx={{display:'flex',justifyContent:'start'}}><Box sx={{ml:1}}>Reject</Box>
                                </Grid>
                            </Grid>
                        </Button>
                    </Grid>
                </Grid>
                
               </Box></Grid>)}</>):null}
        </Grid>
       </Box>
       <Box>
       </Box>
      </div>
      
    </>
  );
  };
  
  export default AdvertPreview;
  //study data:{JSON.stringify(studyProps)}//requirements:{JSON.stringify(requirementProps)}
  