import { TextField, Button, Grid, Typography, Box, useMediaQuery, Paper, styled } from '@mui/material';

import StudyMediumCard, {StudyMediumCardProps} from '../Components/StudyMediumCard';
import { useRouter } from 'next/router';
import Navbar from '../Components/navbar';
import TriangleBackground from '../Components/TriangleBackground';
import Calendar from '../Components/Calendar';
import SearchableList from '../Components/SearchableList';
import { useAuth } from '../Context/AuthContext';
import { useEffect, useState } from 'react';
import { fetchDocumentById} from '../firebase/firestore';
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


const ViewParticipantDetails: React.FC<{  }> = ({ }) => {
  const {isLoggedIn,setAuth,username,overallRating,id,department} = useAuth();
  const isMobile = useMediaQuery('(max-width:1000px)')
  const isExtraSmall = useMediaQuery('(max-width:800px)')
  const [visibleContent, setVisibleContent] = useState("Demographic");
  const [buttonColours, setButtonColours]= useState(["#1F5095","#DAE1E9","#DAE1E9"]);
  const [rejectionReason, setRejectionReason]= useState("");
  const [rejectionError, setRejectionError]= useState("");
  const [healthProps, setHealthProps]=useState<HealthDisplayProps>();
  const [demographicProps,setDemographicProps]=useState<DemoGraphicDisplayProps>();
  const [ otherProps, setOtherProps]=useState<OtherRequirementDisplayProps>();
  let participantId = '';
let studyId = '';

// Check if window is defined (i.e., if the code is running in a browser environment)
if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    participantId = urlParams.get('uid') || '';
    studyId = urlParams.get('studyId') || '';
}

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
                hasAccessRequirements:studyData.studyObj.RequirementsObject.accesibilityRequirements.includes("AccessibilityRequirements"),
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
            setHealthProps(HealthProps)
            setDemographicProps(DemoGraphicProps)
            setOtherProps(OtherProps)
            // Further logic using HealtProps...
        } else {
            console.error("userData is null");
        }
      }
      fetchUserData();
  },[department, id, participantId, studyId])
  

  
 
  //for study get requirements then use requirements to set
  return (
    <>
     <Navbar name={ username ?username : 'Guest'} rating={overallRating? overallRating: 0} />
            <TriangleBackground />
      <div style={{ height: '810px',display:'flex',justifyContent:'center',alignItems:'center' }}>
       <Box sx={{height:'560px',width:'90%',maxWidth:'1000px',backgroundColor:'#FFFEFE',boxShadow: '10px 10px 10px 10px rgba(0, 0, 0, 0.5)',overflowY:'auto'}}>
        <Grid container  >
            <Grid item xs={isMobile?12:3} sx={{display:'flex'}} >
                <Grid container rowSpacing={2}sx={{display:'flex',justifyContent:'center',mt:0}}>
                        <Grid item xs={12} sx={{display:'flex',justifyContent:'start'}}>
                            <Typography fontSize={35} sx={{ml:3}}>Fields</Typography>
                        </Grid>
                        <Grid item xs={isMobile?isExtraSmall?12:4:12} sx={{display:'flex',justifyContent:'center',mt:isMobile?0:-14}}>
                        <Button variant="contained" onClick={()=>handleSelectionChange("Demographic",0)} sx={{width:'200px',height:'65px',backgroundColor:buttonColours[0],overflowX:'scroll'}}><Typography>Demographic</Typography><OpenInFullIcon></OpenInFullIcon></Button>
                        </Grid>
                        <Grid item xs={isMobile?isExtraSmall?12:4:12} sx={{display:'flex',justifyContent:'center',}}>
                        <Button variant="contained" onClick={()=>handleSelectionChange("Health",1)} sx={{width:'200px',height:'65px',backgroundColor:buttonColours[1],mt:isMobile?0:-18}}><Typography>Health</Typography><OpenInFullIcon></OpenInFullIcon></Button>
                        </Grid>
                        <Grid item xs={isMobile?isExtraSmall?12:4:12} sx={{display:'flex',justifyContent:'center'}}>
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
                    {visibleContent=="Health" ?<HealthDisplay hasPreExisting={healthProps?healthProps?.hasPreExisting:false} hasAllergies={healthProps?healthProps?.hasAllergies:false} hasDisabilities={healthProps?healthProps?.hasDisabilities:false} hasMedication={healthProps?healthProps?.hasMedication:false} preExisitng={healthProps?healthProps?.preExisitng:"None"} allergies={healthProps?healthProps?.allergies:"None"} disabilities={healthProps?healthProps?.disabilities:"None"} medication={healthProps?healthProps?.medication:"None"}></HealthDisplay>:null}
                     {visibleContent=="Other" ?<OtherRequirementDisplay hasAccessToDevice={otherProps?otherProps?.hasAccessToDevice:false} hasNativeLanguage={otherProps?otherProps?.hasNativeLanguage:false} hasOtherLanguages={otherProps?otherProps?.hasOtherLanguages:false} hasNearestCity={otherProps?otherProps?.hasNearestCity:false} hasMaxTravelTime={otherProps?otherProps?.hasMaxTravelTime:false} hasAnonymityLevel={otherProps?otherProps?.hasAnonymityLevel:false} hasAccessRequirements={otherProps?otherProps?.hasAccessRequirements:false} accessToDevice={otherProps?otherProps.accessToDevice:"None"} nativeLanguage={otherProps?otherProps.nativeLanguage:"None"} otherLanguages={otherProps?otherProps.otherLanguages:"None"} nearestCity={otherProps?otherProps.nearestCity:"None"} maxTravelTime={otherProps?otherProps.maxTravelTime:"None"} anonymityLevel={otherProps?otherProps.anonymityLevel:"None"} accesRequirements={otherProps?otherProps.accesRequirements:"None"}></OtherRequirementDisplay>:null}
                    {visibleContent=="Demographic" ?<DemoGraphicDisplay hasFaculty={demographicProps?demographicProps.hasFaculty:false} hasGender={demographicProps?demographicProps.hasGender:false} hasRace={demographicProps?demographicProps.hasRace:false} hasSexuality={demographicProps?demographicProps.hasSexuality:false} hasYOFS={demographicProps?demographicProps.hasYOFS:false} hasReligion={demographicProps?demographicProps.hasReligion:false} hasIncome={demographicProps?demographicProps.hasIncome:false} hasAge={demographicProps?demographicProps.hasAge:false} hasOccupation={demographicProps?demographicProps.hasOccupation:false} hasHLOFE={demographicProps?demographicProps.hasHLOFE:false} faculty={demographicProps?demographicProps?.faculty:"None"} gender={demographicProps?demographicProps?.gender:"None"} race={demographicProps?demographicProps?.race:"None"} sexuality={demographicProps?demographicProps?.sexuality:"None"} yofs={demographicProps?demographicProps?.yofs:"None"} religion={demographicProps?demographicProps?.religion:"None"} income={demographicProps?demographicProps?.income:"None"} age={demographicProps?demographicProps?.age:"None"} occupation={demographicProps?demographicProps?.occupation:"None"} hlofe={demographicProps?demographicProps?.hlofe:"None"}></DemoGraphicDisplay>:null}
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
                                <Typography fontSize={20} sx={{ml:1}}>Name:</Typography>
                            </Grid>
                            <Grid item xs={6} sx={{display:'flex',justifyContent:'start'}}>
                                <Typography fontSize={20} >Rating:</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{display:'flex',justifyContent:'start'}}>
                                <Typography fontSize={20} sx={{ml:1}}>Organisation:</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{display:'flex',justifyContent:'start'}}>
                                <Typography fontSize={20} sx={{ml:1}}>Email:</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{display:'flex',justifyContent:'start'}}>
                               <Button  variant="contained" sx={{width:"145px",borderRadius:"5px",backgroundColor:"#84C287",ml:1}}><Grid container><Grid item xs={3} sx={{display:'flex',justifyContent:'center'}}><DoneIcon></DoneIcon></Grid><Grid item xs={9} sx={{display:'flex',justifyContent:'start'}}><Box sx={{ml:1}}>Accept</Box></Grid></Grid></Button>
                            </Grid>
                        </Grid> 
                        </Box>
                    </Grid>
                    <Grid item xs={12}  sx={{display:'flex',justifyContent:'center',mt:2}}>
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
                            <Grid item xs={12} sx={{display:'flex',justifyContent:'start'}}>
                            <Button  variant="contained" sx={{width:"145px",borderRadius:"5px",backgroundColor:"#CD386B",ml:1}}><Grid container><Grid item xs={3} sx={{display:'flex',justifyContent:'center'}}><CloseIcon></CloseIcon></Grid><Grid item xs={9} sx={{display:'flex',justifyContent:'start'}}><Box sx={{ml:1}}>Reject</Box></Grid></Grid></Button>
                            </Grid>
                        </Grid> 
                        </Box>
                    </Grid>
                 </Grid>
            </Grid>
        </Grid>       
        
       </Box>
      </div>
    </>
  );
  };
  
  export default ViewParticipantDetails;