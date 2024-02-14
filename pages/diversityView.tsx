import {Box} from "@mui/material";
import TriangleBackground from "../Components/TriangleBackground";
import BarGraph from "../Components/barGraphs";
import Navbar from "../Components/navbar";

export default function DiversityView(){

    const studyId = "#123456"
    const incomeGraphLabelData = {
            yAxisLabels : [1, 2, 3, 60,3,6],
            xAxisLabels : [
                    "0 - 10",
                    "11 - 15",
                    "16 - 20",
                    "21 - 25", 
                    "25 - 30", 
                    "30 +"
                ],
            title: "Income",
            studyId: studyId,
            hasData: true
        }

    const ageGraphLabelData = {
        yAxisLabels: [5, 10, 5, 50, 90,20,7],
        xAxisLabels: [
            "18-20",
            "21-25",
            "26-30",
            "31-40",
            "41-45",
            "56-50",
            "50+"
        ],
        title: "Age",
        studyId: studyId,
        hasData: true
    }

    return (
        <Box> 
            <Navbar />
            <TriangleBackground />
            <BarGraph graphData={incomeGraphLabelData} />
            <BarGraph graphData={ageGraphLabelData} />
        </Box>
    )

}