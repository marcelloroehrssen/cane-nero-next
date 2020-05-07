import remote from "../src/Utils/Remote";
import {LoginHash} from "../src/Utils/LoginHash";
import Base from "../src/components/layout/Base";
import Grid from "@material-ui/core/Grid";
import LengthCheck from "../src/components/layout/LengthCheck";
import NewsCard from "../src/components/card/NewsCard";
import React, {useState} from "react";
import Section from "../src/components/layout/Section";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import DeleteIcon from "@material-ui/icons/Delete";
import Alert from "../src/components/Component/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import NewsForm from "../src/components/News/NewsForm";
import DialogActions from "@material-ui/core/DialogActions";
import {Button} from "@material-ui/core";
import useDelete from "../src/hooks/useDelete";
import useSWR from "swr";

const IncomingArticle = ({initialData, tags}) => {
    const {data: news, mutate} = useSWR(['/news'], (resource) => remote(resource).then(n => n.news), {initialData});
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [newNewsDialogOpen, setNewNewsDialogOpen] = useState(false);
    const [subject, setSubject] = useState(null);
    const deleteFunction = useDelete();
    const deleteNews = async deleteSubject => {
        await deleteFunction(
            '/news', deleteSubject.id,
            'News cancellata con successo',
            'C\'è stato un errore durante la cancellazione della news'
        );
        mutate(news);
    };
    const onNewsCreation = (newNews, isInsert) => {
        mutate(news);
        setNewNewsDialogOpen(false);
    };

    const actions = [
        {
            icon: <SpellcheckIcon color={"secondary"}/>,
            name: 'Modifica',
            callback: n => () => {
                setNewNewsDialogOpen(true);
                setSubject(n);
            }
        },
        {
            icon: <DeleteIcon color={"secondary"}/>,
            name: 'Cancella',
            callback: n => () => {
                setShowDeleteAlert(true);
                setSubject(n);
            }
        },
    ];

    return (
        <Base>
            <Section title={"Articoli pubblicati"}>
                <Grid container spacing={2} alignItems="center" direction="row" justify="center">
                    <LengthCheck obj={news} op={'gt'} min={0}
                                 msg={<Grid item xs={12} md={5}><em>Non ci sono news in coda</em></Grid>}>
                        {
                            news.map(n => (
                                    <Grid key={n.id} xs={12} md={4} item>
                                        <NewsCard news={n} activeAction={actions} small/>
                                    </Grid>
                                )
                            )
                        }
                    </LengthCheck>
                </Grid>
            </Section>
            <Alert open={showDeleteAlert}
                   title={'Sei sicuro?'}
                   text={"Sei sicuro di voler eliminare questo articolo? L'operazione sarà irreversibile"}
                   onConfirm={() => {
                       setShowDeleteAlert(false);
                       deleteNews(subject);
                   }}
                   onCancel={() => {
                       setShowDeleteAlert(false)
                   }}/>
            <Dialog open={newNewsDialogOpen}
                    onClose={() => setNewNewsDialogOpen(false)}
                    aria-labelledby="form-dialog-title"
                    fullWidth={true}
                    fullScreen={true}
                    maxWidth={'xl'}>
                <DialogTitle id="form-dialog-title">Crea una News</DialogTitle>
                <DialogContent>
                    <NewsForm news={subject} tags={tags} onSuccess={onNewsCreation}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setNewNewsDialogOpen(false)} color="secondary">Chiudi</Button>
                </DialogActions>
            </Dialog>
        </Base>
    );
}

export async function getServerSideProps({req, res}) {

    const {news} = await remote('/news', {headers: {'client-security-token': LoginHash(req)}});
    const {tags} = await remote('/tag');

    return {
        props: {
            initialData: news,
            tags,
            title: "Articoli di prossima pubblicazione",
            image: '/images/home.jpg',
            breadCrumbs: [
                {url: null, label: "Articoli pubblicati"}
            ]
        },
    }
}

export default IncomingArticle;
