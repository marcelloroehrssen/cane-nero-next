import React from 'react';
import fetch from "node-fetch";
import {config} from "../provider/ConfigContext";

async function remote(resource, params, headers)
{
    const options = {
        ...params || {},
        headers: {
            ...headers || {},
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        cache: 'no-cache',
        mode: 'cors'
    };

    const response = await fetch(config.ws_url + '/' + resource, options);
    return await response.json();
}

export default remote;
