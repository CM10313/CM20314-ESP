import {Button, Box, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import Navbar from '../Components/navbar';
import TriangleBackground from '../Components/TriangleBackground';
import { useAuth } from '../Context/AuthContext';
import { fetchDocumentById, updateDocument} from '../firebase/firestore';
import { ReviewDetailsObject } from './register';
import { Faculty } from '../DataState/UserExtraInfo';
import { useState, useEffect } from 'react';
import { DemoGraphicDisplayProps } from '../Components/DempographicDisplay';
import { HealthDisplayProps } from '../Components/HealthDisplay';
import { OtherRequirementDisplayProps } from '../Components/OtherRequirementDisplay';
interface StudyProps{
    title:string;
    publisher:string;
    publisherRating:number;
    participants:string[];
    description:string;
    reviews:ReviewDetailsObject[];
    closingDate:string;
    publishedDate:string;
    preliminaryDate:string;
    relatedFields:string[];
    compensationDescription:string;
    compensationAmount:number;
    ethicsApproval:string;
    department:string;
    location:string;
    externalLink:string;
    maxNoParticipants:number;
    minimumAge:number;
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
const AdvertPreview: React.FC<{ testBypass1?: StudyProps, testBypass2?:RequirementProps}> = ({ testBypass1={} as StudyProps, testBypass2 ={} as RequirementProps })  => {
  const {isLoggedIn,setAuth,username,overallRating,id} = useAuth();
  const isMobile = useMediaQuery('(max-width:1000px)')
  const [studyProps, setStudyProps]=useState<StudyProps>(testBypass1);
  const [requirementProps, setRequirementProps]=useState<RequirementProps>(testBypass2);
  //const [healthProps, setHealthProps]=useState<HealthDisplayProps>(testBypass1);
  //const [demographicProps,setDemographicProps]=useState<DemoGraphicDisplayProps>(testBypass2);
  //const [ otherProps, setOtherProps]=useState<OtherRequirementDisplayProps>(testBypass3);
  const router = useRouter();
let studyId = '';
let department ='';
let publisherId ='';

if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    studyId = urlParams.get('studyId') || '';
    department = urlParams.get('department') || '';
    publisherId = urlParams.get('publisherId') || '';
}

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
  
  useEffect (()=>{
    const fetchUserData = async ()=> {
        console.log(studyId )
        const studyData:any= await fetchDocumentById(`departments/${department}/Researchers/${publisherId}/studies`,studyId);
        const userData:any= await fetchDocumentById("users",publisherId );
        console.log(studyData);
        if (studyData && userData) {
            const StudyProps: StudyProps = {
                title:studyData.title,
                publisher:studyData.publisherName,
                publisherRating:studyData.publisherRating,
                participants:studyData.studyObj.joinedParticipants,
                description:studyData.description,
                reviews:userData.reviewObject.reviews,
                closingDate:studyData.closingDate,
                publishedDate:studyData.dateOfPublish,
                preliminaryDate:studyData.preliminaryDate,
                relatedFields:studyData.relatedFields,
                compensationDescription:studyData.studyObj.CompensationObject.description,
                compensationAmount:studyData.studyObj.CompensationObject.amount,
                ethicsApproval:studyData.studyObj.EthicsApprovalObject.status,
                department:studyData.department,
                location:studyData.location,
                externalLink:studyData.externalLink,
                maxNoParticipants:studyData.maxNoParticipants,
                minimumAge:studyData.minimumAge,
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
                hasMaxTravelTime:studyData.studyObj.RequirementsObject.geographicalRequirements.includes("MaxTravelTime"),
                hasNativeLanguage:studyData.studyObj.RequirementsObject.languageRequirements.includes("NativeLanguage"),
                hasNearestCity:studyData.studyObj.RequirementsObject.geographicalRequirements.includes("NearestCity"),
                hasOtherLanguages:studyData.studyObj.RequirementsObject.languageRequirements.includes("OtherLanguages"),
            }
            setStudyProps(StudyProps);
            setRequirementProps(RequirementProps);
        } else {
            console.error("userData or studyData is null");
        }
      }
      fetchUserData();
  },[department, id, publisherId, studyId])
  
  return (
    <>
     <Navbar name={ username ?username : 'Guest'} rating={overallRating? overallRating: 0} />
            <TriangleBackground />
      <div style={{ height: '810px',display:'flex',justifyContent:'center',alignItems:'center' }}>
       <Box>
        
       </Box>
       <Box>
        
        <Button onClick={addUserToStudyAwaitingApproval}>Apply</Button>
       </Box>
      </div>
    </>
  );
  };
  
  export default AdvertPreview;
  //study data:{JSON.stringify(studyProps)}//requirements:{JSON.stringify(requirementProps)}
  