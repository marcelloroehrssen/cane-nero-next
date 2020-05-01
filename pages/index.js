import React from 'react';
import NewsList from "../src/components/News/NewsList";
import Base from "../src/components/layout/Base";
import remote from "../src/Utils/Remote";
import {config} from "../src/Config";

const Index = ({news, filters}) => (
    <Base title={"Homepage"} image={'/images/home.jpg'}>
        <NewsList title={"In Evidenza"} news={news} filters={filters}/>
    </Base>
);

export async function getStaticProps() {
    const get = {
        filters: {id: null, dates: [], tags: ['in-evidenza'], author: null},
        maxresult: config.max_news_per_homepage,
        offset: 0
    };
    const {news} = await remote('/news', {get});

    return {
        props: {news, filters:get}
    }
}

export default Index;
