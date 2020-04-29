import React from 'react';
import Base from "../src/components/layout/Base";
import FullScreenContent from "../src/components/layout/FullScreenContent";
import PaymentPage from "../src/components/payment/PaymentPage";
import remote from "../src/Utils/Remote";

const ITuoiPagamenti = ({payments, user, canEdit, hasError, users}) => (
    <Base title={'I tuoi pagamenti'}>
        <FullScreenContent>
            <div style={{
                backgroundImage: "url(/images/home.jpg)",
                backgroundPosition: "center center",
                width: "100%",
                height: 300,
            }}/>
        </FullScreenContent>
        <PaymentPage payments={payments} user={user} canEdit={canEdit} hasError={hasError} users={users}/>
    </Base>
);

export async function getServerSideProps({req, res}) {
    const login = req.headers.cookie.split('; ')
        .map(c => c.split('='))
        .filter(c => c[0] === 'login')
        .shift()[1];
    const {payments} = await remote(
        '/payment',
        {headers: {'client-security-token': login}}
    );
    const {user} = await remote(
        '/user',
        {headers: {'client-security-token': login}}
    );
    const canEdit = user.roles.indexOf('ROLE_ADMIN') > -1;
    const hasError = user.hasProblem.payments;

    let users = [];
    if (canEdit) {
        const {user: remoteUsers} = await remote(
            '/user',
            {
                headers: {'client-security-token': login},
                get: {filter:JSON.stringify({field:"all",value:"0"})}
            }
        );
        users = remoteUsers;
    }

    return {
        props: {payments, user, canEdit, hasError, users},
    }
}

export default ITuoiPagamenti;
