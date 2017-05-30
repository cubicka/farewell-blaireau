import {GetAttrs} from 'kulakan/util'

const initialState = {
    list: [],
    total: 0,
    currentPage: 1,
    isFetching: false,
    limit: 10,
    name: '',
    profile: {},
    profileFound: false,
    isEditPassword: false,
    isEditInfo: false,
    isChangingPassword: false,
    isSaving: false,
    password: '',
    info: {},
}

const events = {
    clearInfo: (state) => {
        return state.update('info', (info) => {
            return state.get('profile')
        })
        .merge({isEditInfo: false})
    },
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
    update: (state, action) => (state.mergeDeep(action.payload)),
}

export default {
    initialState, events,
}
