import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Box, Grid, Typography } from "@mui/material";
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js';

export interface HorizontalBarGraphProps {
    graphData: {
        xAxisLabels: string[],
        yAxisLabels: number[],
        title: string,
        studyId: string,
        hasData: boolean,
    }
}

const HorizontalBarGraph: React.FC<HorizontalBarGraphProps> = ({ graphData }) => {
    if (graphData === undefined || !graphData) {
        // Fallback rendering when data is not available
        return <Box>No data available</Box>;
    }
    if (!graphData.hasData) {
        return (
            <Box sx={{
                display: 'flex',
                width: '25em',
                boxShadow: '0.5em 0.5em 1em 0.1em grey',
                backgroundColor: '#1F5095',
                height: "10em",
                padding: "0.3em",
                borderRadius: "0.2em",
                textAlign: "left",
                color: "white"
            }}>
                <Typography>When this advert was created you did not enable tracking for this metric. <br />
                    If in future you wish to see this, enable this feature when creating your advert.</Typography>
            </Box>
        );
    }

    const thisGraphData = {
        labels: graphData.xAxisLabels,
        datasets: [
            {
                backgroundColor: "#1F5095",
                BorderRadius: 25,
                data: graphData.yAxisLabels, // The precentages data
                barPercentage: 0.5,
                datalabels: {
                    anchor: "end",
                    align: "end",
                    padding: "10px"
                }
            },
        ], 
    }

    const barChartOptions: Chart.ChartOptions<'bar'> = {
        responsive: true,
        indexAxis: "y",
        plugins: {
          legend: {display:false},
          title: { display: false},
        },
        elements: {
            bar: { borderRadius: 10 }
        },
        scales: {
            y: {
                labels: graphData.xAxisLabels, 
                grid:{display: false}, 
                
                },
            
            x : {
                grid: { display: false },
               
                display: false     
            },
        },
    }

    return (
        <Box sx={{
            display: 'flex',
            maxWidth: '400px',
            width: '%',
            height:'162px',
            boxShadow: '0.5em 0.5em 1em 0.1em grey',
            borderRadius:'5px'
        }}>
            <Grid container width="100%" padding="0.8em" sx={{ backgroundColor: "#F2F2F2",borderRadius:'5px' }}>
                {/* Titles and ID*/}
                <Grid item xs={12} sx={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <Typography fontSize="1.5em" fontWeight="Bold"> {graphData.title} </Typography>
                    <Typography sx={{
                        backgroundColor: "#DAE1E9",
                        padding: "0.3em",
                        borderRadius: "0.2em",
                        width: "6em",
                        textAlign: "center",
                        fontWeight: "bold",
                        overflow:'scroll',
                    }}> 
                        {graphData.studyId}
                    </Typography>
                </Grid>

                {/* Graph */}
                <Grid item xs={12} height="99%"  sx={{maxHeight:'110px',overflowY:'auto', '&::-webkit-scrollbar': { width: '8px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#1F5095', borderRadius: '5px' } }}>
                    <Box sx={{height:'200px',width:'250px'}}>
                    <Bar data={thisGraphData}
                        options = {barChartOptions}
                        plugins={[ChartDataLabels]}                           
                    />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default HorizontalBarGraph;