import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from '../header/Header'
import Container from '@material-ui/core/Container'
import Footer from '../footer/Footer'
import Head from 'next/head'
import PropTypes from 'prop-types'
import CookieBar from "./CookieBar";

const Base = ({children, title, image}) => (
    <>
        <CssBaseline/>
        <Head>
            <title>Cane Nero - {title}</title>
        </Head>
        <div style={{flexGrow: 1}}>
            <Header/>
            <div style={{
                backgroundImage: 'url(' + image + ')',
                backgroundPosition: "center center",
                width: "100%",
                height: 300,
            }}/>
            <Container>
                {children}
            </Container>
            <Footer/>
        </div>
        <CookieBar/>
    </>
);

Base.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired
};

export default Base;
