import React from 'react';
import Base from "../../../src/components/layout/Base";
import NewsBody from "../../../src/components/News/NewsBody";
import remote from "../../../src/Utils/Remote";
import {config} from "../../../src/Config";

const NewsDetailPage = ({news, tags, related}) => (
    <Base title={news.title} image={'/images/home.jpg'}>
        <NewsBody news={news} tags={tags} related={related}/>
    </Base>
);

export async function getStaticProps({params}) {
    const newsGet = {
        filter: JSON.stringify({
            id: params.news_id
        }),
        maxresult: 1
    };
    const {news} = await remote('/news', {get:newsGet});
    const {tags} = await remote('/tag');

    const relatedNews = {
        filter: JSON.stringify({
            tags: news[0].tags.map(t => t.slug)
        }),
        maxresult: 4
    };
    const {news:related} = await remote('/news', {get:relatedNews});

    return {
        revalidate: config.page.news_news.revalidate,
        props: {
            news_id:news[0].id,
            news:news[0],
            tags,
            related
        }
    }
}

export async function getStaticPaths() {
    const {news} = await remote('/news');

    const paths = news.map(
        n => ({params: {news_id: n.id.toString(), news_title: n.title}})
    );

    return {
        paths,
        fallback: false
    };
}

export default NewsDetailPage;