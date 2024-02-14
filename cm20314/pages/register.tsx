import React, { useContext, useState } from 'react';
import Image from 'next/image';

import { TextField, Button, Grid, Typography, Box, useMediaQuery, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

import { ExtraInfoState, Faculty } from '../State/UserExtraInfo';
import { BankInfoState } from '../State/BankInfo';


import { useRouter } from 'next/router';
import BoxedNumber from '../Components/FormDialogue';
import RegisterStudent from '../Components/RegisterStudent';
import RegisterResearcher from '../Components/RegisterResearcher';
import RegisterEthics from '../Components/RegisterEthics';

import { signUp, getUID } from '../firebase/auth';
import { addDocument } from '../firebase/firestore';

export interface StudentData {
  username: String;
  password: String;
  email: String;
  organisation: String;
  phoneNumber: Number;
  id: Number;
  extraLanguage: String;
  extraInfoObj: ExtraInfoState;
  bankInfoObj: BankInfoState;
}

export interface ResearcherData {
  username: String;
  password: String;
  email: String;
  organisation: String;
  phoneNumber: Number;
  id: Number;
  department: Faculty;
  bankInfoObj: BankInfoState;
}

export interface EthicsData {
  username: String;
  password: String;
  email: String;
  organisation: String;
  phoneNumber: Number;
  id: Number;
}

enum UserType{
    student = "Student",
    researcher = "Researcher",
    ethicsBoard = "Ethics Board",
    none = "null"
  }

const RegisterForm: React.FC = () => {
    const [userType, setUserType] = useState<UserType>(UserType.none);
    const [errorMsg, setErrorMsg] = useState('');
    const router = useRouter();

    const handleStudentSubmit = async (studentData: StudentData) => {
      try {
        let accountType = 'participant';
        await signUp(studentData.email, studentData.password);
        const {password, ...datawithoutpassword} = studentData;
        await addDocument('users', {...datawithoutpassword, accountType}, getUID());
        router.push('/researchHome')
      }
      catch (error) {
        if (error instanceof Error){
          setErrorMsg(error.message);
          console.log(error.message);
        }
        else{
          setErrorMsg('An unexpected error occurred');
          console.log('An unexpected error occurred');
        }
      }
    }

    const handleResearcherSubmit = async (researcherData: ResearcherData) => {
      try {
        let accountType = 'researcher';
        await signUp(researcherData.email, researcherData.password);
        const {password, ...datawithoutpassword} = researcherData;
        await addDocument('users', {...datawithoutpassword, accountType}, getUID());
        router.push('/researchHome');
      }
      catch (error) {
        if (error instanceof Error){
          setErrorMsg(error.message);
          console.log(error.message);
        }
        else{
          setErrorMsg('An unexpected error occurred');
          console.log('An unexpected error occurred');
        }
      }
    }

    const handleEthicsSubmit = async (ethicsData: EthicsData) => {
      try {
        let accountType = 'ethics';
        await signUp(ethicsData.email, ethicsData.password);
        const {password, ...datawithoutpassword} = ethicsData;
        await addDocument('users', {...datawithoutpassword, accountType}, getUID());
        router.push('/researchHome')
      }
      catch (error) {
        if (error instanceof Error){
          setErrorMsg(error.message);
          console.log(error.message);
        }
        else{
          setErrorMsg('An unexpected error occurred');
          console.log('An unexpected error occurred');
        }
      }
    }

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
        <Grid
                container
                rowSpacing={4}
                columnSpacing={2}
                justifyContent="center"
                sx={{display:'flex',width:'100%',height:'810px'}}
                > 
                
                {!isMobile && (
                <Grid
                    item
                    xs={4}
                    sx={{ display: 'flex', justifyContent: 'center', height: '100%', width: '100%' }}
                    >
                    <Box sx={{height:'100%',width:'500px',overflow: 'hidden'}}><Box
          sx={{
            
            height: '0px',
            width: '50vw',
            
            position: 'relative', // Set position relative for absolute positioning of the triangle
          }}
        >
          <div
            className="triangle"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: 0,
              height: 0,
              borderTop: '300px solid #0B254A', // Set the height of the triangle
              borderRight: '25vw solid transparent', // Set the base of the triangle
            }}
          ></div>
        </Box>
                    <Image
                        src="/images/studyhall.jpeg"
                        alt="Students studying"
                        width={500}
                        height={776}
                    />
                    </Box>
                    
                    </Grid>
                )}
                    {userType == UserType.none?
                    <Grid
                    item
                    xs={8}
                    sx={{ display: 'flex', justifyContent: 'center', height: '100%', width: '100%',alignItems:'center' }}
                    ><Box
                    sx={{
                      width: '500px',
                      height: '500px',
                      backgroundColor: '#F6F6F6',
                      border: '1px solid grey',
                      boxShadow: '10px 10px 10px 10px rgba(0, 0, 0, 0.5)',
                      overflow: 'hidden',
                      display: 'flex', justifyContent: 'center',
                    }}
                  >
                    <Grid
                container
                rowSpacing={0}
                columnSpacing={2}
                justifyContent="center"
                sx={{display:'flex',width:'100%'}}
                > 
                <Grid
                item
                xs={12}
                sx={{ display: 'flex', justifyContent: 'center', height: '50%', width: '100%',alignItems:'center'}}
                ><Typography fontSize={20}>Please select the type of user you would like to be</Typography></Grid>
                <Grid
                item
                xs={12}
                sx={{ display: 'flex', justifyContent: 'left', height: '50%', width: '100%',mb:2,ml:2}}
                >
                        <FormControl component="fieldset">
                            <FormLabel component="legend">User Type</FormLabel>
                            <RadioGroup
                                aria-label="user-type"
                                name="user-type"
                                value={userType}
                                onChange={(e) => setUserType(e.target.value as UserType)}
                                >
                                <FormControlLabel value={UserType.student} control={<Radio />} label="Student" />
                                <FormControlLabel value={UserType.researcher} control={<Radio />} label="Researcher" />
                                <FormControlLabel value={UserType.ethicsBoard} control={<Radio />} label="Ethics Board" />
                                <FormControlLabel value={UserType.none} control={<Radio />} label="None" />
                            </RadioGroup>
                        </FormControl>
                        </Grid>
                        </Grid>
                        </Box>
                        </Grid>
                        :null}
                {userType == UserType.student?<Grid item xs={isMobile?12:8} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                <Box sx={{display:'flex',padding:8}}><RegisterStudent handleLoginRedirect={handleLoginRedirect} handleReset={handleReset} onSubmit={handleStudentSubmit}></RegisterStudent></Box>
                </Grid>:null}
                {userType == UserType.researcher?<Grid item xs={isMobile?12:8} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                <Box sx={{display:'flex',padding:8}}><RegisterResearcher handleLoginRedirect={handleLoginRedirect} handleReset={handleReset} onSubmit={handleResearcherSubmit}></RegisterResearcher></Box>
                </Grid>:null}
                {userType == UserType.ethicsBoard?<Grid item xs={isMobile?12:8} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                <Box sx={{display:'flex',padding:8}}><RegisterEthics handleLoginRedirect={handleLoginRedirect} handleReset={handleReset} onSubmit={handleEthicsSubmit}></RegisterEthics></Box>
                </Grid>:null}
        </Grid>
      
       
        
        </div>    
</>
        );
};

export default RegisterForm;