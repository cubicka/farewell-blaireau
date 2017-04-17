import Storage from './storage'
import config from '../../config'
import push from 'react-router-redux'

const baseUrl = config.api

function CheckStatus(response, dispatch) {
    if (!response.ok) {
        if (response.status === 403) {
            Storage.Save('token', '')
            return dispatch(push('/signin'))
        }

        return Promise.reject(new Error(response.statusText || 'Status not OK'))
    }

    return response
}

function ParseJSON(response) {
    return response.json()
}

function Fetch(dispatch, url, opts) {
    return fetch(baseUrl + url, {
        ...opts,
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': Storage.Load('token'),
        },
    })
    .then(CheckStatus, dispatch)
    .then(ParseJSON)
}

function QueryParams(params) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&')
}

export function Get(dispatch, url, opts = {}) {
    return Fetch(dispatch, url + '?' + QueryParams(opts), {
        method: 'get',
    })
}

export function Post(dispatch, url, body) {
    return Fetch(dispatch, url, {
        body: JSON.stringify(body),
        method: 'post',
    })
}

export function Upload(url, formData) {
    return fetch(baseUrl + url, {
        method: 'POST',
        body: formData,
        headers: {
            'x-access-token': Storage.Load('token'),
        },
    })
    .then(CheckStatus)
    .then(ParseJSON)
}
