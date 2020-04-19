import React from 'react';
import Base from "../src/components/layout/Base";
import FullScreenContent from "../src/components/layout/FullScreenContent";
import Section from "../src/components/layout/Section";
import Calendar from "../src/components/Component/Calendar";

export default function Eventi(props) {

    return (
        <Base title={"Eventi di gioco di ruolo a Roma in programma"}>
            <FullScreenContent>
                <div style={{
                    backgroundImage: "url(images/home.jpg)",
                    backgroundPosition: "center center",
                    width: "100%",
                    height: 300,
                }}/>
            </FullScreenContent>
            <Section title={"Eventi in programma"}>
                <Calendar />
            </Section>
        </Base>
    );
}