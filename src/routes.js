import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Welcome from './components/Welcome';
import Signup from './components/Signup';
import ErrorPage from './components/ErrorPage';
import Login from './components/Login';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';


const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/welcome' component={Welcome} />
                <Route path='/signup' component={Signup} />
                <Route path='/login' component={Login} />
                <Route path='/forgotpassword' component={ForgotPassword} />
                <Route component={ErrorPage} />
            </Switch>      
        </Router>
    )
}

export default Routes;
