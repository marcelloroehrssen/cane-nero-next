import {useContext} from "react";
import ConfigContext from "../provider/ConfigContext";
import FlashBarContext from "../provider/FlashBarContext";
import {useCookies} from "react-cookie";

export default function useDelete() {

    const config = useContext(ConfigContext);
    const flashContext = useContext(FlashBarContext);
    const [cookies, ,] = useCookies();

    return (url, id, successMessage, errorMessage) => {
        const options = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'client-security-token': cookies.login
            },
            cache: 'default',
            mode: 'cors',
            method: 'DELETE',
            body: JSON.stringify({id: id})
        };
        fetch(config.ws_url + url, options)
            .then(() => {
                flashContext.show(successMessage);
            })
            .catch((error) => {
                flashContext.show(errorMessage);
                console.log(error);
            });
    }
}
