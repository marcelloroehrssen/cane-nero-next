import React from 'react'
import {Link, ListItemIcon, ListItemText} from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import SubjectIcon from '@material-ui/icons/Subject'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import WorkIcon from '@material-ui/icons/Work'
import PropTypes from 'prop-types'
import LoginRegister from "./LoginRegister";
import Button from "@material-ui/core/Button";
import {theme} from "../../Theme";
import NextLink from "next/link";

const options = {
    menuLink: [
        {key: 1, url: '/chi-siamo', label: 'Chi Siamo', icon: <SupervisorAccountIcon color={'secondary'}/>},
        {key: 4, url: '/eventi', label: 'Eventi', icon: <CalendarTodayIcon color={'secondary'}/>},
        {key: 3, url: '/news', label: 'News', icon: <SubjectIcon color={'secondary'}/>},
        {key: 2, url: '/le-nostre-cronache', label: 'Cronache', icon: <MenuBookIcon color={'secondary'}/>},
        {key: 5, url: '/staff', label: 'Staff', icon: <WorkIcon color={'secondary'}/>}
    ]
};

NavLink.propTypes = {
    show: PropTypes.bool.isRequired
};

export default function NavLink(props) {
    const show = props.show

    const sideLink = (item) => {
        return (
            <ListItem button key={item.key}>
                <ListItemIcon>
                    {item.icon}
                </ListItemIcon>
                <NextLink href={item.url} passHref>
                    <Link color="secondary" underline="none">
                        <ListItemText primary={item.label} fontSize="small"/>
                    </Link>
                </NextLink>
            </ListItem>
        )
    }

    if (props.anchor === 'header') {
        return (
            <>
                {
                    show && options.menuLink.map((item) => {
                        return (
                            <Button className={"NavTopBarButton"} key={item.key} align={'center'}
                                    aria-controls={"menu-appbar"} style={{marginRight: theme.spacing(4)}}>
                                <NextLink href={item.url} passHref scroll={false}>
                                    <Link className={"NavTopBarLink"} variant="body2" color="inherit"
                                          underline={"none"}>{item.label}</Link>
                                </NextLink>
                            </Button>
                        )
                    })
                }
                <LoginRegister/>
            </>
        )
    } else {
        return (
            <>
                {options.menuLink.map((item) => sideLink(item))}
            </>
        )
    }
}
