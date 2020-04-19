import React, {useContext, useState} from 'react'
import useHttp from '../../hooks/UseHttp'
import GridList from '@material-ui/core/GridList'
import IconButton from '@material-ui/core/IconButton'
import Section from '../layout/Section'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import Loader from '../Loader'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import InfoIcon from '@material-ui/icons/Info'
import ConfigContext from '../../provider/ConfigContext'
import FlashBarContext from '../../provider/FlashBarContext'
import Link from '../Link'
import useTheme from '@material-ui/core/styles/useTheme'
import PropTypes from 'prop-types'

NewsList.propTypes = {
    title: PropTypes.string.isRequired
};

export default function NewsList(props) {
    const theme = useTheme();
    const config = useContext(ConfigContext);
    const flashContext = useContext(FlashBarContext);
    const [newsList, setNewsList] = useState(null);
    const filters = {id: null, dates: [], tags: ['In evidenza'], author: null};
    const [pagination, setPagination] = useState({maxResult: config.max_news_per_homepage, offset: 0});

    useHttp(
        config.ws_url + '/news?filter=' + JSON.stringify(filters) + '&maxresult=' + pagination.maxResult + '&offset=' + pagination.offset,
        {},
        (response) => setNewsList(response.news),
        () => flashContext.show('C\'è stato un errore nel caricamento delle news', 'error'),
        [pagination]
    );

    const loadMore = () => {
        setPagination({
            maxResult: pagination.maxResult + config.max_news_per_homepage,
            offset: 0
        })
    };

    const Content = () => {
        return (
            <React.Fragment>
                <div style={{flexGrow: 1}}>
                    <GridList cols={12} cellHeight={400}>
                        {
                            newsList.map(
                                (news, index) => {
                                    return (
                                        <GridListTile
                                            key={news.id}
                                            className={'news-container'}
                                            style={{cursor: "pointer"}}
                                            cols={(index % 3) === 0 ? 12 : 6}
                                            href={'/news/[news_id]/[news_title]?news_id=' + news.id + '&news_title=' + news.title}
                                            as={'/news/' + news.id + '/' + news.title}>
                                            <img src={news.image} alt={news.title}/>
                                            <GridListTileBar
                                                component={Link}
                                                href={'/news/[news_id]/[news_title]?news_id=' + news.id + '&news_title=' + news.title}
                                                as={'/news/' + news.id + '/' + news.title}
                                                title={news.title}
                                                actionIcon={
                                                    <IconButton component={Link}
                                                                href={'/news/[news_id]/[news_title]?news_id=' + news.id + '&news_title=' + news.title}
                                                                as={'/news/' + news.id + '/' + news.title}>
                                                        <InfoIcon color={'secondary'}/>
                                                    </IconButton>
                                                }
                                            />
                                        </GridListTile>
                                    )
                                }
                            )
                        }
                    </GridList>
                </div>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item>
                        <Tooltip title="Vedi Altri" aria-label="Vedi Altri" placement="bottom" arrow>
                            <IconButton className={'news_load_more'} onClick={loadMore}
                                        style={{marginTop: theme.spacing(8)}}>
                                <AutorenewIcon color={'primary'}/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }

    if (newsList === null) {
        return (
            <Section className={''} title={props.title}>
                <Loader/>
            </Section>
        )
    } else {
        return (
            <Section className={''} title={props.title}>
                <Content/>
            </Section>
        )
    }
}
