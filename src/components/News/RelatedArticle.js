import React from 'react'
import Grid from '@material-ui/core/Grid'
import NewsCard from '../card/NewsCard'
import PropTypes from 'prop-types'

const RelatedArticle = ({news, current}) => (
    <Grid container direction="row" justify="flex-start" alignItems="stretch" spacing={2}>
        {
            news.filter(n => n.id !== current)
                .map(newsItem => (
                        <Grid key={newsItem.id} item xs={12} md={3}>
                            <NewsCard news={newsItem}/>
                        </Grid>
                    )
                )
        }
    </Grid>
);

RelatedArticle.propTypes = {
    news: PropTypes.array.isRequired,
    current: PropTypes.number.isRequired
};

export default RelatedArticle;
