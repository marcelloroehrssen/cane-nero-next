import {useContext} from "react";
import ConfigContext from "../provider/ConfigContext";
import {useCookies} from "react-cookie";

export default function useUnicityCheck() {

    const config = useContext(ConfigContext);
    const [cookies,,] = useCookies();

    return async (type, value, loadingCb, unloadCb) => {
        if (value.length < 5) {
            return false;
        }
        if (loadingCb) {
            loadingCb();
        }

        let headers;
        if (cookies.login) {
             headers = { 'client-security-token': cookies.login }
        }

        const filter = {field: type, value: value};
        let response = await fetch(
            config.ws_url + '/user?filter=' + JSON.stringify(filter),
            {headers}
        );
        let json = await response.json();
        let isAvailable = (json.user.id === undefined);
        if (unloadCb) {
            unloadCb();
        }

        return isAvailable;
    };
}