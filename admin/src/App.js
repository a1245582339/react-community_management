import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Login, Main } from './views'
class App extends Component {
    render() {
        return (
            <Switch>
                <Redirect exact from='/' to='/main' />
                <Route path="/main" component={ Main } />
                <Route path="/login" component={ Login } />
            </Switch>
        );
    }
}

export default App;
