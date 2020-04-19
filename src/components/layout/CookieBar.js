import AppBar from "@material-ui/core/AppBar";
import {theme} from "../../Theme";
import Grid from "@material-ui/core/Grid";
import InfoIcon from '@material-ui/icons/Info';
import Typography from "@material-ui/core/Typography";
import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import {useCookies} from "react-cookie";
import Slide from "@material-ui/core/Slide";
import NoSsr from "@material-ui/core/NoSsr";
import Link from "@material-ui/core/Link";

export default function CookieBar() {

    const [cookies, setCookies,] = useCookies();
    const [slideIn, setSlideIn] = useState(() => {
        if (cookies.login) {
            return false;
        }
        return cookies.ppaccepted !== 'accepted';
    });

    const acceptCookies = () => {
        setCookies('ppaccepted', 'accepted', {path: '/'});
        setSlideIn(false)
    };

    return (
        <NoSsr>
            <Slide in={slideIn} direction="up">
                <AppBar position="fixed" style={{
                    top: 'auto',
                    padding: theme.spacing(2),
                    bottom: 0,
                    backgroundColor: theme.palette.info.dark
                }}>
                    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
                        <Grid item>
                            <InfoIcon color={"primary"}/>
                        </Grid>
                        <Grid item>
                            <Typography>
                                Devi accettare la normativa sulla privacy prima di continuare ad usare il sito. <Link href={"/privacy"}>Normativa sulla privacy</Link>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color={"primary"} onClick={acceptCookies}>Accetto i
                                cookie</Button>
                        </Grid>
                    </Grid>
                </AppBar>
            </Slide>
        </NoSsr>
    );
}