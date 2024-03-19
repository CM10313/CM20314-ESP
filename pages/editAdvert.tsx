import React, { useContext, useEffect, useState } from 'react';

import Navbar from '../Components/navbar';
import TriangleBackground from '../Components/TriangleBackground';
import { RequirementsObject, StudyState } from '../DataState/StudyState';
import { Faculty } from '../DataState/UserExtraInfo';
import { addDocument, addSpecialDocument, createNestedDocument, fetchDocumentById } from '../firebase/firestore';
import { useRouter } from 'next/router';
import { useAuth } from '../Context/AuthContext';
import StudyEditDialogue from '../Components/StudyEditDialogue';
interface Props {
  jestBypass: boolean;
}
enum UserType{
    student = "Student",
    researcher = "Researcher",
    ethicsBoard = "Ethics Board",
    none = "null"
  }

  
  export interface EditableData{
    title: string;
    closingDate: string;
    preliminaryDate: string;
    location:string;
    description: string;
    maxNoParticipants:number;
    externalLink: string;
    minimumAge:number;
    diversityObject:{hasAge:boolean, hasGender:boolean,hasIncome:boolean,hasRace:boolean,hasReligion:boolean,hasSexuality:boolean}
    amount:string;
    compDescription:string;
    relatedFields: string[];
    requirements:RequirementsObject
  }
  const StudyCreator: React.FC<Props> = ({ jestBypass }) => {
    const {isLoggedIn,setAuth,username,overallRating,id,department,accountType} = useAuth();
  const router = useRouter();
  const [isStudy,setIsStudy]=useState(true);
  const [prevData,setPrevData]=useState<EditableData>();
 
 
  const handleHomeDirect =()=>{
    router.push({
        pathname: '/publishRejectionScreen',
        query: {
            studyId:studyId,
            department:department,
            ResearcherId:id,
            name:username,
        },

    })
  }
  let studyId = '';

  if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      studyId = urlParams.get('studyId') || '';
  }
  useEffect(()=>{
    fetchStudy();
  },[])
  const fetchStudy = async()=>{
    try{
        const study:any = await fetchDocumentById(`departments/${department}/Researchers/${id}/studies`,studyId)
        if(study){
           const isStudyValue= study.hasOwnProperty('studyObj') && study.studyObj !== null ?true:false;
           setIsStudy(isStudyValue);
           const prevData:EditableData={
               title: study.title,
               closingDate: study.closingDate,
               preliminaryDate: study.preliminaryDate,
               location: study.location,
               description: study.description,
               maxNoParticipants: study.maxNoParticipants,
               externalLink: study.externalLink,
               minimumAge: study.minimumAge,
               diversityObject: {
                   hasAge: study.studyObj.DiversityObject.hasAge,
                   hasGender: study.studyObj.DiversityObject.hasGender,
                   hasIncome: study.studyObj.DiversityObject.hasIncome,
                   hasRace: study.studyObj.DiversityObject.hasRace,
                   hasReligion: study.studyObj.DiversityObject.hasReligion,
                   hasSexuality:study.studyObj.DiversityObject.hasSexuality,
               },
               amount: study.studyObj.CompensationObject.amount,
               compDescription: study.studyObj.CompensationObject.description,
               relatedFields: study.relatedFields,
               requirements: study.studyObj.RequirementsObject,
           }
           setPrevData(prevData)
        }
    }catch(error){
        console.error("There was an error fetching study",error);
    }
  }
  console.log(studyId)
    return (
        <>
       
     <Navbar name={ username ?username : 'Guest'} rating={overallRating? overallRating: 0}  accountType={accountType?accountType:"Guest Type"}/>
            <TriangleBackground />
      <div style={{ height: '810px' }}>
        {isStudy&&prevData?<StudyEditDialogue handleHomeRedirect={handleHomeDirect} jestBypass={jestBypass} studyId={studyId}
        prevData={prevData} ></StudyEditDialogue>:null}
        </div>    
</>
        );
};

export default StudyCreator;