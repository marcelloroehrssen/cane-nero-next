import React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import {useStyles} from '../header/LoginRegisterStyle'
import FormControl from '@material-ui/core/FormControl'
import FormError from './FormError'
import {CircularProgress} from '@material-ui/core'
import PropTypes from 'prop-types'

Text.propTypes = {
    id: PropTypes.string.isRequired,
    containerClass: PropTypes.string.isRequired,
    fullWidth: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.object,
    text: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    color: PropTypes.string,
    showLoader: PropTypes.bool,
    required: PropTypes.bool
};

export default function Text(props) {
    const classes = useStyles();

    return (
        <FormControl className={props.containerClass} fullWidth={!!props.fullWidth} error={!!props.error.status}>
            <InputLabel htmlFor="name">{props.label}</InputLabel>
            <Input
                id={props.id}
                label={props.label}
                type={'text'}
                onChange={props.onChange}
                onBlur={props.onBlur}
                color={props.color}
                className={classes.row}
                autoComplete='off'
                value={props.value}
                endAdornment={
                    props.showLoader ? <CircularProgress color={'secondary'} style={{marginRight: 15}}/> : ''
                }
                required={!!props.required}
                fullWidth
            />
            <FormError id={props.id} in={!!props.error.status} text={props.error.message}/>
        </FormControl>
    )
}
