import {useCookies} from "react-cookie";
import remote from "../Utils/Remote";

export default function useUnicityCheck() {

    const [cookies,,] = useCookies();

    return async (type, value, loadingCb, unloadCb) => {
        if (value.length < 5) {
            return false;
        }
        if (loadingCb) {
            loadingCb();
        }

        let headers = {};
        if (cookies.login) {
             headers = { 'client-security-token': cookies.login }
        }
        const {user} = await remote('/user', {
            get: {filter: JSON.stringify(filter)},
            ...headers
        });
        let isAvailable = (user.id === undefined);
        if (unloadCb) {
            unloadCb();
        }

        return isAvailable;
    };
}