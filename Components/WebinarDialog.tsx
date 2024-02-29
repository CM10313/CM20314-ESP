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

interface WebinarDialogProps {
    onSubmit:(data: StudyData, uid: String, department: StudyData["department"]) => void
    handleHomeRedirect:() => void;
    jestBypass:boolean;
}

// add tests, needs
export default function WebinarDialog({ onSubmit,handleHomeRedirect,jestBypass }: WebinarDialogProps) {
    const [title,setTitle] = useState("");
    const [closingDate, setClosingDate]= useState("");
    const [preliminaryDate, setPreliminaryDate] = useState("");
    const [externalLink, setExternalLink] = useState("");
    const [description, setDescription]=useState("");
    const location = "Online";
    const [ department,setDepartment]=useState(Faculty.NotSpecified);
    const [relatedFields, setRelatedFields] = useState<string[]>([]);
    const [extraFieldName,setExtraFieldName]= useState("");
    const [studyObj, setStudyObj] = useStudyState();
    const [closingDateError,setClosingDateError]= useState("");
    const [preliminaryDateError,setPreliminaryDateError]= useState("");
    const [externalLinkError,setExternalLinkError]= useState("");
    const [titleError,setTitleError]= useState("");
    const [descriptionError,setDescriptionError]= useState("");
    const [submitError, setSubmitError]= useState("");
    const [facultyError, setFacultyError]= useState("");
    const dateOfPublish = getTodayDate();
    const publisherId = "swQ90URzscZLubKOh6t8hSAXr1V2"//needs to be based on current user
    const publisherRating = 4.1
        const handleStudySubmit = () => {
            const studyData = {
               title,closingDate,preliminaryDate,description,department,externalLink,
           
                relatedFields,studyObj,dateOfPublish,publisherId,publisherRating,location
            };
            onSubmit(studyData,"swQ90URzscZLubKOh6t8hSAXr1V2",studyData.department);//needs to change to reference the current user
            //redirect
            handleHomeRedirect(); //needs to be changed to redirect based on user type but only for shared advert types
            return;
        }
        
        useEffect(()=>{
            if (!closingDateError && !preliminaryDateError  && !externalLinkError && !titleError && !descriptionError ) {
                setSubmitError("");
            } else {
                setSubmitError("You cannot submit as required fields are not fullfilled or data is in an invalid format.");
            }
        },[closingDate,preliminaryDate,externalLinkError,titleError,descriptionError])
      
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
            
                if (validateURL(externalLink)&& externalLink != "") {
                setExternalLinkError('');
                } else {
                setExternalLinkError('URLs must be of general http/https or ftp form and a link is required.');
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
        
            if (department!= Faculty.NotSpecified) {
            setFacultyError('');
            } else {
            setFacultyError('A Department is Required');
            }
        }, [department]);
     
      
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
    console.log(department)
    console.log(Faculty.NotSpecified)
    
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
                            <Grid item xs={12} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%',mt:6}}>
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
                                    <Typography fontSize={30}><Box>Extra</Box></Typography>
                                </Grid>
                                <Grid item xs={isMobile?12:6} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                                <FormControl sx={{width:'80%'}}>
                        <InputLabel id="demo-simple-select-label">Faculty</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={department}
                                label="Department"
                                error={Boolean(facultyError)}
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
                            </Select>
                        </FormControl>{facultyError}
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
                                    <Box sx={{display:'flex',alignItems:'center',height:'100px'}}><Typography fontSize={16}>Once published you may edit or delete the webinar as you wish.</Typography></Box>
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