import {fromJS} from 'immutable'

const initialState = {
    list: []
}

const events = {
    "list/update": (state, {buyers}) => (state.update('list', () => (fromJS(buyers))))
}

export default {
    initialState, events,
}
