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
import Link from "next/link";

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
                    <Link href={'/news?author=' + news.author.username}
                          as={'/news/author/' + news.author.username}>
                        <a className={'MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-body2 MuiTypography-colorInherit'}>{news.author.firstName + ' ' + news.author.lastName}</a>
                    </Link>
                }
                subheader={moment(news.date).locale('it').format('dddd, gg MMMM YYYY')}
            />
            {!small && <CardMedia style={{height: 400}} image={news.image} title={news.title}/>}
            <CardContent>
                <Typography gutterBottom
                            variant="h5"
                            color={'secondary'}>
                    <Link href={'/news/[news_id]/[news_title]'}
                          as={'/news/' + news.id + '/' + news.title}>
                        <a className={'MuiTypography-root MuiLink-root MuiTypography-h4 MuiLink-underlineHover MuiTypography-body2 MuiTypography-colorInherit'}>{news.title}</a>
                    </Link>
                </Typography>
            </CardContent>
            <CardActions>
                <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
                    {
                        news.tags.map((tag) => {
                            return (
                                <Grid item key={tag.id}>
                                    <Link href={'/news/tag/[tag]'}
                                          as={'/news/tag/' + tag.slug}>
                                        <Chip label={tag.label} clickable/>
                                    </Link>
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
