import { Box, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import BoxedNumber from "./FormDialogue";
import { useState } from "react";
import { useExtraInfoState,ExtraInfoState, Sexuality, Faculty, Religion, Anonymity, Gender, Race, HighestEducation } from "../State/UserExtraInfo";
import validateEmail from "../Utils/ValidateEmail";
import validatePassword from "../Utils/ValidatePassword";
import validatePhoneNumber from "../Utils/ValidatePhoneNumber";
import validateUsername from "../Utils/ValidateUsername";
import { useBankInfoState,BankInfoState } from "../State/BankInfo";

interface RegisterStudentProps {
    handleLoginRedirect:() => void;
}
export default function RegisterStudent ( {handleLoginRedirect}:RegisterStudentProps){
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
    //defualt history object
    //defualt rating
    const [extraInfoObj, setExtraInfoObj] = useExtraInfoState();
    const [bankInfoObj, setBankInfoObj] = useBankInfoState();
    
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
    
    const updateExtraInfo = (category: keyof ExtraInfoState , field: string, value: string | number | boolean|Gender|Race|Sexuality|Faculty|Religion|Anonymity|HighestEducation) => {
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
        fieldTarget: string
      ) => {
        const selectedData = event.target.value as T;
        updateExtraInfo('DemographicData', fieldTarget, selectedData);
      };
      
    
    return(
        <>
        <BoxedNumber width={500} height={600} currentPage={0} onFormSubmit={()=>handleLoginRedirect()}>
        <Box>
            {/* username and password*/}
            <Grid
                container
                rowSpacing={4}
                justifyContent="center"
                sx={{display:'flex',width:'100%'}}
                > 
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
            </Grid>
        </Box>
        <Box>
             {/* bank details*/}
            <Grid
                    container
                    rowSpacing={4}
                    sx={{display:'flex',justifyContent:'center',width:'100%'}}
                    > 
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
                    <Grid item xs={6} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                        <FormControl sx={{width:'100%'}}>
                            <InputLabel id="demo-simple-select-label">Faculty</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={extraInfoObj.DemographicData.faculty}
                                label="Faculty"
                                onChange={(event: SelectChangeEvent<Faculty>) => handleEnumChange(event, 'faculty')}
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
                                <MenuItem value={Faculty.NotSpecified}>Prefer not to say</MenuItem>
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
                                onChange={(event: SelectChangeEvent<Race>) => handleEnumChange(event, 'race')}
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
                                onChange={(event: SelectChangeEvent<Sexuality>) => handleEnumChange(event, 'sexuality')}
                                >
                                <MenuItem value={Sexuality.Asexual}></MenuItem>   
                                <MenuItem value={Sexuality.Bisexual}></MenuItem>   
                                <MenuItem value={Sexuality.Heterosexual}></MenuItem>   
                                <MenuItem value={Sexuality.Homosexual}></MenuItem>   
                                <MenuItem value={Sexuality.Other}></MenuItem>   
                                <MenuItem value={Sexuality.Pansexual}></MenuItem>   
                                <MenuItem value={Sexuality.Queer}></MenuItem>   
                                <MenuItem value={Sexuality.NotSpecified}></MenuItem>   
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
                            onChange={(event: SelectChangeEvent<Gender>) => handleEnumChange(event, 'gender')}
                            >
                            <MenuItem value={Gender.Female}>Female</MenuItem>   
                            <MenuItem value={Gender.Male}>Male</MenuItem>   
                            <MenuItem value={Gender.Other}>Other</MenuItem>  
                            <MenuItem value={Gender.NonBinary}>NonBinary</MenuItem>    
                            <MenuItem value={Gender.NotSpecified}>NotSpecified</MenuItem>   
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
                            onChange={(event: SelectChangeEvent<Religion>) => handleEnumChange(event, 'religion')}
                            >
                            <MenuItem value={Religion.Buddhist}></MenuItem>   
                            <MenuItem value={Religion.Christian}></MenuItem>   
                            <MenuItem value={Religion.Hindu}></MenuItem>   
                            <MenuItem value={Religion.Jewish}></MenuItem>   
                            <MenuItem value={Religion.Muslim}></MenuItem>   
                            <MenuItem value={Religion.None}></MenuItem>   
                            <MenuItem value={Religion.Other}></MenuItem>   
                            <MenuItem value={Religion.NotSpecified}></MenuItem>   
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
                                onChange={(event: SelectChangeEvent<HighestEducation>) => handleEnumChange(event, 'highestEducation')}
                                >
                                <MenuItem value={HighestEducation.ALevel}></MenuItem>   
                                <MenuItem value={HighestEducation.Bachelors}></MenuItem>   
                                <MenuItem value={HighestEducation.GCSE}></MenuItem>   
                                <MenuItem value={HighestEducation.IBAC}></MenuItem>   
                                <MenuItem value={HighestEducation.Masters}></MenuItem>     
                                <MenuItem value={HighestEducation.Masters}></MenuItem> 
                                <MenuItem value={HighestEducation.NotSpecified}></MenuItem>  
                                <MenuItem value={HighestEducation.PHD}></MenuItem>  
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                        <TextField
                            label="Income"
                            variant="outlined"
                            value={extraInfoObj.DemographicData.income}
                            onChange={(e) => updateExtraInfo('DemographicData', 'income', e.target.value)}
                            sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9'}}   
                        />
                    </Grid>
                    <Grid item xs={6} sx={{display:'flex',justifyContent:'center',height:'100%'}}>
                        <TextField
                            label="Age"
                            variant="outlined"
                            type="number"
                            value={extraInfoObj.DemographicData.income}
                            onChange={(e) => updateExtraInfo('DemographicData', 'income', e.target.value)}
                            sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9'}} 
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
                            sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9'}}
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
                            sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9'}}  
                        />
                    </Grid>
            </Grid>
        </Box>
        </BoxedNumber>
        </>
    );

    }