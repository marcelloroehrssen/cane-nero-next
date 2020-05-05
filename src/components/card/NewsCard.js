import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import CardActions from '@material-ui/core/CardActions'
import moment from 'moment'
import Chip from '@material-ui/core/Chip'
import PropTypes from 'prop-types'
import IconButton from "@material-ui/core/IconButton";
import {Tooltip} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import NextLink from "next/link";
import Link from "@material-ui/core/Link";

const ActionButton = ({action, news})  => {
    if (!action) {
        return <></>;
    }

    return (
        <Tooltip title={action.name} arrow placement={"top"}>
            <IconButton onClick={action.callback(news)}>{action.icon}</IconButton>
        </Tooltip>
    );
}

const NewsCard = ({news, small, activeAction}) => (
    <Card>
        <CardActionArea component={'article'}>
            <CardHeader
                avatar={
                    <Avatar src={news.author.avatar} alt={news.author.firstName + ' ' + news.author.lastName}>
                        <a>
                            {news.author.firstName.slice(0, 1).toUpperCase() + news.author.lastName.slice(0, 1).toUpperCase()}
                        </a>
                    </Avatar>
                }
                title={
                    <NextLink href={'/news?author=' + news.author.username} as={'/news/author/' + news.author.username} passHref>
                        <Link color="secondary">{news.author.firstName + ' ' + news.author.lastName}</Link>
                    </NextLink>
                }
                subheader={moment(news.date).locale('it').format('dddd, gg MMMM YYYY')}
            />
            {!small && <CardMedia style={{height: 400}} image={news.image} title={news.title}/>}
            <CardContent>
                <Typography gutterBottom
                            variant="h5"
                            color={'secondary'}>
                    <NextLink href={'/news/[news_id]/[news_title]'}
                          as={'/news/' + news.id + '/' + news.title}>
                        <Link color="secondary">{news.title}</Link>
                    </NextLink>
                </Typography>
            </CardContent>
            <CardActions>
                <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
                    {
                        news.tags.map((tag) => {
                            return (
                                <Grid item key={tag.id}>
                                    <NextLink href={'/news/tag/[tag]'} as={'/news/tag/' + tag.slug}>
                                        <Link underline="none">
                                            <Chip label={tag.label} clickable/>
                                        </Link>
                                    </NextLink>
                                </Grid>
                            );
                        })
                    }
                </Grid>
            </CardActions>
            <CardActions>
                {activeAction && !Array.isArray(activeAction) && <ActionButton action={activeAction} news={news}/>}
                {activeAction && Array.isArray(activeAction) && activeAction.map(a => <ActionButton key={a.name} action={a} news={news}/>)}
            </CardActions>
        </CardActionArea>
    </Card>
);

NewsCard.propTypes = {
    news: PropTypes.object.isRequired,
    activeAction: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    small: PropTypes.bool
};

export default NewsCard;
