import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import BoxedNumber from "./FormDialogue";
import { SetStateAction, useEffect, useState } from "react";
import { useExtraInfoState,ExtraInfoState, Sexuality, Faculty, Religion, Anonymity, Gender, Race, HighestEducation } from "../State/UserExtraInfo";
import validateEmail from "../Utils/ValidateEmail";
import validatePassword from "../Utils/ValidatePassword";
import validatePhoneNumber from "../Utils/ValidatePhoneNumber";
import validateUsername from "../Utils/ValidateUsername";
import { useBankInfoState,BankInfoState } from "../State/BankInfo";
import FormDialogue from "./FormDialogue";
import {ResearcherData} from '../pages/register'

interface RegisterStudentProps {
    handleLoginRedirect:() => void;
    handleReset:() => void;
    onSubmit: (data: ResearcherData) => void;
}
export default function RegisterResearcher( {handleLoginRedirect,handleReset, onSubmit}:RegisterStudentProps){
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
    //defualt history object
    //defualt rating
    const [department, setDepartment] = useState(Faculty.NotSpecified)
    const [bankInfoObj, setBankInfoObj] = useBankInfoState();

    const handleSubmit = () => {
        const researcherData = {
            username, password, email,
            organisation, phoneNumber, 
            id, department,
            bankInfoObj
        };
        onSubmit(researcherData);
        handleLoginRedirect();
    }
    
    const handleDepartmentChange = (event: React.ChangeEvent<{ value: Faculty }>) => {
        setDepartment(event.target.value as Faculty); // Update department state with the selected value
      };

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
    
    
    
    
      
      const updateBankInfo = (category: keyof BankInfoState ,field:string, value: string | number) => {
        setBankInfoObj((prevBankInfoObj) => {
          return {
            ...prevBankInfoObj,
            [category]: {
              ...prevBankInfoObj[category],
              [field]: value,
            },
          };
        });
      };
   
    return(
        <>
        <FormDialogue width={500} height={600} currentPage={0} onFormSubmit={() => handleSubmit()} hasBorderRadius={false} canSubmit={true}>
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
                        sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9',"&  .MuiFormHelperText-root.Mui-error": {
                            backgroundColor: "#F6F6F6",
                            margin:0,
                          },}}
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
                        sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9',"&  .MuiFormHelperText-root.Mui-error": {
                            backgroundColor: "#F6F6F6",
                            margin:0,
                          },}}
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
                        sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9',"&  .MuiFormHelperText-root.Mui-error": {
                            backgroundColor: "#F6F6F6",
                            margin:0,
                          },}}
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
                        sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9',"&  .MuiFormHelperText-root.Mui-error": {
                            backgroundColor: "#F6F6F6",
                            margin:0,
                          },}}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                        <FormControl sx={{width:'80%'}}>
                            <InputLabel id="demo-simple-select-label">Faculty</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={department}
                                label="Faculty"
                                onChange={(event) => handleDepartmentChange(event as React.ChangeEvent<{ value: Faculty }>)}
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
             {/* bank details*/}
            <Grid
                    container
                    rowSpacing={4}
                    sx={{display:'flex',justifyContent:'center',width:'100%'}}
                    > 
                    <Grid item xs={12} sx={{display:'flex',justifyContent:'start',alignItems:'center',ml:5}}>
                    <Box sx={{display:'flex',alignItems:'center',height:'100px'}}><Typography fontSize={30}>Bank Details</Typography></Box>
                </Grid>
                    <Grid item xs={12} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                        <TextField
                        label="Sort Code"
                        variant="outlined"
                        value={bankInfoObj.BankDetails.SortCode}
                        onChange={(e) => updateBankInfo('BankDetails', 'SortCode', e.target.value)}
                        sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9'}}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                        <TextField
                        label="Account Number"
                        variant="outlined"
                        value={bankInfoObj.BankDetails.AccountNumber}
                        onChange={(e) => updateBankInfo('BankDetails', 'AccountNumber', e.target.value)}
                        sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9'}}
                    />   
                    </Grid>
                    <Grid item xs={12} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                        <TextField
                        label="Account Name"
                        variant="outlined"
                        value={bankInfoObj.BankDetails.AccountName}
                        onChange={(e) => updateBankInfo('BankDetails', 'AccountName', e.target.value)}
                        sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9'}}
                        />   
                    </Grid>
                    <Grid item xs={12} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                        <TextField
                        label="Provider"
                        variant="outlined"
                        value={bankInfoObj.BankDetails.Provider}
                        onChange={(e) => updateBankInfo('BankDetails', 'Provider', e.target.value)}
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