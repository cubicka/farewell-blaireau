import {GetAttrs} from 'kulakan/util'

const initialState = {
    list: [],
    total: 0,
    currentPage: 1,
    limit: 10,
    name: '',
    isFetching: false,
}

const events = {
    nextPage: (state, action) => {
        const {limit, total} = GetAttrs(state, ['limit', 'total'])
        return state.update('currentPage', (currentPage) => {
            return Math.min(currentPage + 1, Math.ceil(total/limit))
        })
    },
    prevPage: (state, action) => {
        return state.update('currentPage', (currentPage) => {
            return Math.max(currentPage - 1, 1)
        })
    },
    update: (state, action) => (state.merge(action.payload)),
}

export default {
    initialState, events,
}
