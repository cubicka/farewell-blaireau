import {createStore, combineReducers, applyMiddleware} from 'redux'
import {routerReducer, routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import {ActionMiddleware, ReducerCreator} from 'kulakan/model'
import Action from '../action'

// import {createLogger} from 'redux-logger'
// const logger = createLogger()

import dashboard from './dashboard'
import retail from './retail'
import sku from './sku'
import signIn from './view-signIn'
import page from './view-page'

const reducerSpecs = {
    dashboard, page, retail, signIn, sku,
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
        // applyMiddleware(thunk, ActionMiddleware(Action), logger, routeWithHistory)
    )
}
