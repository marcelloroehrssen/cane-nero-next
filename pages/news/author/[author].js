import React from 'react';
import Base from "../../../src/components/layout/Base";
import Section from "../../../src/components/layout/Section";
import NewsListPage from "../../../src/components/News/NewsListPage";
import remote from "../../../src/Utils/Remote";
import {config} from "../../../src/Config"

const Author = ({filters, pagination, tags, news, title}) => (
    <Base title={'Le ultime notizie di ' + title} image={'images/home.jpg'}>
        <Section title={'Le ultime notizie di ' + title}>
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
        maxResult: config.max_news_per_page,
        offset: 0
    };

    const filters = {id: null, dates: [], tags: [], author: params.author || ''};
    const get = {
        filter: JSON.stringify(filters),
        maxresult: pagination.maxResult,
        offset: pagination.offset
    };
    const {news: news} = await remote('/news', {get});

    return {
        props: {filters, pagination, tags, news, title: params.author}
    }
}

export async function getStaticPaths() {
    const get = {
        filter: JSON.stringify({field: 'news', value: 0})
    };
    const {user: users} = await remote('/user', {get});

    const authorList = users.map(
        user => ({params: {author: user.username}})
    );
    return {
        paths: authorList,
        fallback: false
    };
}

export default Author