import React from 'react';
import Base from "../src/components/layout/Base";
import UserPage from "../src/components/user/UserPage";
import remote from "../src/Utils/Remote";
import {LoginHash} from "../src/Utils/LoginHash";

const IlTuoProfilo = ({user}) => (
    <Base>
        <UserPage user={user}/>
    </Base>
);

export async function getServerSideProps({req, res}) {

    const login = LoginHash(req);

    const {user} = await remote(
        '/user',
        {headers: {'client-security-token': login}}
    );
    return {
        props: {
            user,
            title: 'Il tuo profilo',
            image: '/images/home.jpg',
            breadCrumbs: [
                {url: null, label: "Il tuo profilo"}
            ]
        },
    }
}

export default IlTuoProfilo;
