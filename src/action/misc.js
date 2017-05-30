import {Get} from 'kulakan/network'

function Banks() {
    return (dispatch, getState) => {
        const state = getState()
        const banks = state.misc.get('banks')

        if (banks.size > 0) return

        dispatch(['/misc/update', {payload: {isFetchingBanks: true}}])
        return Get(dispatch, '/public/bank')
        .then((response) => {
            dispatch(['/misc/update', {payload: {isFetchingBanks: false}}])
            dispatch(['/misc/update', {payload: {banks: response.banks}}])
        })
        .catch(() => {
            dispatch(['/misc/update', {payload: {isFetchingBanks: false}}])
        })
    }
}

function States() {
    return (dispatch, getState) => {
        const state = getState()
        const states = state.misc.get('states')

        if (states.size > 0) return
        dispatch(['/misc/update', {payload: {isFetchingStates: true}}])
        return Get(dispatch, '/public/state')
        .then((response) => {
            dispatch(['/misc/update', {payload: {isFetchingStates: false}}])
            dispatch(['/misc/update', {payload: {states: response.state}}])
        })
        .catch(() => {
            dispatch(['/misc/update', {payload: {isFetchingStates: false}}])
        })
    }
}

function Cities(id) {
    return (dispatch, getState) => {
        const state = getState()
        const cities = state.misc.get('cities')

        if (cities.has(id.toString())) return
        dispatch(['/misc/update', {payload: {isFetchingCities: true}}])
        return Get(dispatch, '/public/cities', {stateID: id})
        .then((response) => {
            dispatch(['/misc/update', {payload: {isFetchingCities: false}}])
            dispatch(['/misc/update', {payload: {cities: {[id.toString()]: response.cities}}}])
        })
        .catch(() => {
            dispatch(['/misc/update', {payload: {isFetchingCities: false}}])
        })
    }
}

export default {
    banks: Banks,
    states: States,
    cities: Cities,
}