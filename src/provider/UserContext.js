import React, {createContext, useContext, useEffect, useState} from 'react'
import {useCookies} from 'react-cookie'
import FlashBarContext from './FlashBarContext'
import PropTypes from 'prop-types'
import remote from "../Utils/Remote";

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

const UserContext = createContext([]);

export function UserContextProvider(props) {
    const flashContext = useContext(FlashBarContext);
    const [state, setState] = useState({user: null});
    const [cookies, setCookie, removeCookie] = useCookies();
    useEffect(() => {
        const fetcher = async () => {
            const headers = cookies.login ? {headers: {'client-security-token': cookies.login}} : null;
            const {user} = await remote('/user', headers);
            setState({user: {...user, isLogged: !!cookies.login}});
        };
        fetcher();
    }, []);

    const updateUser = (user, isLogged) => {
        user.isLogged = isLogged;
        setState({
            user: user
        })
    };

    const login = (user, token) => {
        setCookie('login', token, {path: '/'});
        flashContext.show('Login avvenuto con successo', 'success');
        updateUser(user, true);
    };

    const logout = () => {
        removeCookie('login');
        flashContext.show('Logout avvenuto con successo', 'success');
        updateUser(state.user, false);
    };

    return (
        <UserContext.Provider value={{user: state.user, login: login, logout: logout}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext
