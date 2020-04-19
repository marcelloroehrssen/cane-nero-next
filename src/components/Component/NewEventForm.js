import React, { useContext, useEffect, useState } from 'react'
import Text from '../form/Text'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import moment from 'moment'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import { useStyles } from '../header/LoginRegisterStyle'
import Divider from '@material-ui/core/Divider'
import useHttp from '../../hooks/UseHttp'
import ItemSelect from '../form/Select'
import FlashBarContext from '../../provider/FlashBarContext'
import ConfigContext from '../../provider/ConfigContext'
import PropTypes from 'prop-types'
import useForm from "../../hooks/useForm";

NewEventForm.propTypes = {
  addEvent: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
  onSubmitError: PropTypes.func.isRequired
};

export default function NewEventForm (props)
{
  const config = useContext(ConfigContext);
  const flashContext = useContext(FlashBarContext);
  const classes = useStyles();
  const [handlerValue, handlerSubmit, event, errorState] = useForm(
      'event',
      {name: '', chronicle: 0, location: '', date: new Date()},
      {
        'name': value => value !== '',
        'location': value => value !== '',
        'chronicle': value => value !== 0,
      }
  );
  const [chronicle, setChronicleList] = useState([]);

  useHttp(
      config.ws_url + '/chronicle',
      {},
      setChronicleList,
      () => flashContext.show('C\'è stato un errore nel caricamento delle cronache', 'error')
  );

  const submit = () => {
    handlerSubmit((response) => {
      props.addEvent(response.events[0]);
      props.onSubmitSuccess();
      flashContext.show('Evento creato con successo', 'success');
    })
  };
  return (
    <>
      <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
        <Text
          id="event_name"
          label="Nome evento"
          containerClass={classes.row}
          color="secondary"
          onChange={e => {handlerValue('name', e.target.value)}}
          error={errorState.name}
          required
          fullWidth
        />
        <Text
          id="event_location"
          label="Location"
          containerClass={classes.row}
          color="secondary"
          onChange={e => {handlerValue('location', e.target.value)}}
          error={errorState.location}
          required
          fullWidth
        />
        <DatePicker
          id="event_date_picker"
          label="Scegli la data del tuo evento"
          value={new Date(moment(event.date))}
          margin="normal"
          format="DD/MM/YYYY"
          onChange={e => {handlerValue('date', e)}}
          animateYearScrolling
          disablePast={true}
          autoOk={true}
          fullWidth
          disableToolbar
        />
        <ItemSelect
          id="event_chronicle"
          label="Per quale cronaca è l'evento"
          containerClass={classes.row}
          color="secondary"
          onChange={e => {handlerValue('chronicle', e.target.value)}}
          error={errorState.chronicle}
          options={chronicle.chronicles}
          required
          fullWidth
        />
        <Divider className={classes.facebookLogin}/>
        <FormControl fullWidth>
          <Button color="secondary" variant={'outlined'} onClick={submit}>Crea evento</Button>
        </FormControl>
      </MuiPickersUtilsProvider>
    </>
  )
}
