import 'react-dropzone-uploader/dist/styles.css'
import '../public/css/styles.css'
import React from "react";
import {ThemeProvider} from "@material-ui/styles";
import {theme} from "../src/Theme";
import {FlashBarContextProvider} from "../src/provider/FlashBarContext";
import {UserContextProvider} from "../src/provider/UserContext";
import {CookiesProvider} from "react-cookie";
import {useRouter} from "next/router";
import {PageTransition} from 'next-page-transitions'
import CssBaseline from "@material-ui/core/CssBaseline";
import CookieBar from "../src/components/layout/CookieBar";
import Head from "next/head";
import Header from "../src/components/header/Header";
import Footer from "../src/components/footer/Footer";
import Container from "@material-ui/core/Container";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import NextLink from "next/link";
import Link from "@material-ui/core/Link";

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
};

const MyApp = ({Component, pageProps}) => {

    const router = useRouter();

    return (
        <ThemeProvider theme={theme}>
            <FlashBarContextProvider>
                <UserContextProvider>
                    <CookiesProvider>
                        <CssBaseline/>
                        <Head>
                            <title>Cane Nero - {pageProps.title}</title>
                        </Head>
                        <div className="main-bg">
                            <Header/>
                            <div style={{
                                backgroundImage: 'url(' + pageProps.image + ')',
                                backgroundPosition: "center center",
                                width: "100%",
                                height: 300,
                                borderBottomRightRadius: 100
                            }}/>
                            {
                                pageProps.breadCrumbs &&
                                <Container style={{paddingTop: theme.spacing(1), paddingBottom: theme.spacing(1)}}>
                                    <CustomBreakcrumbs breadCrumbs={pageProps.breadCrumbs}/>
                                </Container>
                            }
                            {
                                !pageProps.breadCrumbs && <div style={{height: theme.spacing(4)}}/>
                            }
                            <div style={{
                                boxShadow: "inset 0 0 10px black",
                                backgroundColor: "rgba(153, 153, 153, 1)",
                                borderRadius: 100,
                                paddingTop: theme.spacing(8),
                                paddingBottom: theme.spacing(8)
                            }}>
                                <Container>
                                    <PageTransition timeout={300} classNames="page-transition">
                                        <Component {...pageProps} key={router.route}/>
                                    </PageTransition>
                                </Container>
                            </div>
                            <Footer style={{marginTop: theme.spacing(8), borderTopRightRadius: 100}}/>
                        </div>
                        <CookieBar/>
                    </CookiesProvider>
                </UserContextProvider>
            </FlashBarContextProvider>
        </ThemeProvider>
    )

}

export default MyApp;
