import React from 'react';
import Base from "../../../src/components/layout/Base";
import Section from "../../../src/components/layout/Section";
import NewsListPage from "../../../src/components/News/NewsListPage";
import remote from "../../../src/Utils/Remote";
import {config} from "../../../src/Config"
import {useRouter} from "next/router";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const Tag = ({filters, pagination, tags, news, title}) => {

    const router = useRouter();

    if (router.isFallback) {
        return (
            <Backdrop open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    return (
        <Base title={'Le ultime notizie su ' + title} image={'/images/home.jpg'} breadCrumbs={[
            {url:"/news", label:"news"},
            {url:null, label:title},
        ]}>
            <Section title={'Le ultime notizie su ' + title}>
                <NewsListPage filters={filters}
                              pagination={pagination}
                              news={news}
                              tags={tags}/>
            </Section>
        </Base>
    );
}

export async function getStaticProps({params}) {
    const {tags: tags} = await remote('/tag');

    let pagination = {
        maxResult: config.page.news_tags.max_news_per_page,
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
        revalidate: config.page.news_tags.revalidate,
        props: {filters, pagination, tags, news, title: currentTag.label}
    }
}

export async function getStaticPaths() {
    const {tags: tags} = await remote('/tag');
    const paths = tags.map(
        tag => ({params: {tag: tag.slug}})
    );

    return {paths, fallback: true};
}

export default Tag