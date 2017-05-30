import React from 'react'
import {Router, Switch, Route, Redirect} from 'react-router'
import Storage from 'kulakan/storage'
import SignInPage from './sign-in'
import DashboardPage from './dashboard'
import WSPage from './ws'
import WSProfilePage from './ws-profile'
import RetailPage from './retail'
import SKUPage from './sku'

function PrivateRoute({component: Component, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (Storage.Load('token')) {
                    return <Component {...props} />
                }

                return <Redirect to={{pathname: '/sign-in', state: {from: props.location}}} />
            }}
        />
    )
}

function Root({history}) {
    return (
        <Router history={history}>
            <Switch>
                <PrivateRoute path="/dashboard" component={DashboardPage} />
                <PrivateRoute path="/ws" component={WSPage} />
                <PrivateRoute path="/ws-detail/:id" component={WSProfilePage} />
                <PrivateRoute path="/retail" component={RetailPage} />
                <PrivateRoute path="/sku" component={SKUPage} />
                <Route path="*" component={SignInPage} />
            </Switch>
        </Router>
    )
}

export default Root
