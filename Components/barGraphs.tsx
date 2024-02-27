import { Box, Grid, Typography } from "@mui/material";
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js/auto';
//Chart.register(...registerables);

interface BarGraphProps {
    graphData: {
        xAxisLabels: string[],
        yAxisLabels: number[],
        title: string
        hasData: boolean,
    }
}

const BarGraph: React.FC<BarGraphProps> = ({graphData}) => {

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
                backgroundColor: "#5293B7",
                BorderRadius: 25,
                data: percentData // The precentages data
            }
        ]
    }

    const barChartOptions = {
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
                }}as ScaleOptions<'linear'>,
            
            x : {
                grid: { display: false }
            }
        }
    }

    return (
        <Box sx={{
            display:'flex',
            width: '400px',
            backgroundColor: '#F6F6F6',
            boxShadow: '0.5em 0.5em 1em 0.1em grey',
            borderRadius:'5px',
            height:'300px'
        }}>
            <Grid width="100%" padding="0.8em" sx = {{backgroundColor: "#F2F2F2",borderRadius:'5px',height:'100%'}}>
                {/* Titles and ID*/}
                <Grid item sm = {12} sx={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <Typography fontSize="1.5em" fontWeight="Bold"> {graphData.title} </Typography>
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
                <Grid item  sx={{height:'230px'}}>
                    <Box sx={{height:'100%',mt:1}}>
                    <Bar 
                        data={incomeData}
                        options = {barChartOptions} 
                    /></Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default BarGraph;