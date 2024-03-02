import React, { useContext, useEffect, useState } from 'react';

import Navbar from '../Components/navbar';
import TriangleBackground from '../Components/TriangleBackground';
import StudyDialog from '../Components/StudyDialog';
import { EthicsData } from './register';

import { useMediaQuery } from '@mui/material';
import { StudyState } from '../DataState/StudyState';
import { Faculty } from '../DataState/UserExtraInfo';
import { addDocument, addSpecialDocument, createNestedDocument } from '../firebase/firestore';
import { useRouter } from 'next/router';
import { useAuth } from '../Context/AuthContext';
import OtherDialog from '../Components/OtherDialog';
import { WebinarData } from './webinarCreator';
interface Props {
  jestBypass: boolean;
}
enum UserType{
    student = "Student",
    researcher = "Researcher",
    ethicsBoard = "Ethics Board",
    none = "null"
  }

  export interface StudyData {
    title: String;
    dateOfPublish:String;
    publisherId:String;
    publisherRating:Number;
    closingDate: String;
    preliminaryDate: String;
    description: String;
    department:  Faculty;
    externalLink: String;
    maxNoParticipants:Number;
    minimumAge:Number;
    relatedFields: String[];
    studyObj:StudyState;
  }

  const OtherCreator: React.FC<Props> = ({ jestBypass }) => {
    const {isLoggedIn,setAuth,username,overallRating,id,department} = useAuth();
  const router = useRouter();
  const handleStudySubmit= (data:WebinarData,uid:String,department:String) =>{
      console.log(data);
      addSpecialDocument(`departments/${department}/Researchers/${uid}/events`,data)
     //addDocument("studies",data,"swQ90URzscZLubKOh6t8hSAXr1V2")
     return;
  }
 
  const handleHomeDirect =()=>{
    router.push('/researchHome');//needs to cheange based on user type
  }

    //need a way to go back to start of input sequence
    // ethics and professor types
    return (
        <>
       
     <Navbar/>
            <TriangleBackground />
      <div style={{ height: '810px' }}>
        <OtherDialog onSubmit={handleStudySubmit} handleHomeRedirect={handleHomeDirect} jestBypass={jestBypass} uid={id} department={department} ></OtherDialog>
        </div>    
</>
        );
};

export default OtherCreator;