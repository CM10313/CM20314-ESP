import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import BoxedNumber from "./FormDialogue";
import { useState } from "react";
import { useExtraInfoState,ExtraInfoState, Sexuality, Faculty, Religion, Anonymity, Gender, Race, HighestEducation } from "../State/UserExtraInfo";

interface RegisterStudentProps {
    handleLoginRedirect:() => void;
}
export default function RegisterStudent ( {handleLoginRedirect}:RegisterStudentProps){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneNumber, setPhoneNumber]= useState(-1);
    const [id, setId]= useState(-1);
    //defualt history object
    //defualt rating
    //import bank accoint obj ?
    const [extraInfoObj, setExtraInfoObj] = useExtraInfoState();
    
    
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
    
      const handleEnumChange = <T extends Faculty | Sexuality | Gender | Anonymity | Race | Religion |HighestEducation>(
        event: SelectChangeEvent<T>,
        fieldTarget: string
      ) => {
        const selectedData = event.target.value as T;
        updateExtraInfo('DemographicData', fieldTarget, selectedData);
      };
      
    
    return(
        <>
        <BoxedNumber width={300} height={400} currentPage={0} onFormSubmit={()=>handleLoginRedirect()}>
        <Box><TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={Boolean(usernameError)}
        helperText={usernameError}
        sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9'}}
        />
        <TextField
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(passwordError)}
                helperText={passwordError}
                sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9'}}
                
            />
        </Box>
        <Box>
            {/* profile image, orginisation*/}
        </Box>
        <Box>
            {/* bank details*/}
        </Box>
        <Box>
            {/* demographic*/}
            <FormControl>
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
        <FormControl>
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
        <FormControl>
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
        <FormControl>
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
        <FormControl>
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
        <TextField
                label="Income"
                variant="outlined"
                value={extraInfoObj.DemographicData.income}
                onChange={(e) => updateExtraInfo('DemographicData', 'income', e.target.value)}
                sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9'}}   
            />
        <TextField
                label="Age"
                variant="outlined"
                type="number"
                value={extraInfoObj.DemographicData.income}
                onChange={(e) => updateExtraInfo('DemographicData', 'income', e.target.value)}
                sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9'}} 
                inputProps={{
                    min: 18,  // Minimum allowed value
                    max: 99,  // Maximum allowed value
                  }}
            />
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
        <TextField
                label="Occupation"
                variant="outlined"
                value={extraInfoObj.DemographicData.occupation}
                onChange={(e) => updateExtraInfo('DemographicData', 'occupation', e.target.value)}
                sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9'}}  
            />
        <FormControl>
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
        </Box>
        </BoxedNumber>
        </>
    );

    }