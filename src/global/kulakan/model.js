import {fromJS} from 'immutable'
import {IsArray} from './obj'

function Reducer(moduleName, {initialState, events}) {
    // const {Load, Save} = Storage(name)
    // const loadedState = Load()  

    // let stateUsed = initialState
    // if (specs && loadedState && Validation(specs)(loadedState)) {
    //     stateUsed = loadedState
    // }

    return (state = fromJS(initialState), {type, payload}) => {
        const splittedTypes = type.split('/')
        const actionName = splittedTypes[0]
        const eventName = splittedTypes.slice(1).join('/')

        if (moduleName !== actionName) return state
        if (events &&  eventName in events) return events[eventName](state, payload)
        // if (savedEvent && child in savedEvent) return Save(savedEvent[child](state, payload))
        return state
    }
}

export function ReducerCreator(specs) {
    return Object.keys(specs).reduce((accum, name) => {
        accum[name] = Reducer(name, specs[name])
        return accum
    }, {})
}

export const ActionMiddleware = Actions => store => next => action => {
    // console.log('act', action)
    if (!IsArray(action)) {
        return next(action)
    }

    if (IsArray(action[0])) {
        return action.forEach((act) => {
            return Actions(...act)(store.dispatch, store.getState)
        })
    }

    return Actions(...action)(store.dispatch, store.getState)
}
