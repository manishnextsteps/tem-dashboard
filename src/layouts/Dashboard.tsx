import React, { useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import DateSelector from '../components/DateSelector'
import DashboardChart from '../components/DashboardChart'
import { CentralContext } from '../contexts/CentralContextProvider'
import Container from './Container'

export default function Dashboard() {
    const { dataLoadingError } = useContext(CentralContext)

    if (dataLoadingError) { return <h1>Error in fetching Data</h1> }
    return (
        <Grid container style={{ padding: "25px"}}>
            <Grid item xs={12} style={{ marginBottom: "25px"}}>
                <DateSelector />
            </Grid>
            <Grid item xs={12}>
                <Container/>
            </Grid>
        </Grid>
    )
}
