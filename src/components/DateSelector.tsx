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
    const GBtoUSdateStringConverter=(dateString:string)=>{
        const dateArray = dateString.split("/");
        var dateObject = new Date(+dateArray[2], +dateArray[1]-1, +dateArray[0]);
        // console.log('DateStringToGBConverter',dateString,dateObject.toLocaleDateString('en-US'))
        return dateObject.toLocaleDateString('en-US')
    }
    const changeHandler = (date: MaterialUiPickersDate) => {
        // console.log('NewDate',date)
        changeCurrentDate(date?.toLocaleDateString('en-GB'))
    }
    return (
        <Grid
            container
            alignItems='center'
            justify="center"
        >
            <Grid item xs={5}>
                Select Date
            </Grid>
            <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        // label="Date picker inline"
                        value={GBtoUSdateStringConverter(currentDate)}
                        // shouldDisableDate={(date:)}
                        onChange={changeHandler}
                        shouldDisableDate={(day:MaterialUiPickersDate)=>{
                            if(day && allDates.includes(day?.toLocaleDateString('en-GB'))){
                                return false
                            }
                            else{
                                return true
                            }
                        }}
                        // KeyboardButtonProps={{
                        //     'aria-label': 'change date',
                        // }}
                    />
                </MuiPickersUtilsProvider>
            </Grid>
        </Grid>
    )
}