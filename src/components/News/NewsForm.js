import React, {useContext, useEffect} from 'react'
import Text from "../form/Text";
import {useStyles} from "../header/LoginRegisterStyle";
import useForm from "../../hooks/useForm";
import CustomEditor from "../form/CustomEditor";
import CustomUploader from "../form/CustomUploader";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import TagList from "../form/TagList";
import Grid from "@material-ui/core/Grid";
import FlashBarContext from "../../provider/FlashBarContext";
import PreviewImage from "../form/PreviewImage";
import {theme} from "../../Theme";

export default function NewsForm(props)
{
    const classes = useStyles();
    const flashContext = useContext(FlashBarContext);
    const [handlerValue, handlerSubmit, news, errorState] = useForm(
        'news',
        {title: '', text: '', tags: [], image: undefined, ...(props.news ? props.news : {})},
        {
            'title': value => value !== '',
            'text': value => value !== '',
            'tags': value => value !== [],
            'image': value => value !== '',
        }
    );

    const submit = () => {
        handlerSubmit((response, isInsert) => {
            props.onSuccess(response.news[0], isInsert);
            flashContext.show('Articolo' + (isInsert ? ' creato ' : ' aggiornato ') + 'con successo, sarà stabilmente visibile entro 30 minuti', 'success');
        })
    };

    return (
        <>
            <Text
                id="news_title"
                label="Titolo"
                value={news.title}
                containerClass={classes.row}
                color="secondary"
                onChange={event => {handlerValue('title', event.target.value)}}
                error={errorState.title}
                required
                fullWidth
            />
            <CustomEditor
                id={"news_text"}
                label={"Testo"}
                value={news.text}
                containerClass={classes.row}
                color="secondary"
                error={errorState.text}
                onChange={event => {handlerValue('text', event)}}
                fullWidth
            />
            <Divider style={{marginTop: theme.spacing(2)}}/>
            <Grid container justify="center" alignItems="stretch" spacing={2}>
                <Grid item container md={2} xs={12}>
                    <PreviewImage image={news.image} title={news.title} />
                </Grid>
                <Grid item container md={6} xs={12}>
                    <Grid item xs={12}>Aggiungi immagini</Grid>
                    <Grid item xs={12}>
                        <CustomUploader
                            id="news_image"
                            label="Trascina o fai click qui per modificare una immagine"
                            containerClass={classes.row}
                            color="secondary"
                            error={errorState.image}
                            uploadPath={'/file/news'}
                            onChange={(uploadedFile) => handlerValue('image', uploadedFile.file.path)}
                            required
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Grid item container md={4} xs={12}>
                    <Grid item xs={12}>Aggiungi i tag</Grid>
                    <Grid item xs={12}>
                        <TagList
                            tags={props.tags}
                            selectedTags={news.tags}
                            onChange={(selected) => handlerValue('tags', selected)}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Divider style={{marginTop: theme.spacing(2)}}/>
            <FormControl fullWidth>
                <Button color="secondary" variant={'outlined'} disabled={false} onClick={submit}>Crea Articolo</Button>
            </FormControl>
        </>
    );
}
