import { Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { CentralContext } from '../contexts/CentralContextProvider'
import ValueSlider from './ValueSlider';

const useStyles = makeStyles({
    container: {
        padding: '5px',
        paddingTop: '20px'
    },
    items: {
        display: "flex",
        justifyContent: 'space-between',
        padding: "4px",
        alignItems:"center"
        // marginRight:"auto"
    },
});

interface IProps {
    dataIndex: string | number
}
export default function SelectedBarDetails(props: IProps) {
    const classes = useStyles();
    const { dataIndex } = props
    const { data, currentDate } = useContext(CentralContext)
    const dataBydate = data.filter((e) => e.Date === currentDate)
    console.log('dataIndex', dataIndex)
    if (typeof dataIndex === "string" || dataIndex === -1) { return <h4>No Interval selected</h4> }
    return (
        <Grid container className={classes.container}>
            <Grid item xs={12}>
                <Typography variant='overline'>
                    {dataBydate[Number(dataIndex)]?.Date}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='overline'>
                    {dataBydate[Number(dataIndex)]?.Interval}
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.items}>
                <Typography variant='button'>
                    NCO:
                </Typography>
                <ValueSlider
                sliderMark={dataBydate[Number(dataIndex)]?.NCO}
                />
            </Grid>
            <Grid item xs={12} className={classes.items}>
                <Typography variant='button'>
                    Coverage:
                </Typography>
                <ValueSlider
                sliderMark={dataBydate[Number(dataIndex)]?.Coverage}
                />
            </Grid>
            <Grid item xs={12} className={classes.items}>
                <Typography variant='button'>
                    AHT:
                </Typography>
                <ValueSlider
                sliderMark={dataBydate[Number(dataIndex)]?.AHT}
                />
            </Grid>
        </Grid>
    )
}
