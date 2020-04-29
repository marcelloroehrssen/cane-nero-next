import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import {Button} from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

Alert.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onCancel: PropTypes.func,
    cancelLabel: PropTypes.string,
    onConfirm: PropTypes.func,
    confirmLabel: PropTypes.string,
    hideActions: PropTypes.bool
}

export default function Alert(props) {
    let dialogAction = (
        <DialogActions>
            <Button onClick={props.onCancel} color="secondary">
                {props.cancelLabel || 'Chiudi'}
            </Button>
            <Button onClick={props.onConfirm} color="secondary"
                    variant={'outlined'}>{props.confirmLabel || 'Si, elimina!'}</Button>
        </DialogActions>
    )

    if (props.hideActions === true) {
        dialogAction = ''
    }

    return (
        <Dialog open={props.open}
                aria-labelledby="form-dialog-title" maxWidth={'xs'}>
            <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                {props.text}
            </DialogContent>
            {dialogAction}
        </Dialog>
    )
}
