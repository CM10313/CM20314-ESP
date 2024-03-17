import { Box, Button, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, useMediaQuery } from "@mui/material";
import {  SetStateAction,useEffect,useState, useMemo } from "react";
import { Faculty} from "../DataState/UserExtraInfo";
import FormDialogue from "./FormDialogue";
import Checkbox from '@mui/material/Checkbox';
import { useStudyState, StudyState, RequirementsObject } from "../DataState/StudyState";
import { StudyData } from "../pages/studyCreator";
import validateDate, { getTodayDate } from "../Utils/ValidateDate";
import validateNumberInRange from "../Utils/ValidateNumberInput";
import validateURL from "../Utils/ValidateURL";
import { useAuth } from "../Context/AuthContext";
import { EditableData } from "../pages/editAdvert";
import { fetchDocumentById, updateDocument } from "../firebase/firestore";

interface StudyEditDialogueProps {
    handleHomeRedirect:() => void;
    jestBypass:boolean;
    prevData:EditableData;
    studyId:string;
}
type CheckedType={
    hasGender:boolean;
    hasAge:boolean;
    hasReligion:boolean;
    hasRace:boolean;
    hasSexuality:boolean;
    hasIncome:boolean;
}
type RequirementType={
    demoRequirements:DemoType;
    healthRequirements:HealthType;
    techRequirements:TechType;
    languageRequirements:LanguageType;
    geographicRequirements:GeographicType;
    privacyRequirements:PrivacyType;
    accessibilityRequirements:AccessType;
}
interface DemoType {
    Faculty: boolean;
    Gender: boolean;
    Race: boolean;
    Religion: boolean;
    Income: boolean;
    Age: boolean;
    Sexuality: boolean;
    YearOfStudies: boolean;
    Occupation: boolean;
    HighestLevelOfEducation: boolean;
}

interface HealthType {
    PreExistingConditions: boolean;
    Allergies: boolean;
    Medication: boolean;
    Disabilities: boolean;
}

interface TechType {
    AccessToDevice: boolean;
}

interface LanguageType {
    NativeLanguage: boolean;
    OtherLanguages: boolean;
}

interface GeographicType {
    NearestCity: boolean;
    MaxTravelTime: boolean;
}

interface PrivacyType {
    AnonymityLevel: boolean;
}
interface AccessType {
    AccessibilityRequirements: boolean;
}
// add tests, needs
export default function StudyEditDialogue({ handleHomeRedirect,jestBypass,prevData,studyId}:StudyEditDialogueProps) {
    const [title,setTitle] = useState(prevData.title);
    const [closingDate, setClosingDate]= useState(prevData.closingDate);
    const [preliminaryDate, setPreliminaryDate] = useState(prevData.preliminaryDate);
    const [externalLink, setExternalLink] = useState(prevData.externalLink);
    const [description, setDescription]=useState(prevData.description);
    const [location, setLocation]=useState(prevData.location);
    const [relatedFields, setRelatedFields] = useState<string[]>(prevData.relatedFields);
    const [minimumAge,setMinimumAge]= useState(prevData.minimumAge);
    const [maxNoParticipants,setMaxNoParticipants]= useState(prevData.maxNoParticipants);
    const [extraFieldName,setExtraFieldName]= useState("");
    const [studyObj, setStudyObj] = useStudyState();
    const [closingDateError,setClosingDateError]= useState("");
    const [preliminaryDateError,setPreliminaryDateError]= useState("");
    const [maxNoError,setMaxNoError]= useState("");
    const [minimumAgeError,setMinimumAgeError]= useState("");
    const [externalLinkError,setExternalLinkError]= useState("");
    const [titleError,setTitleError]= useState("");
    const [descriptionError,setDescriptionError]= useState("");
    const [locationError,setLocationError]= useState("");
    const [submitError, setSubmitError]= useState("");
    const {username,id,overallRating,department} = useAuth();
    const dateOfPublish = getTodayDate();
    const publisherId = id//needs to be based on current user
    const publisherRating = overallRating;
    const publisherName = username;
    const [checkedObject, setCheckedObject] = useState<CheckedType>({
        hasGender: prevData.diversityObject.hasGender,
        hasAge: prevData.diversityObject.hasAge,
        hasReligion: prevData.diversityObject.hasReligion,
        hasRace: prevData.diversityObject.hasRace,
        hasSexuality: prevData.diversityObject.hasSexuality,
        hasIncome: prevData.diversityObject.hasIncome,
    });
    const [requirementsStatus, setRequirementStatus] = useState<RequirementType>({
        demoRequirements: {
            Faculty: prevData.requirements.demoRequirements.includes("Faculty"),
            Gender: prevData.requirements.demoRequirements.includes("Gender"),
            Race: prevData.requirements.demoRequirements.includes("Race"),
            Religion: prevData.requirements.demoRequirements.includes("Religion"),
            Income: prevData.requirements.demoRequirements.includes("Income"),
            Age: prevData.requirements.demoRequirements.includes("Age"),
            Sexuality: prevData.requirements.demoRequirements.includes("Sexuality"),
            YearOfStudies: prevData.requirements.demoRequirements.includes("YearOfStudies"),
            Occupation: prevData.requirements.demoRequirements.includes("Occupation"),
            HighestLevelOfEducation: prevData.requirements.demoRequirements.includes("HighestLevelOfEducation"),
        },
        healthRequirements: {
            PreExistingConditions: prevData.requirements.healthRequirements.includes("PreExistingConditions"),
            Allergies: prevData.requirements.healthRequirements.includes("Allergies"),
            Medication: prevData.requirements.healthRequirements.includes("Medication"),
            Disabilities: prevData.requirements.healthRequirements.includes("Disabilities"),
        },
        techRequirements: {
            AccessToDevice: prevData.requirements.techRequirements.includes("AccessToDevice"),
        },
        languageRequirements: {
            NativeLanguage: prevData.requirements.languageRequirements.includes("NativeLanguage"),
            OtherLanguages: prevData.requirements.languageRequirements.includes("OtherLanguages"),
        },
        geographicRequirements: {
            NearestCity: prevData.requirements.geographicRequirements.includes("NearestCity"),
            MaxTravelTime: prevData.requirements.geographicRequirements.includes("MaxTravelTime"),
        },
        privacyRequirements: {
            AnonymityLevel: prevData.requirements.privacyRequirements.includes("AnonymityLevel"),
        },
        accessibilityRequirements: {
            AccessibilityRequirements: prevData.requirements.accessibilityRequirements.includes("AccessibilityRequirements"),
        }
    });    

        const handleStudySubmit = async () => {
            const currentStudy:any = await fetchDocumentById(`departments/${department}/Researchers/${id}/studies`,studyId)
            const updatedStudy = {...currentStudy};
            updatedStudy.title = title;
            updatedStudy.closingDate = closingDate;
            updatedStudy.preliminaryDate  = preliminaryDate;
            updatedStudy.location = location;
            updatedStudy.description = description;
            updatedStudy.maxNoParticipants = maxNoParticipants;
            updatedStudy.externalLink = externalLink;
            updatedStudy.minimumAge = minimumAge;
            //updatedStudy.studyObj.EthicsApprovalObject.
            updatedStudy.studyObj.CompensationObject.amount = studyObj.CompensationObject.amount;
            updatedStudy.studyObj.CompensationObject.description =  studyObj.CompensationObject.description;
            updatedStudy.studyObj.DiversityObject = checkedObject;
            for (const key in requirementsStatus) {
                if (requirementsStatus.hasOwnProperty(key)) {
                    const requirementStatusForKey = requirementsStatus[key as keyof RequirementType];
                    const trueKeys: string[] = [];
    
                   
                    for (const innerKey in requirementStatusForKey) {
                        if (requirementStatusForKey[innerKey]) {
                            trueKeys.push(innerKey);
                        }
                    }
                    updatedStudy.studyObj.RequirementsObject[key as keyof RequirementType] = trueKeys;
                }
            }
            updatedStudy.relatedFields = relatedFields;
            updateDocument(`departments/${department}/Researchers/${id}/studies`,studyId,updatedStudy);
            handleHomeRedirect();
            return;
        }
        useEffect(()=>{
            if (!closingDateError && !preliminaryDateError && !maxNoError && !minimumAgeError && !externalLinkError && !titleError && !descriptionError && !locationError) {
                setSubmitError("");
            } else {
                setSubmitError("You cannot submit as required fields are not fullfilled or data is in an invalid format.");
            }
        },[closingDate, preliminaryDate, maxNoError, minimumAgeError, externalLinkError, titleError, descriptionError, locationError, closingDateError, preliminaryDateError])
      
        type SetterFunction<T> = React.Dispatch<React.SetStateAction<T>>;

        const handleInputChange = (setter: SetterFunction<any>) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setter(e.target.value);
        };

       
        const updateCheckedAttribute = (checkedObject: CheckedType, key: keyof CheckedType, value: boolean): CheckedType => {
            // Create a new object with the updated attribute
            const updatedCheckedObject: CheckedType = {
                ...checkedObject,
                [key]: value,
            };
            return updatedCheckedObject;
        };
        type RequirementsType = {
            [K in keyof RequirementType]: {
                [P in keyof RequirementType[K]]: boolean;
            };
        };
        
        const updateCheckedAttributeNested = <T extends keyof RequirementType, U extends keyof RequirementType[T]>(
            checkedObject: RequirementsType,
            outerKey: T,
            innerKey: U,
            value: boolean
        ): RequirementsType => {
            const updatedCheckedObject: RequirementsType = {
                ...checkedObject,
                [outerKey]: {
                    ...checkedObject[outerKey],
                    [innerKey]: value,
                },
            };
            
            return updatedCheckedObject;
        };
        useEffect(() => {
            
              if (validateDate(closingDate)) {
                setClosingDateError('');
              } else {
                setClosingDateError('A date must not be in the past');
              }
          }, [closingDate]);
          useEffect(() => {
            
              if (validateDate(preliminaryDate)) {
                setPreliminaryDateError('');
              } else {
                setPreliminaryDateError('A date must not be in the past');
              }
          }, [preliminaryDate]);
        useEffect(() => {
        
            if (validateNumberInRange(minimumAge,18,99)) {
            setMinimumAgeError('');
            } else {
            setMinimumAgeError('Participants must be between 18 and 99');
            }
        }, [minimumAge]);
        useEffect(() => {
        
            if (validateNumberInRange(maxNoParticipants,1,99)) {
            setMaxNoError('');
            } else {
            setMaxNoError('A study must allow between 1 and 99 participants');
            }
        }, [maxNoParticipants]);
        useEffect(() => {
            
                if (validateURL(externalLink)) {
                setExternalLinkError('');
                } else {
                setExternalLinkError('URLs must be of general http/https or ftp form');
                }
            }, [externalLink]);
        useEffect(() => {
            
                if (title!="") {
                setTitleError('');
                } else {
                setTitleError('A Title Is Required');
                }
            }, [title]);
        useEffect(() => {
            
                if (description!="") {
                setDescriptionError('');
                } else {
                setDescriptionError('A Description Is Required');
                }
            }, [description]);
        useEffect(() => {
        
            if (location!="") {
            setLocationError('');
            } else {
            setLocationError('A Location Is Required');
            }
        }, [location]);
     
      
      const handleAddExtraField = () => {
        if (extraFieldName.trim() !== '') {
          const updatedrelatedFields = [... relatedFields, extraFieldName];
          setRelatedFields(updatedrelatedFields);
          setExtraFieldName('');
        }
      };
      const handleRemoveExtraField  = () => {
        const updatedrelatedFields = [...relatedFields];
        updatedrelatedFields.pop(); 
        setRelatedFields(updatedrelatedFields);
      };
      const handleExtraFieldChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setExtraFieldName(e.target.value);
      };
      
      
      const handleCheckboxChange = (category: keyof StudyState, field: keyof CheckedType, value: boolean) => {
        // Update study state object based on the provided value
        updateStudyState(category, field, value);
        // Update checkedObject
        const updatedCheckedObject = updateCheckedAttribute(checkedObject, field, value);
        // Update the state with the new checkedObject
        setCheckedObject(updatedCheckedObject);
    };
    
    const handleGroupedCheckBox = (
        category: keyof StudyState,
        field: keyof RequirementsObject,
        checked: boolean,
        value: string,
    ) => {
        setStudyObj((prevStudyObj: StudyState) => {
            const updatedCategory = { ...(prevStudyObj[category] as any) };
            const updatedField = checked
                ? [...updatedCategory[field], value] // Add value to the array
                : updatedCategory[field].filter((item: string) => item !== value); // Remove value from the array
            return {
                ...prevStudyObj,
                [category]: {
                    ...updatedCategory,
                    [field]: updatedField,
                },
            };
        });
        const updatedRequirements = updateCheckedAttributeNested(requirementsStatus,field as keyof RequirementType, value as keyof RequirementType[keyof RequirementType], checked);
        // Update the state with the new checkedObject
        setRequirementStatus(updatedRequirements);
    };
    
    
    const updateStudyState = (category: keyof StudyState, field: string, value: string | number|string[] | boolean) => {
        setStudyObj((prevStudyObj) => {
          return {
            ...prevStudyObj,
            [category]: {
                ...(prevStudyObj[category] as any), 
              [field]: value,
            },
          };
        });
      };
      useEffect(()=>{
        updateStudyState("CompensationObject", "amount", prevData.amount);
        updateStudyState("CompensationObject", "description", prevData.compDescription);
      },[prevData.amount, prevData.compDescription])
      
    const isMobile = useMediaQuery('(max-width:1000px)');
    return (
        <>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 10 }}>
            <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center', rowGap: 0 }}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <FormDialogue width={770} height={540} currentPage={0} onFormSubmit={() => handleStudySubmit()} hasBorderRadius={true} canSubmit={!Boolean(submitError)||jestBypass}>
                        <Box sx={{width:'100%',height:'100%',mt:4}}>
                            <Grid
                                container
                                rowSpacing={4}
                                justifyContent="center"
                                sx={{display:'flex',width:isMobile?'100%':'540px'}}
                                > 
                                <Grid item xs={isMobile?12:6} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                                    <Typography fontSize={30} sx={{width:'80%'}}><Box>General</Box></Typography>
                                </Grid>
                                <Grid item xs={isMobile?12:6} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                                    <TextField
                                        label="Title"
                                        variant="outlined"
                                        value={title}
                                        error={Boolean(titleError)}
                                        helperText={titleError}
                                        onChange={handleInputChange(setTitle)}
                                        sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9',borderRadius:1,"&  .MuiFormHelperText-root.Mui-error": {
                                            backgroundColor: "#F6F6F6",
                                            margin:0,
                                          },}}
                                    />
                                </Grid>
                                <Grid item xs={isMobile?12:6} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                                <Grid
                                container
                                rowSpacing={0}
                                justifyContent="center"
                                sx={{display:'flex'}}
                                > 
                                    <Grid item xs={12} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}><Typography  sx={{width:'80%'}}>Closing Date</Typography></Grid>
                                    <Grid item xs={12} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}><TextField 
                                        variant="outlined"
                                        value={closingDate}
                                        type='date'
                                        data-testid="closingDateInput"
                                        onChange={handleInputChange(setClosingDate)}
                                        error={Boolean(closingDateError)}
                                        helperText={closingDateError}
                                        inputProps={{ min: getTodayDate() }} // Set the minimum date to today
                                        sx={{width:'80%',height:'100%',padding:0,backgroundColor:'#DAE1E9',borderRadius:1,mt:-3,"&  .MuiFormHelperText-root.Mui-error": {
                                            backgroundColor: "#F6F6F6",
                                            margin:0,
                                          },}}
                                        >
                                        </TextField>
                                    </Grid>
                                </Grid>
                                
                                  
                                </Grid>
                                <Grid item xs={isMobile?12:6} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%',mt:isMobile?2:0}}>
                                <Grid
                                container
                                rowSpacing={0}
                                justifyContent="center"
                                sx={{display:'flex'}}
                                > 
                                    <Grid item xs={12} sx={{display:'flex',justifyContent:'center',height:'100%'}}><Typography sx={{width:'80%'}}>Preliminary Study Date</Typography></Grid>
                                    <Grid item xs={12} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                                        <TextField 
                                        variant="outlined"
                                        value={preliminaryDate}
                                        type='date'
                                        data-testid="preliminaryDateInput"
                                        error={Boolean(preliminaryDateError)}
                                        helperText={preliminaryDateError}
                                        onChange={handleInputChange(setPreliminaryDate)}//set errpr when date is not within allocated range
                                        inputProps={{ min: getTodayDate() }} // Set the minimum date to today
                                        sx={{width:'80%',height:'100%',padding:0,backgroundColor:'#DAE1E9',borderRadius:1,mt:-3,"&  .MuiFormHelperText-root.Mui-error": {
                                            backgroundColor: "#F6F6F6",
                                            margin:0,
                                          },}}
                                        >
                                        
                                        </TextField>
                                    </Grid>
                                </Grid>
                                </Grid>
                                <Grid item xs={isMobile?12:6} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%',mt:4}}>
                                <TextField
                            label="Location"
                            variant="outlined"
                            value={location}
                            error={Boolean(locationError)}
                            helperText={locationError}
                            multiline
                            rows={3}
                            onChange={handleInputChange(setLocation)}
                            sx={{width:isMobile?'80%':'80%',padding:0,backgroundColor:'#DAE1E9',borderRadius:1,"&  .MuiFormHelperText-root.Mui-error": {
                                backgroundColor: "#F6F6F6",
                                margin:0,
                              },}}
                        />
                                </Grid>
                                
                                <Grid item xs={isMobile?12:6} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%',mt:4}}>
                                <TextField
                            label="Max Number Of Participants"
                            variant="outlined"
                            type="number"
                            placeholder={"1"}
                            value={maxNoParticipants}
                            error={Boolean(maxNoError)}
                            helperText={maxNoError}
                            onChange={handleInputChange(setMaxNoParticipants)}
                            sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9',borderRadius:1,"&  .MuiFormHelperText-root.Mui-error": {
                                backgroundColor: "#F6F6F6",
                                margin:0,
                              },}} 
                            inputProps={{
                                min: 1,  
                                max: 99,  
                            }}
                        />
                            </Grid>
                            <Grid item xs={12} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%',mt:4}}>
                                <TextField
                            label="Description"
                            variant="outlined"
                            value={description}
                            error={Boolean(descriptionError)}
                            helperText={descriptionError}
                            multiline
                            rows={3}
                            onChange={handleInputChange(setDescription)}
                            sx={{width:isMobile?'80%':'90%',padding:0,backgroundColor:'#DAE1E9',borderRadius:1,mt:-2,"&  .MuiFormHelperText-root.Mui-error": {
                                backgroundColor: "#F6F6F6",
                                margin:0,
                              },}}
                        />
                                </Grid>
                            <Grid item xs={12} sx={{display:'flex',justifyContent:'center',height:'100%',mt:-2}}>
                                <Typography fontSize={12}>
                                    {"Don't want to continue ?"}
                                    <Button sx ={{color:'black'}} onClick={handleHomeRedirect}>
                                        <Typography component="span" fontWeight="bold" fontSize={12}>
                                            Click Here
                                        </Typography>
                                    </Button> 
                                </Typography>
                            </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{mt:4}}>
                        <Grid
                                container
                                rowSpacing={4}
                                justifyContent="center"
                                sx={{display:'flex',width:isMobile?'100%':'540px'}}
                                > 
                                <Grid item xs={isMobile?12:6} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                                    <Typography fontSize={30}><Box>Diversity Rules</Box></Typography>
                                </Grid>
                                <Grid item xs={isMobile?12:6} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                                
                                </Grid>
                                <Grid item xs={isMobile?12:6} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                                    <TextField
                                        label="External Link"
                                        variant="outlined"
                                        value={externalLink}
                                        error={Boolean(externalLinkError)}
                                        helperText={externalLinkError}
                                        onChange={handleInputChange(setExternalLink)}
                                        sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9',borderRadius:1,"&  .MuiFormHelperText-root.Mui-error": {
                                            backgroundColor: "#F6F6F6",
                                            margin:0,
                                          },}}
                                    />
                                </Grid>
                                <Grid item xs={isMobile?12:6} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                                <TextField
                            label="Minimum Age"
                            variant="outlined"
                            type="number"
                            placeholder={"18"}
                            value={minimumAge}
                            error={Boolean(minimumAgeError)}
                            helperText={minimumAgeError}
                            onChange={handleInputChange(setMinimumAge)}
                            sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9',borderRadius:1}} 
                            inputProps={{
                                min: 18,  
                                max: 99,  
                            }}
                        />
                                </Grid>
                                <Grid item xs={isMobile?12:6} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                                <Box sx={{backgroundColor:'#DAE1E9',borderRadius:'5px',width:'80%',height:'150px',border:'1px solid gray'}}><Typography sx={{ml:2,mt:1,mr:2}}fontSize={15}>Any selected diversity rules will be visible in your history, once participants join the study.</Typography> </Box>
                                </Grid>
                                <Grid item xs={isMobile?12:6} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                                <Box sx={{width:'80%',borderRadius:'5px',height:'160px'}}> <FormControl component="fieldset">
                            <FormGroup
                            aria-label="Diversity Checkbox"
                            //add an on change
                            sx={{ml:1}}
                            >
                                <Grid
                                container
                                rowSpacing={0}
                                > 
                                <Grid item xs={6}>
                                    <Box >
                                        <FormControlLabel value={true} checked={checkedObject.hasGender}control={<Checkbox sx={{ color: '#0B254A', '&.Mui-checked': { color: '#0B254A' }}} />} label={<Typography fontSize={15} fontWeight={"bold"}>Gender</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleCheckboxChange('DiversityObject', 'hasGender', target.checked);}} />
                                        <FormControlLabel value={true} checked={checkedObject.hasRace} control={<Checkbox sx={{ color: '#0B254A', '&.Mui-checked': { color: '#0B254A' }}}/>} label={<Typography fontSize={15} fontWeight={"bold"}>Race</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleCheckboxChange('DiversityObject', 'hasRace', target.checked);}} />
                                        <FormControlLabel value={true} checked={checkedObject.hasReligion} control={<Checkbox sx={{ color: '#0B254A', '&.Mui-checked': { color: '#0B254A' }}}/>} label={<Typography fontSize={15} fontWeight={"bold"}>Religion</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleCheckboxChange('DiversityObject', 'hasReligion', target.checked);}} />
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                <Box>
                                        <FormControlLabel value={true} checked={checkedObject.hasAge} control={<Checkbox sx={{ color: '#0B254A', '&.Mui-checked': { color: '#0B254A' }}}/>} label={<Typography fontSize={15} fontWeight={"bold"}>Age</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleCheckboxChange('DiversityObject', 'hasAge', target.checked);}} />
                                        <FormControlLabel value={true} checked={checkedObject.hasSexuality} control={<Checkbox sx={{ color: '#0B254A', '&.Mui-checked': { color: '#0B254A' }}}/>} label={<Typography fontSize={15} fontWeight={"bold"}>Sexuality</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleCheckboxChange('DiversityObject', 'hasSexuality', target.checked);}} />
                                        <FormControlLabel value={true} checked={checkedObject.hasIncome}control={<Checkbox sx={{ color: '#0B254A', '&.Mui-checked': { color: '#0B254A' }}}/>} label={<Typography fontSize={15} fontWeight={"bold"}>Income</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleCheckboxChange('DiversityObject', 'hasIncome', target.checked);}}/>
                                    </Box>
                                </Grid>
                             </Grid>
                            </FormGroup>
                        </FormControl></Box>
                        
                                </Grid>
                                <Grid item xs={12} sx={{display:'flex',justifyContent:'center',height:'100%',mt:-2}}>
                                <Typography fontSize={12}>
                                    {"Don't want to continue ?"}
                                    <Button sx ={{color:'black'}} onClick={handleHomeRedirect}>
                                        <Typography component="span" fontWeight="bold" fontSize={12}>
                                            Click Here
                                        </Typography>
                                    </Button> 
                                </Typography>
                            </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{mt:4}}>
                        <Grid
                                container
                                rowSpacing={4}
                                justifyContent="center"
                                sx={{display:'flex',width:isMobile?'100%':'540px'}}
                                > 
                                <Grid item xs={isMobile?12:6} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                                    <Typography fontSize={30}><Box>Related Fields</Box></Typography>
                                </Grid>
                                <Grid item xs={isMobile?12:6} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                                    <TextField
                                        label="£ Compensation "
                                        variant="outlined"
                                        value={studyObj.CompensationObject.amount}
                                        onChange={(e) => updateStudyState("CompensationObject", "amount", e.target.value)}
                                        sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9',borderRadius:1}}
                                    />
                                </Grid>
                                <Grid item xs={isMobile?12:6} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                                <TextField
                                    label="Compensation Description"
                                    variant="outlined"
                                    type="compensation description"
                                    value={studyObj.CompensationObject.description}
                                    onChange={(e) => updateStudyState("CompensationObject", "description", e.target.value)}
                                    sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9',borderRadius:1}} 
                                    inputProps={{
                                        min: 0,  
                                        max: 99,  
                                    }}
                                />
                                </Grid>
                                <Grid item xs={isMobile?12:6} sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                                <Box sx={{backgroundColor:'#DAE1E9',width:'80%'}}> 
                                <TextField
                                    label="Field Name"
                                    variant="outlined"
                                    value={extraFieldName}
                                    onChange={handleExtraFieldChange}
                                    sx={{ width: '100%', padding: 0, backgroundColor: '#DAE1E9' }}
                                    />
                                </Box>
                                </Grid>
                                
                                
                                <Grid item xs={isMobile?12:6} sx={{display:'flex',justifyContent:'center'}}><Box sx={{backgroundColor: '#DAE1E9',width:'80%',borderRadius:'5px',border:'1px solid gray'}}><Typography sx={{overflowY:'auto',height:'110px',width:'100%',ml:2,mt:1,mr:2}}>{relatedFields.join(', ')}</Typography></Box></Grid>
                                
                                <Grid item xs={isMobile ? 12 : 6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection: 'column', width: '80%' }}>
                                <Button variant='contained' onClick={handleAddExtraField} sx={{ width: '80%', height: '50px', backgroundColor: '#0B254A' }}>Add Field</Button>
                                <Button variant='contained' onClick={handleRemoveExtraField} sx={{ width: '80%', height: '50px', backgroundColor: '#0B254A', mt: 1, mb: 2 }}>Remove Field</Button>
                                </Grid>
                                <Grid item xs={12} sx={{display:'flex',justifyContent:'center',height:'100%',mt:-2}}>
                                <Typography fontSize={12}>
                                    {"Don't want to continue ?"}
                                    <Button sx ={{color:'black'}} onClick={handleHomeRedirect}>
                                        <Typography component="span" fontWeight="bold" fontSize={12}>
                                            Click Here
                                        </Typography>
                                    </Button> 
                                </Typography>
                            </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{mt:4}}>
                        <Grid
                                container
                                rowSpacing={2}
                                justifyContent="center"
                                sx={{display:'flex',width:'100%'}}
                                > 
                                <Grid item xs={12} sx={{display:'flex',justifyContent:'start',height:'100%',width:'100%'}}>
                                    <Typography fontSize={30}>Required Data</Typography>
                                </Grid>
                                <Grid item xs={12} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                                <Box sx={{backgroundColor:'#DAE1E9',width:'100%',height:'240px',overflowY:'auto',overflowX: 'hidden'}}> 
                                <FormControl component="fieldset" sx={{width:'100%',display: 'flex',justifyContent:'center'}}>
                                <FormLabel sx={{margin:2,color:'#000000'}}><Typography fontWeight={'bold'}>Demographic</Typography></FormLabel>
                                    <Box sx ={{width:"100%",display: 'flex',justifyContent:'center',}}>
                                        <Box sx ={{backgroundColor:"#1F5095",width:"100%",margin:2}}>
                                        <FormGroup
                                        aria-label="Demographic"
                                        // add on change
                                        sx={{margin:2}}
                                        >
                                           
                                            <Grid
                                            container
                                            rowSpacing={0}
                                            > 
                                            <Grid item xs={6}>
                                                <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent:'center', alignItems: 'flex-start'  }}>
                                                    <FormControlLabel checked={requirementsStatus.demoRequirements.Faculty} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}} />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Faculty</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject",'demoRequirements', target.checked,"Faculty");}}/>
                                                    <FormControlLabel checked={requirementsStatus.demoRequirements.Gender} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Gender</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject",'demoRequirements', target.checked,"Gender");}} />
                                                    <FormControlLabel checked={requirementsStatus.demoRequirements.Race} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Race</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject",'demoRequirements', target.checked,"Race");}}/>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent:'center', alignItems: 'flex-start'  }}>
                                                    <FormControlLabel checked={requirementsStatus.demoRequirements.Religion} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Religion</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject",'demoRequirements', target.checked,"Religion");}}/>
                                                    <FormControlLabel checked={requirementsStatus.demoRequirements.Income} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Income</Typography>}onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject",'demoRequirements', target.checked,"Income");}} />
                                                    <FormControlLabel checked={requirementsStatus.demoRequirements.Age} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Age</Typography>}onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject",'demoRequirements', target.checked,"Age");}} />
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent:'center', alignItems: 'flex-start'  }}>
                                                    <FormControlLabel checked={requirementsStatus.demoRequirements.Sexuality} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Sexuality</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject",'demoRequirements', target.checked,"Sexuality");}}/>
                                                    <FormControlLabel checked={requirementsStatus.demoRequirements.YearOfStudies} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Year Of Studies</Typography>}onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject",'demoRequirements', target.checked,"YearOfStudies");}} />
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent:'center', alignItems: 'flex-start'  }}>
                                                    <FormControlLabel checked={requirementsStatus.demoRequirements.Occupation} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Occupation</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject",'demoRequirements',target.checked,"Occupation");}}/>
                                                    <FormControlLabel  checked={requirementsStatus.demoRequirements.HighestLevelOfEducation} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Highest Level Of Education</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject",'demoRequirements',target.checked,"HighestLevelOfEducation");}}/>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </FormGroup>
                                    </Box>
                                </Box>
                            </FormControl>
                        <FormControl component="fieldset" sx={{width:'100%',display: 'flex',justifyContent:'center'}}>
                        <FormLabel sx={{margin:2,color:'#000000'}}><Typography fontWeight={'bold'}>Health</Typography></FormLabel>
                        <Box sx ={{width:"100%",display: 'flex',justifyContent:'center',}}>
                        <Box sx ={{backgroundColor:"#1F5095",width:"100%",margin:2}}>
                        <FormGroup
                            aria-label="Health"
                           // add on change
                            sx={{margin:2}}
                            >
                                <Grid
                                container
                                rowSpacing={0}
                                > 
                                <Grid item xs={6}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent:'center', alignItems: 'flex-start'  }} >
                                        <FormControlLabel checked={requirementsStatus.healthRequirements.PreExistingConditions} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Pre-Existing Conditions</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject","healthRequirements", target.checked,"PreExistingConditions",);}}/>
                                        <FormControlLabel checked={requirementsStatus.healthRequirements.Allergies} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Allergies</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject","healthRequirements", target.checked,"Allergies",);}}/>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent:'center', alignItems: 'flex-start'  }}>
                                        <FormControlLabel checked={requirementsStatus.healthRequirements.Medication} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Medication</Typography>}onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject","healthRequirements", target.checked,"Medication",);}} />
                                        <FormControlLabel checked={requirementsStatus.healthRequirements.Disabilities} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Disabilities</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject","healthRequirements", target.checked,"Disabilities",);}}/>
                                    </Box>
                                </Grid>
                             </Grid>
                            </FormGroup>
                            </Box>
                        </Box>
                        </FormControl>
                        
                        <FormControl component="fieldset" sx={{width:'100%',display: 'flex',justifyContent:'center'}}>
                        <FormLabel sx={{margin:2,color:'#000000'}}><Typography fontWeight={'bold'}>Other</Typography></FormLabel>
                        <Box sx ={{width:"100%",display: 'flex',justifyContent:'center',}}>
                        <Box sx ={{backgroundColor:"#1F5095",width:"100%",margin:2}}>
                        <FormGroup
                            aria-label="Other"
                           // add on change
                            sx={{margin:2}}
                            >
                                <Grid
                                container
                                rowSpacing={0}
                                > 
                                <Grid item xs={6}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent:'center', alignItems: 'flex-start'  }}>
                                        <FormControlLabel checked={requirementsStatus.techRequirements.AccessToDevice} value={false} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}} />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Access To Device</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject","techRequirements", target.checked,"AccessToDevice");}} />
                                        <FormControlLabel checked={requirementsStatus.languageRequirements.NativeLanguage} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Native Language</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject","languageRequirements", target.checked,"NativeLanguage");}}/>
                                        <FormControlLabel checked={requirementsStatus.languageRequirements.OtherLanguages} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Other Languages</Typography>}onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject","languageRequirements", target.checked,"OtherLanguages");}} />
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent:'center', alignItems: 'flex-start'  }}>
                                        <FormControlLabel checked={requirementsStatus.geographicRequirements.NearestCity} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Nearest City</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject","geographicRequirements", target.checked,"NearestCity");}}/>
                                        <FormControlLabel checked={requirementsStatus.geographicRequirements.MaxTravelTime} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Max Travel Time</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject","geographicRequirements", target.checked,"MaxTravelTime");}}/>
                                        <FormControlLabel checked={requirementsStatus.privacyRequirements.AnonymityLevel} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Anonymity Level</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject","privacyRequirements", target.checked,"AnonymityLevel");}}/>
                                        <FormControlLabel checked={requirementsStatus.accessibilityRequirements.AccessibilityRequirements} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Accessibility Requirements</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject","accessibilityRequirements", target.checked,"AccessibilityRequirements");}}/>
                                    </Box>
                                </Grid>
                                
                             </Grid>
                            </FormGroup>
                            </Box>
                            </Box>
                        </FormControl>
                        </Box>
                                </Grid>  
                                <Grid item xs={12} sx={{display:'flex',justifyContent:'center',height:'100%',mt:-2}}>
                                <Typography fontSize={12}>
                                    {"Don't want to continue ?"}
                                    <Button sx ={{color:'black'}} onClick={handleHomeRedirect}>
                                        <Typography component="span" fontWeight="bold" fontSize={12}>
                                            Click Here
                                        </Typography>
                                    </Button> 
                                </Typography>
                            </Grid>              
                            </Grid>
                        </Box>
                        <Box>
                            <Grid
                                container
                                rowSpacing={0}
                                columnSpacing={1}
                                sx={{display:'flex',justifyContent:'center',width:'100%'}}
                                > 
                                <Grid item xs={12} sx={{display:'flex',justifyContent:'start',alignItems:'center'}}>
                                    <Box sx={{display:'flex',alignItems:'center',height:'100px'}}><Typography fontSize={24}>Warning !</Typography></Box>
                                </Grid>
                                <Grid item xs={12} sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#D4DBE2'}}>
                                    <Box sx={{display:'flex',alignItems:'center',height:'100px'}}><Typography fontSize={16}>{submitError?submitError:'All data is valid.'} </Typography></Box>
                                </Grid>
                                <Grid item xs={12} sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#D4DBE2'}}>
                                    <Box sx={{display:'flex',alignItems:'center',height:'100px'}}><Typography fontSize={16}>Once you submit this resovled study the department ethics team will handle it, if approved it will be published and is not editable.</Typography></Box>
                                </Grid>
                                <Grid item xs={12} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                                <Typography fontSize={12}>
                                    {"Don't want to continue ?"}
                                    <Button sx ={{color:'black'}} onClick={handleHomeRedirect}>
                                        <Typography component="span" fontWeight="bold" fontSize={12}>
                                            Click Here
                                        </Typography>
                                    </Button> 
                                </Typography>
                            </Grid>
                            </Grid>
                        </Box>
                    </FormDialogue>
                </Grid>  
            </Grid>
        </Box>
    </>
    );
}