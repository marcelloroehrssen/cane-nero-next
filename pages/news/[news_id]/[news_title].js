import React from 'react';
import Base from "../../../src/components/layout/Base";
import NewsBody from "../../../src/components/News/NewsBody";
import remote from "../../../src/Utils/Remote";
import {config} from "../../../src/Config";
import {useRouter} from 'next/router'
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const NewsDetailPage = ({news, tags, related}) => {
    const router = useRouter();

    if (router.isFallback) {
        return (
            <Backdrop open={true}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        );
    }

    return (
        <Base>
            <NewsBody news={news} tags={tags} related={related}/>
        </Base>
    );
}

export async function getStaticProps({params}) {
    const newsGet = {
        filter: JSON.stringify({
            id: params.news_id
        }),
        maxresult: 1
    };
    const {news} = await remote('/news', {get: newsGet});
    const {tags} = await remote('/tag');

    const relatedNews = {
        filter: JSON.stringify({
            tags: news[0].tags.map(t => t.slug)
        }),
        maxresult: 4
    };
    const {news: related} = await remote('/news', {get: relatedNews});

    return {
        revalidate: config.page.news_news.revalidate,
        props: {
            news_id: news[0].id,
            news: news[0],
            tags,
            related,
            title: news[0].title,
            image: '/images/home.jpg',
            breadCrumbs: [
                {url: "/news", label: "news"},
                {url: null, label: news[0].title},
            ]
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
        fallback: true
    };
}

export default NewsDetailPage;