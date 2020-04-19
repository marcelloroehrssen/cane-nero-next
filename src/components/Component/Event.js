import React, { useState } from 'react'
import moment from 'moment'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Link from '@material-ui/core/Link'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import CardActions from '@material-ui/core/CardActions'
import DeleteIcon from '@material-ui/icons/Delete'
import RoleCheck from '../RoleCheck'
import Alert from './Alert'
import PropTypes from 'prop-types'

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
  },
  title: {
    fontSize: 14
  }
});

export default function Event (props) {
  const classes = useStyles();
  const [alertShow, setAlertShow] = useState(false);

  const onDelete = () => {setAlertShow(true)};
  const onCancel = () => {setAlertShow(false)};

  return (
    <Card>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.event.chronicle.name}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.event.name}
        </Typography>
        <Typography variant="body2" component="p">
          {"l'evento si terrà "}
          <Tooltip title={moment(props.event.date).locale('it').format('dddd, DD MMMM YYYY')} arrow>
            <Link color={'secondary'}>
              {moment(props.event.date).locale('it').fromNow()}
            </Link>
          </Tooltip>
        </Typography>
        <Typography variant="body2" component="p">
                    A {props.event.location}
        </Typography>
        <br/>
        <Typography className={classes.title} color="textSecondary">
                    Creato da {props.event.creator.username}
        </Typography>
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
        onConfirm={props.onDelete(props.event)}
        onCancel={onCancel}/>
    </Card>
  )
}
