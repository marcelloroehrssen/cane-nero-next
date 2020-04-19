import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import CardActions from '@material-ui/core/CardActions'
import moment from 'moment'
import Chip from '@material-ui/core/Chip'
import Link from '../Link'
import PropTypes from 'prop-types'
import IconButton from "@material-ui/core/IconButton";
import {Tooltip} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

NewsCard.propTypes = {
    action: PropTypes.object,
    news: PropTypes.object
};

function ActionButton(props) {
    if (!props.action) {
        return <></>;
    }

    return (
        <Tooltip title={props.action.name} arrow placement={"top"}>
            <IconButton  onClick={props.action.callback(props.news)}>
                {props.action.icon}
            </IconButton>
        </Tooltip>
    );
}

NewsCard.propTypes = {
    news: PropTypes.object.isRequired,
    activeAction: PropTypes.object,
};

export default function NewsCard(props) {

    return (
        <Card>
            <CardActionArea component={'article'}>
                <CardHeader
                    avatar={
                        <Avatar src={props.news.author.avatar}
                                alt={props.news.author.firstName + ' ' + props.news.author.lastName}
                                component={Link}
                                href={'/news?author=' + props.news.author.username}
                                as={'/news/author/' + props.news.author.username}>
                            {
                                props.news.author.firstName.slice(0, 1).toUpperCase()
                                + props.news.author.lastName.slice(0, 1).toUpperCase()
                            }
                        </Avatar>
                    }
                    title={
                        <Link href={'/news?author=' + props.news.author.username}
                              as={'/news/author/' + props.news.author.username}
                              color={'secondary'}>
                            {props.news.author.firstName + ' ' + props.news.author.lastName}
                        </Link>
                    }
                    subheader={moment(props.news.date).locale('it').format('dddd, gg MMMM YYYY')}
                />
                <CardMedia style={{height: 400}} image={props.news.image} title={props.news.title}/>
                <CardContent>
                    <Typography gutterBottom
                                variant="h5"
                                component={Link}
                                href={'/news/[news_id]/[news_title]?news_id=' + props.news.id + '&news_title=' + props.news.title}
                                as={'/news/' + props.news.id + '/' + props.news.title}
                                color={'secondary'}>
                        {props.news.title}
                    </Typography>
                </CardContent>
                <CardActions>
                    <ActionButton action={props.activeAction} news={props.news}/>
                    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
                        {
                            props.news.tags.map((tag) => {
                                return (
                                    <Grid item key={tag.id}>
                                        <Typography variant="body2" color="textSecondary" component="div">
                                            <Chip label={tag.label}
                                                  component={Link}
                                                  href={'/news?tag=' + tag.label}
                                                  as={'/news/tag/' + tag.label}
                                                  clickable/>
                                        </Typography>
                                    </Grid>
                                );
                            })
                        }
                    </Grid>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
