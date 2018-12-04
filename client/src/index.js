import React from 'react';
import ReactDOM from 'react-dom';
import './cssCode/index.css';
import App from './App';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';


ReactDOM.render(
    <Router history={hashHistory}>
        <Route exact path='/' component={App}/>
        </Router>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

