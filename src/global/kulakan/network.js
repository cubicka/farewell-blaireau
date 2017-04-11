import Storage from './storage'
import config from '../../config'

const baseUrl = config.api

function CheckStatus(response) {
    if (!response.ok) {
        return Promise.reject(new Error(response.statusText || 'Status not OK'))
    }

    return response
}

function ParseJSON(response) {
    return response.json()
}

function Fetch(url, opts) {
    return fetch(baseUrl + url, {
        ...opts,
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': Storage.Load('token'),
        },
    })
    .then(CheckStatus)
    .then(ParseJSON)
}

function QueryParams(params) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&')
}

export function Get(url, opts) {
    return Fetch(url + '?' + QueryParams(opts), {
        method: 'get',
    })
}

export function Post(url, body) {
    return Fetch(url, {
        body: JSON.stringify(body),
        method: 'post',
    })
}
