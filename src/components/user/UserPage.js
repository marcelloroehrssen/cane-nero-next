import Section from "../layout/Section";
import React, { useState} from "react";
import RoleCheck from "../RoleCheck";
import Typography from "@material-ui/core/Typography";
import RegisterForm from "../header/RegisterForm";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {theme} from "../../Theme";
import CustomUploader from "../form/CustomUploader";
import PreviewImage from "../form/PreviewImage";
import {useStyles} from "../header/LoginRegisterStyle";
import {useCookies} from "react-cookie";
import remote from "../../Utils/Remote";
import useSWR from "swr";

const UserPage = ({user}) => {
    const classes = useStyles();
    const [cookies,,] = useCookies();
    const {data, mutate} = useSWR(
        ['/user', cookies.login],
        (url, login) => (remote(url, {headers:{'client-security-token': login}})),
        {initialData: user}
    );
    const [image, setImage] = useState(data.avatar);

    const updateAvatar = async (uploadedFile) => {
        setImage(uploadedFile.file.path);
        const options = {
            headers: {'client-security-token': cookies.login},
            parameters: {
                method: 'put',
                body: JSON.stringify({
                    id: user.id,
                    avatar: uploadedFile.file.path,
                })
            }
        };
        const {user:newUser} = await remote('/user', options);
        mutate(newUser);
    };

    return (
        <RoleCheck role={'ROLE_USER'} alt={
            <Section title={'Ciao'}>
                <Typography align={"center"}>
                    <em>Per vedere questa pagina devi essere loggato!</em>
                </Typography>
            </Section>}>
            <Section title={'Ciao '}>
                <Grid container justify={"center"} spacing={2}>
                    <Grid item xs={12} md={5}>
                        <Section title={'Modifica il tuo avatar'} variant={'h6'} component={'h6'}>
                            <PreviewImage title={data.username} image={image} />
                            <CustomUploader
                                id="news_image"
                                label="Trascina o fai click qui per modificare il tuo avatar"
                                containerClass={classes.row}
                                color="secondary"
                                uploadPath={'/file/user'}
                                onChange={updateAvatar}
                                error={{status:false,message:''}}
                                image={image}
                                required
                                fullWidth
                            />
                        </Section>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Section title={'Modifica i tuoi dati'} variant={'h6'} component={'h6'}>
                            <Paper elevation={0} style={{padding: theme.spacing(4)}}>
                                <RegisterForm user={data}
                                              label={'Modifica'}
                                              onSubmitSuccess={() => mutate(data)}
                                              onSubmitError={() => {}}/>
                            </Paper>
                        </Section>
                    </Grid>
                </Grid>
            </Section>
        </RoleCheck>
    );
}

export default UserPage;
