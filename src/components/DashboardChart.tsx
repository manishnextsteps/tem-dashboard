import React, { useContext, useEffect, useRef, useState } from 'react'
import { CentralContext, SingleUnit } from '../contexts/CentralContextProvider'
import Chart from "react-apexcharts";
import { Grid } from '@material-ui/core';
import ReactApexChart from 'react-apexcharts';

interface IProps {
    changeDataIndex: (newDataIndex: number) => void
}
const Canvas=(props:{maxYValue:number})=>{
    const {maxYValue}=props
    const ref=useRef<any>(null)
    const canvasElement=ref.current
    const ctx= canvasElement?.getContext('2d')
    if(ctx){
    const topPosition=50;
    const leftPosition=35;
    const canvasGridWidth=890;
    const canvasGridHeight=540;
    const stop1=29;
    const stop2=20;
    ctx.clearRect(0,0,canvasElement.width,canvasElement.height)
    ctx.beginPath();
    ctx.fillStyle='rgba(255, 0, 0, 0.4)'
    ctx.fillRect(topPosition, leftPosition, canvasGridWidth,Number(((maxYValue-stop1)*canvasGridHeight)/maxYValue));
    ctx.fillStyle='rgba(242, 124, 124, 0.4)'
    ctx.fillRect(topPosition, leftPosition+Number(((maxYValue-stop1)*canvasGridHeight)/maxYValue), canvasGridWidth,Number(((stop1-stop2)*canvasGridHeight)/maxYValue))
    ctx.fillStyle='rgba(123, 239, 178, 0.4)'
    ctx.fillRect(topPosition, leftPosition+Number(((maxYValue-stop2)*canvasGridHeight)/maxYValue), canvasGridWidth, Number((stop2*canvasGridHeight)/maxYValue));
    ctx.stroke();    
    }
    return(<canvas 
        id='abcd'
        height='700'
        width='1000' 
        style={{position:"absolute",left:'20px',top:'20px'}} 
        ref={ref}>

        </canvas>)
} 
export default function DashboardChart(props: IProps) {
    const { changeDataIndex } = props
    const { data, currentDate } = useContext(CentralContext)
    const [selectedIndex,setSelectedIndex]=useState<number>(0)
    const dataBydate = data.filter(e => e.Date === currentDate)
    const maxYValue= Math.max(...dataBydate.map((e: SingleUnit) => Number(e.demand_actual)))
    console.log('dataBydate', dataBydate)
    console.log(selectedIndex)
    // let coloursForDemandSeries = dataBydate.map((e: SingleUnit) => {
    //     if (e.demand === '2') {
    //         return '#F50000' //red
    //     }
    //     else if (e.demand === '1') {
    //         return '#E58B68' //lightRed
    //     }
    //     else if (e.demand === '0') {
    //         return '#21C700' //green
    //     }
    // })
    const chartOptions = {
        chart: {
            events: {
                click: (event: any, chartContext: any, config: any) => {
                    changeDataIndex(config.dataPointIndex)
                    setSelectedIndex(config.dataPointIndex)
                }
            },
            // height: 150,
            // width:"60%",
            type: 'line',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false,
            },
        },
        colors: ['#000', '#03A9F4'],
        // fill: {
        //     type: ['solid', 'gradient'], // gradient
        //     gradient: {
        //         type: 'vertical', // The gradient in the horizontal direction
        //         gradientToColors: ['#00C3DF'], // The color at the end of the gradient
        //         opacityFrom: 0, // transparency
        //         opacityTo: 0,
        //         stops: [0, 120]
        //     }
        // },
        plotOptions: {
            // bar: {
            //     horizontal: true,
            //     columnWidth: "100%",
            //     distributed: true,
            //     colors: {
            //         backgroundBarColors: coloursForDemandSeries,
            //     }
            // }
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
            show: false,
            row: {
                // colors: ['transparent', 'transparent'],
                opacity: 1
            }
        },
        xaxis: {
            categories: dataBydate.map((e: SingleUnit) => e.Interval),
        },
        yaxis: [{
            max:maxYValue,
            min:0,
            title: {
                text: 'Demand Actual',
            },
        },
        // {
        //     opposite: true,
        //     title: {
        //         text: 'Demand'
        //     }
        // }
        ]
    }
    const chartSeries = [{
        name: "Demand Actual",
        type: "line",
        data: dataBydate.map((e: SingleUnit) => Number(e.demand_actual))
    }
    ]

    return (
        <div>
            <Canvas maxYValue={maxYValue}/>
            <div style={{position:"absolute",left:'20px',top:'20px'}}>
            <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="line"
                width="950"
                height="650"
            />
            </div>
        </div>
    )
}
