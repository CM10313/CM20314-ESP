import React, { useContext, useEffect, useState } from 'react';

import Navbar from '../Components/navbar';
import TriangleBackground from '../Components/TriangleBackground';
import StudyDialog from '../Components/StudyDialog';
import { EthicsData } from './register';

import { useMediaQuery, Box } from '@mui/material';
import { StudyState } from '../DataState/StudyState';
import { Faculty } from '../DataState/UserExtraInfo';
import { addDocument, addSpecialDocument, createNestedDocument } from '../firebase/firestore';
import { useRouter } from 'next/router';
import { useAuth } from '../Context/AuthContext';

import CircularProgress from '@mui/material/CircularProgress';
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
  //const {isLoggedIn,setAuth,username,overallRating,id,department} = useAuth();
  const [department, setDepartment] = useState('');
  const [username, setUsername] = useState('');
  const [overallRating, setOverallRating] = useState();
  const [id, setId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const handleStudySubmit= (data:StudyData,uid:String,department:String) =>{
      console.log(data);
      addSpecialDocument(`departments/${department}/Researchers/${uid}/studies`,data)
     //addDocument("studies",data,"swQ90URzscZLubKOh6t8hSAXr1V2")
     return;
  }

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      const authObj = JSON.parse(storedAuth);
      const {isLoggedIn, username, overallRating, department, account_type, id} = authObj;
      setUsername(username);
      setOverallRating(overallRating);
      setDepartment(department);
      setId(id);
      
    }
    
    setIsLoading(false);
  })
 
  const handleHomeDirect =()=>{
    router.push('/researchHome');//needs to cheange based on user type
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }
    //need a way to go back to start of input sequence
    // ethics and professor types
    return (
        <>
       
     <Navbar name={ username ?username : 'Guest'} rating={overallRating? overallRating: 0}/>
            <TriangleBackground />
      <div style={{ height: '810px' }}>
        <StudyDialog onSubmit={handleStudySubmit} handleHomeRedirect={handleHomeDirect} jestBypass={jestBypass} department={department} ></StudyDialog>
        </div>    
</>
        );
};

export default StudyCreator;