import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import DashboardChart from '../components/DashboardChart'
import SelectedBarDetails from '../components/SelectedBarDetails'

export default function Container() {
    const [dataIndex, setDataIndex]=useState<string|number>('')
    const changeDataIndex=(newDataIndex:number)=>{
        setDataIndex(newDataIndex)
    }
    return (
        <Grid container justify='flex-start' direction='row' >
            <Grid item xs={9}>
                <DashboardChart changeDataIndex={changeDataIndex}/>
            </Grid>
            <Grid item xs={3} style={{marginTop:"15px",borderLeft:"1px solid gray"}}>
                <SelectedBarDetails dataIndex={dataIndex}/>
            </Grid>
        </Grid>
    )
}
