import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import DashboardPage from '../components/DashboardPage';
import PrivateRoute from './PrivateRoute';
import BlogListItem from '../components/BlogListItem';
import AddBlogPage from '../components/AddBlogPage';
import NotFoundPage from '../components/NotFoundPage';
import UserPage from '../components/UserPage';
import MyBlogList from '../components/MyBlogList';
import EditBlogPage from '../components/EditBlogPage';

export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PrivateRoute path="/dashboard" component={DashboardPage} exact={true} />
                <PrivateRoute path="/user" component={UserPage} exact={true} />
                <PrivateRoute path="/blog/:id/edit" component={EditBlogPage} exact={true} />
                <PrivateRoute path="/blog/:id/:description" component={BlogListItem} exact={true} />
                <PrivateRoute path="/create" component={AddBlogPage} exact={true} />
                <PrivateRoute path="/myblog" component={MyBlogList} exact={true} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;