import remote from "../src/Utils/Remote";
import React from "react";
import Base from "../src/components/layout/Base";
import moment from "moment";
import Section from "../src/components/layout/Section";
import useDelete from "../src/hooks/useDelete";
import LengthCheck from "../src/components/layout/LengthCheck";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Event from "../src/components/Component/Event";

const IncomingEvents = ({initialEvents}) => {

    const deleteFunction = useDelete();
    const removeEvent = async eventToRemove => {
        await deleteFunction(
            '/event', eventToRemove.id,
            'Evento cancellato con successo',
            'C\'è stato un errore durante la cancellazione dell\'evento'
        );
    };

    return (
        <Base title="Eventi in programma" image={'/images/home.jpg'}>
            <Section title="Eventi in programma">
                {
                    initialEvents.map(
                        (e) => (
                            <Section key={e.month} title={e.month} component="h5" variant="h5">
                                <Grid container spacing={2} alignItems="stretch" direction="row" justify="center">
                                    <LengthCheck obj={e.events} op={'gt'} min={0} msg={
                                        <Grid item xs={12}>
                                            <Typography align={'center'}>
                                                <em>Non ci sono eventi in programma!</em>
                                            </Typography>
                                        </Grid>
                                    }>
                                        {
                                            e.events.map(event => {
                                                return (
                                                    <Grid key={event.id} item xs={12} md={4}>
                                                        <Event event={event} onDelete={removeEvent}/>
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </LengthCheck>
                                </Grid>
                            </Section>
                        )
                    )
                }
            </Section>
        </Base>
    );
};

export async function getServerSideProps({req, res})
{
    let initialEvents = [];

    for (let i = 0; i < 12; i++) {
        const {events} = await remote('/event', {get: {filter:JSON.stringify({month: i + 1})}});
        initialEvents.push({
            month: moment(new Date().setMonth(i)).locale('it').format('MMMM'),
            events
        });
    }

    return {
        props: {initialEvents},
    }
}

export default IncomingEvents;
