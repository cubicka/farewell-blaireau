import {Get, BasicGet} from 'kulakan/network'
import {ToEndOfDay, ToStartOfDay} from 'kulakan/util'
import Promise from 'bluebird'

function Fetch() {
    return (dispatch, getState) => {
        const state = getState()
        const startDate = Math.round(ToStartOfDay(state.dashboard.get('startDate'))/1000)
        const endDate = Math.round(ToEndOfDay(state.dashboard.get('endDate'))/1000)

        dispatch(['/dashboard/update', {payload: {isFetching: true}}])
        return Promise.delay(1000).then(() => (Get(dispatch, "/admin/dashboard", {startDate, endDate})))
        .then((response) => {
            dispatch(['/dashboard/update', {payload: response}])
            dispatch(['/dashboard/update', {payload: {isFetching: false}}])
        })
        .catch(() => {
            dispatch(['/dashboard/update', {payload: {isFetching: false}}])
        })
    }
}

function Excel() {
    return (dispatch, getState) => {
        const state = getState()
        const startDate = Math.round(ToStartOfDay(state.dashboard.get('startDate'))/1000)
        const endDate = Math.round(ToEndOfDay(state.dashboard.get('endDate'))/1000)

        dispatch(['/dashboard/update', {payload: {isDownloading: true}}])
        return BasicGet(dispatch, "/admin/dashboard/report", {startDate, endDate})
        .then((response) => {
            dispatch(['/dashboard/update', {payload: {isDownloading: false}}])
        })
        .catch(() => {
            dispatch(['/dashboard/update', {payload: {isDownloading: false}}])
        })
    }
}

export default {
    excel: Excel,
    fetch: Fetch,
}
