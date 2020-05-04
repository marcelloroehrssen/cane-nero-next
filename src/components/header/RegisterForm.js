import React, {useContext, useState} from 'react'
import {useStyles} from './LoginRegisterStyle'
import Text from '../form/Text'
import Email from '../form/Email'
import CustomCheckbox from '../form/CustomCheckbox'
import Password from '../form/Password'
import * as EmailValidator from 'email-validator'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import FormControl from '@material-ui/core/FormControl'
import FlashBarContext from '../../provider/FlashBarContext'
import PropTypes from 'prop-types'
import useForm from "../../hooks/useForm";
import useUnicityCheck from "../../hooks/useUnicityCheck";
import {theme} from "../../Theme";

RegisterForm.propTypes = {
    onSubmitSuccess: PropTypes.func.isRequired,
    onSubmitError: PropTypes.func.isRequired,
    successMessage: PropTypes.string,
    label: PropTypes.string,
};

export default function RegisterForm(props) {
    const classes = useStyles();
    const flashContext = useContext(FlashBarContext);
    const [isUsernameLoading, setUsernameLoading] = useState(false);
    const [isEmailLoading, setEmailLoading] = useState(false);
    const checkUnicity = useUnicityCheck();

    const checkEmailUnicity = async value => {
        if (!EmailValidator.validate(value)) {
            return false;
        }
        return await checkUnicity(
            'email',
            value,
            () => setEmailLoading(true),
            () => setEmailLoading(false),
        )
    };

    const checkUsernameUnicity = async value => {
        return await checkUnicity(
            'username',
            value,
            () => setUsernameLoading(true),
            () => setUsernameLoading(false),
        )
    };

    const [handleValue, handleSubmit, user, errorState] = useForm('user',
        props.user || {firstName: '', lastName: '', username: '', email: '', password: '', accepted: false},
        {
            'firstName': value => value !== '',
            'lastName': value => value !== '',
            'username': async value => {
                if (value.length < 5) {
                    return [false, 'Lo username è troppo corto, deve essere almeno 5 caratteri'];
                }
                if (!await checkUsernameUnicity(value)) {
                    return [false, 'Lo username inserito non è valido'];
                }
                return value !== '';
            },
            'email': async value => {
                if (!EmailValidator.validate(value)) {
                    return [false, 'Questa non è una email valida'];
                }
                if (!await checkEmailUnicity(value)) {
                    return [false, 'L\'email inserita non è valida'];
                }
                return value !== '';
            },
            'password': value => value !== '',
            'accepted': value => value !== false
        }
    );


    const hasToAccept = () => {
        if (!errorState.accepted) {
            return <></>;
        }
        return (
                <CustomCheckbox
                label="Accetto i termini e condizioni d'uso"
                accepted={!!user.accepted}
                onChange={e => handleValue('accepted', !user.accepted)}
            />
        );
    };

    const hasPassword = () => {
        if (!errorState.password) {
            return <></>;
        }
        return (
            <Password
                id="password"
                containerClass={classes.row}
                label="Password"
                color={props.color || "secondary"}
                adornamentLabel="Mostra/nascondi password"
                onChange={e => handleValue('password', e.target.value)}
                error={errorState.password}
                fullWidth
            />
        );
    };

    const submit = async () => {
        return handleSubmit(() => {
            props.onSubmitSuccess();
            flashContext.show(props.successMessage || 'Registrazione avvenuta con successo', 'success');
        });
    };


    return (
        <>
            <Text
                id="first_name"
                containerClass={classes.row}
                label="Nome"
                color={props.color || "secondary"}
                value={user.firstName}
                error={errorState.firstName}
                onChange={e => {
                    handleValue('firstName', e.target.value)
                }}
                fullWidth
            />
            <Text
                id="last_name"
                containerClass={classes.row}
                label="Cognome"
                color={props.color || "secondary"}
                value={user.lastName}
                error={errorState.lastName}
                onChange={e => {
                    handleValue('lastName', e.target.value)
                }}
                fullWidth
            />
            <Text
                id="username_register"
                containerClass={classes.row}
                label="Username"
                color={props.color || "secondary"}
                value={user.username}
                onChange={e => {
                    handleValue('username', e.target.value)
                }}
                showLoader={isUsernameLoading}
                error={errorState.username}
                fullWidth
            />
            <Email
                id="email"
                containerClass={classes.row}
                label="Email"
                color={props.color || "secondary"}
                value={user.email}
                onChange={e => {
                    handleValue('email', e.target.value)
                }}
                error={errorState.email}
                showLoader={isEmailLoading}
                fullWidth
            />
            { hasPassword() }
            { hasToAccept() }
            {/*<Typography align={'center'} className={classes.facebookLogin}>*/}
            {/*    Oppure*/}
            {/*</Typography>*/}
            {/*<Button*/}
            {/*    variant="contained"*/}
            {/*    color="primary"*/}
            {/*    size="large"*/}
            {/*    className={classes.facebookLoginButton}*/}
            {/*    startIcon={<Facebook/>}*/}
            {/*    fullWidth*/}
            {/*>*/}
            {/*    Fai il login tramite Facebook*/}
            {/*</Button>*/}
            <Divider style={{marginTop: theme.spacing(2)}}/>
            <FormControl fullWidth style={{marginTop: theme.spacing(2)}}>
                <Button color={props.color || "secondary"} variant={'outlined'} onClick={submit}>{props.label || 'Iscriviti'}</Button>
            </FormControl>
        </>
    )
}
