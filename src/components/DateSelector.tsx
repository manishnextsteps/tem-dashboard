import React, { useContext, useEffect, useState } from 'react'
import { CentralContext, SingleUnit } from '../contexts/CentralContextProvider'
import { Grid, MenuItem, Select } from '@material-ui/core'

export default function DateSelector() {
    const { data, currentDate, changeCurrentDate, allDates } = useContext(CentralContext)
    console.log('alldates',allDates)
    const changeHandler = (e: any) => {
        changeCurrentDate(e.target.value)
    }
    return (
        <Grid 
        container 
        alignItems='center' 
        justify="center"
        // style={{borderBottom:"1px solid gray"}}
        >
            <Grid item xs={3}>
                Select Date
            </Grid>
            <Grid item xs={3}>
                <Select
                    fullWidth
                    variant='filled'
                    name='currentDate'
                    value={currentDate}
                    onChange={changeHandler}
                    label="Select Date"
                >
                    {allDates?.map((e: string) =>
                        <MenuItem key={e} value={e}>{e}</MenuItem>
                    )}
                </Select>
            </Grid>
            <Grid item xs={3}>
                {currentDate}
            </Grid>
        </Grid>
    )
}
