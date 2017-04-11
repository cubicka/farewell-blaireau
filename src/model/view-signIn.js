const initialState = {
    username: "",
    password: "",
    isLoading: false,
}

const events = {
    "username/edit": (state, username) => (EditState(state, {username})),
    "password/edit": (state, password) => (EditState(state, {password})),
    "loading/start": (state) => (EditState(state, {isLoading: true})),
    "loading/end": (state) => (EditState(state, {isLoading: false})),
}

function EditState(state, payload) {
    return state.merge(payload)
}

export default {
    initialState, events,
}
