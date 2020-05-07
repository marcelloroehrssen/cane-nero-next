import React from 'react';
import Base from "../src/components/layout/Base";
import Section from "../src/components/layout/Section";
import Calendar from "../src/components/Component/Calendar";
import remote from "../src/Utils/Remote";
import {config} from "../src/Config";

const Eventi = ({events, chronicles}) => (
    <Base>
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

    return {
        revalidate: config.page.eventi.revalidate,
        props: {
            events,
            chronicles,
            title: "Eventi di gioco di ruolo a Roma in programma",
            image: '/images/home.jpg',
            breadCrumbs: [
                {url: null, label: "Eventi"}
            ]
        }
    }
}

export default Eventi;
