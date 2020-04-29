import React, {useState} from 'react'
import GridList from '@material-ui/core/GridList'
import IconButton from '@material-ui/core/IconButton'
import Section from '../layout/Section'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import InfoIcon from '@material-ui/icons/Info'
import {config} from "../../Config";
import Link from '../Link'
import useTheme from '@material-ui/core/styles/useTheme'
import PropTypes from 'prop-types'
import useSWR, {mutate} from "swr";
import remote from "../../Utils/Remote";

NewsList.propTypes = {
    title: PropTypes.string.isRequired
};

export default function NewsList({title, news, filters}) {
    const theme = useTheme();
    const {data} = useSWR(
        ['/news', filters],
        (url, filters) => remote(url, {get: filters}).then(j => j.news),
        {initialData: news}
    );
    const [search, setSearch] = useState(filters);

    const loadMore = async () => {
        setSearch({
            ...search,
            maxresult: filters.maxresult + config.max_news_per_homepage,
            offset: 0
        });
        console.log(search);
        const {news} = await remote('/news', {get:search});
        mutate(['/news', filters], news, false)
    };

    return (
        <Section className={''} title={title}>
            <div style={{flexGrow: 1}}>
                <GridList cols={12} cellHeight={400}>
                    {
                        data.map(
                            (news, index) => (
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
        </Section>
    )
}
