import React from 'react';
import Base from "../src/components/layout/Base";
import Section from "../src/components/layout/Section";
import StaffCard from "../src/components/card/StaffCard";
import Grid from "@material-ui/core/Grid";

const Index = () => (
    <Base title={"Chi Siamo"} image={'/images/home.jpg'}>
        <Section title={"Chi Siamo"}>
            <Grid container spacing={2} alignItems="stretch" direction="row" justify="center">
                <Grid item xs={12} md={4}>
                    <StaffCard image="images/paolo-leccese.jpg"
                               role={"Presidente"}
                               title={"Presidente Operaio"}
                               name={"Paolo Leccese"}>
                        Un presidente operaio, sta dedicando grande sforzo al coordinamento del Cane nero
                    </StaffCard>
                </Grid>
                <Grid item xs={12} md={4}>
                    <StaffCard image="images/viviana-de-simone.jpg"
                               role={"Vice presidente"}
                               title={"Narratore di houd"}
                               name={"Viviana de Simone"}>
                        Narratore di houd, cronaca di vampire the masquerade, cronaca di roma
                    </StaffCard>
                </Grid>
                <Grid item xs={12} md={4}>
                    <StaffCard image="images/gabriele-cortina.jpg"
                               role={"Socio organizzatore"}
                               title={"Narratore di nottura"}
                               name={"Gabriele Cortina"}>
                        Narratore di Notturna, cronaca di vampire the masquerade, cronaca di roma
                    </StaffCard>
                </Grid>
                <Grid item xs={12} md={4}>
                    <StaffCard image="images/marcello-roehrssen.jpg"
                               role={"Socio organizzatore"}
                               title={"Responsabile ICT"}
                               name={"Marcello Roehrssen"}>
                        Affascinante e modesto lead developer e responsabile ICT del cane nero e di imperium
                        sanguinis
                    </StaffCard>
                </Grid>
                <Grid item xs={12} md={4}>
                    <StaffCard image="images/paolo-micheli.jpg"
                               role={"Socio organizzatore"}
                               title={"Narratore di Imperium sanguinis"}
                               name={"Paolo Micheli"}>
                        Narratore di Imperium Sanguinis, cronaca di vampire the requiem, cronaca di roma
                    </StaffCard>
                </Grid>
                <Grid item xs={12} md={4}>
                    <StaffCard image="images/pamela-ceccarelli.jpg"
                               role={"Socio organizzatore"}
                               title={"Narratore di Imperium sanguinis"}
                               name={"Pamela Ceccarelli"}>
                        Narratore di Imperium Sanguinis, cronaca di vampire the requiem, cronaca di roma
                    </StaffCard>
                </Grid>
                <Grid item xs={12} md={4}>
                    <StaffCard image="images/flavio-finocchi.jpg"
                               role={"Socio organizzatore"}
                               title={"Narratore del Re Bianco"}
                               name={"Flavio Finocchi"}>
                        Narratore del Re Bianco, cronaca di sine requie, cronaca di roma
                    </StaffCard>
                </Grid>
                <Grid item xs={12} md={4}>
                    <StaffCard image="images/jonathan-alfieri.jpg"
                               role={"Socio organizzatore"}
                               title={"Narratore di Notturna"}
                               name={"Jonathan Alfieri"}>
                        Narratore di Notturna, cronaca di vampire the masquerade, cronaca di roma
                    </StaffCard>
                </Grid>
            </Grid>
        </Section>
    </Base>
);

export default Index;