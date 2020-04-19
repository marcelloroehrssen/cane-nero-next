import React from 'react';
import Base from "../src/components/layout/Base";
import FullScreenContent from "../src/components/layout/FullScreenContent";
import {Container} from "@material-ui/core";
import Section from "../src/components/layout/Section";
import NewsListPage from "../src/components/News/NewsListPage";
import remote from "../src/Utils/Remote";
import {config} from '../src/provider/ConfigContext'

function News(props) {

    return (
        <Base title={props.title}>
            <FullScreenContent>
                <div style={{
                    backgroundImage: "url(/images/home.jpg)",
                    backgroundPosition: "center center",
                    width: "100%",
                    height: 300,
                }}/>
            </FullScreenContent>
            <Container>
                <Section title={props.title}>
                    <NewsListPage filters={props.filters} pagination={props.pagination} news={props.news} tags={props.tags}/>
                </Section>
            </Container>
        </Base>
    );
}

export async function getServerSideProps({req, res, query})
{
    const {tags: tags} = await remote('tag');

    let filters = {
        id: null, dates: [], tags: [], author: null,
        ...{...query, tags:[query.tags || null]}
    };

    let title = "Le ultime notizie";
    if (filters.tags) {
        title +=  " su " + filters.tags[0];
    } else if (filters.author) {
        title +=  " da " +  filters.author;
    } else {
        title +=  " dal GDR ";
    }

    let pagination = {
        maxResult: config.max_news_per_page,
        offset: 0
    };

    const {news:news} = await remote(
        'news?filter=' + JSON.stringify(filters) + '&maxresult=' + pagination.maxResult + '&offset=' + pagination.offset
    );
    console.log(JSON.stringify(filters));

    return {
        props: {filters, pagination, title, tags, news}
    }
}

export default News
