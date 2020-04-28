import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header'

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
        <Route {...rest} component={(props) => (
            <div>
                <Header />
                <Component {...props} isAuth={isAuthenticated} />
            </div>
        )} />
    );

// export const PrivateRoute = (props) => (
//     props.isAuthenticated ?
//         <div>
//             <Header />
//             <Route {...props} />
//         </div> :
//         <Redirect to='/' />
// )

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);