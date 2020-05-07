import React from 'react';
import Base from "../src/components/layout/Base";
import PaymentPage from "../src/components/payment/PaymentPage";
import remote from "../src/Utils/Remote";
import {LoginHash} from "../src/Utils/LoginHash";
import {HasRole} from "../src/Utils/HasRole";

const ITuoiPagamenti = ({payments, user, canEdit, hasError, users}) => (
    <Base>
        <PaymentPage payments={payments} user={user} canEdit={canEdit} hasError={hasError} users={users}/>
    </Base>
);

export async function getServerSideProps({req, res}) {
    const login = LoginHash(req);

    const {payments} = await remote(
        '/payment',
        {headers: {'client-security-token': login}}
    );
    const {user} = await remote(
        '/user',
        {headers: {'client-security-token': login}}
    );
    const canEdit = HasRole(user, 'ROLE_ADMIN');
    const hasError = user.hasProblem.payments;

    let users = [];
    if (canEdit) {
        const {user: remoteUsers} = await remote(
            '/user',
            {
                headers: {'client-security-token': login},
                get: {filter: JSON.stringify({field: "all", value: "0"})}
            }
        );
        users = remoteUsers;
    }

    return {
        props: {
            payments,
            user,
            canEdit,
            hasError,
            users,
            title: 'I tuoi pagamenti',
            image: '/images/home.jpg',
            breadCrumbs: [
                {url: null, label: "I tuoi pagamenti"}
            ]
        },
    }
}

export default ITuoiPagamenti;
