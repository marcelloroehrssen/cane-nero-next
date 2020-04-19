import React, { useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FormError from './FormError'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import LengthCheck from '../layout/LengthCheck'
import PropTypes from 'prop-types'

ItemSelect.propTypes = {
  id: PropTypes.string.isRequired,
  containerClass: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.object,
  text: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func
};

export default function ItemSelect (props) {

  const [selected, setSelected] = useState(0);

  const onChange = (event) => {
    setSelected(event.target.value);
    if (props.onChange) {
      props.onChange(event);
    }
    blur();
  };

  if (!props.options) {
    return <></>
  }

  return (
    <LengthCheck obj={props.options} op={'gt'} min={0} msg={<></>}>
      <FormControl className={ props.containerClass } fullWidth={!!props.fullWidth} error={!!props.error.status}>
        <InputLabel htmlFor="name">{props.label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={onChange}
          value={selected}
        >
          <MenuItem key={0} value={0}>~ Seleziona una cronaca ~</MenuItem>
          {
            props.options.map((value) => <MenuItem key={value.id} value={value.id}>{value.name}</MenuItem>)
          }
        </Select>
        <FormError id={props.id} in={!!props.error.status} text={props.error.text} />
      </FormControl>
    </LengthCheck>
  )
}
