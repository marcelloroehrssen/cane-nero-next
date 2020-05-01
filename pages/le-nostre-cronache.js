import React from 'react';
import Base from "../src/components/layout/Base";
import Section from "../src/components/layout/Section";
import Grid from "@material-ui/core/Grid";
import ChronicleCard from "../src/components/card/ChronicleCard";
import remote from "../src/Utils/Remote";

const OurChronicle = ({chronicles}) => (
    <Base title={"Le nostre cronache"} image={'/images/home.jpg'}>
        <Section title={"Le nostre cronache"}>
            <Grid container spacing={2} alignItems="stretch" direction="row" justify="center">
                {
                    chronicles.map((chronicle) => {
                        return (
                            <Grid item xs={12} md={4} key={chronicle.id}>
                                <ChronicleCard chronicle={chronicle}/>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Section>
    </Base>
);

export async function getStaticProps({params}) {
    const {chronicles} = await remote('/chronicle');

    return {
        props: {chronicles}
    }
}

export default OurChronicle