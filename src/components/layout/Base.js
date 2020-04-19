import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from '../header/Header'
import Container from '@material-ui/core/Container'
import Footer from '../footer/Footer'
import Head from 'next/head'
import PropTypes from 'prop-types'
import CookieBar from "./CookieBar";

Base.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired
};

export default function Base(props) {
    const fullScreenContent = props.children.filter((element) => element.type.name === 'FullScreenContent');
    const otherContents = props.children.filter((element) => element.type.name !== 'FullScreenContent');

    return (
        <>
            <CssBaseline/>
            <Head>
                <title>Cane Nero - {props.title}</title>
            </Head>
            <div style={{flexGrow: 1}}>
                <Header/>
                {fullScreenContent}
                <Container>
                    <CssBaseline/>
                    {otherContents}
                </Container>
                <Footer/>
            </div>
            <CookieBar />
        </>
    )
}
