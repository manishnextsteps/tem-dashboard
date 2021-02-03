import React, {useState} from 'react'
import { Grid } from '@material-ui/core'
import DashboardChart from '../components/DashboardChart'
import SelectedBarDetails from '../components/SelectedBarDetails'
import DateSelector from '../components/DateSelector'

export default function TopContainer() {
    const [dataIndex, setDataIndex]=useState<string|number>('')
    const changeDataIndex=(newDataIndex:number)=>{
        setDataIndex(newDataIndex)
    }
    return (
        <Grid container justify='flex-start' direction='row' >
            <Grid item xs={9}>
                <DashboardChart changeDataIndex={changeDataIndex}/>
            </Grid>
            <Grid item xs={3} style={{marginTop:"15px"}}>
                <Grid item xs={12} style={{ marginBottom: "25px"}}>
                <DateSelector />
                </Grid>
                <SelectedBarDetails dataIndex={dataIndex}/>
            </Grid>
        </Grid>
    )
}
