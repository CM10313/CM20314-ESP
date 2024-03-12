import {Box, Grid, useMediaQuery} from "@mui/material";
import TriangleBackground from "../Components/TriangleBackground";
import HorizontalBarGraph, { HorizontalBarGraphProps } from "../Components/horizontalBarGraph";
import DonughtChart, { DonughtGraphProps } from "../Components/donughtChart";
import BarGraph, { BarGraphProps } from "../Components/barGraphs";
import Navbar from "../Components/navbar";
import OverallDiversityScore from "../Components/diversityScore";
import { useAuth } from "../Context/AuthContext";
import { fetchDocumentById} from "../firebase/firestore";
import { useEffect, useState } from "react";
import fillAgeDict, { fillDict, fillIncomeDict } from "../Utils/diversityExtraction";


 const DiversityView: React.FC<{ testBypass1?: BarGraphProps, testBypass2?: HorizontalBarGraphProps,testBypass3?:DonughtGraphProps }> = ({ testBypass1={} as BarGraphProps, testBypass2 ={} as HorizontalBarGraphProps,testBypass3 ={} as DonughtGraphProps })  => {
    const {isLoggedIn,username,overallRating,id,department,accountType} = useAuth();
    const isMobile = useMediaQuery('(max-width:1000px)')
    const [incomeProps, setIncomeProps]=useState<BarGraphProps>(testBypass1);
    const [ageProps,setAgeProps]=useState<BarGraphProps>(testBypass1);
    const [raceProps, setRaceProps]=useState<HorizontalBarGraphProps>(testBypass2);
    const [religionProps, setReligionProps]=useState<HorizontalBarGraphProps>(testBypass2);
    const [sexualityProps,setSexualityProps]=useState<DonughtGraphProps>(testBypass3);
    const [genderProps, setGenderProps]=useState<DonughtGraphProps>(testBypass3);
    let studyId = '';

    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        studyId = urlParams.get('studyId') || '';
    }

    type diversitySelectionType={
        hasAge:boolean;
        hasGender:boolean;
        hasIncome:boolean;
        hasRace:boolean;
        hasReligion:boolean;
        hasSexuality:boolean;
    }
    useEffect(()=>{
    const fetchStudyData = async ()=>{
        try{
            const studyData:any= await fetchDocumentById(`departments/${department}/Researchers/${id}/studies`,studyId);
            const joinedParticipants = studyData.studyObj.joinedParticipants;
            const diversitySelection:diversitySelectionType = studyData.studyObj.DiversityObject;
            const raceArray:string[] = [];
            let ageArray:string[] = [];
            const incomeArray:string[] = [];
            const religionArray:string[] = [];
            const genderArray:string[] = [];
            const sexualityArray:string[] =[];
            const promises = joinedParticipants.map(async (participant: any) => {
                const userData: any = await fetchDocumentById("users", participant);
                raceArray.push(userData.extraInfoObj.DemographicData.race);
                ageArray.push(userData.extraInfoObj.DemographicData.age);
                incomeArray.push(userData.extraInfoObj.DemographicData.income);
                religionArray.push(userData.extraInfoObj.DemographicData.religion);
                genderArray.push(userData.extraInfoObj.DemographicData.gender);
                sexualityArray.push(userData.extraInfoObj.DemographicData.sexuality);
            });
            
            // Wait for all promises to resolve
            await Promise.all(promises);
            extractAge(ageArray,diversitySelection);
            extractGender(genderArray,diversitySelection);
            extractIncome(incomeArray,diversitySelection);
            extractRace(raceArray,diversitySelection);
            extractSexuality(sexualityArray,diversitySelection);
            extractReligion(religionArray,diversitySelection);
            
        }catch (error){
    console.error(error)
        }
      }
     fetchStudyData();
    },[])
    
    const extractAge = (ageArray: string[], diversitySelection:diversitySelectionType) => {
        
        const ageDict = fillAgeDict(ageArray);
        const ageObj = {
            graphData:{
                yAxisLabels: Object.values(ageDict),
                xAxisLabels: [
                    "18-20",
                    "21-25",
                    "26-30",
                    "31-40",
                    "41-45",
                    "46-50",
                    "50+"
                ],
                title: "Age",
                studyId: studyId,
                hasData: diversitySelection.hasAge,
            }
        };
        setAgeProps(ageObj); // Assuming setAgeProps is a function that sets age properties
    };
    
    const extractIncome =(incomeArray:string[], diversitySelection:diversitySelectionType)=>{
        const incomeDict = fillIncomeDict(incomeArray);
        const incomeObj = {
            graphData:{
                yAxisLabels: Object.values(incomeDict),
                xAxisLabels : [
                    "0 - 10k",
                    "11 - 15k",
                    "16 - 20k",
                    "21 - 25k", 
                    "25 - 30k", 
                    "30k +"
                    ],
                title: "Income",
                studyId: studyId,
                hasData: diversitySelection.hasIncome,
            }
        };
    
        setIncomeProps(incomeObj);
    }
    const extractRace =(raceArray:string[], diversitySelection:diversitySelectionType)=>{
       const raceDict = fillDict(raceArray);
    const xAxisLabels = Object.keys(raceDict);
    const yAxisLabels = Object.values(raceDict);

    const raceObj = {
        graphData:{
            yAxisLabels: yAxisLabels,
            xAxisLabels: xAxisLabels,
            title: "Race",
            studyId: studyId, // Assuming studyId is defined somewhere
            hasData: diversitySelection.hasRace,
        }
    };

     setRaceProps(raceObj);
    }
    const extractGender =(genderArray:string[], diversitySelection:diversitySelectionType)=>{
        const genderDict = fillDict(genderArray);
        const xAxisLabels = Object.keys(genderDict);
       const yAxisLabels = Object.values(genderDict);
       const genderObj = {
        graphData:{
            yAxisLabels: yAxisLabels,
            xAxisLabels: xAxisLabels,
            title: "Gender",
            studyId: studyId, // Assuming studyId is defined somewhere
            hasData: diversitySelection.hasGender,
        }
    };
    setGenderProps(genderObj);
    }
    const extractSexuality =(sexualityArray:string[], diversitySelection:diversitySelectionType)=>{
        const sexualityDict = fillDict(sexualityArray);
        const xAxisLabels = Object.keys(sexualityDict);
       const yAxisLabels = Object.values(sexualityDict);
       const sexualityObj = {
        graphData:{
            yAxisLabels: yAxisLabels,
            xAxisLabels: xAxisLabels,
            title: "Sexuality",
            studyId: studyId, // Assuming studyId is defined somewhere
            hasData: diversitySelection.hasSexuality,
        }
    };
    setSexualityProps(sexualityObj);
    }
    const extractReligion =(religionArray:string[], diversitySelection:diversitySelectionType)=>{
       const religionDict = fillDict(religionArray);
       const xAxisLabels = Object.keys(religionDict);
       const yAxisLabels = Object.values(religionDict);
       const religionObj = {
        graphData:{
            yAxisLabels: yAxisLabels,
            xAxisLabels: xAxisLabels,
            title: "Religion",
            studyId: studyId, // Assuming studyId is defined somewhere
            hasData: diversitySelection.hasReligion,
        }
    };

     setReligionProps(religionObj);
    }

    return (
        <Box sx={{height:'810px',width:'100%'}}> 
            <Navbar name={ username ?username : 'Guest'} rating={overallRating? overallRating: 0} accountType={accountType?accountType:"Guest Type"}/>
            <TriangleBackground />
            <Grid container sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                <Grid item xs={isMobile?12:4}  sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                    <Grid container sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%',ml:isMobile?0:8}}>
                        <Grid item xs={12} sx={{display:'flex',justifyContent:'center',width:'100%',mt:8}}>
                            <BarGraph graphData={incomeProps.graphData} />
                        </Grid>
                        <Grid item xs={12} sx={{display:'flex',justifyContent:'center',width:'100%',mb:isMobile?0:8}}>
                            <BarGraph graphData={ageProps.graphData} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={isMobile?12:4}  sx={{display:'flex',justifyContent:'center',width:'100%'}}>
                    <Grid container sx={{display:'flex',justifyContent:'center',width:'100%'}}>
                        <Grid item xs={12} sx={{display:'flex',justifyContent:'center',width:'100%',mt:isMobile?0:8}}>
                        <OverallDiversityScore id={studyId} />
                        </Grid>
                        <Grid item xs={12} sx={{display:'flex',justifyContent:'center',width:'100%',mt:isMobile?8:0}}>
                        <HorizontalBarGraph graphData={raceProps.graphData} />
                        </Grid>
                        <Grid item xs={12} sx={{display:'flex',justifyContent:'center',width:'100%',mb:isMobile?6:9,mt:isMobile?8:0}}>
                        <HorizontalBarGraph graphData={religionProps.graphData} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={isMobile?12:4} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                    <Grid container sx={{display:'flex',justifyContent:'center',width:'100%'}}>
                        <Grid item xs={12} sx={{display:'flex',justifyContent:'center',width:'100%',mt:isMobile?8:8}}>
                        <DonughtChart graphData = {sexualityProps.graphData} />
                        </Grid>
                        <Grid item xs={12} sx={{display:'flex',justifyContent:'center',width:'100%',mb:isMobile?0:8}}>
                        <DonughtChart graphData = {genderProps.graphData} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )

}
export default DiversityView;