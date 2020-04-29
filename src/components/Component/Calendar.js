import React, {useState} from 'react'
import Grid from '@material-ui/core/Grid'
import {Button} from '@material-ui/core'
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
import LengthCheck from '../layout/LengthCheck'
import PropTypes from 'prop-types'
import useDelete from "../../hooks/useDelete";
import useSWR, {mutate} from "swr";
import remote from "../../Utils/Remote";

const CalendarControlButton = ({tooltip, onClick, children}) => (
    <Typography variant="button" component="div" align={'center'}>
        <Tooltip title={tooltip} arrow>
            <IconButton onClick={onClick}>
                {children}
            </IconButton>
        </Tooltip>
    </Typography>
);

CalendarControlButton.propTypes = {
    tooltip: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};


const Calendar = ({events, chronicles}) => {
    const [newEventDialogOpen, setNewEventDialogOpen] = useState(false);
    const [month, setMonth] = useState(new Date().getMonth());
    const deleteFunction = useDelete();
    const {data, mutate: localMutate} = useSWR(
        ['/event', month],
        (url, month) => remote(url, {get: {filter: JSON.stringify({month: (month + 1) % 13})}}).then(d => d.events),
        {initialData: events}
    );

    const updateMonth = async month => {
        const {events} = await remote('/event', {
            get: {filter: JSON.stringify({month: (month + 1) % 13})}
        });
        mutate(['/event', month], events);
        setMonth(month);
    };

    const removeEvent = eventToRemove => async () => {
        await deleteFunction(
            '/event', eventToRemove.id,
            'Evento cancellato con successo',
            'C\'è stato un errore durante la cancellazione dell\'evento'
        );
        localMutate([...data]);
    };

    return (
        <>
            <Grid container spacing={2} alignItems="stretch" direction="row" justify="center">
                <Grid item xs={1}>
                    <CalendarControlButton
                        onClick={() => updateMonth(0)}
                        tooltip={'gennaio'}>
                        <FirstPageIcon/>
                    </CalendarControlButton>
                </Grid>
                <Grid item xs={1}>
                    <CalendarControlButton
                        onClick={() => updateMonth((month - 1) % 12)}
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
                        onClick={() => updateMonth((month + 1) % 12)}
                        tooltip={moment().month(month + 1).locale('it').format('MMMM')}>
                        <ChevronRightIcon/>
                    </CalendarControlButton>
                </Grid>
                <Grid item xs={1}>
                    <CalendarControlButton
                        onClick={() => updateMonth(11)}
                        tooltip={'dicembre'}>
                        <LastPageIcon/>
                    </CalendarControlButton>
                </Grid>
                <LengthCheck obj={data} op={'gt'} min={0} msg={
                    <Grid item xs={12}>
                        <Typography align={'center'}>
                            <em>Non ci sono eventi in programma!</em>
                        </Typography>
                    </Grid>
                }>
                    {
                        data.map(event => {
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
                    onClose={() => setNewEventDialogOpen(false)}
                    aria-labelledby="form-dialog-title"
                    maxWidth={'xs'}>
                <DialogTitle id="form-dialog-title">Crea un evento</DialogTitle>
                <DialogContent>
                    <NewEventForm
                        chronicles={chronicles}
                        onSubmitSuccess={() => setNewEventDialogOpen(false)}
                        addEvent={() => localMutate([ ...data])}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setNewEventDialogOpen(false)} color="secondary">Chiudi</Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

Calendar.propTypes = {
    events: PropTypes.array.isRequired,
    chronicles: PropTypes.array.isRequired
};

export default Calendar;
