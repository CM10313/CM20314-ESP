import React, { useContext, useState } from 'react';
import Image from 'next/image';

import { TextField, Button, Grid, Typography, Box, useMediaQuery, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

import { useRouter } from 'next/router';
import BoxedNumber from '../Components/FormDialogue';
import RegisterStudent from '../Components/RegisterStudent';
enum UserType{
    student = "Student",
    professor = "Professor",
    ethicsBoard = "Ethics Board",
    none = "null"
  }

const RegisterForm: React.FC = () => {
    const [userType, setUserType] = useState<UserType>(UserType.none);
    const router = useRouter();
 
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //handle user login
    };
    const handleLoginRedirect=()=>{
    router.push('/login');
    }
    const isMobile = useMediaQuery('(max-width:1000px)')
    //need a way to go back to start of input sequence
    // ethics and professor types
    return (
        <>
        {userType == UserType.none?<FormControl component="fieldset">
        <FormLabel component="legend">User Type</FormLabel>
        <RadioGroup
          aria-label="user-type"
          name="user-type"
          value={userType}
          onChange={(e) => setUserType(e.target.value as UserType)}
        >
          <FormControlLabel value={UserType.student} control={<Radio />} label="Student" />
          <FormControlLabel value={UserType.professor} control={<Radio />} label="Professor" />
          <FormControlLabel value={UserType.ethicsBoard} control={<Radio />} label="Ethics Board" />
          <FormControlLabel value={UserType.none} control={<Radio />} label="None" />
        </RadioGroup>
      </FormControl>:null}
      {userType == UserType.student?<RegisterStudent handleLoginRedirect={handleLoginRedirect}></RegisterStudent>:null}
      
        
        
        
</>
        );
};

export default RegisterForm;