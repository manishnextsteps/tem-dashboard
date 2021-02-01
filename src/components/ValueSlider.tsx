import React from 'react'
import { makeStyles, Slider } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
      width:200,
    },
    margin: {
      height: theme.spacing(3),
    },
  }));
interface Iprops{
    sliderMark:string
}
export default function ValueSlider(props:Iprops) {
    const classes = useStyles();
    const {sliderMark}=props
    // console.log('sliderMark',sliderMark)
    const minValue=Math.floor(Number(sliderMark)-(0.2*Number(sliderMark)))
    const maxValue=Math.ceil(Number(sliderMark)+(0.2*Number(sliderMark)))
    const marks = [
        {
            value: minValue,
            label: `${minValue}`,
        },
        {
            value: Number(sliderMark),
            label: `${Number(sliderMark)}`,
        },
        {
            value: maxValue,
            label: `${maxValue}`,
        },
    ];

    function valuetext(value:any) {
        return `${value}°C`;
    }

    return (
        <div className={classes.root}>
            <Slider
                defaultValue={Number(sliderMark)}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-custom"
                // step={10}
                marks={marks}
                min={minValue}
                max={maxValue}
                valueLabelDisplay="auto"
            />
        </div>
    )
}
