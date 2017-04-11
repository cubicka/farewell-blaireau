const initialState = {
    header: "",
}

const events = {
    "header/edit": (state, header) => (state.merge({header}))
}

export default {
    initialState, events,
}
