import {Box, Grid, useMediaQuery} from "@mui/material";
import TriangleBackground from "../Components/TriangleBackground";
import HorizontalBarGraph from "../Components/horizontalBarGraph";
import DonughtChart from "../Components/donughtChart";
import BarGraph from "../Components/barGraphs";
import Navbar from "../Components/navbar";

// All the data that is passed to the graph
import { 
    diversityScore, incomeGraphLabelData, ageGraphLabelData,  
    raceGraphLabelData, sexualityGraphLabelData, 
    genderGraphLabelData, religionGraphLabelData
} from "../DataState/graphData";
import OverallDiversityScore from "../Components/diversityScore";


export default function DiversityView(){
    const isMobile = useMediaQuery('(max-width:1000px)')
    return (
        <Box sx={{height:'810px',width:'100%'}}> 
            <Navbar name={"John Doe"} rating={4.1} />
            <TriangleBackground />
            <Grid container sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                <Grid item xs={isMobile?12:4}  sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                    <Grid container sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%',ml:isMobile?0:8}}>
                        <Grid item xs={12} sx={{display:'flex',justifyContent:'center',width:'100%',mt:8}}>
                            <BarGraph graphData={incomeGraphLabelData} />
                        </Grid>
                        <Grid item xs={12} sx={{display:'flex',justifyContent:'center',width:'100%',mb:isMobile?0:8}}>
                            <BarGraph graphData={ageGraphLabelData} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={isMobile?12:4}  sx={{display:'flex',justifyContent:'center',width:'100%'}}>
                    <Grid container sx={{display:'flex',justifyContent:'center',width:'100%'}}>
                        <Grid item xs={12} sx={{display:'flex',justifyContent:'center',width:'100%',mt:isMobile?0:8}}>
                        <OverallDiversityScore score={diversityScore} />
                        </Grid>
                        <Grid item xs={12} sx={{display:'flex',justifyContent:'center',width:'100%',mt:isMobile?8:0}}>
                        <HorizontalBarGraph graphData={raceGraphLabelData} />
                        </Grid>
                        <Grid item xs={12} sx={{display:'flex',justifyContent:'center',width:'100%',mb:isMobile?6:9,mt:isMobile?8:0}}>
                        <HorizontalBarGraph graphData={religionGraphLabelData} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={isMobile?12:4} sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}>
                    <Grid container sx={{display:'flex',justifyContent:'center',width:'100%'}}>
                        <Grid item xs={12} sx={{display:'flex',justifyContent:'center',width:'100%',mt:isMobile?8:8}}>
                        <DonughtChart graphData = {sexualityGraphLabelData} />
                        </Grid>
                        <Grid item xs={12} sx={{display:'flex',justifyContent:'center',width:'100%',mb:isMobile?0:8}}>
                        <DonughtChart graphData = {genderGraphLabelData} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )

}