import React from 'react'
import {
  AppBar, Toolbar, Slide, Typography, Link, useScrollTrigger
} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import LoggedIn from './LoggedIn'
import NavLink from './NavLink'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const options = {
  title: 'Cane nero'
}

export default function Header () {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 200
  });

  const bar = (id, position, logoStyles, options) => {
    let styles = ''
    if (position === 'top') {
      styles = { backgroundColor: 'transparent', boxShadow: 'none' }
    }

    return (
      <AppBar position={'fixed'} id={id} style={styles}>
        <Toolbar>
          <LoggedIn/>
          <Grid container>
            <Grid container item xs={12} md={6} direction={'row'} justify="flex-start" alignItems="center">
              <Grid item>
                <Link href={'/'} title={'Cane Nero - GDR lazio'}>
                  <img src={'/images/logo.jpg'} style={logoStyles} alt="Cane Nero - GDR lazio"/>
                </Link>
              </Grid>
              <Grid item>
                <Typography variant="h4" component="h1" display={'inline'}>
                  {options.title}
                </Typography>
              </Grid>
            </Grid>
            <NavLink show={matches} anchor={'header'}/>
          </Grid>
        </Toolbar>
      </AppBar>
    )
  };

  return (
    <>
      <Slide in={!trigger}>
        {bar('back-to-top-anchor', 'top', { marginRight: theme.spacing(2), width: 100, height: 100 }, options)}
      </Slide>
      <Slide in={trigger}>
        {bar('back-to-top-anchor-fixed', 'fixed', {
          marginRight: theme.spacing(2),
          width: 30,
          height: 30
        }, options)}
      </Slide>
    </>
  )
}
