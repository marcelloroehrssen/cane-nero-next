import React from 'react'
import { Link, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import ListItem from '@material-ui/core/ListItem'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import SubjectIcon from '@material-ui/icons/Subject'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import WorkIcon from '@material-ui/icons/Work'
import Divider from '@material-ui/core/Divider'
import PropTypes from 'prop-types'

const options = {
  menuLink: [
    { key: 1, url: '/chi-siamo', label: 'Chi Siamo', icon: <SupervisorAccountIcon color={'secondary'} /> },
    { key: 4, url: '/eventi', label: 'Eventi', icon: <CalendarTodayIcon color={'secondary'} /> },
    { key: 3, url: '/news', label: 'News', icon: <SubjectIcon color={'secondary'} /> },
    { key: 2, url: '/le-nostre-cronache', label: 'Cronache', icon: <MenuBookIcon color={'secondary'} /> },
    { key: 5, url: '/staff', label: 'Staff', icon: <WorkIcon color={'secondary'} /> }
  ]
};

NavLink.propTypes = {
  show: PropTypes.bool.isRequired
};

export default function NavLink (props) {
  const show = props.show

  const sideLink = (item) => {
    return (
      <ListItem button key={item.key} onClick={() => { window.location = item.url }}>
        <ListItemIcon>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.label} fontSize="small"/>
      </ListItem>
    )
  }

  const headerLink = (item) => {
    if (!show) {
      return <></>
    }

    return (
      <Typography align={'center'}>
        <Link href={item.url} variant="body2"
          color="inherit">{item.label}</Link>
      </Typography>
    )
  }

  if (props.anchor === 'header') {
    return (
      <Grid container item xs={12} md={6} direction={'row'} justify="flex-end" alignItems="center"
        component={'nav'}>
        {
          options.menuLink.map((item) => {
            return (
              <Grid key={item.key} item xs={12} md={2}>
                {headerLink(item)}
              </Grid>
            )
          })
        }
      </Grid>
    )
  } else {
    return (
      <>
        {options.menuLink.map((item) => sideLink(item))}
        <Divider />
      </>
    )
  }
}
