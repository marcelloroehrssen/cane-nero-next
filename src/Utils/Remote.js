import React from 'react';
import fetch from "node-fetch";
import {config} from "../Config";
import {stringify} from 'query-string';

async function r(resource, params) {
    const {get, headers, parameters} = {get: null, headers: {}, parameters: {}, ...(params || {})};

    const options = {
        headers: {
            ...headers || {},
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        cache: 'no-cache',
        mode: 'cors',
        ...parameters || {}
    };
    let url = config.ws_url + resource +  (get ?  '?' + stringify(get) : '');

    return fetch(url, options);
}

async function remote(resource, params)
{
    const response = await r(resource, params);
    return response.json();
}

export async function remoteAsync(resource, params)
{
    return r(resource, params).then(d => d.json());
}

export default remote;
