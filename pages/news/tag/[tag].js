import React from 'react';
import Base from "../../../src/components/layout/Base";
import Section from "../../../src/components/layout/Section";
import NewsListPage from "../../../src/components/News/NewsListPage";
import remote from "../../../src/Utils/Remote";
import {config} from "../../../src/Config"

const Tag = ({filters, pagination, tags, news, title}) => (
        <Base title={'Le ultime notizie su ' + title} image={'/images/home.jpg'}>
            <Section title={'Le ultime notizie su ' + title}>
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
        maxResult: config.page.news_tag.max_news_per_page,
        offset: 0
    };

    let filters = {id: null, dates: [], tags: [params.tag || null], author: null};
    const get = {
        filter: JSON.stringify(filters),
        maxresult: pagination.maxResult,
        offset: pagination.offset
    };
    const {news: news} = await remote('/news', {get});

    const currentTag = tags.find(tag => tag.slug === params.tag);

    return {
        revalidate: config.page.news_tag.revalidate,
        props: {filters, pagination, tags, news, title: currentTag.label}
    }
}

export async function getStaticPaths() {
    const {tags: tags} = await remote('/tag');
    const paths = tags.map(
        tag => ({params: {tag: tag.slug}})
    );

    return {paths, fallback: false};
}

export default Tag