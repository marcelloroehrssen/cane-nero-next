import {DatePicker} from "@material-ui/pickers";
import moment from "moment";
import React from "react";

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
                    onChange={e => props.onChange(e)}
                    animateYearScrolling
                    autoOk={true}
                    fullWidth
                    disableToolbar
                />
            )
        }
    },
];

export const options = {
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

export default columns;
