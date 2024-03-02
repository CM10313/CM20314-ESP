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
import WebinarDialog from '../Components/WebinarDialog';
interface Props {
  jestBypass: boolean;
}
enum UserType{
    student = "Student",
    researcher = "Researcher",
    ethicsBoard = "Ethics Board",
    none = "null"
  }

  export interface WebinarData {
    title: String;
    dateOfPublish:String;
    publisherId:String;
    publisherRating:Number;
    closingDate: String;
    preliminaryDate: String;
    description: String;
    department:  String;
    externalLink: String;
    location:String;
    relatedFields: String[];
    EthicsApprovalObject:{
        status:String;
        rejectedById:String;
        rejectedByName:String;
        rejectionReason:String;
      },
    joinedParticipants: string[],
  }

  const WebinarCreator: React.FC<Props> = ({ jestBypass }) => {
    const {isLoggedIn,setAuth,username,overallRating,id,department} = useAuth();
  const router = useRouter();
  const handleStudySubmit= (data:WebinarData,uid:String,department:String) =>{
      console.log(data);
      addSpecialDocument(`departments/${department}/Researchers/${uid}/webinars`,data)
     //addDocument("studies",data,"swQ90URzscZLubKOh6t8hSAXr1V2")
     return;
  }
 
  const handleHomeDirect =()=>{
    router.push('/researchHome');//needs to change based on user type
  }

    //need a way to go back to start of input sequence
    // ethics and professor types
    return (
        <>
       
     <Navbar  name={username ?username : 'Guest'} rating={overallRating? overallRating:-1}  />
            <TriangleBackground />
      <div style={{ height: '810px' }}>
        <WebinarDialog onSubmit={handleStudySubmit} handleHomeRedirect={handleHomeDirect} jestBypass={jestBypass} uid={id} department={department}></WebinarDialog>
        </div>    
</>
        );
};

export default WebinarCreator;