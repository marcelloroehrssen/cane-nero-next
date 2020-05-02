import React, {useState} from 'react'
import moment from 'moment'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Link from 'next/link'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import CardActions from '@material-ui/core/CardActions'
import DeleteIcon from '@material-ui/icons/Delete'
import RoleCheck from '../RoleCheck'
import Alert from './Alert'
import PropTypes from 'prop-types'
import Grid from "@material-ui/core/Grid";
import {Avatar} from "@material-ui/core";
import {theme} from "../../Theme";

Event.propTypes = {
    event: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired
};

const useStyles = makeStyles({
    root: {
        minWidth: 275
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)'
    }
});

export default function Event(props) {
    const classes = useStyles();
    const [alertShow, setAlertShow] = useState(false);

    const onDelete = () => {
        setAlertShow(true)
    };
    const onCancel = () => {
        setAlertShow(false)
    };

    return (
        <Card>
            <CardContent>
                <Typography style={{fontSize: 14}} color="textSecondary" gutterBottom>
                    {props.event.chronicle.name}
                </Typography>
                <Typography variant="h5" component="h2">
                    {props.event.name}
                </Typography>
                <Typography variant="body2" component="p">
                    {"l'evento si terrà "}
                    <Tooltip title={moment(props.event.date).locale('it').format('dddd, DD MMMM YYYY')} arrow>
                       <a href="#" style={{color:theme.palette.secondary.main}}>{moment(props.event.date).locale('it').fromNow()}</a>
                    </Tooltip>
                </Typography>
                <Typography variant="body2" component="p">
                    A {props.event.location}
                </Typography>
                <br/>
                <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
                    <Grid item>di </Grid>
                    <Grid item>
                        <Avatar alt={props.event.creator.username} src={props.event.creator.avatar} component={'span'}>
                            {props.event.creator.firstName.slice(0, 1)}{props.event.creator.lastName.slice(0, 1)}
                        </Avatar>
                    </Grid>
                    <Grid>
                        <Link href={'/news/author/[author]'} as={'/news/author/' + props.event.creator.username}>
                            <a style={{color:theme.palette.secondary.contrastText}}>
                                {props.event.creator.firstName} {props.event.creator.lastName}
                            </a>
                        </Link>
                    </Grid>
                </Grid>
            </CardContent>
            <RoleCheck role={'ROLE_ADMIN'}>
                <CardActions>
                    <Tooltip title={'Elimina questo evento'} arrow>
                        <IconButton onClick={onDelete}>
                            <DeleteIcon color={'secondary'}/>
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </RoleCheck>
            <Alert
                open={alertShow}
                title={'Sei sicuro?'}
                text={"Sei sicuro di voler eliminare questo evento? L'operazione sarà irreversibile"}
                onConfirm={() => {props.onDelete(props.event)}}
                onCancel={onCancel}/>
        </Card>
    )
}
