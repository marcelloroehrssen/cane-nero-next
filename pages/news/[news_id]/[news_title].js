import React from 'react';
import {useRouter} from "next/router";
import Base from "../../../src/components/layout/Base";
import FullScreenContent from "../../../src/components/layout/FullScreenContent";
import {Container} from "@material-ui/core";
import NewsBody from "../../../src/components/News/NewsBody";

export default function NewsDetailPage() {

    const router = useRouter();

    return (
        <Base title={router.query.news_title}>
            <FullScreenContent>
                <div style={{
                    backgroundImage: "url(/images/home.jpg)",
                    backgroundPosition: "center center",
                    width: "100%",
                    height: 300,
                }}/>
            </FullScreenContent>
            <Container>
                <NewsBody id={router.query.news_id}/>
            </Container>
        </Base>
    );
}