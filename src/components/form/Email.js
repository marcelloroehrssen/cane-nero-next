import React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import { useStyles } from '../header/LoginRegisterStyle'
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail'
import FormControl from '@material-ui/core/FormControl'
import FormError from './FormError'
import { CircularProgress } from '@material-ui/core'
import PropTypes from 'prop-types'

FormEmail.propTypes = {
  containerClass: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  error: PropTypes.object,
  onBlur: PropTypes.func,
  showLoader: PropTypes.bool
};

export default function FormEmail (props) {
  const classes = useStyles();

  return (
    <FormControl className={props.containerClass} fullWidth={!!props.fullWidth} error={!!props.error.status}>
      <InputLabel htmlFor="name">{props.label}</InputLabel>
      <Input
        id={props.id}
        label={props.label}
        type={'email'}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        color={props.color}
        className={classes.row}
        fullWidth
        autoComplete='off'
        endAdornment={
          props.showLoader ? <CircularProgress color={'secondary'} style={{ marginRight: 15 }}/>
            : <AlternateEmailIcon color={'secondary'} position={'end'} style={{ marginRight: 12 }}/>
        }
      />
      <FormError id={props.id} in={!!props.error.status} text={props.error.message}/>
    </FormControl>
  )
}
