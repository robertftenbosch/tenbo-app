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

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <div>
                <Layout>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/table' component={MockTable}/>
                    <Route exact path='/editor' component={TenboEditor}/>
                    <AuthorizeRoute path='/goals' component={Goals}/>
                    <AuthorizeRoute path='/fetch-data' component={FetchData}/>
                    <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes}/>
                </Layout>
            </div>

        );
    }
}
