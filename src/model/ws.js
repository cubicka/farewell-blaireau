import {fromJS} from 'immutable'
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
    verificationCount: 0,
    verificationList: [],
    isVerifying: {},
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
    updateList: (state, action) => (state.update('verificationList', (verificationList) => fromJS(action.payload))),
    updateList0: (state, action) => (state.update('list', (verificationList) => fromJS(action.payload))),
}

export default {
    initialState, events,
}
