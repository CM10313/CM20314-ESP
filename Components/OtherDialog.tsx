import { Box, Button, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, useMediaQuery } from "@mui/material";
import {  SetStateAction,useEffect,useState } from "react";
import { Faculty} from "../DataState/UserExtraInfo";
import FormDialogue from "./FormDialogue";
import Checkbox from '@mui/material/Checkbox';
import { useStudyState, StudyState, RequirementsObject } from "../DataState/StudyState";
import { WebinarData } from "../pages/webinarCreator";
import validateDate, { getTodayDate } from "../Utils/ValidateDate";
import validateNumberInRange from "../Utils/ValidateNumberInput";
import validateURL from "../Utils/ValidateURL";

interface WebinarDialogProps {
    onSubmit:(data: WebinarData, uid: String, department: WebinarData["department"]) => void
    handleHomeRedirect:() => void;
    jestBypass:boolean;
    uid:String;
    department:String;
    username:string;
    overallRating:number;
}

// add tests, needs
export default function OtherDialog({ onSubmit,handleHomeRedirect,jestBypass,uid,department,username,overallRating }: WebinarDialogProps) {
    const [title,setTitle] = useState("");
    const [closingDate, setClosingDate]= useState("");
    const [preliminaryDate, setPreliminaryDate] = useState("");
    const [externalLink, setExternalLink] = useState("");
    const [description, setDescription]=useState("");
    const [location, setLocation]=useState("");
    const [locationError, setLocationError]=useState("");
    const [externalLinkError, setExternalLinkError]=useState("");
    const [relatedFields, setRelatedFields] = useState<string[]>([]);
    const [extraFieldName,setExtraFieldName]= useState("");
    const [closingDateError,setClosingDateError]= useState("");
    const [preliminaryDateError,setPreliminaryDateError]= useState("");
    const [titleError,setTitleError]= useState("");
    const [descriptionError,setDescriptionError]= useState("");
    const [submitError, setSubmitError]= useState("");
    const dateOfPublish = getTodayDate();
    const EthicsApprovalObject = {
        status:"Waiting",
        rejectedById:"",
        rejectedByName:"",
        rejectionReason:"",
        changedStatus:"",
    }
    const publisherId = uid;
    const joinedParticipants:string[]= [];
    const publisherRating = overallRating;
    const publisherName = username;
        const handleStudySubmit = () => {
            const webinarData = {
               title,dateOfPublish,publisherId,publisherRating,closingDate,preliminaryDate,description,
               department,externalLink,location,relatedFields,EthicsApprovalObject,joinedParticipants,publisherName
            };
            onSubmit(webinarData,uid,webinarData.department);//needs to change to reference the current user
            //redirect
            handleHomeRedirect(); //needs to be changed to redirect based on user type but only for shared advert types
            return;
        }
        
        useEffect(()=>{
            if (!closingDateError && !preliminaryDateError && !locationError && !titleError && !descriptionError ) {
                setSubmitError("");
            } else {
                setSubmitError("You cannot submit as required fields are not fullfilled or data is in an invalid format.");
            }
        },[closingDate, preliminaryDate, titleError, descriptionError, closingDateError, preliminaryDateError, locationError])
      
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
        
            if (validateURL(externalLink)) {
            setExternalLinkError('');
            } else {
            setExternalLinkError('URLs must be of general http/https or ftp form.');
            }
        }, [externalLink]);
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
                                        label="Location"
                                        variant="outlined"
                                        value={location}
                                        error={Boolean(locationError)}
                                        helperText={locationError}
                                        onChange={handleInputChange(setLocation)}
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