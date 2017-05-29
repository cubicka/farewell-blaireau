let lastWeek = new Date()
lastWeek.setDate(lastWeek.getDate() - 7)

const initialState = {
    isDownloading: false,
    isFetching: false,
    created: [{count: 0}],
    accepted: [{count: 0}],
    delivered: [{count: 0}],
    cancelled: [{count: 0}],
    latest: [],
    popularItems: [],
    startDate: lastWeek,
    endDate: new Date(),
}

const events = {
    "update": (state, action) => (state.merge(action.payload))
}

export default {
    initialState, events,
}
