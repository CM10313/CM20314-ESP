import { Box, Grid, Typography } from "@mui/material";
import {  Doughnut } from 'react-chartjs-2';
import { Chart, registerables, ScaleOptions  } from 'chart.js';
Chart.register(...registerables);

export interface DonughtGraphProps {
    graphData: {
        xAxisLabels: string[],
        yAxisLabels: number[],
        title: string,
        studyId: string,
        hasData: boolean,
    }
}

const DonughtChart: React.FC<DonughtGraphProps> = ({graphData}) => {
    if (graphData === undefined || !graphData) {
        // Fallback rendering when data is not available
        return <Box>No data available</Box>;
    }
    if(graphData.hasData == false){
        return <Box sx={{
            display:'flex',
            width: '25em',
            boxShadow: '0.5em 0.5em 1em 0.1em grey',
            backgroundColor: '#1F5095',
            height: "10em",
            padding: "0.3em",
            borderRadius: "0.2em",
            textAlign: "left",
            color: "white"
        }}>
            <Typography> When this advert was created you did not enable tracking for this metric. <br />
        If in future you wish to see this, enable this feature when creating your advert.</Typography>
        </Box>
    }

    let percentData = graphData.yAxisLabels
    const incomeData = {
        labels: graphData.xAxisLabels,
        datasets: [
            {
                backgroundColor: ["#1F5095", "#FF5733", "#27AE60", "#9B59B6", "#F1C40F"],
                //BorderRadius: 25,
                data: percentData, // The precentages data
                //barPercentage: 0.1
                
            }
        ]
    }

    const barChartOptions = {
        responsive: true,
        cutout: "80%",
        plugins: {
          legend: {display:false},
          title: { display: false}
        },

        elements: {
            //bar: { borderRadius: 10 }
        },

        scales: {
            y: {ticks: {
                    callback: function (value:number){ return value + '%' }
                }, 
                display: false,
                grid:{display: false}, 
                }as ScaleOptions<'linear'>,
            
            x : {
                display:false,
                grid: { display: false },
                
            }
        }
    
    
    }

    return (
        <Box sx={{
            display:'flex',
            width: '95%',
            maxWidth: '500px',
            height:'300px',
            boxShadow: '0.5em 0.5em 1em 0.1em grey',
            borderRadius:'5px'
        }}>
            <Grid width="100%" padding="0.8em" sx = {{backgroundColor: "#F2F2F2",borderRadius:'5px',height:'100%'}}>
                {/* Titles and ID*/}
                <Grid item sx={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <Typography fontSize="1.5em" fontWeight="Bold"> {graphData.title} </Typography>
                    <Typography sx={{
                        backgroundColor: "#DAE1E9",
                        padding: "0.3em",
                        borderRadius: "0.2em",
                        width: "6em",
                        textAlign: "center",
                        fontWeight: "bold",mr:4,
                        overflow:"scroll",
                    }}> 
                       {graphData.studyId}
                    </Typography>
                </Grid>

                {/* Graph */}
                <Box>
                    <Grid display="flex" justifyContent="space-evenly" flexDirection="row" alignItems="center" sx={{height:'225px',mt:1}}>
                        <Grid item width="40%" height="100%" >
                            <Doughnut
                                data={incomeData}
                                options = {barChartOptions}               
                            />
                        </Grid>
                        <Grid item width = "40%" height="100%" sx={{backgroundColor: "#DAE1E9", padding:"0.5em", margin:"0.2em", borderRadius: "0.5em",overflowY:'auto'}}>
                            {graphData.xAxisLabels.map((xAxisLabel, index) => (
                                <Typography  key={index}display="flex" justifyContent="space-between" sx={{mt:1}}> 
                                    <span> {`${xAxisLabel}`} </span>
                                    <span> {`${graphData.yAxisLabels[index]}`}% </span>
                                </Typography>
                        ))}
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Box>
    )
}

export default DonughtChart;