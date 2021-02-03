import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import AhtChart from '../components/AhtChart'
import NcoChart from '../components/NcoChart'

export default function Container() {
    return (
        <Grid container justify='flex-start'>
            <Grid item xs={12}>
                <AhtChart />
            </Grid>
            <Grid item xs={12} style={{marginTop:"15px"}}>
                <NcoChart />
            </Grid>
        </Grid>
    )
}
