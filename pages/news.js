import React from 'react';
import Base from "../src/components/layout/Base";
import FullScreenContent from "../src/components/layout/FullScreenContent";
import {Container} from "@material-ui/core";
import Section from "../src/components/layout/Section";
import NewsListPage from "../src/components/News/NewsListPage";
import remote from "../src/Utils/Remote";
import {config} from '../src/Config'

const News = ({filters, pagination, tags, news}) => (
    <Base title={'Le ultime notizie dal GDR'}>
        <FullScreenContent>
            <div style={{
                backgroundImage: "url(/images/home.jpg)",
                backgroundPosition: "center center",
                width: "100%",
                height: 300,
            }}/>
        </FullScreenContent>
        <Container>
            <Section title={'Le ultime notizie dal GDR'}>
                <NewsListPage filters={filters}
                              pagination={pagination}
                              news={news}
                              tags={tags}/>
            </Section>
        </Container>
    </Base>
);

export async function getStaticProps({params}) {
    const {tags: tags} = await remote('/tag');

    let pagination = {
        maxResult: config.max_news_per_page,
        offset: 0
    };

    let filters = {id: null, dates: [], tags: [], author: null};
    const get = {
        filter: JSON.stringify(filters),
        maxresult: pagination.maxResult,
        offset: pagination.offset
    };
    const {news: news} = await remote('/news', {get});

    return {
        props: {filters, pagination, tags, news}
    }
}

export default News
