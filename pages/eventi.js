import React from 'react';
import Base from "../src/components/layout/Base";
import Section from "../src/components/layout/Section";
import Calendar from "../src/components/Component/Calendar";
import remote from "../src/Utils/Remote";

const Eventi = ({events, chronicles}) => (
    <Base title={"Eventi di gioco di ruolo a Roma in programma"} image={'images/home.jpg'}>
        <Section title={"Eventi in programma"}>
            <Calendar events={events} chronicles={chronicles}/>
        </Section>
    </Base>
);

export async function getStaticProps({params}) {
    const get = {
        filter: JSON.stringify({
            month: (new Date().getMonth() + 1) % 13
        })
    };
    const {events} = await remote('/event', {get});
    const {chronicles} = await remote('/chronicle');

    return {props: {events, chronicles}}
}

export default Eventi;
