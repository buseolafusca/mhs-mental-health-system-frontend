import React from 'react'
import ReactDOM from 'react-dom'

import { createBrowserHistory } from 'history'

import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/RootReducer'

// core components
import Admin from 'layouts/Admin.jsx'
import Login from 'layouts/LoginPage.js'
import RTL from 'layouts/RTL.jsx'
import SurveyCreator from 'layouts/SurveyCreator.js'
import SurveyResult from 'layouts/SurveyResult.jsx'
import Authentication from 'layouts/Login/Authentication.jsx'

import 'assets/css/material-dashboard-react.css?v=1.7.0'

// const hist = createBrowserHistory();

import history from 'history.js'
import Manager from 'layouts/Manager'

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render( <
    Provider store = { store } >
    <
    Router history = { history } >
    <
    Switch >
    <
    Route path = '/login'
    component = { Authentication }
    /> <
    Route path = '/admin'
    render = {
        () => (isLoggedIn() ? ( < Admin / > ) : ( < Redirect to = '/login' / > ))
    }
    /> <
    Route path = '/manager'
    render = {
        () => (isLoggedIn() ? ( < Manager / > ) : ( < Redirect to = '/login' / > ))
    }
    /> <
    Route path = '/rtl'
    render = {
        () => (isLoggedIn() ? ( < RTL / > ) : ( < Redirect to = '/login' / > ))
    }
    /> <
    Route path = '/questionnaire/:id?'
    render = {
        () => (isLoggedIn() ? ( < SurveyCreator / > ) : ( < Redirect to = '/login' / > ))
    }
    /> <
    Route path = '/patientanswers/:id?'
    render = {
        () => (isLoggedIn() ? ( < SurveyResult / > ) : ( < Redirect to = '/login' / > ))
    }
    /> <
    Redirect from = '/'
    to = '/admin/dashboard' / >

    <
    /Switch> < /
    Router > <
    /Provider>,
    document.getElementById('root')
)

function isLoggedIn() {
    console.log('in the require auth function')
    return sessionStorage.jwt
}

function requireAuth(nextState, replace) {
    console.log('in the require auth function')
    if (!sessionStorage.jwt) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}