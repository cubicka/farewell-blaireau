import {Get} from 'kulakan/network'

function List() {
    return (dispatch) => {
        return Get(dispatch, '/admin/retail')
        .then((result) => {
            dispatch(['/retail/list/update', result])
        })
        .catch(() => {})
    }
}

export default {
    list: List,
}
