import {Box, Grid, useMediaQuery} from "@mui/material";
import TriangleBackground from "../Components/TriangleBackground";
import HorizontalBarGraph, { HorizontalBarGraphProps } from "../Components/horizontalBarGraph";
import DonughtChart, { DonughtGraphProps } from "../Components/donughtChart";
import BarGraph, { BarGraphProps } from "../Components/barGraphs";
import Navbar from "../Components/navbar";

// All the data that is passed to the graph
import { 
    diversityScore, incomeGraphLabelData, ageGraphLabelData,  
    raceGraphLabelData, sexualityGraphLabelData, 
    genderGraphLabelData, religionGraphLabelData
} from "../DataState/graphData";
import OverallDiversityScore from "../Components/diversityScore";
import { useAuth } from "../Context/AuthContext";
import { fetchDocumentById} from "../firebase/firestore";
import { useEffect, useState } from "react";


 const DiversityView: React.FC<{ testBypass1?: BarGraphProps, testBypass2?: HorizontalBarGraphProps,testBypass3?:DonughtGraphProps }> = ({ testBypass1={} as BarGraphProps, testBypass2 ={} as HorizontalBarGraphProps,testBypass3 ={} as DonughtGraphProps })  => {
    const {isLoggedIn,username,overallRating,id,department} = useAuth();
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
            
            console.log(ageArray)
            console.log(raceArray);
            console.log(religionArray);
            console.log(sexualityArray);
            console.log(genderArray);
            console.log(incomeArray);
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
        const ageDict: { [key: string]: number } = {
            "18-20": 0,
            "21-25": 0,
            "26-30": 0,
            "31-40": 0,
            "41-45": 0,
            "46-50": 0,
            "50+": 0
        };
        console.log("Type of ageArray:", typeof ageArray);
        console.log("ageArray:", ageArray);
        const ageArrayValues = Object.values(ageArray);
const valueAtIndexZero = ageArrayValues[0];
console.log(valueAtIndexZero);
    ageArray.forEach(age=>{console.log(age)})
        ageArray.forEach(age => {
            console.log("Age:", age);
            const ageNum = parseInt(age);
            console.log(ageNum)
            if (!isNaN(ageNum)) {
                switch (true) {
                    case ageNum >= 18 && ageNum <= 20:
                        ageDict["18-20"]++;
                        break;
                    case ageNum >= 21 && ageNum <= 25:
                        ageDict["21-25"]++;
                        break;
                    case ageNum >= 26 && ageNum <= 30:
                        ageDict["26-30"]++;
                        break;
                    case ageNum >= 31 && ageNum <= 40:
                        ageDict["31-40"]++;
                        break;
                    case ageNum >= 41 && ageNum <= 45:
                        ageDict["41-45"]++;
                        break;
                    case ageNum >= 46 && ageNum <= 50:
                        ageDict["46-50"]++;
                        break;
                    case ageNum >= 50 && ageNum <= 99:
                        ageDict["46-50"]++;
                        break;
                    default:
                        break;
                }
            }
        });
    
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
    console.log(ageObj);
        setAgeProps(ageObj); // Assuming setAgeProps is a function that sets age properties
    };
    
    const extractIncome =(incomeArray:string[], diversitySelection:diversitySelectionType)=>{
        const incomeDict: { [key: string]: number } = {
            "0 - 10k":0,
            "11 - 15k":0,
            "16 - 20k":0,
            "21 - 25k":0,
            "25 - 30k":0,
            "30k +":0,
        };
    
        incomeArray.forEach(age => {
            const incomeNum = parseInt(age);
            if (!isNaN(incomeNum)) {
                switch (true) {
                    case incomeNum >= 0 && incomeNum <= 10998:
                        incomeDict["0 - 10k"]++;
                        break;
                    case incomeNum >= 10999 && incomeNum <= 15998:
                        incomeDict["11 - 15k"]++;
                        break;
                    case incomeNum >= 15999 && incomeNum <= 20998:
                        incomeDict["16 - 20k"]++;
                        break;
                    case incomeNum  >= 20999 && incomeNum <= 25998:
                        incomeDict["21 - 25k"]++;
                        break;
                    case incomeNum >= 25999 && incomeNum <= 1000000:
                        incomeDict["30k +"]++;
                        break;
                    
                    default:
                        break;
                }
            }
        });
    
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
        const raceDict: { [key: string]: number } = {};

    raceArray.forEach(race => {
        if (raceDict.hasOwnProperty(race.charAt(0).toUpperCase() + race.slice(1))) {
            raceDict[race.charAt(0).toUpperCase() + race.slice(1)]++;
        } else {
            raceDict[race.charAt(0).toUpperCase() + race.slice(1)] = 1;
        }
    });
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
        const genderDict:{[key:string]:number}={};
        genderArray.forEach(gender =>{
            if(genderDict.hasOwnProperty(gender.charAt(0).toUpperCase() + gender.slice(1))){
                genderDict[gender.charAt(0).toUpperCase() + gender.slice(1)]++;
            }else{
                genderDict[gender.charAt(0).toUpperCase() + gender.slice(1)] =1;
            }
        })
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
        const sexualityDict:{[key:string]:number}={};
        sexualityArray.forEach(sexuality =>{
            if(sexualityDict.hasOwnProperty(sexuality)){
                sexualityDict[sexuality]++;
            }else{
                sexualityDict[sexuality] =1;
            }
        })
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
       const religionDict: {[key:string]:number}={};
       religionArray.forEach(religion =>{
        if (religionDict.hasOwnProperty(religion.charAt(0).toUpperCase() + religion.slice(1))){
            religionDict[religion.charAt(0).toUpperCase() + religion.slice(1)]++;
        }else{
            religionDict[religion.charAt(0).toUpperCase() + religion.slice(1)] = 1;
        }
       }) 
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
            <Navbar name={ username ?username : 'Guest'} rating={overallRating? overallRating: 0}/>
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