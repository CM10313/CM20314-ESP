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

interface RegisterStudentProps {
    handleLoginRedirect:() => void;
    handleReset:() => void;
}
export default function RegisterStudent ( {handleLoginRedirect,handleReset}:RegisterStudentProps){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [orginisation, setOrginisation] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneNumber, setPhoneNumber]= useState(-1);
    const [phoneNumberError, setPhoneNumberError]= useState("");
    const [id, setId]= useState(-1);
    const [extraLanguage, setExtraLanguage] = useState('');
    //defualt history object
    //defualt rating
    const [extraInfoObj, setExtraInfoObj] = useExtraInfoState();
    const [bankInfoObj, setBankInfoObj] = useBankInfoState();
    
    const handleExtraLanguageChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setExtraLanguage(e.target.value);
      };

      
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
    
    const updateExtraInfo = (category: keyof ExtraInfoState , field: string, value: string | number|string[] | boolean|Gender|Race|Sexuality|Faculty|Religion|Anonymity|HighestEducation) => {
        setExtraInfoObj((prevExtraInfoObj) => {
          return {
            ...prevExtraInfoObj,
            [category]: {
              ...prevExtraInfoObj[category],
              [field]: value,
            },
          };
        });
      };
      const handleAddLanguage = () => {
        if (extraLanguage.trim() !== '') {
          const updatedLanguages = [...extraInfoObj.LanguageData.otherLanguages, extraLanguage];
          updateExtraInfo('LanguageData', 'otherLanguages', updatedLanguages);
          setExtraLanguage('');
        }
      };
      const handleRemoveLastLanguage = () => {
        const updatedLanguages = [...extraInfoObj.LanguageData.otherLanguages];
        updatedLanguages.pop(); // Remove the last element
        updateExtraInfo('LanguageData', 'otherLanguages', updatedLanguages);
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
       
      const handleEnumChange = <T extends Faculty | Sexuality | Gender | Anonymity | Race | Religion |HighestEducation>(
        event: SelectChangeEvent<T>,
        fieldTarget: string,
        groupTarget:string,
      ) => {
        const selectedData = event.target.value as T;
        if (groupTarget === 'DemographicData' ){
            updateExtraInfo('DemographicData', fieldTarget, selectedData);
        }else{
            updateExtraInfo('PrivacyData', fieldTarget, selectedData);
        }
      };
      
    
    return(
        <>
        <FormDialogue width={500} height={600} currentPage={0} onFormSubmit={()=>handleLoginRedirect()}>
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
                        value={orginisation}
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
            {/* demographic*/}
            <Grid
                    container
                    rowSpacing={4}
                    columnSpacing={1}
                    sx={{display:'flex',justifyContent:'center',width:'100%'}}
                    > 
                    <Grid item xs={12} sx={{display:'flex',justifyContent:'start',alignItems:'center',ml:0}}>
                    <Box sx={{display:'flex',alignItems:'center',height:'100px'}}><Typography fontSize={30}>Demographics</Typography></Box>
                </Grid>
                    <Grid item xs={6} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                        <FormControl sx={{width:'100%'}}>
                            <InputLabel id="demo-simple-select-label">Faculty</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={extraInfoObj.DemographicData.faculty}
                                label="Faculty"
                                onChange={(event: SelectChangeEvent<Faculty>) => handleEnumChange(event, 'faculty','DemographicData')}
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
                    <Grid item xs={6} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                        <FormControl sx={{width:'100%'}}>
                            <InputLabel id="demo-simple-select-label">Race</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={extraInfoObj.DemographicData.race}
                                label="Race"
                                onChange={(event: SelectChangeEvent<Race>) => handleEnumChange(event, 'race','DemographicData')}
                                >
                                <MenuItem value={Race.Asian}>Asian</MenuItem> 
                                <MenuItem value={Race.Black}>Black</MenuItem>
                                <MenuItem value={Race.Hispanic}>Hispanic</MenuItem>
                                <MenuItem value={Race.NativeAmerican}>Native American</MenuItem>
                                <MenuItem value={Race.Other}>Other</MenuItem> 
                                <MenuItem value={Race.White}>White</MenuItem>  
                                <MenuItem value={Race.NotSpecified}>Prefer Not To Say </MenuItem>   
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                        <FormControl sx={{width:'100%'}}>
                            <InputLabel id="demo-simple-select-label">Sexuality</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={extraInfoObj.DemographicData.sexuality}
                                label="Sexuality"
                                onChange={(event: SelectChangeEvent<Sexuality>) => handleEnumChange(event, 'sexuality','DemographicData')}
                                >
                                <MenuItem value={Sexuality.Asexual}>Asexual</MenuItem>   
                                <MenuItem value={Sexuality.Bisexual}>Bisexual</MenuItem>   
                                <MenuItem value={Sexuality.Heterosexual}>Heterosexual</MenuItem>   
                                <MenuItem value={Sexuality.Homosexual}>Homosexual</MenuItem>   
                                <MenuItem value={Sexuality.Other}>Other</MenuItem>   
                                <MenuItem value={Sexuality.Pansexual}>Pansexual</MenuItem>   
                                <MenuItem value={Sexuality.Queer}>Queer</MenuItem>   
                                <MenuItem value={Sexuality.NotSpecified}>Prefer Not To Say</MenuItem>   
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                    <FormControl sx={{width:'100%'}}>
                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={extraInfoObj.DemographicData.gender}
                            label="Gender"
                            onChange={(event: SelectChangeEvent<Gender>) => handleEnumChange(event, 'gender','DemographicData')}
                            >
                            <MenuItem value={Gender.Female}>Female</MenuItem>   
                            <MenuItem value={Gender.Male}>Male</MenuItem>   
                            <MenuItem value={Gender.Other}>Other</MenuItem>  
                            <MenuItem value={Gender.NonBinary}>NonBinary</MenuItem>    
                            <MenuItem value={Gender.NotSpecified}>Prefer Not To Say</MenuItem>   
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={6} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                    <FormControl sx={{width:'100%'}}>
                        <InputLabel id="demo-simple-select-label">Religion</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={extraInfoObj.DemographicData.religion}
                            label="Religion"
                            onChange={(event: SelectChangeEvent<Religion>) => handleEnumChange(event, 'religion','DemographicData')}
                            >
                            <MenuItem value={Religion.Buddhist}>Buddhist</MenuItem>   
                            <MenuItem value={Religion.Christian}>Christian</MenuItem>   
                            <MenuItem value={Religion.Hindu}>Hindu</MenuItem>   
                            <MenuItem value={Religion.Jewish}>Jewish</MenuItem>   
                            <MenuItem value={Religion.Muslim}>Muslim</MenuItem>   
                            <MenuItem value={Religion.None}>None</MenuItem>   
                            <MenuItem value={Religion.Other}>Other</MenuItem>   
                            <MenuItem value={Religion.NotSpecified}>Prefer Not To Say</MenuItem>   
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={6} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                        <FormControl sx={{width:'100%'}}>
                            <InputLabel id="demo-simple-select-label">Highest Level Of Education</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={extraInfoObj.DemographicData.highestLevelOfEducation}
                                label="Highest Level Of Education"
                                onChange={(event: SelectChangeEvent<HighestEducation>) => handleEnumChange(event, 'highestLevelOfEducation','DemographicData')}
                                >
                                <MenuItem value={HighestEducation.ALevel}>A Level</MenuItem>   
                                <MenuItem value={HighestEducation.Bachelors}>Bachelors</MenuItem>   
                                <MenuItem value={HighestEducation.GCSE}>GCSE</MenuItem>   
                                <MenuItem value={HighestEducation.IBAC}>IBAC</MenuItem>   
                                <MenuItem value={HighestEducation.Masters}>Masters</MenuItem>      
                                <MenuItem value={HighestEducation.PHD}>PHD</MenuItem> 
                                <MenuItem value={HighestEducation.NotSpecified}>Prefer Not To Say</MenuItem>  
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                        <TextField
                            label="Income"
                            variant="outlined"
                            value={extraInfoObj.DemographicData.income}
                            onChange={(e) => updateExtraInfo('DemographicData', 'income', e.target.value)}
                            sx={{width:'100%',padding:0,backgroundColor:'#DAE1E9'}}   
                        />
                    </Grid>
                    <Grid item xs={6} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                        <TextField
                            label="Age"
                            variant="outlined"
                            type="number"
                            value={extraInfoObj.DemographicData.income}
                            onChange={(e) => updateExtraInfo('DemographicData', 'income', e.target.value)}
                            sx={{width:'100%',padding:0,backgroundColor:'#DAE1E9'}} 
                            inputProps={{
                                min: 18,  
                                max: 99,  
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                        <TextField
                            label="Current Year Of Studies"
                            variant="outlined"
                            type="number"
                            value={extraInfoObj.DemographicData.yearOfStudies}
                            onChange={(e) => updateExtraInfo('DemographicData', 'yearOfStudies', e.target.value)}
                            sx={{width:'100%',padding:0,backgroundColor:'#DAE1E9'}}
                            inputProps={{
                                min: 1,  // Minimum allowed value
                                max: 7,  // not sure if we need this
                            }}  
                        />
                    </Grid>
                    <Grid item xs={6} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                        <TextField
                            label="Occupation"
                            variant="outlined"
                            value={extraInfoObj.DemographicData.occupation}
                            onChange={(e) => updateExtraInfo('DemographicData', 'occupation', e.target.value)}
                            sx={{width:'100%',padding:0,backgroundColor:'#DAE1E9'}}  
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
            {/*Health */}
            <Grid
                    container
                    rowSpacing={4}
                    columnSpacing={1}
                    sx={{display:'flex',justifyContent:'center',width:'100%'}}
                    > 
                    <Grid item xs={12} sx={{display:'flex',justifyContent:'start',alignItems:'center',ml:0}}>
                    <Box sx={{display:'flex',alignItems:'center',height:'100px'}}><Typography fontSize={30}>Health</Typography></Box>
                </Grid>
                <Grid item xs={6} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                        <TextField
                            label="Pre-Exisitng Conditions"
                            variant="outlined"
                            value={extraInfoObj.HealthData.preExistingConditions}
                            multiline
                            rows={4}
                            onChange={(e) => updateExtraInfo('HealthData', 'preExistingConditions', e.target.value)}
                            sx={{width:'100%',padding:0,backgroundColor:'#DAE1E9'}}
                        />
                    </Grid>
                    <Grid item xs={6} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                        <TextField
                            label="Allergies"
                            variant="outlined"
                            value={extraInfoObj.HealthData.allergies}
                            multiline
                            rows={4}
                            onChange={(e) => updateExtraInfo('HealthData', 'allergies', e.target.value)}
                            sx={{width:'100%',padding:0,backgroundColor:'#DAE1E9'}}
                        />
                    </Grid>
                    <Grid item xs={6} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                        <TextField
                            label="Medication"
                            variant="outlined"
                            value={extraInfoObj.HealthData.medication}
                            multiline
                            rows={4}
                            onChange={(e) => updateExtraInfo('HealthData', 'medication', e.target.value)}
                            sx={{width:'100%',padding:0,backgroundColor:'#DAE1E9'}}
                        />
                    </Grid>
                    <Grid item xs={6} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                        <TextField
                            label="Disabilities"
                            variant="outlined"
                            value={extraInfoObj.HealthData.disabilities}
                            multiline
                            rows={4}
                            onChange={(e) => updateExtraInfo('HealthData', 'disabilities', e.target.value)}
                            sx={{width:'100%',padding:0,backgroundColor:'#DAE1E9'}}
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
                    rowSpacing={4}
                    columnSpacing={1}
                    sx={{display:'flex',justifyContent:'center',width:'100%'}}
                    > 
                    <Grid item xs={12} sx={{display:'flex',justifyContent:'start',alignItems:'center',ml:0}}>
                        <Box sx={{display:'flex',alignItems:'center',height:'100px'}}><Typography fontSize={30}>Tech</Typography></Box>
                    </Grid>
                    <Grid item xs={6} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                    <FormGroup>
  <FormControlLabel control={ <Checkbox
        checked={Boolean(extraInfoObj.TechnicalData.accessToDevice)}
        onChange={(e) => updateExtraInfo('TechnicalData', 'accessToDevice', Boolean(e.target.checked))}
        sx={{
          color: "#0B254A",
         
          '&.Mui-checked': {
            color: "#0B254A",
          },
        }}
      />} label={
        <Typography
          sx={{
            fontSize: '16px',
            width:'300px' 
          }}
        >
         I have a device with internet access
        </Typography>
      } />

</FormGroup>
                   
                    </Grid>
                    <Grid item xs={12} sx={{display:'flex',justifyContent:'start',alignItems:'center',ml:0}}>
                        <Box sx={{display:'flex',alignItems:'center',height:'100px'}}><Typography fontSize={30}>Languages</Typography></Box>
                    </Grid>
                    <Grid item xs={12} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                        <TextField
                            label="Native Language"
                            variant="outlined"
                            value={extraInfoObj.LanguageData.nativeLanguage}
                            onChange={(e) => updateExtraInfo('LanguageData', 'nativeLanguage', e.target.value)}
                            sx={{width:'100%',padding:0,backgroundColor:'#DAE1E9'}}
                        />
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                    <TextField
                    label="Add More Languages"
                    variant="outlined"
                    value={extraLanguage}
                    onChange={handleExtraLanguageChange}
                    sx={{ width: '100%', padding: 0, backgroundColor: '#DAE1E9' }}
                    />
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                    <Typography sx={{overflowY:'auto',height:'55px'}}>{extraInfoObj.LanguageData.otherLanguages.join(', ')}</Typography>
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                    <Button variant='contained' onClick={handleAddLanguage} sx={{width:'100%',backgroundColor:'#0B254A'}}>Add</Button>
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                <Button variant='contained' onClick={handleRemoveLastLanguage} sx={{width:'100%',backgroundColor:'#0B254A'}}>Remove Last</Button>
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
                    rowSpacing={4}
                    columnSpacing={1}
                    sx={{display:'flex',justifyContent:'center',width:'100%'}}
                    > 
                    <Grid item xs={12} sx={{display:'flex',justifyContent:'start',alignItems:'center',ml:0}}>
                        <Box sx={{display:'flex',alignItems:'center',height:'100px'}}><Typography fontSize={30}>Geographic</Typography></Box>
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                    <TextField
                    label="Your Nearest City"
                    variant="outlined"
                    value={extraInfoObj.GeographicData.nearestCity}
                    onChange={(e) => updateExtraInfo('GeographicData', 'nearestCity', e.target.value)}
                    sx={{ width: '100%', padding: 0, backgroundColor: '#DAE1E9' }}
                    />
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                    <TextField
                    label="Your Max Travel Time (Hrs)"
                    variant="outlined"
                    type='number'
                    value={extraInfoObj.GeographicData.maxTravelTime}
                    onChange={(e) => updateExtraInfo('GeographicData', 'maxTravelTime', e.target.value)}
                    sx={{ width: '100%', padding: 0, backgroundColor: '#DAE1E9' }}
                    inputProps={{
                        min:0,//in hours
                        max:24,
                    }
                    }
                    />
                </Grid>
                    <Grid item xs={12} sx={{display:'flex',justifyContent:'start',alignItems:'center',ml:0}}>
                        <Box sx={{display:'flex',alignItems:'center',height:'100px'}}><Typography fontSize={30}>Privacy</Typography></Box>
                    </Grid>
                    <Grid item xs={12} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                        <FormControl sx={{width:'100%'}}>
                            <InputLabel id="demo-simple-select-label">Level Of Anonymity</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={extraInfoObj.PrivacyData.anonymityRequired}
                                label="Level Of Anonymity"
                                onChange={(event: SelectChangeEvent<Anonymity>) => handleEnumChange(event, 'anonymityRequired','PrivacyData')}
                                >
                                <MenuItem value={Anonymity.Full}>A Full</MenuItem>   
                                <MenuItem value={Anonymity.None}>None</MenuItem>   
                                <MenuItem value={Anonymity.NotSpecified}>Prefer Not To Say</MenuItem>  
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{display:'flex',justifyContent:'start',alignItems:'center',ml:0}}>
                        <Box sx={{display:'flex',alignItems:'center',height:'100px'}}><Typography fontSize={30}>Accesibility</Typography></Box>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                    <TextField
                    label="Accessibility Requirements"
                    variant="outlined"
                    value={extraInfoObj.AccessibilityData.accessibilityRequirements}
                    onChange={(e) => updateExtraInfo('AccessibilityData', 'accessibilityRequirements', e.target.value)}
                    sx={{ width: '100%', padding: 0, backgroundColor: '#DAE1E9' }}
                    />
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