import React, {useContext, useState} from 'react'
import PropTypes from 'prop-types'
import {Avatar, Button, CircularProgress, Tooltip} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import LoginForm from './LoginForm'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import RegisterForm from './RegisterForm'
import Divider from '@material-ui/core/Divider'
import UserContext from "../../provider/UserContext";

const TabPanel = ({children, value, index, ...other}) => (
    <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
    >
        {value === index && <div>{children}</div>}
    </Typography>
);


TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

const a11yProps = (index) => ({
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`
});

const LoginRegister = () => {
    const [open, setOpen] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const userContext = useContext(UserContext);

    const handleClickOpen = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
    };
    const handleTabChange = (e, index) => {
        setTabIndex(index)
    };

    const isLogged = () => {
        if (userContext.user === null) {
            return false;
        }
        return userContext.user.isLogged;
    };

    return (
        <>
            {
                !isLogged() && <Tooltip title="Accedi al tuo account" aria-label="add" arrow>
                    <Button color="inherit" onClick={handleClickOpen}>
                        <AccountCircleIcon/>
                    </Button>
                </Tooltip>
            }
            {
                isLogged() && <Tooltip title={"Ciao " + userContext.user.firstName} aria-label="add" arrow>
                    <Button color="inherit" onClick={() => window.location.href = "/il-tuo-profilo"}>
                        <Avatar alt={userContext.user.username} src={userContext.user.avatar}>
                            {userContext.user.firstName.slice(0, 1)}{userContext.user.lastName.slice(0, 1)}
                        </Avatar>
                    </Button>
                </Tooltip>
            }
            <Dialog
                open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'xs'}>
                <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="fullWidth"
                >
                    <Tab label="Login" {...a11yProps(0)}/>
                    <Tab label="Registrazione" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={tabIndex} index={0} dir="ltr">
                    <DialogContent>
                        <DialogContentText>
                            Inserisci username e password per entrare nel sito
                        </DialogContentText>
                        <LoginForm onSubmitSuccess={handleClose} onSubmitError={() => {
                        }}/>
                        <Divider/>
                    </DialogContent>
                </TabPanel>
                <TabPanel value={tabIndex} index={1} dir="ltr">
                    <DialogContent>
                        <DialogContentText>
                            Inserisci i tuoi dati per registrarti
                        </DialogContentText>
                        <RegisterForm onSubmitSuccess={handleClose} onSubmitError={() => {
                        }}/>
                    </DialogContent>
                </TabPanel>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Chiudi</Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default LoginRegister;
