import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from 'next/link'
import moment from 'moment'
import Section from '../layout/Section'
import {Avatar} from '@material-ui/core'
import PropTypes from 'prop-types'
import Grid from "@material-ui/core/Grid";
import NewsRelatedTag from "./NewsRelatedTag";
import RelatedArticle from "./RelatedArticle";
import ReactHtmlParser from 'react-html-parser';

const NewsBody = ({news, tags, related}) => (
    <>
        <Section title={news.title}>
            <Typography variant="body2" color="primary" component="p">
                {ReactHtmlParser(news.text)}
            </Typography>
            <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
                <Grid item>di </Grid>
                <Grid item>
                    <Avatar alt={news.author.username} src={news.author.avatar} component={'span'}>
                        {news.author.firstName.slice(0, 1)}{news.author.lastName.slice(0, 1)}
                    </Avatar>
                </Grid>
                <Grid>
                    <Link href={'/news/author/[author]'} as={'/news/author/' + news.author.username}>
                        <a>{news.author.firstName} {news.author.lastName}</a>
                    </Link>,
                </Grid>
                <Grid>
                    {moment(news.date).locale('it').format('dddd, gg MMMM YYYY')}
                </Grid>
            </Grid>
        </Section>
        <Section title={'Articoli correlati'} component={'p'} variant={'h6'}>
            <RelatedArticle news={related} current={news.id}/>
        </Section>
        <Section title={'Altri argomenti dal GDR'} component={'p'} variant={'h6'}>
            <NewsRelatedTag tags={tags}/>
        </Section>
    </>
);

NewsBody.propTypes = {
    news: PropTypes.object.isRequired,
    tags: PropTypes.array.isRequired,
    related: PropTypes.array.isRequired
};

export default NewsBody;
