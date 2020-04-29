import Section from "../layout/Section";
import Typography from "@material-ui/core/Typography";
import RoleCheck from "../RoleCheck";
import React, {useContext, useEffect, useState} from "react";
import FlashBarContext from "../../provider/FlashBarContext";
import MaterialTable from "material-table";
import WarningIcon from '@material-ui/icons/Warning';
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import {useCookies} from "react-cookie";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {theme} from "../../Theme";
import tableIcons from "./TableIcons";
import columns, {options} from "./ColumnsConfig";
import localization from "./Localization";
import useSWR from "swr";
import remote from "../../Utils/Remote";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import ErrorIcon from '@material-ui/icons/Error';

const UserSearch = ({users, onChange}) => (
    <Paper style={{
        backgroundColor: theme.palette.primary,
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }}>
        <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
            <Grid item>
                Seleziona l'utente di cui vuoi vedere i pagamenti
            </Grid>
            <Grid item>
                <Autocomplete
                    disableClearable
                    options={users.sort()}
                    getOptionLabel={(option) => (option.username + ' (' + option.firstName + ' ' + option.lastName + ')') }
                    renderOption={(option) => (
                        <>
                            { option.hasProblem.payments && <ErrorIcon color={"error"} style={{marginRight:4}}/> }
                            { !option.hasProblem.payments && null }
                            { ' ' + option.username + ' (' + option.firstName + ' ' + option.lastName + ')'}
                        </>
                    )}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Utenti" variant="outlined" color={"secondary"}/>}
                    onChange={(e, value) => onChange(value)}
                />
            </Grid>
        </Grid>
    </Paper>
);

const PaymentPage = ({payments, user, canEdit, hasError, users}) =>
{
    const flashContext = useContext(FlashBarContext);
    const [cookies, ,] = useCookies();
    const [currentUser, setCurrentUser] = useState(user);
    useEffect(() => {
        const getRemotePayments = async (u) => {
            const {payments} = await remote(
                '/payment',
                {
                    headers: {'client-security-token': cookies.login},
                    get: {filter: JSON.stringify({uid:u.id})}
                });
            setCurrentPayments(payments);
        };
        getRemotePayments(currentUser);
    }, [currentUser]);
    const {data} = useSWR(
        ['/payment', cookies.login, currentUser.id],
        (url, login, uid) => remote(url, {
            headers: {'client-security-token': login},
            get:{filter:JSON.stringify({uid})}})
            .then(d => d.payments),
        {initialData: payments}
    );
    const [currentPayments, setCurrentPayments] = useState(data);

    const send = async (data, verb, message) => {
        const fetchOptions = {
            headers: {'client-security-token': cookies.login},
            parameters: {body: JSON.stringify({...data, uid:currentUser.id}), method: verb}
        };
        const {payments} = await remote('/payment',fetchOptions);
        flashContext.show(message, 'success');
        setCurrentPayments(payments);
    };

    const editable = {
        onRowAdd: (newData) => {
            return send(newData, 'POST', 'Pagamento inviato con successo');
        },
        onRowUpdate: (newData, oldData) => {
            return send(newData, 'PUT', 'Pagamento aggiornato con successo');
        },
        onRowDelete: (oldData) => {
            return send(oldData, 'DELETE', 'Pagamento cancellato con successo');
        },
    };

    return (
        <RoleCheck role={'ROLE_USER'} alt={
            <Section title={'Ciao'}>
                <Typography align={"center"}>
                    <em>Per vedere questa pagina devi essere loggato!</em>
                </Typography>
            </Section>}>
            <Section title={'Ciao ' + user.username + ', ecco i tuoi pagamenti'}>
                {
                    currentUser.hasProblem.payments && <Paper style={{
                        backgroundColor: theme.palette.error.light,
                        padding: theme.spacing(2),
                        marginBottom: theme.spacing(2)
                    }}>
                        <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
                            <Grid item>
                                <WarningIcon color={"error"}/>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    C'è un problema con l'iscrizione annuale
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                }
                {
                    canEdit && <UserSearch users={users} onChange={(v) => setCurrentUser(v)}/>
                }
                <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                    <MaterialTable title="Pagamenti"
                                   icons={tableIcons}
                                   options={options}
                                   localization={localization}
                                   columns={columns}
                                   data={currentPayments}
                                   editable={canEdit ? editable : {}}
                    />
                </MuiPickersUtilsProvider>
            </Section>
        </RoleCheck>
    );
}

export default PaymentPage;
