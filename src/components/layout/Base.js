import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from '../header/Header'
import Container from '@material-ui/core/Container'
import Footer from '../footer/Footer'
import Head from 'next/head'
import PropTypes from 'prop-types'
import CookieBar from "./CookieBar";
import {theme} from "../../Theme";
import Link from "@material-ui/core/Link";
import NextLink from "next/link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";

export const CustomBreakcrumbs = ({breadCrumbs}) => {
    return (
        <Breadcrumbs
            separator="›"
            aria-label="breadcrumb">
            <Typography color="textSecondary">
                Sei in: <NextLink href="/" passHref><Link color="inherit">Home</Link></NextLink>
            </Typography>
            {
                breadCrumbs.map(b => (
                    <div key={b.url}>
                        {b.url && <NextLink href={b.url} passHref><Link color="inherit">{b.label}</Link></NextLink>}
                        {!b.url && <Typography color="textSecondary">{b.label}</Typography>}
                    </div>
                ))
            }
        </Breadcrumbs>
    );
}

const Base = ({children, title, image, breadCrumbs}) => (
    <>
        <CssBaseline/>
        <Head>
            <title>Cane Nero - {title}</title>
        </Head>
        <div className="main-bg">
            <Header/>
            <div style={{
                backgroundImage: 'url(' + image + ')',
                backgroundPosition: "center center",
                width: "100%",
                height: 300,
                borderBottomRightRadius:100
            }}/>
            {
                breadCrumbs && <Container style={{paddingTop:theme.spacing(1), paddingBottom:theme.spacing(1)}}>
                    <CustomBreakcrumbs breadCrumbs={breadCrumbs}/>
                </Container>
            }
            {
                !breadCrumbs && <div style={{height:theme.spacing(4)}} />
            }
            <div style={{boxShadow: "inset 0 0 10px black",backgroundColor:"rgba(153, 153, 153, 1)",borderRadius:100,paddingTop:theme.spacing(8), paddingBottom:theme.spacing(8)}}>
                <Container>
                    {children}
                </Container>
            </div>
            <Footer style={{marginTop:theme.spacing(8),borderTopRightRadius:100}}/>
        </div>
        <CookieBar/>
    </>
);

Base.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    breadCrumbs: PropTypes.array
};

export default Base;
