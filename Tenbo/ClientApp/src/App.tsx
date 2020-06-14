import React, {Component} from 'react';
import {Route} from 'react-router';
import {Layout} from './components/Layout';
import {Home} from './components/Home';
import {FetchData} from './components/FetchData';
import {Counter} from './components/Counter';
import TenboCopyright from './components/Copyright';

import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import {ApplicationPaths} from './components/api-authorization/ApiAuthorizationConstants';

import './custom.css'
import Goals from "./components/Goal/Goals";
import MockTable from "./components/Table/MockTable";
import TenboEditor from "./components/Editor/TenboEditor";
import TrelloClone from "./components/TrelloClone";
import MyCalendar from "./components/Calendar/TenboCalendar";
import TenboGrid from "./components/Grid/TenboGrid";

import VideoChat from "./components/VideoChat/VideoChat";

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <div>
                <Layout>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/table' component={MockTable}/>
                    <Route exact path='/editor' component={TenboEditor}/>
                    <Route exact path='/quote-list' component={TrelloClone}/>
                    <Route exact path='/calendar' component={MyCalendar}/>
                    <Route exact path='/tenbo-grid' component={TenboGrid}/>
                    <Route exact path='/video-chat' component={VideoChat}/>
                    <AuthorizeRoute path='/goals' component={Goals}/>
                    <AuthorizeRoute path='/fetch-data' component={FetchData}/>
                    <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes}/>
                </Layout>
            </div>

        );
    }
}
