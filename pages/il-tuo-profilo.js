import React from 'react';
import Base from "../src/components/layout/Base";
import FullScreenContent from "../src/components/layout/FullScreenContent";
import UserPage from "../src/components/user/UserPage";

export default function IlTuoProfilo() {

    return (
        <Base title={'Il tuo profilo '}>
            <FullScreenContent>
                <div style={{
                    backgroundImage: "url(/images/home.jpg)",
                    backgroundPosition: "center center",
                    width: "100%",
                    height: 300,
                }}/>
            </FullScreenContent>
            <UserPage />
        </Base>
    );
}
