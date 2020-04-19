import React, { useContext, useState } from 'react'
import useHttp from '../../hooks/UseHttp'
import Grid from '@material-ui/core/Grid'
import NewsCard from '../card/NewsCard'
import { CircularProgress } from '@material-ui/core'
import ConfigContext from '../../provider/ConfigContext'
import FlashBarContext from '../../provider/FlashBarContext'
import PropTypes from 'prop-types'

RelatedArticle.propTypes = {
  news: PropTypes.object.isRequired
}

export default function RelatedArticle (props) {
  const config = useContext(ConfigContext)
  const flashContext = useContext(FlashBarContext)
  const [relatedNews, setRelatedNews] = useState([])

  useHttp(
    config.ws_url + '/news?filter=' + JSON.stringify({ tags: props.news.tags }) + '&maxresult=4',
    {},
    (response) => setRelatedNews(response.news),
    () => flashContext.show('C\'è stato un errore nel caricamento delle news', 'error')
  )

  if (relatedNews === null) {
    return <CircularProgress/>
  }
  return (
    <Grid item xs={12} container spacing={2} alignItems="center" direction="row" justify="center">
      {
        relatedNews.map(newsItem => {
          if (newsItem.id === props.news.id) {
            return <span key={newsItem.id}/>
          }
          return (
            <Grid key={newsItem.id} item xs={12} md={3}>
              <NewsCard news={newsItem}/>
            </Grid>
          )
        })
      }
    </Grid>
  )
}
