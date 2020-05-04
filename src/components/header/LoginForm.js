import React, { useContext } from 'react'
import { useStyles } from './LoginRegisterStyle'
import Password from '../form/Password'
import Text from '../form/Text'
import Divider from '@material-ui/core/Divider'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import FlashBarContext from '../../provider/FlashBarContext'
import UserContext from '../../provider/UserContext'
import PropTypes from 'prop-types'
import useForm from "../../hooks/useForm";
import {theme} from "../../Theme";

LoginForm.propTypes = {
  onSubmitSuccess: PropTypes.func.isRequired,
  onSubmitError: PropTypes.func.isRequired
};

export default function LoginForm (props) {
  const classes = useStyles();
  const userContext = useContext(UserContext);
  const flashContext = useContext(FlashBarContext);
  const [handleString, handlerSubmit,, errorState] = useForm('login',
      {username: '', password: '', accepted: false},
      {
          'username': value => value !== '',
          'password': value => value !== '',
      }
  );

  const submit = () => {
      handlerSubmit((response) => {
          userContext.login(response.user, response.token);
          flashContext.show('Login avvenuto con successo', 'success');
          props.onSubmitSuccess();
      });
  };

  return (
    <>
      <Text
        id="username"
        containerClass={classes.row}
        label="Username"
        color="secondary"
        onChange={e => handleString('username', e.target.value)}
        error={errorState.username}
        fullWidth
      />
      <Password
        id="password"
        containerClass={classes.row}
        label="Password"
        color="secondary"
        adornamentLabel="Mostra/nascondi password"
        onChange={e => handleString('password', e.target.value)}
        error={errorState.password}
        showPassword={false}
        fullWidth
      />
      <Divider style={{marginTop: theme.spacing(2)}}/>
      <FormControl fullWidth style={{marginTop: theme.spacing(2)}}>
        <Button color="secondary" variant={'outlined'} onClick={submit} type={'submit'}>Login</Button>
      </FormControl>
    </>
  );
}
