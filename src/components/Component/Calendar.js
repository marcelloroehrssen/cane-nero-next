import React, { useContext, useState } from 'react'
import useHttp from '../../hooks/UseHttp'
import Grid from '@material-ui/core/Grid'
import { Button, CircularProgress } from '@material-ui/core'
import Event from './Event'
import Typography from '@material-ui/core/Typography'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import LastPageIcon from '@material-ui/icons/LastPage'
import moment from 'moment'
import IconButton from '@material-ui/core/IconButton'
import AddBoxIcon from '@material-ui/icons/AddBox'
import Tooltip from '@material-ui/core/Tooltip'
import RoleCheck from '../RoleCheck'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import NewEventForm from './NewEventForm'
import { useCookies } from 'react-cookie'
import FlashBarContext from '../../provider/FlashBarContext'
import ConfigContext from '../../provider/ConfigContext'
import LengthCheck from '../layout/LengthCheck'
import PropTypes from 'prop-types'
import useDelete from "../../hooks/useDelete";

CalendarControlButton.propTypes = {
  tooltip: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

function CalendarControlButton (props) {
  return (
    <Typography variant="button" component="div" align={'center'}>
      <Tooltip title={props.tooltip} arrow>
        <IconButton onClick={props.onClick}>
          {props.children}
        </IconButton>
      </Tooltip>
    </Typography>
  )
};

Calendar.propTypes = {
  onSubmitError: PropTypes.func
};

export default function Calendar () {
  const config = useContext(ConfigContext);
  const flashContext = useContext(FlashBarContext);
  const [newEventDialogOpen, setNewEventDialogOpen] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth());
  const [events, setEvent] = useState(null);
  const deleteFunction = useDelete();

  useHttp(
    config.ws_url + '/event?filter=' + JSON.stringify({ month: (month + 1) % 13 }),
    {},
    (eventResponse) => setEvent(eventResponse.events),
    () => flashContext.show('C\'è stato un errore nel caricamento degli eventi', 'error')
  );

  const updateMonth = month => () => {
    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      cache: 'default',
      mode: 'cors',
      method: 'GET'
    };
    fetch(config.ws_url + '/event?filter=' + JSON.stringify({ month: (month + 1) % 13 }), options)
      .then(response => response.json())
      .then(json => {
        setEvent(json.events)
      })
      .then(() => {
        setMonth(month)
      })
      .catch(error => {
        flashContext.show('C\'è stato un errore nel caricamento delle news', 'error')
        console.log(error)
      })
  };

  const handleCloseNewEventDialogModal = () => {
    setNewEventDialogOpen(false);
  };

  const addEvent = (event) => {
    if (new Date(event.date).getMonth() === month) {
      events.push(event);
      setEvent(events);
    }
  };

  const removeEvent = eventToRemove => () => {
    const state = [...events];
    const index = state.indexOf(eventToRemove);
    if (index !== -1) {
      state.splice(index, 1);
      setEvent(state);
    }
    deleteFunction(
        '/event', eventToRemove.id,
        'Evento cancellato con successo',
        'C\'è stato un errore durante la cancellazione dell\'evento'
    );
  };

  if (events === null) {
    return <CircularProgress/>
  }

  return (
    <>
      <Grid container spacing={2} alignItems="stretch" direction="row" justify="center">
        <Grid item xs={1}>
          <CalendarControlButton
            onClick={updateMonth(0)}
            tooltip={'gennaio'}>
            <FirstPageIcon/>
          </CalendarControlButton>
        </Grid>
        <Grid item xs={1}>
          <CalendarControlButton
            onClick={updateMonth((month - 1) % 12)}
            tooltip={moment().month(month - 1).locale('it').format('MMMM')}>
            <ChevronLeftIcon/>
          </CalendarControlButton>
        </Grid>
        <Grid item xs={8}>
          <Typography gutterBottom variant="h4" component="h4" align={'center'}>
            {moment().month(month).locale('it').format('MMMM')}
            <RoleCheck role={'ROLE_ADMIN'}>
              <Tooltip title={'Crea un nuovo evento'} arrow>
                <IconButton onClick={() => setNewEventDialogOpen(true)}>
                  <AddBoxIcon color={'primary'}/>
                </IconButton>
              </Tooltip>
            </RoleCheck>
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <CalendarControlButton
            onClick={updateMonth((month + 1) % 12)}
            tooltip={moment().month(month + 1).locale('it').format('MMMM')}>
            <ChevronRightIcon/>
          </CalendarControlButton>
        </Grid>
        <Grid item xs={1}>
          <CalendarControlButton
            onClick={updateMonth(11)}
            tooltip={'dicembre'}>
            <LastPageIcon/>
          </CalendarControlButton>
        </Grid>
        <LengthCheck obj={events}
          op={'gt'}
          min={0}
          msg={
            <Grid item xs={12}>
              <Typography align={'center'}>
                <em>Non ci sono eventi in programma!</em>
              </Typography>
            </Grid>
          }>
          {
            events.map(event => {
              return (
                <Grid key={event.id} item xs={12} md={4}>
                  <Event event={event} onDelete={removeEvent}/>
                </Grid>
              )
            })
          }
        </LengthCheck>
      </Grid>
      <Dialog open={newEventDialogOpen}
        onClose={handleCloseNewEventDialogModal}
        aria-labelledby="form-dialog-title"
        maxWidth={'xs'}>
        <DialogTitle id="form-dialog-title">Crea un evento</DialogTitle>
        <DialogContent>
          <NewEventForm
            onSubmitSuccess={handleCloseNewEventDialogModal}
            onSubmitError={() => {}}
            addEvent={addEvent}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewEventDialogModal} color="secondary">Chiudi</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
