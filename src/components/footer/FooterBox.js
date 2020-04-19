import React from 'react'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'

FooterBox.propTypes = {
  area: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default function FooterBox (props) {
  return (
    <div>
      <Typography color="textSecondary" gutterBottom>
        { props.area }
      </Typography>
      <Typography variant="h5" component="h2">
        { props.title }
      </Typography>
      <Typography variant="body2" component="p">
        { props.children }
      </Typography>
    </div>
  )
}
