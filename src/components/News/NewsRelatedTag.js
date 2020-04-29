import React from 'react'
import Chip from '@material-ui/core/Chip'
import Link from '../Link'
import Grid from "@material-ui/core/Grid";

const NewsRelatedTag = ({tags}) => (
    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
        {
            tags.map(tag => <Grid item>
                <Chip key={tag.id}
                      label={tag.label}
                      component={Link}
                      href={'/news/tag/[tag]'}
                      as={'/news/tag/' + tag.slug}
                      color={'primary'}
                      clickable/>
            </Grid>)
        }
    </Grid>
);

export default NewsRelatedTag;
