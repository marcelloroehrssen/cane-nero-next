import React from 'react'
import {
    AppBar, Toolbar, Slide, Typography, Link, useScrollTrigger
} from '@material-ui/core'
import LoggedIn from './LoggedIn'
import NavLink from './NavLink'
import {useTheme} from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import NextLink from "next/link"

const options = {
    title: 'Cane nero'
}

export default function Header() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 200
    });

    const bar = (id, position, logoStyles, options) => {
        let styles = {backgroundColor: 'black'};
        if (position === 'top') {
            styles = {backgroundImage:'none', backgroundColor: 'transparent', boxShadow: 'none'}
        }

        return (
            <AppBar position={'fixed'} id={id} style={styles}>
                <Toolbar>
                    <LoggedIn edge="start"/>
                    <NextLink href={"/"} passHref>
                        <Link title={'Cane Nero - GDR lazio'}>
                            <img src={'/images/logo.jpg'} style={logoStyles} alt="Cane Nero - GDR lazio"/>
                        </Link>
                    </NextLink>
                    <Typography variant="h4" component="h1" display={'inline'} style={{flexGrow: 1}}>
                        {options.title}
                    </Typography>
                    <NavLink show={matches} anchor={'header'}/>
                </Toolbar>
            </AppBar>
        )
    };

    return (
        <>
            <Slide in={!trigger}>
                {bar('back-to-top-anchor', 'top', {marginRight: theme.spacing(2), width: 100, height: 100}, options)}
            </Slide>
            <Slide in={trigger}>
                {bar('back-to-top-anchor-fixed', 'fixed', {}, options)}
            </Slide>
        </>
    )
}
