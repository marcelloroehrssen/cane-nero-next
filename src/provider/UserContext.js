import React, { createContext, useContext, useState } from 'react'
import useHttp from '../hooks/UseHttp'
import { useCookies } from 'react-cookie'
import ConfigContext from './ConfigContext'
import FlashBarContext from './FlashBarContext'
import PropTypes from 'prop-types'

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

const UserContext = createContext([]);

export function UserContextProvider (props) {
  const config = useContext(ConfigContext);
  const flashContext = useContext(FlashBarContext);
  const [state, setState] = useState({
    user: null
  });
  const [, setCookie, removeCookie] = useCookies();

  const updateUser = (user, isLogged) => {
    user.isLogged = isLogged;
    setState({
      user: user
    })
  };

  const login = (user, token) => {
    setCookie('login', token, { path: '/' });
    updateUser(user, true);
  };

  const logout = () => {
    removeCookie('login');
    updateUser(state.user, false);
  };

  useHttp(
    config.ws_url + '/user',
    {},
    (data) => updateUser(data.user, data.isLogged),
    () => flashContext.show('C\'è stato un errore nel caricamento dell\'utente', 'error')
  );

  return (
    <UserContext.Provider value={{ user: state.user, login: login, logout: logout }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext
