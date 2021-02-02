import React, { useContext, useEffect, useState } from 'react'
import { CentralContext, SingleUnit } from '../contexts/CentralContextProvider'
import { Grid, MenuItem, Select } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    DatePicker,
} from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

export default function DateSelector() {
    const { data, currentDate, changeCurrentDate, allDates } = useContext(CentralContext)
    // console.log('alldates', allDates, 'currentDate',currentDate)
    console.log('currentDate',currentDate)
    const changeHandler = (date: MaterialUiPickersDate) => {
        // console.log('NewDate',date)
        changeCurrentDate(date?.toLocaleDateString('en-US',{year:'numeric',month:'2-digit',day:'2-digit'}))
    }
    return (
        <Grid
            container
            alignItems='center'
            justify="center"
        // style={{borderBottom:"1px solid gray"}}
        >
            <Grid item xs={4}>
                Select Date
            </Grid>
            <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        // label="Date picker inline"
                        value={currentDate}
                        // shouldDisableDate={(date:)}
                        onChange={changeHandler}
                        // KeyboardButtonProps={{
                        //     'aria-label': 'change date',
                        // }}
                    />
                </MuiPickersUtilsProvider>
            </Grid>
        </Grid>
    )
}