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
    department:  String;
    externalLink: String;
    maxNoParticipants:Number;
    minimumAge:Number;
    relatedFields: String[];
    studyObj:StudyState;
    publisherName:string;
  }

  const StudyCreator: React.FC<Props> = ({ jestBypass }) => {
    const {isLoggedIn,setAuth,username,overallRating,id,department,accountType} = useAuth();
  const router = useRouter();
  const handleStudySubmit= (data:StudyData,uid:String,department:String) =>{
      addSpecialDocument(`departments/${department}/Researchers/${uid}/studies`,data)
     return;
  }
 
  const handleHomeDirect =()=>{
    router.push('/researchHome');
  }
    return (
        <>
       
     <Navbar name={ username ?username : 'Guest'} rating={overallRating? overallRating: 0}  accountType={accountType?accountType:"Guest Type"}/>
            <TriangleBackground />
      <div style={{ height: '810px' }}>
        <StudyDialog onSubmit={handleStudySubmit} handleHomeRedirect={handleHomeDirect} jestBypass={jestBypass} department={department} ></StudyDialog>
        </div>    
</>
        );
};

export default StudyCreator;