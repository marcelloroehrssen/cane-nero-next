import {useContext, useState} from "react";
import {config} from "../../src/Config";
import FlashBarContext from "../provider/FlashBarContext";
import {useCookies} from "react-cookie";
import {remoteAsync} from "../Utils/Remote";

export default function useForm(resource, initialState, validation) {
    const flashContext = useContext(FlashBarContext);
    const [cookies, ,] = useCookies();
    const [state, setState] = useState(initialState);
    const [validationRule,] = useState(validation);
    const [errorState, setErrorState] = useState(() => {
        let errors = {};
        for (const [key,] of Object.entries(state)) {
            errors = {...errors, [key]: {status: false, message: ''}};
        }
        return errors;
    });

    const  handleStatusChange = (type, value) => {
        let validator = value => true;
        if (validationRule.hasOwnProperty(type)) {
            validator = validationRule[type];
        }
        const returnedValue = validator(value);

        let isValid;
        let message = type + ' non valido';
        if (Array.isArray(returnedValue)) {
            isValid = returnedValue[0];
            message = returnedValue[1];
        } else {
            isValid = returnedValue;
        }

        if (isValid) {
            setErrorState({...errorState, [type]: {status: false, message: ''}});
        } else {
            setErrorState({...errorState, [type]: {status: true, message: message}});
        }
        return errorState;
    };

    const handleValue = async (type, value) => {
        setState({...state, [type]: value || ''});
        handleStatusChange(type, value);
    };

    const validate = async () => {

        let e = [];
        for (const [name, value] of Object.entries(state)) {
            e = await handleValue(name, value);
        }
        for (const key in e) {
            if (e[key].status) {
                return false;
            }
        }

        return true;
    };

    const submit = async onSuccess => {

        const httpVerb = state.id ? 'PUT' : 'POST';

        let isValid = await validate();
        if (!isValid) {
            return;
        }

        let headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        if (cookies.login) {
            headers = {...headers, 'client-security-token': cookies.login};
        }

        const options = {
            headers: headers,
            parameters: {method: httpVerb, body: JSON.stringify(state)}
        };
        remoteAsync('/' + resource, options)
            .then(response => {
                if (response.errors.length > 0) {
                    flashContext.show(response.errors.join(' | '), 'error', 5000);
                } else {
                    onSuccess(response, httpVerb !== 'PUT')
                }
            })
            .catch((error) => {
                flashContext.show("C'è stato un errore durante l'invio del modulo", 'error');
            });

        return false;
    };

    return [
        handleValue,
        submit,
        state,
        errorState
    ];
}
