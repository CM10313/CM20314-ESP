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
} from "../Components/graphData";
import OverallDiversityScore from "../Components/diversityScore";


export default function DiversityView(){
    const isMobile = useMediaQuery('(max-width:1000px)')
    return (
        <Box sx={{height:'810px'}}> 
            <Navbar name={"John Doe"} rating={4.1} />
            <TriangleBackground />
            <Grid container sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
                <Grid item xs={isMobile?12:4}display="flex" flexDirection="column" justifyContent="space-evenly" >
                    <BarGraph graphData={incomeGraphLabelData} />
                    <BarGraph graphData={ageGraphLabelData} />
                </Grid>

                <Grid item xs={isMobile?12:4} display="flex" flexDirection="column" justifyContent="space-evenly" >
                    <OverallDiversityScore score={diversityScore} />
                    <br />
                    <HorizontalBarGraph graphData={raceGraphLabelData} />
                    <br />
                    <HorizontalBarGraph graphData={religionGraphLabelData} />
                </Grid>

                <Grid item xs={isMobile?12:4} display="flex" flexDirection="column" justifyContent="space-evenly" >
                    <DonughtChart graphData = {sexualityGraphLabelData} />
                    <DonughtChart graphData = {genderGraphLabelData} />
                </Grid>
            </Grid>
        </Box>
    )

}