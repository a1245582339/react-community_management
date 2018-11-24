import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Views from './views'
class App extends Component {
    render() {
        return (
            <Switch>
                <Redirect exact from='/' to='/main' />
                <Route path="/main" component={ Views.Main } />
                <Route path="/login" component={ Views.Login } />
                <Route path="/401" component={ Views.NoPermission } />
                <Route component={ Views.NoFound } />
            </Switch>
        );
    }
}

export default App;
