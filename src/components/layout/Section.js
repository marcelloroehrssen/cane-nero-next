import React from 'react'
import { Typography } from '@material-ui/core'
import { theme } from '../../Theme'
import PropTypes from 'prop-types'

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  component: PropTypes.string,
  variant: PropTypes.string
};

export default function Section (props) {
  const variant = props.variant ? props.variant : 'h4';
  const component = props.component ? props.component : 'h4';

  return (
    <section style={{ marginTop: theme.spacing(8), color: theme.palette.primary.dark }}>
      <Typography variant={variant} component={component} style={{ marginTop: theme.spacing(8), color: theme.palette.primary.dark }}>
        {props.title}
      </Typography>
      <hr style={{ borderColor: theme.palette.primary.dark }}/>
      {props.children}
    </section>
  )
}
