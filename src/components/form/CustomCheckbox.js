import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { useStyles } from '../header/LoginRegisterStyle'
import PropTypes from 'prop-types'

CustomCheckbox.propTypes = {
  accepted: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

export default function CustomCheckbox (props) {
  const classes = useStyles();

  return (
    <FormControlLabel
      className={classes.row}
      control={<Checkbox checked={props.accepted} onChange={props.onChange} value={props.accepted} required={true} />}
      label={props.label}
    >
    </FormControlLabel>
  )
}
