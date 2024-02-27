import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Box, Grid, Typography } from "@mui/material";
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js';

interface BarGraphProps {
    graphData: {
        xAxisLabels: string[],
        yAxisLabels: number[],
        title: string
        hasData: boolean,
    }
}

const HorizontalBarGraph: React.FC<BarGraphProps> = ({ graphData }) => {
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
                borderRadius: 25,
                data: graphData.yAxisLabels, // The percentages data
                barPercentage: 0.5
            }
        ]
    }

    const barChartOptions: Chart.ChartOptions<'bar'> = {
        responsive: true,
        indexAxis: "y",
        plugins: {
            legend: { display: false },
            title: { display: false },
            datalabels: {
                anchor: "end",
                align: "end"
            }
        },
        elements: {
            bar: { borderRadius: 10 }
        },
        scales: {
            y: {
                ticks: {
                    callback: function (value: number) { return value + '%' }
                },
                position: 'right',
                grid: { display: false },
            },
            x: {
                grid: { display: false },
                position: "top",
            }
        }
    }

    return (
        <Box sx={{
            display: 'flex',
            width: '25em',
            boxShadow: '0.5em 0.5em 1em 0.1em grey'
        }}>
            <Grid width="100%" padding="0.8em" sx={{ backgroundColor: "white", }}>
                {/* Titles and ID*/}
                <Grid item sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
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
                <Grid item >
                    <Bar
                        data={thisGraphData}
                        options={barChartOptions}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default HorizontalBarGraph;