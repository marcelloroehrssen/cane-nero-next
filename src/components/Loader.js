import React from 'react'
import { CircularProgress } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'

export default function Loader () {
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item>
        <CircularProgress/>
      </Grid>
    </Grid>
  )
}
