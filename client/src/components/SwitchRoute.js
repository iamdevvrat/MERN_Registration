import React from 'react';
import { Switch, Route } from 'react-router-dom'
import ReactDOM from 'react-dom';
import {
    getFromStorage,
    setInStorage,
} from '../utils/storage';

// Components
import AppNavbar from './AppNavbar';
import Page from './Page';
import Home from './Home';

// CSS
import './Home.css';

export default class SwitchRoute extends React.Component {

    render() {
        return (
            <div className="Home_CSS">
                {/* <AppNavbar /> */}
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/page' component={Page} />
                    {/* <Route exact path='/' Component={AppNavbar}>
                        <Route path='/home' component={Home} />
                        <Route path='/page' component={Page} />
                    </Route> */}
                </Switch>
            </div>
        );
    }
}