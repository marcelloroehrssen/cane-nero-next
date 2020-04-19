import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import CardActions from '@material-ui/core/CardActions'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'

ChronicleCard.propTypes = {
  chronicle: PropTypes.object.isRequired
}

export default function ChronicleCard (props) {
  return (
    <Card>
      <CardActionArea component={'article'}>
        <CardMedia
          style={{ height: 400 }}
          image={props.chronicle.logo}
          title={props.chronicle.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.chronicle.name}
          </Typography>
          <Typography variant="body2" color="secondary" component="p">
            {props.chronicle.game}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.chronicle.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Tooltip title={'Vai al sito'} placement={'right'} arrow>
            <IconButton href={props.chronicle.url}>
              <BookmarkIcon color={'secondary'}/>
            </IconButton>
          </Tooltip>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
