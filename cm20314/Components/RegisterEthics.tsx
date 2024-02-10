import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import BoxedNumber from "./FormDialogue";
import { SetStateAction, useState } from "react";
import { useExtraInfoState,ExtraInfoState, Sexuality, Faculty, Religion, Anonymity, Gender, Race, HighestEducation } from "../State/UserExtraInfo";
import validateEmail from "../Utils/ValidateEmail";
import validatePassword from "../Utils/ValidatePassword";
import validatePhoneNumber from "../Utils/ValidatePhoneNumber";
import validateUsername from "../Utils/ValidateUsername";
import { useBankInfoState,BankInfoState } from "../State/BankInfo";
import FormDialogue from "./FormDialogue";
import {EthicsData} from '../pages/register'

interface RegisterStudentProps {
    handleLoginRedirect:() => void;
    handleReset:() => void;
    onSubmit: (data: EthicsData) => void;
}
export default function RegisterEthics ( {handleLoginRedirect,handleReset, onSubmit}:RegisterStudentProps){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [organisation, setOrginisation] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneNumber, setPhoneNumber]= useState(-1);
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
      
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (validateEmail(email)) {
          setEmailError("");
          return
        } else {
          setEmailError("Invalid Email")
        }
      };
      const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        if (validateUsername(username)) {
          setUsernameError("");
          return
        } else {
          setUsernameError("Invalid Username")
        }
      };
      const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (validatePassword(password)) {
          setPasswordError("");
          return
        } else {
          setPasswordError("Invalid Password")
        }
      };
      const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(Number(e.target.value));
        if (validatePhoneNumber(e.target.value)) {
          setPhoneNumberError("");
          return
        } else {
          setPhoneNumberError("Invalid Phone Number")
        }
      };
    return(
        <>
        <FormDialogue width={500} height={600} currentPage={0} onFormSubmit={()=>handleSubmit()}>
        <Box>
            {/* username and password*/}
            <Grid
                container
                rowSpacing={4}
                justifyContent="center"
                sx={{display:'flex',width:'100%'}}
                > 
                <Grid item xs={12} sx={{display:'flex',justifyContent:'start',alignItems:'center',ml:5}}>
                    <Box sx={{display:'flex',alignItems:'center',height:'100px'}}><Typography fontSize={30}>Basic Details</Typography></Box>
                </Grid>
                <Grid item xs={12} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
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
                <Grid item xs={12} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                    <TextField
                        label="Password"
                        variant="outlined"
                        value={password}
                        onChange={handlePasswordChange}
                        error={Boolean(passwordError)}
                        helperText={passwordError}
                        sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9'}}
                        />
                </Grid>
                <Grid item xs={12} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                    <Typography fontSize={12}>
                        {"Want to choose a different account type ?"}
                        <Button sx ={{color:'black'}} onClick={handleReset}>
                            <Typography component="span" fontWeight="bold" fontSize={12}>
                                Click Here
                            </Typography>
                        </Button> 
                    </Typography>
                </Grid>
            </Grid>
        </Box>
        <Box >
            {/* profile image + email and number + orginisation*/}
            <Grid
                container
                rowSpacing={4}
                justifyContent="center"
                sx={{display:'flex',width:'100%'}}
                > 
                <Grid item xs={12} sx={{display:'flex',justifyContent:'start',alignItems:'center',ml:5}}>
                    <Box sx={{display:'flex',alignItems:'center',height:'100px'}}><Typography fontSize={30}>Contact Information</Typography></Box>
                </Grid>
                    <Grid item xs={12} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                        <TextField
                        label="Orginisation"
                        variant="outlined"
                        value={organisation}
                        onChange={(e) => setOrginisation(e.target.value)}
                        sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9'}}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                        <TextField
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={handleEmailChange}
                        error={Boolean(emailError)}
                        helperText={emailError}
                        sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9'}}
                        /> 
                    </Grid>
                    <Grid item xs={12} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                        <TextField
                        label="Phone Number"
                        variant="outlined"
                        type="tel"
                        value={phoneNumber}
                        error={Boolean(passwordError)}
                        helperText={passwordError}
                        onChange={handlePhoneNumberChange}
                        sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9'}}
                        />
                    </Grid>
                    
                    <Grid item xs={12} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                    <Typography fontSize={12}>
                        {"Want to choose a different account type ?"}
                        <Button sx ={{color:'black'}} onClick={handleReset}>
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
                        <Box sx={{display:'flex',alignItems:'center',height:'100px'}}><Typography fontSize={16}>When you sumibt this form your data will be saved to our database </Typography></Box>
                    </Grid>
                    <Grid item xs={12} sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#D4DBE2'}}>
                        <Box sx={{display:'flex',alignItems:'center',height:'100px'}}><Typography fontSize={16}>You can alter your stored data or delete it at any point once you have registered</Typography></Box>
                    </Grid>
        </Grid>
        </Box>
        </FormDialogue>
        </>
    );

    }