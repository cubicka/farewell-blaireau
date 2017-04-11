import React from 'react'
import {Provider} from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import StoreCreator from './model'
import AppRoute from './view/route'

const history = createHistory()
const store = StoreCreator(history)

function Root() {
    return (
        <Provider store={store}>
            <AppRoute history={history} />
        </Provider>
    );
}

export default Root;
