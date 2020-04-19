import React, { useContext } from 'react'
import UserContext from '../provider/UserContext'
import PropTypes from 'prop-types'

RoleCheck.propTypes = {
  role: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  alt: PropTypes.node
};

export default function RoleCheck (props) {
  const userContext = useContext(UserContext);

  if (userContext.user && userContext.user.isLogged && userContext.user.roles.includes(props.role)) {
    return props.children
  }

  if (props.alt) {
    return props.alt;
  }
  return <></>
}
