import React from 'react';
import Base from "../src/components/layout/Base";
import FullScreenContent from "../src/components/layout/FullScreenContent";
import {Box, Container} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Section from "../src/components/layout/Section";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import StaffCard from "../src/components/card/StaffCard";
import Grid from "@material-ui/core/Grid";

export default function Index() {

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
            </Container>
        </Base>
    );
}