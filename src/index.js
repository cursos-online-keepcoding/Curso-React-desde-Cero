import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Characters from './Characters';
import MyForm from './Form';
import Char from './Char';
import Error404 from './Error404';

import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import { HashRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';

import { Heading, Foot } from './Common';

import { Provider } from 'react-redux';
import { store } from './store';


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Heading />

                <Switch>
                    <Route path="/index" component={Characters} />
                    <Route path="/personaje/añadir" component={MyForm} />
                    <Route path="/personaje/:id" component={Char} />
                    <Route component={Error404} />
                </Switch>

                <Foot />
            </div>
        </Router>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
