import {Box, Grid} from "@mui/material";
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
    return (
        <Box> 
            <Navbar name={"John Doe"} rating={4.1} />
            <TriangleBackground />
            <Grid display="flex" flexDirection="row" justifyContent="center">
                <Grid item display="flex" flexDirection="column" justifyContent="space-evenly" padding="1em" >
                    <BarGraph graphData={incomeGraphLabelData} />
                    <BarGraph graphData={ageGraphLabelData} />
                </Grid>

                <Grid item display="flex" flexDirection="column" justifyContent="space-evenly" padding="1em">
                    <OverallDiversityScore score={diversityScore} />
                    <HorizontalBarGraph graphData={raceGraphLabelData} />
                    <HorizontalBarGraph graphData={religionGraphLabelData} />
                </Grid>

                <Grid item display="flex" flexDirection="column" justifyContent="space-evenly" padding="1em">
                    <DonughtChart graphData = {sexualityGraphLabelData} />
                    <DonughtChart graphData = {genderGraphLabelData} />
                </Grid>
            </Grid>
        </Box>
    )

}