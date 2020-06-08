import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth'
import 'normalize.css/normalize.css';
import './styles/style.scss';
import { firebase } from './firebase/firebase'
import { startSetBlogs, startSetMyBlogs } from './actions/blogs';
import LoadingPage from './components/LoadingPage'
const store = configureStore();

const jsx = (
    <Suspense fallback={<LoadingPage />}>
        <Provider store={store}>
            <AppRouter />
        </Provider>
    </Suspense>
)

// let hasRendered = false;
// const renderApp = () => {
//     if (!hasRendered) {
//         ReactDOM.render(jsx, document.getElementById('app'));
//         hasRendered = true;
//     }
// }

ReactDOM.render(jsx, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid));
        store.dispatch(startSetMyBlogs());
        store.dispatch(startSetBlogs()).then(() => {
            renderApp();
        });
    } else {
        store.dispatch(logout());
        store.dispatch(startSetBlogs()).then(() => {
            renderApp();
        })
        // history.push('/');
    }
})




