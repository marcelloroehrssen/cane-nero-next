import Section from "../layout/Section";
import React, {useContext, useEffect, useState} from "react";
import {CircularProgress} from "@material-ui/core";
import RoleCheck from "../RoleCheck";
import Typography from "@material-ui/core/Typography";
import RegisterForm from "../header/RegisterForm";
import UserContext from "../../provider/UserContext";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {theme} from "../../Theme";
import CustomUploader from "../form/CustomUploader";
import PreviewImage from "../form/PreviewImage";
import {useStyles} from "../header/LoginRegisterStyle";
import ConfigContext from "../../provider/ConfigContext";
import FlashBarContext from "../../provider/FlashBarContext";
import {useCookies} from "react-cookie";

export default function UserPage() {
    const classes = useStyles();
    const userContext = useContext(UserContext);
    const configContext = useContext(ConfigContext);
    const flashContext = useContext(FlashBarContext);
    const [image, setImage] = useState('');
    const [cookies,,] = useCookies();

    useEffect(() => {
        if (userContext.user) {
            setImage(userContext.user.avatar)
        }
    }, [userContext.user]);

    if (userContext.user === null) {
        return <CircularProgress/>
    }

    const updateAvatar = (uploadedFile) => {
        setImage(uploadedFile.file.path);
        const options = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'client-security-token': cookies.login
            },
            cache: 'default',
            mode: 'cors',
            method: 'put',
            body: JSON.stringify({
                id: userContext.user.id,
                avatar: uploadedFile.file.path,
            })
        };
        fetch(configContext.ws_url + '/user', options)
            .then(data => data.json())
            .then(response => {
                if (response.errors.length > 0) {
                    flashContext.show(response.errors.join(' | '), 'error', 5000);
                } else {
                    flashContext.show('Avatar aggiornato con successo', 'success', 5000);
                }
            })
            .catch((error) => {
                flashContext.show("C'è stato un errore durante l'invio del modulo", 'error');
            });
    };

    return (
        <RoleCheck role={'ROLE_USER'} alt={
            <Section title={'Ciao'}>
                <Typography align={"center"}>
                    <em>Per vedere questa pagina devi essere loggato!</em>
                </Typography>
            </Section>}>
            <Section title={'Ciao ' + userContext.user.username}>
                <Grid container justify={"center"} spacing={2}>
                    <Grid item xs={12} md={7}>
                        <Section title={'Modifica il tuo avatar'} variant={'h6'} component={'h6'}>
                            <PreviewImage title={userContext.user.username} image={image} />
                            <CustomUploader
                                id="news_image"
                                label="Trascina o fai click qui per modificare il tuo avatar"
                                containerClass={classes.row}
                                color="secondary"
                                uploadPath={'/file/user'}
                                onChange={updateAvatar}
                                error={{status:false,message:''}}
                                required
                                fullWidth
                            />
                        </Section>
                    </Grid>
                    {/*<Grid item xs={12} md={1} />*/}
                    <Grid item xs={12} md={5}>
                        <Section title={'Modifica i tuoi dati'} variant={'h6'} component={'h6'}>
                            <Paper elevation={0} style={{padding: theme.spacing(4)}}>
                                <RegisterForm user={userContext.user}
                                              label={'Modifica'}
                                              onSubmitSuccess={() => {}}
                                              onSubmitError={() => {}}/>
                            </Paper>
                        </Section>
                    </Grid>
                </Grid>
            </Section>
        </RoleCheck>
    );
}
