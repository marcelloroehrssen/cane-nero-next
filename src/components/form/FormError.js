import React from 'react'
import FormHelperText from '@material-ui/core/FormHelperText'
import PropTypes from 'prop-types'

FormError.propTypes = {
  id: PropTypes.string.isRequired,
  in: PropTypes.bool.isRequired,
  text: PropTypes.string
}

export default function FormError (props) {
  if (props.in) {
    return <FormHelperText id={props.id + 'error-text'}>{ props.text }</FormHelperText>
  }
  return <></>
}
