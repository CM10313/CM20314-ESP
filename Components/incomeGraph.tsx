import { Box, Grid, Typography } from "@mui/material";
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function IncomeGraph(){

    let percentData = [1, 2, 3, 50,3,6]
    
    const incomeData = {
        labels: [
            "0 - 10",
            "11 - 15",
            "16 - 20",
            "21 - 25", 
            "25 - 30", 
            "30 +"
        ],
        datasets: [
            {
                backgroundColor: "#5293B7",
                BorderRadius: 25,
                data: percentData // The precentages data
            }
        ]
    }

    const barCharOptions = {
        responsive: true,
        
        plugins: {
          legend: {display:false},
          title: { display: false}
        },

        elements: {
            bar: { borderRadius: 10 }
        },

        scales: {
            y: {ticks: {
                    callback: function (value:number){ return value + '%' }
                }},
            
            x : {
                grid: { display: false }
            }
        }
    
    
    }

    return (
        <Box sx={{
            display:'flex',
            width: '25em',
            boxShadow: '0.5em 0.5em 1em 0.1em grey'
        }}>
            <Grid width="100%" padding="0.8em" sx = {{backgroundColor: "white",}}>
                {/* Titles and ID*/}
                <Grid item sx={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <Typography fontSize="1.5em" fontWeight="Bold"> Income </Typography>
                    <Typography sx={{
                        backgroundColor: "#DAE1E9",
                        padding: "0.3em",
                        borderRadius: "0.2em",
                        width: "6em",
                        textAlign: "center",
                        fontWeight: "bold"
                    }}> 
                        #123456 
                    </Typography>
                </Grid>

                {/* Graph */}
                <Grid item >
                    <Bar 
                        data={incomeData}
                        options = {barCharOptions}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}
