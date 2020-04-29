import {useContext} from "react";
import FlashBarContext from "../provider/FlashBarContext";
import {useCookies} from "react-cookie";
import {remoteAsync} from "../Utils/Remote";

export default function useDelete() {

    const flashContext = useContext(FlashBarContext);
    const [cookies,,] = useCookies();

    return async (url, id, successMessage, errorMessage) => {
        return remoteAsync(url, {
                headers: {'client-security-token': cookies.login},
                parameters: {method: 'DELETE', body: JSON.stringify({id: id})}
            })
            .then(() => {
                flashContext.show(successMessage);
            })
            .catch((error) => {
                flashContext.show(errorMessage);
            })
        ;
    }
}
