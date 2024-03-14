import React, { useEffect, useState } from 'react';
import EthicsGridComponent from '../Components/Ethics/EthicsCardGrouper';
import TriangleBackground from '../Components/TriangleBackground';
import Navbar from '../Components/navbar';
import { Box, Grid, useMediaQuery } from '@mui/material';
import SearchBar from '../Components/SearchBar';
import YourScreenComponent2 from '../Components/Ethics/shiftPage';
import '../Components/Ethics/EthicsStyle.css';
import {fetchAllEventsByDepartment}  from '../firebase/firestore';
import {addMultipleDocuments} from '../firebase/firestore';
import  {clearCollection} from '../firebase/firestore';
import {setupDatabaseListener} from '../firebase/firestore';
import SearchableList from '../Components/SearchableList';
import { useAuth } from '../Context/AuthContext';
import { getDepartmentStudies } from '../Utils/RetrieveStudyData';
import HistoryCardsStudy from '../Components/historyCardsStudy';
import { useRouter } from 'next/router';
import DisputeRow from '../Components/pDisputeRow';


interface eventDetailProps{
    publisherId:string;
    id:string;
    title:string;
    publishedDate:string;
    status:string;
    isStudy:boolean;
}
const EthicsHome: React.FC<{ testBypass1?: eventDetailProps[], testBypass2?:eventDetailProps[], testBypass3?:eventDetailProps[], testBypass4?:eventDetailProps[]}> = ({ testBypass1 = [], testBypass2 = [], testBypass3 = [], testBypass4 = []}) => {
    const {isLoggedIn,username,overallRating,id,department,accountType} = useAuth();
    const [liveStudies,setLiveStudies] = useState<eventDetailProps[]>(testBypass1);
    const [disputedStudies,setDisputedStudies] = useState<eventDetailProps[]>(testBypass2);
    const [rejectedStudies,setRejectedStudies] = useState<eventDetailProps[]>(testBypass3);
    const [waitingStudies,setWaitingStudies] = useState<eventDetailProps[]>(testBypass4);
    const fetchAllEvents = async()=>{
        try {
        const eventData = await getDepartmentStudies(department,true,true,true);
            const extractedLive:eventDetailProps[]=[];
            const extractedRejected:eventDetailProps[]=[];
            const extractedDisputed:eventDetailProps[]=[];
            const extractedWaiting:eventDetailProps[]=[];

            if(eventData)
            {
                eventData.forEach((researcherArray)=>{
                    if(researcherArray){
                        researcherArray.forEach((eventItem)=>{
                            const eventDetails:eventDetailProps ={
                                publisherId:eventItem.publisherId,
                                id:eventItem.id,
                                title:eventItem.title,
                                publishedDate:eventItem.dateOfPublish,
                                status:eventItem.hasOwnProperty('studyObj') && eventItem.studyObj !== null ? eventItem.studyObj.EthicsApprovalObject.status : eventItem.EthicsApprovalObject.status,
                                isStudy: eventItem.hasOwnProperty('studyObj') && eventItem.studyObj !== null
                            }
                            switch (eventDetails.status) {
                                case "Waiting":
                                    extractedWaiting.push(eventDetails);
                                    break;
                                case "Accept":
                                    extractedLive.push(eventDetails);
                                    break;
                                case "Rejected":
                                    extractedRejected.push(eventDetails);
                                    break;
                                case "Disputed":
                                    extractedDisputed.push(eventDetails);
                                    break;
                                default:
                                   console.log("Abnormal Status Attribute")
                                   console.log(eventDetails.status)
                                   console.log(eventDetails)
                                    break;
                            }
                        })
                    }  
                })
                setDisputedStudies(extractedDisputed);
                setLiveStudies(extractedLive);
                setRejectedStudies(extractedRejected);
                setWaitingStudies(extractedWaiting);
            }
        }catch (error){
            console.error('Error fetching department studies:', error);
        }
    }
    
    useEffect(()=>{
        fetchAllEvents();
    },[])
    const triggerGetEvents = () => {
        // Call getStudies to trigger the useEffect hook
        fetchAllEvents();
      };
    
    
    const router = useRouter();
    const handleView=(studyId:string,publisherId:string,department:string,isStudy:boolean,isAccepted:boolean)=>{
        console.log(department)
        if(isAccepted){
            if(isStudy){
                router.push(`/advertPreview?studyId=${studyId}&publisherId=${publisherId}&department=${department}&eventType=study&status=Accept`);
                return;
            }else{
                router.push(`/advertPreview?studyId=${studyId}&publisherId=${publisherId}&department=${department}&status=Accept`);
                return;
            }
        }if(isStudy){
            router.push(`/advertPreview?studyId=${studyId}&publisherId=${publisherId}&department=${department}&eventType=study`);
        }else{
            router.push(`/advertPreview?studyId=${studyId}&publisherId=${publisherId}&department=${department}`);
        }
        
        
    }
    const liveList = liveStudies.map((study,index)=>(
    <HistoryCardsStudy status={"Live"} backgroundColor={"#84C287"}key={index} textColor={"white"} studyId={study.id} title={study.title} author={study.publisherId} date={study.publishedDate} onClick={()=>handleView(study.id,study.publisherId,department,study.isStudy,true)}></HistoryCardsStudy>
    ))
    const rejectedList = rejectedStudies.map((study,index)=>(
        <HistoryCardsStudy status={"Rejected"}backgroundColor={"#D87171"} textColor={"white"}key={index} studyId={study.id} title={study.title} author={study.publisherId} date={study.publishedDate} onClick={()=>handleView(study.id,study.publisherId,department,study.isStudy,false)}></HistoryCardsStudy>
    ))
    const disputedList = disputedStudies.map((study,index)=>(

        <DisputeRow key={index} studyTitle={study.title} publisher={study.publisherId} date={study.publishedDate} studyId={study.id} buttonTitle='Resolve' department={department} publisherId={study.publisherId} buttonFunction={()=>handleView(study.id,study.publisherId,department,study.isStudy,false)}></DisputeRow>
    ))
    const waitingList = waitingStudies.map((study,index)=>(
        <DisputeRow key={index} studyTitle={study.title} publisher={study.publisherId} date={study.publishedDate} studyId={study.id} buttonTitle='View' department={department} publisherId={study.publisherId} buttonFunction={()=>handleView(study.id,study.publisherId,department,study.isStudy,false)}></DisputeRow>
    ))
    const isMedium = useMediaQuery('(max-width:1200px)')
    const isMobile = useMediaQuery('(max-width:800px)')
    return (
        <Grid container>
            <TriangleBackground />
            <Navbar name={ username ?username : 'Guest'} rating={overallRating? overallRating: 0} accountType={accountType?accountType:"Guest Type"} />
            <Grid item xs={12} md={6}>
                <SearchableList rowSpacing={0} cardInputList={[...liveList, ...rejectedList]} numberOfItemsPerRow={!isMobile&&isMedium?1:2} width={'100%'} title={'Department Studies'} titleSize={30} marginTop={0} searchBarEnabled={true} progressBarEnabled={false}>
                </SearchableList>
            </Grid>
            <Grid item xs={12} md={6}>
                <SearchableList rowSpacing={0} cardInputList={waitingList} numberOfItemsPerRow={isMobile&&isMedium?1:2} width={'100%'} title={'Review'} titleSize={30} marginTop={0} searchBarEnabled={true} progressBarEnabled={false}>
                </SearchableList>
            </Grid>
            <Grid item xs={12} md={6}>
                <SearchableList rowSpacing={0} cardInputList={disputedList} numberOfItemsPerRow={1} width={'100%'} title={'Disputed'} titleSize={30} marginTop={0} searchBarEnabled={true} progressBarEnabled={false}>
                </SearchableList>
            </Grid>
        </Grid>
    );
};

export default EthicsHome;