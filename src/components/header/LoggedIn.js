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
import NextLink from "next/link";
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
                                            <NextLink href={"/il-tuo-profilo"} passHref prefetch>
                                                <Link color={"secondary"}>
                                                    {userContext.user.firstName} {userContext.user.lastName}
                                                </Link>
                                            </NextLink>
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
                                <ListItem button>
                                    <ListItemIcon>
                                        <PlaylistAddIcon color="secondary"/>
                                    </ListItemIcon>
                                    <NextLink href={'/incoming-article'} passHref prefetch>
                                        <Link color={"secondary"} underline="none">
                                            <ListItemText primary="Articoli pubblicati"/>
                                        </Link>
                                    </NextLink>
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon>
                                        <EventAvailableIcon color="secondary"/>
                                    </ListItemIcon>
                                    <NextLink href={"/incoming-events"} passHref prefetch>
                                        <Link color={"secondary"} underline="none">
                                            <ListItemText primary="Eventi pubblicati"/>
                                        </Link>
                                    </NextLink>
                                </ListItem>
                                <Divider/>
                            </RoleCheck>
                        }
                        {
                            userContext.user.isLogged && <>
                                <ListItem>
                                    <ListItemText primary="Privato" fontSize="small" style={{fontWeight: "bold"}}/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon>
                                        <AccountCircleIcon color="secondary"/>
                                    </ListItemIcon>
                                    <NextLink href={"/il-tuo-profilo"} passHref prefetch>
                                        <Link color={"secondary"}>
                                            <ListItemText primary="Il tuo Profilo"/>
                                        </Link>
                                    </NextLink>
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon>
                                        <Badge color={"error"}
                                               badgeContent={userContext.user.hasProblem.payments ? 1 : 0}>
                                            <MonetizationOnIcon color="secondary"/>
                                        </Badge>
                                    </ListItemIcon>
                                    <NextLink href={"/i-tuoi-pagamenti"} passHref prefetch>
                                        <Link color={"secondary"}>
                                            <ListItemText primary="La tua Iscrizione"/>
                                        </Link>
                                    </NextLink>
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon>
                                        <InfoIcon color="secondary"/>
                                    </ListItemIcon>
                                    <NextLink href={"/privacy"} passHref prefetch>
                                        <Link color={"secondary"}>
                                            <ListItemText primary="Privacy"/>
                                        </Link>
                                    </NextLink>
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
}
