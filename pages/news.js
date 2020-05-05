import React from 'react';
import Base from "../src/components/layout/Base";
import Section from "../src/components/layout/Section";
import NewsListPage from "../src/components/News/NewsListPage";
import remote from "../src/Utils/Remote";
import {config} from '../src/Config'

const News = ({filters, pagination, tags, news}) => (
    <Base title={'Le ultime notizie dal GDR'} image={'/images/home.jpg'} breadCrumbs={[
        {url:null, label:"News"}
    ]}>
        <Section title={'Le ultime notizie dal GDR'}>
            <NewsListPage filters={filters}
                          pagination={pagination}
                          news={news}
                          tags={tags}/>
        </Section>
    </Base>
);

export async function getStaticProps({params}) {
    const {tags: tags} = await remote('/tag');

    let pagination = {
        maxResult: config.page.news.max_news_per_page,
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
        revalidate: config.page.news.revalidate,
        props: {filters, pagination, tags, news}
    }
}

export default News
