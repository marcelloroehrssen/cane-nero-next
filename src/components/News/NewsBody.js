import React, {useContext, useState} from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '../Link'
import moment from 'moment'
import useHttp from '../../hooks/UseHttp'
import Section from '../layout/Section'
import RelatedArticle from './RelatedArticle'
import {Avatar, CircularProgress} from '@material-ui/core'
import ConfigContext from '../../provider/ConfigContext'
import NewsRelatedTag from './NewsRelatedTag'
import FlashBarContext from '../../provider/FlashBarContext'
import PropTypes from 'prop-types'
import Grid from "@material-ui/core/Grid";

NewsBody.propTypes = {
    id: PropTypes.string.isRequired
};

export default function NewsBody(props) {
    const config = useContext(ConfigContext);
    const flashContext = useContext(FlashBarContext);
    const [news, setNews] = useState(null);

    useHttp(
        config.ws_url + '/news?filter=' + JSON.stringify({id: props.id}) + '&maxresult=1',
        {},
        (response) => setNews(response.news[0]),
        () => flashContext.show('C\'è stato un errore nel caricamento delle news', 'error'),
        [props.id]
    );

    if (news === null) {
        return <CircularProgress/>
    }

    return (
        <>
            <Section title={news.title}>
                <Typography variant="body2" color="primary" component="p" dangerouslySetInnerHTML={{__html: news.text}}/>
                <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
                    <Grid item>di </Grid>
                    <Grid item>
                        <Link href={'/news?author=' + news.author.username} as={'/news/author/' + news.author.username} color={'primary'}>
                            <Avatar alt={news.author.username} src={news.author.avatar} component={'span'}>
                                {news.author.firstName.slice(0, 1)}{news.author.lastName.slice(0, 1)}
                            </Avatar>
                        </Link>
                    </Grid>
                    <Grid>
                        <Link href={'/news?author=' + news.author.username} as={'/news/author/' + news.author.username}
                              color={'primary'}>
                            {news.author.firstName} {news.author.lastName}
                        </Link>,
                    </Grid>
                    <Grid>
                        {moment(news.date).locale('it').format('dddd, gg MMMM YYYY')}
                    </Grid>
                </Grid>
            </Section>
            <Section title={'Articoli correlati'} component={'p'} variant={'h6'}>
                <RelatedArticle news={news}/>
            </Section>
            <Section title={'Altri argomenti dal GDR'} component={'p'} variant={'h6'}>
                <NewsRelatedTag/>
            </Section>
        </>
    )
}
