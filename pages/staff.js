import React from 'react';
import Base from "../src/components/layout/Base";
import Section from "../src/components/layout/Section";
import StaffCard from "../src/components/card/StaffCard";
import Grid from "@material-ui/core/Grid";

const Index = () => (
    <Base>
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
                               title={"Narratore di hound backyard"}
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
                <Grid item xs={12} md={4}>
                    <StaffCard image="images/andrea-ceravolo.jpg"
                               role={"Socio organizzatore"}
                               title={"blah blah"}
                               name={"Andrea Ceravolo"}>
                        blah blah blah
                    </StaffCard>
                </Grid>
                <Grid item xs={12} md={4}>
                    <StaffCard image="images/denis-cerini.jpg"
                               role={"Socio organizzatore"}
                               title={"blah blah"}
                               name={"Denis Cerini"}>
                        blah blah blah
                    </StaffCard>
                </Grid>
                <Grid item xs={12} md={4}>
                    <StaffCard image="images/francesco-foglietta.jpg"
                               role={"Socio organizzatore"}
                               title={"blah blah"}
                               name={"Francesco Foglietta"}>
                        blah blah blah
                    </StaffCard>
                </Grid>
                <Grid item xs={12} md={4}>
                    <StaffCard image="images/francesco-tullio.jpg"
                               role={"Socio organizzatore"}
                               title={"blah blah"}
                               name={"Francesco Tullio"}>
                        blah blah blah
                    </StaffCard>
                </Grid>
                <Grid item xs={12} md={4}>
                    <StaffCard image="images/gabriele-ricigliano.jpg"
                               role={"Tesoriere"}
                               title={"Giocatore di Imperium Sanguinis"}
                               name={"Gabriele Ricigliano"}>
                        blah blah blah
                    </StaffCard>
                </Grid>
                <Grid item xs={12} md={4}>
                    <StaffCard image="images/marco-rufini.jpg"
                               role={"Socio organizzatore"}
                               title={"blah blah"}
                               name={"Marco Rufini"}>
                        blah blah blah
                    </StaffCard>
                </Grid>
                <Grid item xs={12} md={4}>
                    <StaffCard image="images/massimo-orsini.jpg"
                               role={"Socio organizzatore"}
                               title={"blah blah"}
                               name={"Massimo Orsini"}>
                        blah blah blah
                    </StaffCard>
                </Grid>
                <Grid item xs={12} md={4}>
                    <StaffCard image="images/sara-pascolini.jpg"
                               role={"Socio organizzatore"}
                               title={"blah blah"}
                               name={"Sara Pascolini"}>
                        blah blah blah
                    </StaffCard>
                </Grid>
                <Grid item xs={12} md={4}>
                    <StaffCard image="images/valerio-fabi.jpg"
                               role={"Socio organizzatore"}
                               title={"Narratore di Imperium sanguinis"}
                               name={"Valerio Fabi"}>
                        Narratore di Imperium Sanguinis, cronaca di vampire the requiem, cronaca di roma
                    </StaffCard>
                </Grid>
            </Grid>
        </Section>
    </Base>
);

export async function getStaticProps() {
    return {
        props: {
            title: "Staff",
            image: '/images/home.jpg',
            breadCrumbs: [
                {url: null, label: "Staff"}
            ]
        }
    }
}

export default Index;