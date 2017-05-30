import {Get} from 'kulakan/network'
import {GetAttrs} from 'kulakan/util'

function List() {
    return (dispatch, getState) => {
        const state = getState()
        const {limit, currentPage, name} = GetAttrs(state.retail, ['limit', 'currentPage', 'name'])

        dispatch(['/retail/update', {payload: {isFetching: true}}])
        return Get(dispatch, '/admin/retail', {name, limit, offset: (currentPage - 1) * limit})
        .then((result) => {
            dispatch(['/retail/update', {payload: {
                isFetching: false,
                total: result.count,
                list: result.buyers,
            }}])
        })
        .catch(() => {
            dispatch(['/retail/update', {payload: {isFetching: false}}])
        })
    }
}

let editFilterTimeout
function EditFilter(name) {
    return (dispatch, getState) => {
        clearTimeout(editFilterTimeout)
        dispatch(['/retail/update', {payload: {name}}])
        editFilterTimeout = setTimeout(() => {
            dispatch(['/retail/update', {payload: {currentPage: 1}}])
            dispatch(List())
        }, 1000)
    }
}

export default {
    editFilter: EditFilter,
    list: List,
}
