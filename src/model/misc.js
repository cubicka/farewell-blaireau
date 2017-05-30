const initialState = {
    banks: [],
    states: [],
    cities: {},
}

const events = {
    update: (state, action) => (state.mergeDeep(action.payload)),
}

export default {
    initialState, events,
}
