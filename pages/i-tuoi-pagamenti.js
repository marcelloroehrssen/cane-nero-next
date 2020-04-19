import React from 'react';
import Base from "../src/components/layout/Base";
import FullScreenContent from "../src/components/layout/FullScreenContent";
import PaymentPage from "../src/components/payment/PaymentPage";

export default function ITuoiPagamenti() {

    return (
        <Base title={'I tuoi pagamenti'}>
            <FullScreenContent>
                <div style={{
                    backgroundImage: "url(/images/home.jpg)",
                    backgroundPosition: "center center",
                    width: "100%",
                    height: 300,
                }}/>
            </FullScreenContent>
            <PaymentPage />
        </Base>
    );
}
