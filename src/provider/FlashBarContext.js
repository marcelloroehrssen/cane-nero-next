import React, { createContext, useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import PropTypes from 'prop-types'

FlashBarContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const FlashBarContext = createContext([])

function Alert (props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export function FlashBarContextProvider (props) {
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [duration, setDuration] = useState(2000);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const show = (str, severity, duration) => {
    setMessage(str);
    setSeverity(severity);
    if (duration) {
      setDuration(duration);
    }
    setOpen(true);
  }

  return (
    <FlashBarContext.Provider value={{ show }}>
      <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      {props.children}
    </FlashBarContext.Provider>
  )
}

export default FlashBarContext
