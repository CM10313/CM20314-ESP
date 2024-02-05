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
    const handleReset=()=>{
        setUserType(UserType.none);
    }
    const isMobile = useMediaQuery('(max-width:1000px)')
    //need a way to go back to start of input sequence
    // ethics and professor types
    return (
        <>
       <div
      style={{
       height:'810px',
        background: 'linear-gradient(to right, #FFFFFF, #9F9F9F)'
      }}
    >
        {userType == UserType.none?
            <FormControl component="fieldset">
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
            </FormControl>
        :null}
        <Grid
                container
                rowSpacing={4}
                columnSpacing={2}
                justifyContent="center"
                sx={{display:'flex',width:'100%'}}
                > 
                
                {!isMobile && (
                <Grid
                    item
                    xs={4}
                    sx={{ display: 'flex', justifyContent: 'center', height: '100%', width: '100%' }}
                    >
                    <Box sx={{height:'100%',width:'500px',overflow: 'hidden'}}>
                    <Image
                        src="/images/studyhall.jpeg"
                        alt="Students studying"
                        width={500}
                        height={776}
                    />
                    </Box>
                    </Grid>
                )}
                <Grid item xs={isMobile?12:8} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                {userType == UserType.student?<Box sx={{display:'flex',padding:8}}><RegisterStudent handleLoginRedirect={handleLoginRedirect} handleReset={handleReset}></RegisterStudent></Box>:null}
                </Grid>
        </Grid>
      
       
        
        </div>    
</>
        );
};

export default RegisterForm;