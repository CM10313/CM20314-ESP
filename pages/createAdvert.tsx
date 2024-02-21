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
import Navbar from '../Components/navbar';
import TriangleBackground from '../Components/TriangleBackground';
import StudyDialog from '../Components/StudyDialog';
import { EthicsData } from './register';

enum UserType{
    student = "Student",
    researcher = "Researcher",
    ethicsBoard = "Ethics Board",
    none = "null"
  }

const CreateStudy: React.FC = () => {
    const router = useRouter();
    const handleLoginRedirect=()=>{
      router.push('/login');
    }
   
    const isMobile = useMediaQuery('(max-width:1000px)')
    //need a way to go back to start of input sequence
    // ethics and professor types
    return (
        <>
       
     <Navbar name={'John Doe'} rating={4.1} />
            <TriangleBackground />
      <div style={{ height: '810px' }}>
      <StudyDialog handleLoginRedirect={function (): void {
                    throw new Error('Function not implemented.');
                } } handleReset={function (): void {
                    throw new Error('Function not implemented.');
                } } onSubmit={function (data: EthicsData): void {
                    throw new Error('Function not implemented.');
                } }></StudyDialog>
        
        </div>    
</>
        );
};

export default CreateStudy;