import React from 'react';
import {isAutentic} from './auth';
import pageLogin from '../component/login'
import pageApp from '../component/chat'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

const PrivateRouter = ({ component: Component, ...rest }) =>(
    <Route {...rest} render={props =>(
        isAutentic() ?  (
            <Component {...props}/>
        ) : (
            <Redirect to={ { pathname: "/login",state: {from: props.location } } }/>
        )
    )}/>
);

const Routes = () =>(
    <BrowserRouter>
        <Switch>
            <Route exact path ='/' component={pageLogin}/>
            <Route path ='/login' component={pageLogin}/>
            <PrivateRouter path ='/app' component={pageApp}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;