import React from 'react';
import Base from "../src/components/layout/Base";
import FullScreenContent from "../src/components/layout/FullScreenContent";
import {Container} from "@material-ui/core";
import Section from "../src/components/layout/Section";
import Grid from "@material-ui/core/Grid";
import Chronicles from "../src/components/Chronicle/ChoniclePage";

export default function OurChronicle() {



    return (
        <Base title={"Chi Siamo"}>
            <FullScreenContent>
                <div style={{
                    backgroundImage: "url(images/home.jpg)",
                    backgroundPosition: "center center",
                    width: "100%",
                    height: 300,
                }}/>
            </FullScreenContent>
            <Container>
                <Section title={"Le nostre cronache"}>
                    <Grid container spacing={2} alignItems="stretch" direction="row" justify="center">
                        <Chronicles />
                    </Grid>
                </Section>
            </Container>
        </Base>
    );
}