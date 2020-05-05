import React from 'react'
import Chip from '@material-ui/core/Chip'
import Grid from "@material-ui/core/Grid";
import NextLink from "next/link"
import Link from "@material-ui/core/Link";

const NewsRelatedTag = ({tags}) => (
    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
        {
            tags.map(tag => <Grid key={tag.id} item>
                <NextLink href={'/news/tag/[tag]'} as={'/news/tag/' + tag.slug} passHref>
                    <Link underline="none">
                        <Chip label={tag.label} color={'primary'} clickable/>
                    </Link>
                </NextLink>
            </Grid>)
        }
    </Grid>
);

export default NewsRelatedTag;
