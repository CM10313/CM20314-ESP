import React, { useContext, useEffect, useState } from 'react';

import Navbar from '../Components/navbar';
import TriangleBackground from '../Components/TriangleBackground';
import StudyDialog from '../Components/StudyDialog';
import { EthicsData } from './register';
import { useRouter } from '../Utils/router';
import { useMediaQuery } from '@mui/material';
import { StudyState } from '../State/StudyState';
import { Faculty } from '../State/UserExtraInfo';
import { addDocument, createNestedDocument } from '../firebase/firestore';

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
  const handleStudySubmit= (data:StudyData,uid:String) =>{
      console.log(data);
      createNestedDocument("studies",`${uid}-studies`,data,uid)
      //addDocument("studies",data,"swQ90URzscZLubKOh6t8hSAXr1V2")
      return;
  }


const CreateStudy: React.FC = () => {
    
    const [advertType,setAdvertType] = useState("");
    useEffect(() => {
      const currentPageUrl = window.location.href;
      const urlObj = new URL(currentPageUrl);
      const type = urlObj.searchParams.get('type');
      if (type !== null) {
         setAdvertType(type);
      }
  }, []);
    //need a way to go back to start of input sequence
    // ethics and professor types
    return (
        <>
       
     <Navbar name={'John Doe'} rating={4.1} />
            <TriangleBackground />
      <div style={{ height: '810px' }}>
      {advertType == 'Study'?  <StudyDialog onSubmit={handleStudySubmit}></StudyDialog>: null}
        </div>    
</>
        );
};

export default CreateStudy;