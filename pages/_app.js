import 'react-dropzone-uploader/dist/styles.css'
import '../public/css/styles.css'
import React from "react";
import {ThemeProvider} from "@material-ui/styles";
import {theme} from "../src/Theme";
import {ConfigContextProvider} from "../src/provider/ConfigContext";
import {FlashBarContextProvider} from "../src/provider/FlashBarContext";
import {UserContextProvider} from "../src/provider/UserContext";
import {CookiesProvider} from "react-cookie";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme}>
            <ConfigContextProvider>
                <FlashBarContextProvider>
                    <UserContextProvider>
                        <CookiesProvider>
                            <Component {...pageProps} />
                        </CookiesProvider>
                    </UserContextProvider>
                </FlashBarContextProvider>
            </ConfigContextProvider>
        </ThemeProvider>
    )

}