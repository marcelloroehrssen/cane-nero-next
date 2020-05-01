import React from 'react';
import Base from "../src/components/layout/Base";
import UserPage from "../src/components/user/UserPage";
import remote from "../src/Utils/Remote";

const IlTuoProfilo = ({user}) => (
    <Base title={'Il tuo profilo '} image={'images/home.jpg'}>
        <UserPage user={user} />
    </Base>
);

export async function getServerSideProps({req, res}) {

    const login = req.headers.cookie.split('; ')
        .map(c => c.split('='))
        .filter(c => c[0] === 'login')
        .shift()[1];
    const {user} = await remote(
        '/user',
        {headers:{'client-security-token':login}}
    );
    return {
        props: {user},
    }
}

export default IlTuoProfilo;
