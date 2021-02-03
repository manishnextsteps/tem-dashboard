import React, { useContext } from 'react'
import ReactApexChart from 'react-apexcharts'
import { CentralContext, SingleUnit } from '../contexts/CentralContextProvider'

export default function NcoChart() {
    const { data, currentDate } = useContext(CentralContext)
    const dataBydate = data.filter(e => e.Date === currentDate)
    const chartOptions = {
        chart: {
            height: 350,
            type: 'line',
            toolbar: {
                show: false
            }
        },
        colors: ['#d10f0f','#0287c9'],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'NCO & NCO Predicted',
            align: 'left'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: dataBydate.map((e: SingleUnit) => e.Interval),
            title: {
                text: 'Intervals'
            }
        },
        yaxis: {
            // title: {
            //     text: ''
            // },
            // min: 5,
            // max: 40
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
        }
    }
    const chartSeries = [{
        name: "NCO",
        type: "line",
        data: dataBydate.map((e: SingleUnit) => Number(e.NCO))
    },
    {
        name: "NCO Predicted",
        type: "line",
        data: dataBydate.map((e: SingleUnit) => Number(e.NCO_Predicted))
    }
    ]
    return (
        <div>
            <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="line"
                width="950"
                height="650"
            />
        </div>
    )
}
