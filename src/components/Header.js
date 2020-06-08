import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLogout, startLogin } from '../actions/auth'

export const Header = ({ startLogout, startLogin, isAuthenticated }) => {
    return (
        <header className="header">
            <div className="content-container">
                <div className="header-content">
                    <Link to="/dashboard" className="header__title">
                        <h1>Overblogged</h1>
                    </Link>
                    {
                        isAuthenticated ?
                            <button className="button button--darkpink" onClick={startLogout}>Logout</button> :
                            <button className="button button--darkpink" onClick={startLogin}>Login</button>
                    }
                </div>
            </div>
        </header>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
})


const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()),
    startLogin: () => dispatch(startLogin())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);

