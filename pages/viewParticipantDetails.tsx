import { TextField, Button, Grid, Typography, Box, useMediaQuery, Paper, styled } from '@mui/material';

import StudyMediumCard, {StudyMediumCardProps} from '../Components/StudyMediumCard';
import { useRouter } from 'next/router';
import Navbar from '../Components/navbar';
import TriangleBackground from '../Components/TriangleBackground';
import Calendar from '../Components/Calendar';
import SearchableList from '../Components/SearchableList';
import { useAuth } from '../Context/AuthContext';
import { useEffect, useState } from 'react';
import { fetchDocumentById, updateDocument} from '../firebase/firestore';
import DisputeRow, { DisputeRowProps } from '../Components/pDisputeRow';
import {  getAllStudies } from '../Utils/RetrieveStudyData';
import  {  ItemProps } from '../Components/CalendarCard';
import HealthDisplay,{HealthDisplayProps} from '../Components/HealthDisplay';
import DemoGraphicDisplay, { DemoGraphicDisplayProps } from '../Components/DempographicDisplay';
import OtherRequirementDisplay, { OtherRequirementDisplayProps } from '../Components/OtherRequirementDisplay';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'next/navigation';
interface DisplayProps {
    [key: string]: boolean | string;
}
interface UserProps{
    username:string;
    organisation:string;
    email:string;
    overallRating:number;
}
const ViewParticipantDetails: React.FC<{ testBypass1?: HealthDisplayProps | (() => HealthDisplayProps), testBypass2?: DemoGraphicDisplayProps,testBypass3?:OtherRequirementDisplayProps,testBypass4:string,testBypass5?:UserProps }> = ({ testBypass1={} as HealthDisplayProps, testBypass2 ={} as DemoGraphicDisplayProps,testBypass3 ={} as OtherRequirementDisplayProps,testBypass4='',testBypass5 ={} as UserProps })  => {
  const {isLoggedIn,setAuth,username,overallRating,id,department,accountType} = useAuth();
  const isMobile = useMediaQuery('(max-width:1000px)')
  const isExtraSmall = useMediaQuery('(max-width:800px)')
  const [visibleContent, setVisibleContent] = useState("Demographic");
  const [buttonColours, setButtonColours]= useState(["#1F5095","#DAE1E9","#DAE1E9"]);
  const [rejectionReason, setRejectionReason]= useState(testBypass4);
  const [rejectionError, setRejectionError]= useState("");
  const [healthProps, setHealthProps]=useState<HealthDisplayProps>(testBypass1);
  const [demographicProps,setDemographicProps]=useState<DemoGraphicDisplayProps>(testBypass2);
  const [ otherProps, setOtherProps]=useState<OtherRequirementDisplayProps>(testBypass3);
  const [userProps,setUserProps]=useState<UserProps>(testBypass5);
  const [hasHealthProps,setHasHealthProps]=useState(false);
  const [hasOtherProps,setHasOtherProps]=useState(false);
  const [hasDemographicProps,setHasDemographicProps]=useState(false);
  let participantId = '';
  const router = useRouter();
let studyId = '';
let canAccept = '';

if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    participantId = urlParams.get('uid') || '';
    studyId = urlParams.get('studyId') || '';
    canAccept = urlParams.get('canAccept') || '';
}
const acceptEnabled = canAccept === "true";
  const handleSelectionChange = (selection:string,indexToSet:number)=>{
    setVisibleContent(selection)
    const buttonColors = Array.from({ length: buttonColours.length }, (_, index) =>
        index === indexToSet ? "#1F5095" : "#DAE1E9"
    );
    setButtonColours(buttonColors);
  }
  
  useEffect (()=>{
    const fetchUserData = async ()=> {
        console.log(participantId )
        console.log(studyId )
        const userData:any= await fetchDocumentById("users",participantId );
        const studyData:any= await fetchDocumentById(`departments/${department}/Researchers/${id}/studies`,studyId);
        console.log(studyData);
        console.log(userData);
        if (userData && studyData) {
            const HealthProps: HealthDisplayProps = {
                hasAllergies:studyData.studyObj.RequirementsObject.healthRequirements.includes("Allergies"),
                hasDisabilities:studyData.studyObj.RequirementsObject.healthRequirements.includes("Disabilities"),
                hasMedication: studyData.studyObj.RequirementsObject.healthRequirements.includes("Medication"),
                hasPreExisting:studyData.studyObj.RequirementsObject.healthRequirements.includes("PreExistingConditions"),
                allergies: userData.extraInfoObj?.HealthData?.allergies || "None",
                medication: userData.extraInfoObj?.HealthData?.disabilities || "None",
                disabilities: userData.extraInfoObj?.HealthData?.medication || "None",
                preExisitng: userData.extraInfoObj?.HealthData?.preExisitngConditions || "None",
            };
            const DemoGraphicProps:DemoGraphicDisplayProps ={
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
                age:userData.extraInfoObj?.DemographicData?.age || "None",
                faculty:userData.extraInfoObj?.DemographicData?.faculty|| "None",
                gender:userData.extraInfoObj?.DemographicData?.gender|| "None",
                hlofe:userData.extraInfoObj?.DemographicData?.highestLevelOfEducation|| "None",
                income:userData.extraInfoObj?.DemographicData?.income|| "None",
                occupation:userData.extraInfoObj?.DemographicData?.occupation|| "None",
                race:userData.extraInfoObj?.DemographicData?.race|| "None",
                religion:userData.extraInfoObj?.DemographicData?.religion|| "None",
                sexuality:userData.extraInfoObj?.DemographicData?.sexuality|| "None",
                yofs:userData.extraInfoObj?.DemographicData?.yearOfStudies|| "None",
            }
            const OtherProps:OtherRequirementDisplayProps ={
                hasAccessRequirements:studyData.studyObj.RequirementsObject.accessibilityRequirements.includes("AccessibilityRequirements"),
                hasAccessToDevice:studyData.studyObj.RequirementsObject.techRequirements.includes("AccessToDevice"),
                hasAnonymityLevel:studyData.studyObj.RequirementsObject.privacyRequirements.includes("AnonymityLevel"),
                hasMaxTravelTime:studyData.studyObj.RequirementsObject.geographicRequirements.includes("MaxTravelTime"),
                hasNativeLanguage:studyData.studyObj.RequirementsObject.languageRequirements.includes("NativeLanguage"),
                hasNearestCity:studyData.studyObj.RequirementsObject.geographicRequirements.includes("NearestCity"),
                hasOtherLanguages:studyData.studyObj.RequirementsObject.languageRequirements.includes("OtherLanguages"),
                accesRequirements:userData.extraInfoObj?.AccessibilityData.accessibilityRequirements|| "None",
                accessToDevice:userData.extraInfoObj?.TechnicalData.accessToDevice|| "None",
                anonymityLevel:userData.extraInfoObj?.PrivacyData.anonymityRequired|| "None",
                maxTravelTime:userData.extraInfoObj?.GeographicData.maxTravelTime|| "None",
                nativeLanguage:userData.extraInfoObj?.LanguageData.nativeLanguage|| "None",
                nearestCity:userData.extraInfoObj?.GeographicData.nearestCity|| "None",
                otherLanguages:userData.extraInfoObj?.extraLanguage|| "None",
            }
            const UserProps:UserProps={
                username:userData.username,
                overallRating:userData.reviewObject.overallRating,
                organisation:userData.organisation,
                email:userData.email,
            }
            console.log(HealthProps)
            console.log(DemoGraphicProps)
            console.log(OtherProps)
            setHealthProps(HealthProps)
            setDemographicProps(DemoGraphicProps)
            setOtherProps(OtherProps)
            setUserProps(UserProps)
            // Further logic using HealtProps...
        } else {
            console.error("userData is null");
        }
      }
      fetchUserData();
  },[department, id, participantId, studyId])
  console.log(healthProps)
  const handleRejection=()=>{
    if(rejectionReason !== ''){
        setRejectionError('');
        addStudyToUsersRejected();
        editUserStatusInStudy(true);
        router.push('/researcherHistory');
        return;
    }
    setRejectionError('A Reason for Rejection Is Required')
  }
  const handleAccept=()=>{
        addStudyToUsersJoined();
        editUserStatusInStudy(false);
        router.push('/researcherHistory');
  }
  const handleDeepHistoryPush=()=>{
    router.push(`/deepHistory?studyId=${studyId}`);
  }

  const checkAllPropsAreFalse = (props:any): boolean => {
    for (const key in props) {
        if (key.startsWith('has') && props[key] === true) {
            return true;
        }
    }
    return false; 
}

  const addStudyToUsersJoined= async ()=>{
    try{
    const userData:any= await fetchDocumentById("users",participantId );
    const currentStudies = userData.joinedStudies
    console.log(userData);
    console.log(currentStudies);
    const updatedStudies = [...currentStudies,{department:department,id:studyId,publisherId:id}]
    const updatedUserDoc = { ...userData };
    updatedUserDoc.joinedStudies = updatedStudies;
    updateDocument('users',participantId,updatedUserDoc);
    } catch (error) {
    console.error("Error adding study to users joinedStudies list:", error);
    }
  }
  const addStudyToUsersRejected= async ()=>{
    try{
    const userData:any= await fetchDocumentById("users",participantId );
    const currentStudies = userData.rejectedStudies
    const updatedStudies = [...currentStudies,{department:department,rejectedStudyId:studyId,publisherId:id,rejectionReason:rejectionReason}]
    const updatedUserDoc = { ...userData };
    updatedUserDoc.rejectedStudies = updatedStudies;
    updateDocument('users',participantId,updatedUserDoc);
    } catch (error) {
    console.error("Error adding study to users rejectedStudies list:", error);
    }
  }
  const editUserStatusInStudy = async (wantToRemove:boolean)=>{
    try{
        const studyData:any= await fetchDocumentById(`departments/${department}/Researchers/${id}/studies`,studyId);
        const currentAwaitingApprovalList = studyData.studyObj.awaitingApprovalParticipants;
        const currentJoinedList = studyData.studyObj.joinedParticipants;
        const updatedAwaitingApprovalList = currentAwaitingApprovalList.filter((participantId: string) => participantId !== participantId);
        const updatedJoinedList = [...currentJoinedList, participantId];
        const updatedStudyDoc = {...studyData};
        if(wantToRemove){
           updatedStudyDoc.studyObj.awaitingApprovalParticipants = updatedAwaitingApprovalList;
           updateDocument(`departments/${department}/Researchers/${id}/studies`,studyId,updatedStudyDoc);
        }else{
            updatedStudyDoc.studyObj.awaitingApprovalParticipants = updatedAwaitingApprovalList;
            updatedStudyDoc.studyObj.joinedParticipants = updatedJoinedList;
            updateDocument(`departments/${department}/Researchers/${id}/studies`,studyId,updatedStudyDoc);
        }
        } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error editing user status in study", error);
        }
  }
  useEffect(()=>{
    setHasHealthProps(checkAllPropsAreFalse(healthProps))
    setHasOtherProps(checkAllPropsAreFalse(otherProps))
    setHasDemographicProps(checkAllPropsAreFalse(demographicProps))
  },[healthProps,otherProps,demographicProps])
  
 
  //for study get requirements then use requirements to set
  return (
    <>
     <Navbar name={ username ?username : 'Guest'} rating={overallRating? overallRating: 0}  accountType={accountType?accountType:"Guest Type"}/>
            <TriangleBackground />
      <div style={{ height: '810px',display:'flex',justifyContent:'center',alignItems:'center' }}>
       <Box sx={{height:'560px',width:'90%',maxWidth:'1000px',backgroundColor:'#FFFEFE',boxShadow: '10px 10px 10px 10px rgba(0, 0, 0, 0.5)',overflowY:'auto'}}>
        <Grid container  >
            <Grid item xs={isMobile?12:3} sx={{display:'flex'}} >
                <Grid container rowSpacing={2}sx={{display:'flex',justifyContent:'center',mt:0}}>
                        <Grid item xs={12} sx={{display:'flex',justifyContent:'start'}}>
                            <Typography fontSize={35} sx={{ml:3}}>Fields</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{display:'flex',justifyContent:'center',mt:isMobile?0:-14}}>
                        <Button variant="contained" onClick={()=>handleSelectionChange("Demographic",0)} sx={{width:'200px',height:'65px',backgroundColor:buttonColours[0],overflowX:'scroll'}}><Typography>Demographic</Typography><OpenInFullIcon></OpenInFullIcon></Button>
                        </Grid>
                        <Grid item xs={12} sx={{display:'flex',justifyContent:'center',}}>
                        <Button variant="contained" onClick={()=>handleSelectionChange("Health",1)} sx={{width:'200px',height:'65px',backgroundColor:buttonColours[1],mt:isMobile?0:-18}}><Typography>Health</Typography><OpenInFullIcon></OpenInFullIcon></Button>
                        </Grid>
                        <Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}>
                        <Button variant="contained" onClick={()=>handleSelectionChange("Other",2)}sx={{width:'200px',height:'65px',backgroundColor:buttonColours[2],mt:isMobile?0:-24}}><Typography>Other</Typography><OpenInFullIcon></OpenInFullIcon></Button>
                        </Grid>
                </Grid>
            </Grid> 
            <Grid item xs={isMobile?12:5}>
                <Grid container rowSpacing={2}sx={{display:'flex',justifyContent:'center',mt:isMobile?2:0}}>
                    <Grid item xs={12} sx={{display:'flex',justifyContent:'start'}}>
                          <Typography fontSize={35} sx={{ml:3}}>Details</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{display:'flex',justifyContent:'center',height:'400px'}}>
                    {visibleContent=="Health" ?<HealthDisplay hasPreExisting={healthProps.hasPreExisting} hasAllergies={healthProps.hasAllergies} hasDisabilities={healthProps.hasDisabilities} hasMedication={healthProps.hasMedication} preExisitng={healthProps.preExisitng} allergies={healthProps.allergies} disabilities={healthProps.disabilities} medication={healthProps.medication} hasHealthProps={hasHealthProps}></HealthDisplay>:null}
                     {visibleContent=="Other" ?<OtherRequirementDisplay hasAccessToDevice={otherProps.hasAccessToDevice} hasNativeLanguage={otherProps.hasNativeLanguage} hasOtherLanguages={otherProps.hasOtherLanguages} hasNearestCity={otherProps.hasNearestCity} hasMaxTravelTime={otherProps.hasMaxTravelTime} hasAnonymityLevel={otherProps.hasAnonymityLevel} hasAccessRequirements={otherProps.hasAccessRequirements} accessToDevice={otherProps.accessToDevice} nativeLanguage={otherProps.nativeLanguage} otherLanguages={otherProps.otherLanguages} nearestCity={otherProps.nearestCity} maxTravelTime={otherProps.maxTravelTime} anonymityLevel={otherProps.anonymityLevel} accesRequirements={otherProps.accesRequirements} hasOtherProps={hasOtherProps}></OtherRequirementDisplay>:null}
                     {visibleContent=="Demographic" ?<DemoGraphicDisplay hasFaculty={demographicProps.hasFaculty} hasGender={demographicProps.hasGender} hasRace={demographicProps.hasRace} hasSexuality={demographicProps.hasSexuality} hasYOFS={demographicProps.hasYOFS} hasReligion={demographicProps.hasReligion} hasIncome={demographicProps.hasIncome} hasAge={demographicProps.hasAge} hasOccupation={demographicProps.hasOccupation} hasHLOFE={demographicProps.hasHLOFE} faculty={demographicProps.faculty} gender={demographicProps.gender} race={demographicProps.race} sexuality={demographicProps.sexuality} yofs={demographicProps.yofs} religion={demographicProps.religion} income={demographicProps.income} age={demographicProps.age} occupation={demographicProps.occupation} hlofe={demographicProps.hlofe} hasDemoProps={hasDemographicProps}></DemoGraphicDisplay>:null}
                    </Grid>
                </Grid>
            </Grid>    
            <Grid item xs={isMobile?12:4} sx={{display:'flex'}}>
                <Grid container rowSpacing={0} sx={{display:'flex',justifyContent:'center',mt:2}} >
                    <Grid item xs={12}>
                    <Typography fontSize={35} sx={{ml:3}}>User</Typography>
                    </Grid>
                    <Grid item xs={12}  sx={{display:'flex',justifyContent:'center',mt:2}} >
                        <Box sx={{width:'320px',height:"235px",backgroundColor:"#DAE1E9",borderRadius:'5px',boxShadow: '0px 4px 4px 0px #00000040'}}>
                        <Grid container rowSpacing={2}sx={{display:'flex',justifyContent:'center',mt:2}}>
                            <Grid item xs={6} sx={{display:'flex',justifyContent:'start'}}>
                                <Typography fontSize={20} sx={{ml:1}}>Name:{userProps.username}</Typography>
                            </Grid>
                            <Grid item xs={6} sx={{display:'flex',justifyContent:'start'}}>
                                <Typography fontSize={20} >Rating:{userProps.overallRating}</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{display:'flex',justifyContent:'start'}}>
                                <Typography fontSize={20} sx={{ml:1}}>Organisation:{userProps.organisation}</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{display:'flex',justifyContent:'start'}}>
                                <Typography fontSize={20} sx={{ml:1}}>Email:{userProps.email}</Typography>
                            </Grid>
                            {acceptEnabled?<Grid item xs={12} sx={{display:'flex',justifyContent:'start'}}>
                               <Button  onClick={handleAccept}variant="contained" sx={{width:"145px",borderRadius:"5px",backgroundColor:"#84C287",ml:1}}><Grid container><Grid item xs={3} sx={{display:'flex',justifyContent:'center'}}><DoneIcon></DoneIcon></Grid><Grid item xs={9} sx={{display:'flex',justifyContent:'start'}}><Box sx={{ml:1}}>Accept</Box></Grid></Grid></Button>
                            </Grid>:null}
                        </Grid> 
                        </Box>
                    </Grid>
                    {acceptEnabled?<Grid item xs={12}  sx={{display:'flex',justifyContent:'center',mt:2}}>
                        <Box sx={{width:'320px',height:"230px",backgroundColor:"#FFFFFF",borderRadius:'5px',border:"5px solid #C6CFD8",boxShadow: '0px 4px 4px 0px #00000040'}}>

                        <Grid container sx={{display:'flex',justifyContent:'center',mt:2}}>
                            <Grid item xs={12} sx={{display:'flex',justifyContent:'start'}}>
                                <Typography fontSize={18} sx={{ml:1,maxWidth:'250px'}}>Please provide details if you wish to reject this user </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{display:'flex',justifyContent:'start'}}>
                            <TextField
                        label="Reason for Rejection"
                        variant="outlined"
                        value={rejectionReason}
                        onChange={(event) => setRejectionReason(event.target.value)}
                        error={Boolean(rejectionError)}
                        helperText={rejectionError}
                        multiline={true}
                        rows={3}
                        sx={{width:'95%',padding:0,ml:1,backgroundColor:'#DAE1E9',"&  .MuiFormHelperText-root.Mui-error": {
                            backgroundColor: "#F6F6F6",
                            margin:0,
                          },}}
                    />
                            </Grid>
                            <Grid item xs={12} sx={{display:'flex',justifyContent:'start',mt:1}}>
                            <Button  onClick={handleRejection} variant="contained" sx={{width:"145px",borderRadius:"5px",backgroundColor:"#CD386B",ml:1}}><Grid container><Grid item xs={3} sx={{display:'flex',justifyContent:'center'}}><CloseIcon></CloseIcon></Grid><Grid item xs={9} sx={{display:'flex',justifyContent:'start'}}><Box sx={{ml:1}}>Reject</Box></Grid></Grid></Button>
                            </Grid>
                        </Grid> 
                        </Box>
                    </Grid>:<Grid item xs={12}  sx={{display:'flex',justifyContent:'center',mt:2}}>
                        <Box sx={{width:'320px',height:"230px",backgroundColor:"#FFFFFF",borderRadius:'5px',border:"5px solid #C6CFD8",boxShadow: '0px 4px 4px 0px #00000040'}}>

                        <Grid container sx={{display:'flex',justifyContent:'center',mt:2}}>
                            <Grid item xs={12} sx={{display:'flex',justifyContent:'start'}}>
                                <Typography fontSize={18} sx={{ml:1,maxWidth:'250px'}}>Want to go back to the study ? </Typography>
                            </Grid>
                            
                            <Grid item xs={12} sx={{display:'flex',justifyContent:'start',mt:1}}>
                            <Button  onClick={handleDeepHistoryPush}variant="contained" sx={{width:"145px",borderRadius:"5px",backgroundColor:"#84C287",ml:1}}><Grid container><Grid item xs={3} sx={{display:'flex',justifyContent:'center'}}><DoneIcon></DoneIcon></Grid><Grid item xs={9} sx={{display:'flex',justifyContent:'start'}}><Box sx={{ml:1}}>Go Back</Box></Grid></Grid></Button>
                            </Grid>
                        </Grid> 
                        </Box>
                    </Grid>}
                 </Grid>
            </Grid>
        </Grid>       
        
       </Box>
      </div>
    </>
  );
  };
  
  export default ViewParticipantDetails;