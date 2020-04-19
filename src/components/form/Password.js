import React, { useState } from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { useStyles } from '../header/LoginRegisterStyle'
import FormControl from '@material-ui/core/FormControl'
import FormError from './FormError'
import PropTypes from 'prop-types'

Password.propTypes = {
  id: PropTypes.string.isRequired,
  containerClass: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  adornamentLabel: PropTypes.string.isRequired,
  showPassword: PropTypes.bool,
  row: PropTypes.string,
  error: PropTypes.object,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  errorText: PropTypes.string
}

export default function Password (props) {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(props.showPassword);

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  };

  return (
    <FormControl className={ props.containerClass } fullWidth={!!props.fullWidth} error={!!props.error.status}>
      <InputLabel htmlFor="password">{props.label}</InputLabel>
      <Input
        id={props.id}
        label={props.label}
        type={showPassword ? 'text' : 'password'}
        onChange={props.onChange}
        onBlur={props.onBlur}
        color={props.color}
        className={classes.row}
        fullWidth
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              color={'secondary'}
              aria-label={props.adornamentLabel}
              onClick={handleShowPassword}
              onMouseDown={(e) => e.preventDefault()}
            >
              {showPassword ? <Visibility/> : <VisibilityOff/>}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormError id={props.id} in={!!props.error.status} text={props.error.message} />
    </FormControl>
  )
}
