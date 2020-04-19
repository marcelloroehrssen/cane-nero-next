import React from 'react'

export default function LengthCheck (props) {
  let result = false

  switch (props.op) {
    case 'gt':
      result = props.obj.length > props.min
      break
    case 'gte':
      result = props.obj.length >= props.min
      break
    case 'lt':
      result = props.obj.length < props.min
      break
    case 'lte':
      result = props.obj.length >= props.min
      break
    default:
    case 'eq':
      result = props.obj.length === props.min
      break
  }

  if (result) {
    return <>{props.children}</>
  } else {
    return props.msg
  }
}
