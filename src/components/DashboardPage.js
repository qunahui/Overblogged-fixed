import React from 'react'
import BlogList from './BlogList'
import { Link } from 'react-router-dom'
import MyBlogList from './MyBlogList'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const DashBoardPage = (props) => {
    return (
        <div>
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">Dashboard</h1>
                    {props.isAuthenticated ?
                        <span>
                            <Link to="/myblog" className="button button--greypink">My blog</Link>
                        </span>
                        : null}
                </div>
            </div>
            <BlogList />
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
})

export default connect(mapStateToProps)(DashBoardPage);
