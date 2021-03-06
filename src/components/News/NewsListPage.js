import React, {useState} from 'react'
import {Button} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Chip from '@material-ui/core/Chip'
import NewsCard from '../card/NewsCard'
import useTheme from '@material-ui/core/styles/useTheme'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import LengthCheck from '../layout/LengthCheck'
import PropTypes from 'prop-types'
import RoleCheck from "../RoleCheck";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import makeStyles from "@material-ui/core/styles/makeStyles";
import EditIcon from '@material-ui/icons/Edit';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import DeleteIcon from '@material-ui/icons/Delete';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Alert from "../Component/Alert";
import useDelete from "../../hooks/useDelete";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import NewsForm from "./NewsForm";
import remote from "../../Utils/Remote";
import NextLink from 'next/link'
import useSWR from "swr";
import {config} from "../../Config";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
    root: {
        height: 380,
        transform: 'translateZ(0px)',
        flexGrow: 1,
    },
    speedDial: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

NewsListPage.propTypes = {
    filters: PropTypes.object.isRequired
};

export default function NewsListPage(props) {
    const {data: news, mutate} = useSWR(
        ['/news', props.filters, props.pagination],
        (resource, filter, pagination) => remote(
            resource,
            {get:{filter:filters,maxresult:pagination.max_news_per_page,offset: pagination.offset}}
        ),
        {initialData: props.news}
    );

    const [tags,] = useState(props.tags);
    const [pagination, setPagination] = useState(props.pagination);

    const theme = useTheme();
    const [openSpeedDial, setOpenSpeedDial] = useState(false);
    const [activeAction, setActiveAction] = useState(null);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [subject, setSubject] = useState(null);
    const [newNewsDialogOpen, setNewNewsDialogOpen] = useState(false);
    const deleteFunction = useDelete();
    const classes = useStyles();

    const loadMore = async () => {
        setPagination({
            maxResult: pagination.maxResult + config.max_news_per_page,
            offset: 0
        });
        const get = {filter:JSON.stringify(props.filters), maxresult:pagination.maxResult, offset: pagination.offset};
        const {news: newNews} = await remote('/news', {get});

        mutate(newNews);
    };


    const onNewsCreation = (newNews, isInsert) => {
        mutate(news);
        setNewNewsDialogOpen(false);
    };

    const deleteNews = async deleteSubject => {
        await deleteFunction(
            '/news', deleteSubject.id,
            'News cancellata con successo',
            'C\'è stato un errore durante la cancellazione della news, l\'operazione sarà effettiva entro 30 minuti'
        );
        mutate(news);
    };

    const actions = [
        {
            icon: <AddBoxIcon color={"secondary"}/>,
            name: 'Nuovo',
            style: {backgroundColor: "#188038"},
            activeAction: 'new',
            callback: () => {
                setNewNewsDialogOpen(true);
                setSubject(null);
            }
        },
        {
            icon: <SpellcheckIcon color={"secondary"}/>,
            name: 'Modifica',
            style: {backgroundColor: "#1a73e8"},
            activeAction: 'edit',
            callback: news => () => {
                setNewNewsDialogOpen(true);
                setSubject(news);
            }
        },
        {
            icon: <DeleteIcon color={"secondary"}/>,
            name: 'Cancella',
            style: {backgroundColor: "#ff0000"},
            activeAction: 'delete',
            callback: news => () => {
                setShowDeleteAlert(true);
                setSubject(news);
            }
        },
        {
            icon: <ExitToAppIcon color={"secondary"}/>,
            name: 'Esci',
            style: {backgroundColor: theme.palette.primary.dark},
            activeAction: 'exit',
            callback: () => {
            }
        },
    ];

    const handleOpen = () => {
        setOpenSpeedDial(true);
    };

    const handleClose = action => () => {
        setOpenSpeedDial(false);
        switch (action.activeAction) {
            case 'new':
                action.callback();
                break;
            case 'exit':
                setActiveAction(null);
                break;
            default:
                setActiveAction(action);
                break;
        }
    };

    return (
        <>
            <Grid container spacing={2} alignItems="stretch" direction="row" justify="center">
                <Grid item xs={12} md={2}>
                    <List component="nav" >
                        <ListItem>Argomenti interessanti</ListItem>
                        {
                            tags.map((tag) => (
                                    <ListItem key={tag.id}>
                                        <NextLink href={tag.slug === props.filters.tags[0] ? '/news' : '/news/tag/[tag]'}
                                              as={tag.slug === props.filters.tags[0] ? '/news' : '/news/tag/' + tag.slug}
                                              passHref
                                        >
                                            <Link underline="none">
                                                <Chip label={tag.label}
                                                      color={tag.slug === props.filters.tags[0] ? 'secondary' : 'primary'}
                                                      clickable/>
                                            </Link>
                                        </NextLink>
                                    </ListItem>
                                )
                            )
                        }
                    </List>
                </Grid>
                <Grid item xs={12} md={10} container spacing={2} alignItems="center" direction="row" justify="center">
                    <LengthCheck obj={news} op={'gt'} min={0}
                                 msg={<Grid item xs={12} md={5}><em>Non ci sono news da mostrare</em></Grid>}>
                        {
                            news.map((newsItem) => {
                                return (
                                    <Grid key={newsItem.id} item xs={12} md={5}>
                                        <NewsCard news={newsItem} activeAction={activeAction} tags={tags}/>
                                    </Grid>
                                )
                            })
                        }
                    </LengthCheck>
                </Grid>
                <LengthCheck obj={news} op={'gt'} min={0} msg={<></>}>
                    <Grid item xs={12} style={{marginTop: theme.spacing(8), textAlign: 'center'}}>
                        <Tooltip title="Vedi Altri" aria-label="Vedi Altri" placement="bottom" arrow>
                            <IconButton className={'news_load_more'} onClick={loadMore}>
                                <AutorenewIcon color={'primary'}/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </LengthCheck>
            </Grid>
            <RoleCheck role={'ROLE_ADMIN'}>
                <SpeedDial
                    size="medium"
                    aria-label="Azioni"
                    component={SpeedDial}
                    ariaLabel="Azioni veloci"
                    className={classes.speedDial}
                    FabProps={{
                        style: {backgroundColor: "#188038"}
                    }}
                    icon={<SpeedDialIcon openIcon={<EditIcon/>}/>}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={openSpeedDial}
                >
                    {
                        actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                FabProps={{style: action.style}}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                onClick={handleClose(action)}
                                tooltipOpen
                                title={action.name}/>
                        ))
                    }
                </SpeedDial>
            </RoleCheck>
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
        </>
    )
}
