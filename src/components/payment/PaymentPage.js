import Section from "../layout/Section";
import Typography from "@material-ui/core/Typography";
import RoleCheck from "../RoleCheck";
import React, {forwardRef, useContext, useEffect, useState} from "react";
import UserContext from "../../provider/UserContext";
import ConfigContext from "../../provider/ConfigContext";
import FlashBarContext from "../../provider/FlashBarContext";
import {CircularProgress} from "@material-ui/core";
import useHttp from "../../hooks/UseHttp";
import MaterialTable from "material-table";
import {
    AddBox, ArrowDownward,
    Check, ChevronLeft,
    ChevronRight,
    Clear,
    DeleteOutline,
    Edit,
    FilterList,
    FirstPage, LastPage, Remove,
    SaveAlt, Search, ViewColumn
} from "@material-ui/icons";
import WarningIcon from '@material-ui/icons/Warning';
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import {useCookies} from "react-cookie";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {theme} from "../../Theme";

export default function PaymentPage() {

    const userContext = useContext(UserContext);
    const config = useContext(ConfigContext);
    const flashContext = useContext(FlashBarContext);
    const [payments, setPayments] = useState([]);
    const [canEdit, setCanEdit] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [cookies, ,] = useCookies();
    useHttp(
        config.ws_url + '/payment',
        {},
        (response) => setPayments(response.payments),
        () => flashContext.show('C\'è stato un errore nel caricamento dei tuoi pagamenti', 'error'),
    );
    useEffect(() => {
        if (userContext.user !== null && userContext.user.isLogged) {
            setCanEdit(userContext.user.roles.indexOf('ROLE_ADMIN') > -1);
            setHasError(userContext.user.hasProblem.payments)
        }
    }, [userContext.user]);

    const columns = [
        {
            title: '#',
            field: 'id',
            editable: 'never',
            searchable: false,
            width: 20,
            cellStyle: {
                maxWidth: 20
            },
        },
        {
            title: 'Note',
            field: 'note',
            emptyValue: () => {
                return <em>Non ci sono note</em>
            },
            searchable: false
        },
        {
            title: 'Anno di riferimento',
            field: 'year',
            type: 'numeric',
            searchable: true,
            headerStyle: {
                textAlign: 'right'
            },
            cellStyle: {
                textAlign: 'right'
            }
        },
        {
            title: 'Importo',
            field: 'sum',
            type: 'currency',
            searchable: false,
            currencySetting: {
                locale: 'it-IT',
                currencyCode: 'EUR'
            },
            headerStyle: {
                textAlign: 'right'
            },
            cellStyle: {
                textAlign: 'right'
            }
        },
        {
            title: 'Data del pagamento',
            field: 'date',
            type: 'date',
            searchable: false,
            headerStyle: {
                textAlign: 'right'
            },
            cellStyle: {
                textAlign: 'right'
            },
            editComponent: (props) => {
                return (
                    <DatePicker
                        label=""
                        value={new Date(moment(props.value))}
                        margin="normal"
                        format="DD/MM/YYYY"
                        onChange={e => {
                            props.onChange(e)
                        }}
                        animateYearScrolling
                        autoOk={true}
                        fullWidth
                        disableToolbar
                    />
                )
            }
        },
    ];

    const fetchBaseOptions = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'client-security-token': cookies.login
        },
        cache: 'default',
        mode: 'cors',
    };

    const send = (data, verb, message) => {
        const fetchOptions = {...fetchBaseOptions, body: JSON.stringify(data), method: verb};
        return fetch(config.ws_url + '/payment', fetchOptions)
            .then(data => data.json())
            .then(response => {
                if (response.errors && response.errors.length > 0) {
                    flashContext.show(response.errors.join(' | '), 'error', 5000);
                } else {
                    if (verb === 'PUT') {
                        setPayments(
                            payments.map(p => {
                                if (p.id === data.id) {
                                    return data;
                                }
                                return p;
                            })
                        );
                    } else if (verb === 'POST') {
                        setPayments(payments.concat(response.payments[0]));
                    } else if (verb === 'DELETE') {
                        setPayments(payments.filter((p) => p.id !== data.id))
                    }
                    flashContext.show(message, 'success');
                }
            })
            .catch((error) => {
                console.log(error);
                flashContext.show("C'è stato un errore durante l'invio dei dati del pagamento", 'error');
            });
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

    const options = {
        sorting: false,
        paging: false,
        filtering: false,
        search: false,
        draggable: false,
        actionsColumnIndex: 5,
        headerStyle: {
            width: 20,
            maxWidth: 20
        }
    };

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
    };

    const localization = {
        header: {
            actions: 'Azioni'
        },
        body: {
            emptyDataSourceMessage: 'Nessun pagamento da mostrare',
            addTooltip: 'Aggiungi un pagamento',
            deleteTooltip: 'Elimina pagamento',
            editTooltip: 'Modifica pagamento',
            editRow: {
                deleteText: 'Sei sicuro di voler cancellare questo pagamento?',
                cancelTooltip: 'Torna indietro',
                saveTooltip: 'Salva'
            }
        }
    };

    if (userContext.user === null) {
        return <CircularProgress/>
    }

    return (
        <RoleCheck role={'ROLE_USER'} alt={
            <Section title={'Ciao'}>
                <Typography align={"center"}>
                    <em>Per vedere questa pagina devi essere loggato!</em>
                </Typography>
            </Section>}>
            <Section title={'Ciao ' + userContext.user.username + ', ecco i tuoi pagamenti'}>
                {
                    hasError && <Paper style={{
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
                                    Non hai ancora pagato l'iscrizione annuale
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                }

                <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                    <MaterialTable title="Pagamenti"
                                   icons={tableIcons}
                                   options={options}
                                   localization={localization}
                                   columns={columns}
                                   data={payments}
                                   editable={canEdit ? editable : {}}
                    />
                </MuiPickersUtilsProvider>
            </Section>
        </RoleCheck>
    );
}