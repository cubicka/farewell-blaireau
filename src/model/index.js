import {createStore, combineReducers, applyMiddleware} from 'redux'
import {routerReducer, routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import {ActionMiddleware, ReducerCreator} from 'kulakan/model'
import Action from '../action'

// import createLogger from 'redux-logger'
// const logger = createLogger()

import signIn from './view-signIn'
import page from './view-page'

const reducerSpecs = {
    page, signIn,
}

const reducers = ReducerCreator(reducerSpecs)

export default (history) => {
    const routeWithHistory = routerMiddleware(history)

    return createStore(
        combineReducers({
            ...reducers,
            router: routerReducer,
        }),
        applyMiddleware(thunk, ActionMiddleware(Action), routeWithHistory)
        // applyMiddleware(thunk, logger, routeMiddle)
    )
}
