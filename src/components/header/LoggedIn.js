import React, {useContext, useState} from 'react'
import {
    Avatar,
    CircularProgress,
    IconButton,
    ListItemIcon,
    ListItemText
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import MenuIcon from '@material-ui/icons/Menu'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import InfoIcon from '@material-ui/icons/Info';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import UserContext from '../../provider/UserContext'
import LoginRegister from './LoginRegister'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import {useTheme} from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import NavLink from './NavLink'
import Badge from "@material-ui/core/Badge";
import Link from "@material-ui/core/Link";
import RoleCheck from "../RoleCheck";
import EventAvailableIcon from '@material-ui/icons/EventAvailable';

export default function LoggedIn() {
    const userContext = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    if (userContext.user === null) {
        return <CircularProgress/>
    }

    return (
        <>
            <IconButton
                aria-controls="loginMenu"
                aria-haspopup="true"
                onClick={() => setOpen(!open)}
                color="primary"
            >
                {
                    userContext.user.isLogged &&
                    <Badge color={"error"} badgeContent={userContext.user.hasProblem.payments ? 1 : 0}>
                        <MenuIcon color={'secondary'}/>
                    </Badge>
                }
                {
                    !userContext.user.isLogged && <MenuIcon color={'secondary'}/>
                }
            </IconButton>
            <Drawer anchor={'left'} open={open} onClose={() => setOpen(false)}>
                <div className={{width: 450}} role="presentation" onClick={() => setOpen(false)}>
                    <List>
                        {
                            userContext.user.isLogged && <>
                                <ListItem>
                                    <Grid container direction="row" justify="flex-start" alignItems="center"
                                          spacing={2}>
                                        <Grid item>
                                            <Avatar alt={userContext.user.username} src={userContext.user.avatar}>
                                                {userContext.user.firstName.slice(0, 1)}{userContext.user.lastName.slice(0, 1)}
                                            </Avatar>
                                        </Grid>
                                        <Grid item>
                                            <Link href={"/il-tuo-profilo"} color={"secondary"}>
                                                {userContext.user.firstName} {userContext.user.lastName}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider/>
                            </>
                        }
                        <NavLink show={!matches} anchor={'side'}/>
                        {
                            userContext.user.isLogged && <RoleCheck role={"ROLE_ADMIN"}>
                                <Divider/>
                                <ListItem>
                                    <ListItemText primary="Amministrazione" fontSize="small"
                                                  style={{fontWeight: "bold"}}/>
                                </ListItem>
                                <ListItem button onClick={() => {
                                    window.location.href = '/incoming-article'
                                }}>
                                    <ListItemIcon>
                                        <PlaylistAddIcon color="secondary"/>
                                    </ListItemIcon>
                                    <ListItemText primary="Articoli pubblicati"/>
                                </ListItem>
                                <ListItem button onClick={() => {
                                    window.location.href = '/incoming-events'
                                }}>
                                    <ListItemIcon>
                                        <EventAvailableIcon color="secondary"/>
                                    </ListItemIcon>
                                    <ListItemText primary="Eventi pubblicati"/>
                                </ListItem>
                                <Divider/>
                            </RoleCheck>
                        }
                        {
                            userContext.user.isLogged && <>
                                <ListItem>
                                    <ListItemText primary="Privato" fontSize="small" style={{fontWeight: "bold"}}/>
                                </ListItem>
                                <ListItem button onClick={() => {
                                    window.location.href = '/il-tuo-profilo'
                                }}>
                                    <ListItemIcon>
                                        <AccountCircleIcon color="secondary"/>
                                    </ListItemIcon>
                                    <ListItemText primary="Il tuo Profilo"/>
                                </ListItem>
                                <ListItem button onClick={() => {
                                    window.location.href = '/i-tuoi-pagamenti'
                                }}>
                                    <ListItemIcon>
                                        <Badge color={"error"}
                                               badgeContent={userContext.user.hasProblem.payments ? 1 : 0}>
                                            <MonetizationOnIcon color="secondary"/>
                                        </Badge>
                                    </ListItemIcon>
                                    <ListItemText primary="La tua Iscrizione"/>
                                </ListItem>
                                <ListItem button onClick={() => {
                                    window.location.href = '/privacy'
                                }}>
                                    <ListItemIcon>
                                        <InfoIcon color="secondary"/>
                                    </ListItemIcon>
                                    <ListItemText primary="Privacy"/>
                                </ListItem>
                                <Divider/>
                                <ListItem button onClick={() => {
                                    userContext.logout()
                                }}>
                                    <ListItemIcon>
                                        <MeetingRoomIcon color="secondary"/>
                                    </ListItemIcon>
                                    <ListItemText primary="Logout"/>
                                </ListItem>
                            </>
                        }
                    </List>
                </div>
            </Drawer>
        </>
    )
    // return (
    //     matches && <LoginRegister/>
    // )
}
