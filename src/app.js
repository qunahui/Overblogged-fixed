import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth'
import 'normalize.css/normalize.css';
import './styles/style.scss';
import { firebase } from './firebase/firebase'
import { startSetBlogs, startSetMyBlogs } from './actions/blogs';

const store = configureStore();
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid));
        store.dispatch(startSetMyBlogs());
    } else {
        store.dispatch(logout());
        // history.push('/');
    }
    store.dispatch(startSetBlogs()).then(() => {
        ReactDOM.render(jsx, document.getElementById('app'));
    });
})




