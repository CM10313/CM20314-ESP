import { Box, Button, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, useMediaQuery } from "@mui/material";
import {  SetStateAction,useEffect,useState } from "react";
import { Faculty} from "../DataState/UserExtraInfo";
import FormDialogue from "./FormDialogue";
import Checkbox from '@mui/material/Checkbox';
import { useStudyState, StudyState, RequirementsObject } from "../DataState/StudyState";
import { StudyData } from "../pages/studyCreator";
import validateDate, { getTodayDate } from "../Utils/ValidateDate";
import validateNumberInRange from "../Utils/ValidateNumberInput";
import validateURL from "../Utils/ValidateURL";

interface StudyDialogProps {
    onSubmit:(data: StudyData, uid: String, department: StudyData["department"]) => void
    handleHomeRedirect:() => void;
    jestBypass:boolean;
}

// add tests, needs
export default function StudyDialog({ onSubmit,handleHomeRedirect,jestBypass }: StudyDialogProps) {
    const [title,setTitle] = useState("");
    const [closingDate, setClosingDate]= useState("");
    const [preliminaryDate, setPreliminaryDate] = useState("");
    const [externalLink, setExternalLink] = useState("");
    const [description, setDescription]=useState("");
    const [location, setLocation]=useState("");
    const [ department,setDepartment]=useState(Faculty.NotSpecified);
    const [relatedFields, setRelatedFields] = useState<string[]>([]);
    const [minimumAge,setMinimumAge]= useState(18);
    const [maxNoParticipants,setMaxNoParticipants]= useState(0);
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

    const dateOfPublish = getTodayDate();
    const publisherId = "swQ90URzscZLubKOh6t8hSAXr1V2"//needs to be based on current user
    const publisherRating = 4.1
        const handleStudySubmit = () => {
            const studyData = {
               title,closingDate,preliminaryDate,description,department,externalLink,
                maxNoParticipants,minimumAge,
                relatedFields,studyObj,dateOfPublish,publisherId,publisherRating,location
            };
            onSubmit(studyData,"swQ90URzscZLubKOh6t8hSAXr1V2",studyData.department);//needs to change to reference the current user
            //redirect
            handleHomeRedirect(); //needs to be changed to redirect based on user type but only for shared advert types
            return;
        }
        
        useEffect(()=>{
            if (!closingDateError && !preliminaryDateError && !maxNoError && !minimumAgeError && !externalLinkError && !titleError && !descriptionError && !locationError) {
                setSubmitError("");
            } else {
                setSubmitError("You cannot submit as required fields are not fullfilled or data is in an invalid format.");
            }
        },[closingDate,preliminaryDate,maxNoError,minimumAgeError,externalLinkError,titleError,descriptionError,locationError])
      
        type SetterFunction<T> = React.Dispatch<React.SetStateAction<T>>;

        const handleInputChange = (setter: SetterFunction<any>) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setter(e.target.value);
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
      const handleFacultyChange = <T extends Faculty >(
        event: SelectChangeEvent<T>,
      ) => {
        const selectedData = event.target.value as T;
        setDepartment(selectedData);
      };

      
      
      const handleCheckboxChange = (category: keyof StudyState, field: string, value: boolean) => {
        // Update study state object based on the provided value
        updateStudyState(category, field, value);
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
                            sx={{width:isMobile?'90%':'90%',padding:0,backgroundColor:'#DAE1E9',borderRadius:1,mt:-2,"&  .MuiFormHelperText-root.Mui-error": {
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
                                <FormControl sx={{width:'80%'}}>
                        <InputLabel id="demo-simple-select-label">Faculty</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={department}
                                label="Department"
                                sx={{width:"100%"}}
                                onChange={(event: SelectChangeEvent<Faculty>) => handleFacultyChange(event)}
                                >
                                <MenuItem value={Faculty.ArchitectureCivilEngineering}>Architecture & Civil Engineering</MenuItem>
                                <MenuItem value={Faculty.ChemicalEngineering}>Chemical Engineering</MenuItem>
                                <MenuItem value={Faculty.ElectronicElectricalEngineering}>Electronic & Electrical Engineering</MenuItem>
                                <MenuItem value={Faculty.MechanicalEngineering}>Mechanical Engineering</MenuItem>
                                <MenuItem value={Faculty.Economics}>Economics</MenuItem>
                                <MenuItem value={Faculty.Education}>Education</MenuItem>
                                <MenuItem value={Faculty.Health}>Health</MenuItem>
                                <MenuItem value={Faculty.PoliticsLanguagesInternationalStudies}>Politics, Languages & International Studies</MenuItem>
                                <MenuItem value={Faculty.Psychology}>Psychology</MenuItem>
                                <MenuItem value={Faculty.SocialPolicySciences}>Social & Policy Sciences</MenuItem>
                                <MenuItem value={Faculty.Chemistry}>Chemistry</MenuItem>
                                <MenuItem value={Faculty.ComputerScience}>Computer Science</MenuItem>
                                <MenuItem value={Faculty.LifeSciences}>Life Sciences</MenuItem>
                                <MenuItem value={Faculty.MathematicalSciences}>Mathematical Sciences</MenuItem>
                                <MenuItem value={Faculty.NaturalSciences}>Natural Sciences</MenuItem>
                                <MenuItem value={Faculty.Physics}>Physics</MenuItem>
                                <MenuItem value={Faculty.AccountingFinanceLaw}>Accounting, Finance & Law</MenuItem>
                                <MenuItem value={Faculty.MarketingBusinessSociety}>Marketing, Business & Society</MenuItem>
                                <MenuItem value={Faculty.InformationDecisionsOperations}>Information, Decisions & Operations</MenuItem>
                                <MenuItem value={Faculty.StrategyOrganisation}>Strategy & Organisation</MenuItem>
                                <MenuItem value={Faculty.NotSpecified}>Prefer Not To Say</MenuItem>
                            </Select>
                        </FormControl>
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
                                        <FormControlLabel value={true} control={<Checkbox sx={{ color: '#0B254A', '&.Mui-checked': { color: '#0B254A' }}} />} label={<Typography fontSize={15} fontWeight={"bold"}>Gender</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleCheckboxChange('DiversityObject', 'hasGender', target.checked);}} />
                                        <FormControlLabel value={true} control={<Checkbox sx={{ color: '#0B254A', '&.Mui-checked': { color: '#0B254A' }}}/>} label={<Typography fontSize={15} fontWeight={"bold"}>Race</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleCheckboxChange('DiversityObject', 'hasRace', target.checked);}} />
                                        <FormControlLabel value={true} control={<Checkbox sx={{ color: '#0B254A', '&.Mui-checked': { color: '#0B254A' }}}/>} label={<Typography fontSize={15} fontWeight={"bold"}>Religion</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleCheckboxChange('DiversityObject', 'hasReligion', target.checked);}} />
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                <Box>
                                        <FormControlLabel value={true} control={<Checkbox sx={{ color: '#0B254A', '&.Mui-checked': { color: '#0B254A' }}}/>} label={<Typography fontSize={15} fontWeight={"bold"}>Age</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleCheckboxChange('DiversityObject', 'hasAge', target.checked);}} />
                                        <FormControlLabel value={true} control={<Checkbox sx={{ color: '#0B254A', '&.Mui-checked': { color: '#0B254A' }}}/>} label={<Typography fontSize={15} fontWeight={"bold"}>Sexuality</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleCheckboxChange('DiversityObject', 'hasSexuality', target.checked);}} />
                                        <FormControlLabel value={true} control={<Checkbox sx={{ color: '#0B254A', '&.Mui-checked': { color: '#0B254A' }}}/>} label={<Typography fontSize={15} fontWeight={"bold"}>Income</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleCheckboxChange('DiversityObject', 'hasIncome', target.checked);}}/>
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
                                                    <FormControlLabel checked={studyObj.RequirementsObject.demoRequirements.includes("Faculty")} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}} />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Faculty</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject",'demoRequirements', target.checked,"Faculty");}}/>
                                                    <FormControlLabel checked={studyObj.RequirementsObject.demoRequirements.includes("Gender")} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Gender</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject",'demoRequirements', target.checked,"Gender");}} />
                                                    <FormControlLabel checked={studyObj.RequirementsObject.demoRequirements.includes("Race")} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Race</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject",'demoRequirements', target.checked,"Race");}}/>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent:'center', alignItems: 'flex-start'  }}>
                                                    <FormControlLabel checked={studyObj.RequirementsObject.demoRequirements.includes("Religion")} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Religion</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject",'demoRequirements', target.checked,"Religion");}}/>
                                                    <FormControlLabel checked={studyObj.RequirementsObject.demoRequirements.includes("Income")} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Income</Typography>}onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject",'demoRequirements', target.checked,"Income");}} />
                                                    <FormControlLabel checked={studyObj.RequirementsObject.demoRequirements.includes("Age")} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Age</Typography>}onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject",'demoRequirements', target.checked,"Age");}} />
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent:'center', alignItems: 'flex-start'  }}>
                                                    <FormControlLabel checked={studyObj.RequirementsObject.demoRequirements.includes("Sexuality")} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Sexuality</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject",'demoRequirements', target.checked,"Sexuality");}}/>
                                                    <FormControlLabel checked={studyObj.RequirementsObject.demoRequirements.includes("YearOfStudies")} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Year Of Studies</Typography>}onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject",'demoRequirements', target.checked,"YearOfStudies");}} />
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent:'center', alignItems: 'flex-start'  }}>
                                                    <FormControlLabel checked={studyObj.RequirementsObject.demoRequirements.includes("Occupation")} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Occupation</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject",'demoRequirements',target.checked,"Occupation");}}/>
                                                    <FormControlLabel  checked={studyObj.RequirementsObject.demoRequirements.includes("HighestLevelOfEducation")} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Highest Level Of Education</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject",'demoRequirements',target.checked,"HighestLevelOfEducation");}}/>
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
                                        <FormControlLabel checked={studyObj.RequirementsObject.healthRequirements.includes("PreExistingConditions")} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Pre-Existing Conditions</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject","healthRequirements", target.checked,"PreExistingConditions",);}}/>
                                        <FormControlLabel checked={studyObj.RequirementsObject.healthRequirements.includes("Allergies")} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Allergies</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject","healthRequirements", target.checked,"Allergies",);}}/>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent:'center', alignItems: 'flex-start'  }}>
                                        <FormControlLabel checked={studyObj.RequirementsObject.healthRequirements.includes("Medication")} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Medication</Typography>}onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject","healthRequirements", target.checked,"Medication",);}} />
                                        <FormControlLabel checked={studyObj.RequirementsObject.healthRequirements.includes("Disabilities")} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Disabilities</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject","healthRequirements", target.checked,"Disabilities",);}}/>
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
                                        <FormControlLabel checked={studyObj.RequirementsObject.techRequirements.includes("AccessToDevice")} value={false} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}} />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Access To Device</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject","techRequirements", target.checked,"AccessToDevice");}} />
                                        <FormControlLabel checked={studyObj.RequirementsObject.languageRequirements.includes("NativeLanguage")} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Native Language</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject","languageRequirements", target.checked,"NativeLanguage");}}/>
                                        <FormControlLabel checked={studyObj.RequirementsObject.languageRequirements.includes("OtherLanguages")} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Other Languages</Typography>}onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject","languageRequirements", target.checked,"OtherLanguages");}} />
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent:'center', alignItems: 'flex-start'  }}>
                                        <FormControlLabel checked={studyObj.RequirementsObject.geographicRequirements.includes("NearestCity")} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Nearest City</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject","geographicRequirements", target.checked,"NearestCity");}}/>
                                        <FormControlLabel checked={studyObj.RequirementsObject.geographicRequirements.includes("MaxTravelTime")} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Max Travel Time</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject","geographicRequirements", target.checked,"MaxTravelTime");}}/>
                                        <FormControlLabel checked={studyObj.RequirementsObject.privacyRequirements.includes("AnonymityLevel")} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Anonymity Level</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject","privacyRequirements", target.checked,"AnonymityLevel");}}/>
                                        <FormControlLabel checked={studyObj.RequirementsObject.accesibilityRequirements.includes("AccesibilityRequirements")} value={true} control={<Checkbox sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' }}}  />} label={<Typography fontSize={15} fontWeight={"bold"} sx={{color:'#FFFFFF'}}>Accesibility Requirements</Typography>} onChange={(e) => { const target = e.target as HTMLInputElement; handleGroupedCheckBox("RequirementsObject","accesibilityRequirements", target.checked,"AccesibilityRequirements");}}/>
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
                                    <Box sx={{display:'flex',alignItems:'center',height:'100px'}}><Typography fontSize={16}>Once published you may edit or delete the study as you wish until participants are registered, at which point the study is fixed.</Typography></Box>
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