import React, { useContext, useEffect, useState } from 'react'
import { CentralContext, SingleUnit } from '../contexts/CentralContextProvider'
import Chart from "react-apexcharts";
import { Grid } from '@material-ui/core';
import ReactApexChart from 'react-apexcharts';

interface IProps {
    changeDataIndex: (newDataIndex: number) => void
}
export default function DashboardChart(props: IProps) {
    const { changeDataIndex } = props
    const { data, dataLoadingError, currentDate } = useContext(CentralContext)
    const dataBydate = data.filter(e => e.Date === currentDate)
    console.log('dataBydate', dataBydate)
    //03A9F4
    let coloursForDemandSeries = dataBydate.map((e: SingleUnit) => {
        if (e.demand === '2') {
            return '#F50000' //red
        }
        else if (e.demand === '1') {
            return '#E58B68' //lightRed
        }
        else if (e.demand === '0') {
            return '#21C700' //green
        }
    })
    const chartOptions = {
        chart: {
            events: {
                click: (event: any, chartContext: any, config: any) => {
                    console.log(config.dataPointIndex)
                    changeDataIndex(config.dataPointIndex)
                    // coloursForDemandSeries.map((e:any,i:number)=>{
                    //     if(i===config.dataPointIndex){
                    //         console.log(i)
                    //         e='#03A9F4'
                    //     }
                    // })
                }
            },
            height: 150,
            // width:"60%",
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        colors: ['#000', '#FFFF00'],
        fill: {
            type: ['solid', 'gradient'], // gradient
            gradient: {
                type: 'vertical', // The gradient in the horizontal direction
                gradientToColors: ['#00C3DF'], // The color at the end of the gradient
                opacityFrom: 0, // transparency
                opacityTo: 0,
                stops: [0, 120]
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "100%",
                // distributed: true,
                colors: {
                    backgroundBarColors: coloursForDemandSeries,
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight',
            width: [5, 0]
        },
        title: {
            text: '',
            align: 'centre'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            }
        },
        xaxis: {
            categories: dataBydate.map((e: SingleUnit) => e.Interval),
        },
        yaxis: [{
            title: {
                text: 'Demand Actual',
            },
        },
        {
            opposite: true,
            title: {
                text: 'Demand'
            }
        }]
    }
    const chartSeries = [{
        name: "Demand Actual",
        type: "line",
        data: dataBydate.map((e: SingleUnit) => e.demand_actual)
    },
    {
        name: "Demand",
        type: "column",
        data: dataBydate.map((e: SingleUnit) => e.demand)
    }
    ]
    if (dataLoadingError) { return <h1>Error in fetching Data</h1> }
    return (
        <Grid container justify="center">
            <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="line"
                width="950"
            />
        </Grid>
    )
}
