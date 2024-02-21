import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography, useMediaQuery } from "@mui/material";
import BoxedNumber from "./FormDialogue";
import { SetStateAction, useEffect, useState } from "react";
import { useExtraInfoState,ExtraInfoState, Sexuality, Faculty, Religion, Anonymity, Gender, Race, HighestEducation } from "../State/UserExtraInfo";
import validateEmail from "../Utils/ValidateEmail";
import validatePassword from "../Utils/ValidatePassword";
import validatePhoneNumber from "../Utils/ValidatePhoneNumber";
import validateUsername from "../Utils/ValidateUsername";
import { useBankInfoState,BankInfoState } from "../State/BankInfo";
import FormDialogue from "./FormDialogue";
import {EthicsData} from '../pages/register'

interface StudyDialogProps {
    handleLoginRedirect:() => void;
    handleReset:() => void;
    onSubmit: (data: EthicsData) => void;
}
export default function StudyDialog({ handleLoginRedirect, handleReset, onSubmit }: StudyDialogProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [organisation, setOrginisation] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneNumber, setPhoneNumber]= useState("");
    const [phoneNumberError, setPhoneNumberError]= useState("");
    const [id, setId]= useState(-1);

        const handleSubmit = () => {
            const ethicsData = {
                username, password, email,
                organisation, phoneNumber, 
                id
            };
            onSubmit(ethicsData);
            handleLoginRedirect();
        }
      useEffect(() => {
        // Validate the password whenever it changes
          if (validatePassword(password)) {
            setPasswordError('');
          } else {
            setPasswordError('Invalid Password');
          }
      }, [password]);
      useEffect(() => {
        // Validate the password whenever it changes
          if (validateEmail(email)) {
            setEmailError('');
          } else {
            setEmailError('Invalid Email');
          }
      }, [email]);
      useEffect(() => {
        // Validate the password whenever it changes
          if (validateUsername(username)) {
            setUsernameError('');
          } else {
            setUsernameError('Invalid Username');
          }
      }, [username]);
      useEffect(() => {
        // Validate the password whenever it changes
          if (validatePhoneNumber(phoneNumber)) {
            setPhoneNumberError('');
          } else {
            setPhoneNumberError('Invalid Phone Number');
          }
      }, [phoneNumber]);
    
    
      const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
      };
      const handleEmailChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
      };
      const handleUsernameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
      };
      const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
      };

    const isMobile = useMediaQuery('(max-width:1000px)');

    return (
        <>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 10 }}>
            <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center', rowGap: 0 }}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <FormDialogue width={770} height={540} currentPage={0} onFormSubmit={() => handleSubmit()} hasBorderRadius={true}>
                        <Box sx={{width:'100%',height:'100%',mt:4}}>
                            <Grid
                                container
                                rowSpacing={4}
                                justifyContent="center"
                                sx={{display:'flex',backgroundColor:'red',width:isMobile?'100%':'540px'}}
                                > 
                                <Grid item xs={isMobile?12:6} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                                    <TextField
                                        label="Username"
                                        variant="outlined"
                                        value={username}
                                        onChange={handleUsernameChange}
                                        error={Boolean(usernameError)}
                                        helperText={usernameError}
                                        sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9'}}
                                    />
                                </Grid>
                                <Grid item xs={isMobile?12:6} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                                    <TextField
                                        label="Username"
                                        variant="outlined"
                                        value={username}
                                        onChange={handleUsernameChange}
                                        error={Boolean(usernameError)}
                                        helperText={usernameError}
                                        sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9'}}
                                    />
                                </Grid>
                                <Grid item xs={isMobile?12:6} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                                    
                                </Grid>
                                <Grid item xs={isMobile?12:6} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                                    <TextField
                                        label="Username"
                                        variant="outlined"
                                        value={username}
                                        onChange={handleUsernameChange}
                                        error={Boolean(usernameError)}
                                        helperText={usernameError}
                                        sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9'}}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                                <TextField
                            label="Pre-Exisitng Conditions"
                            variant="outlined"
                            value={username}
                            multiline
                            rows={3}
                            onChange={handleUsernameChange}
                            sx={{width:'100%',padding:0,backgroundColor:'#DAE1E9'}}
                        />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{mt:4}}>
                        <Grid
                                container
                                rowSpacing={4}
                                justifyContent="center"
                                sx={{display:'flex',backgroundColor:'red',width:isMobile?'100%':'540px'}}
                                > 
                                <Grid item xs={isMobile?12:6} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                                    <Typography fontSize={30}><Box>Diversity Rules</Box></Typography>
                                </Grid>
                                <Grid item xs={isMobile?12:6} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                                    <TextField
                                        label="Username"
                                        variant="outlined"
                                        value={username}
                                        onChange={handleUsernameChange}
                                        error={Boolean(usernameError)}
                                        helperText={usernameError}
                                        sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9'}}
                                    />
                                </Grid>
                                <Grid item xs={isMobile?12:6} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                                <Box sx={{backgroundColor:'#DAE1E9'}}> <FormControl component="fieldset">
                            <FormLabel component="legend">User Type</FormLabel>
                            <RadioGroup
                                aria-label="user-type"
                                name="user-type"
                                value={username}
                                onChange={handleEmailChange}
                                >
                                <FormControlLabel value={true} control={<Radio />} label="Student" />
                                <FormControlLabel value={true} control={<Radio />} label="Researcher" />
                                <FormControlLabel value={true} control={<Radio />} label="Ethics Board" />
                                <FormControlLabel value={true} control={<Radio />} label="None" />
                            </RadioGroup>
                        </FormControl></Box>
                                </Grid>
                                <Grid item xs={isMobile?12:6} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                                    <TextField
                                        label="Username"
                                        variant="outlined"
                                        value={username}
                                        onChange={handleUsernameChange}
                                        error={Boolean(usernameError)}
                                        helperText={usernameError}
                                        sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9'}}
                                    />
                                </Grid>
                                <Grid item xs={isMobile?12:6} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                                <Box sx={{backgroundColor:'#DAE1E9',borderRadius:'5px',width:'200px',height:'100px',padding:'5px'}}><Typography fontSize={15}>Any selected diversity rules will be visible in your history, once participants join the study.</Typography> </Box>
                                </Grid>
                                <Grid item xs={isMobile?12:6} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                                <TextField
                            label="Age"
                            variant="outlined"
                            type="number"
                            value={username}
                            onChange={handleUsernameChange}
                            sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9'}} 
                            inputProps={{
                                min: 18,  
                                max: 99,  
                            }}
                        />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box>

                        </Box>
                    </FormDialogue>
                    <Box sx={{ height: '542px', width: '245px', backgroundColor: '#1F5095', borderRadius: '0px 5px 5px 0px',boxShadow: '10px 10px 10px 10px rgba(0, 0, 0, 0.5)',}}></Box>
                </Grid>
                
            </Grid>
        </Box>
    </>
    );

}
