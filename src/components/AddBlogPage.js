import React from 'react';
import { connect } from 'react-redux';
import BlogForm from './BlogForm';
import { startAddBlog } from '../actions/blogs'
import { Redirect } from 'react-router-dom';

export class AddBlogPage extends React.Component {
    constructor(props) {
        super(props);
    }
    onSubmit = (blog) => {
        console.log(blog)
        this.props.startAddBlog(blog);
        this.props.history.push("/");
    }


    render() {
        return this.props.isAuthenticated ? (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Add blog</h1>
                    </div>
                </div>
                <div className="content-container">
                    <BlogForm
                        onSubmit={this.onSubmit}
                        isUpdating={false}
                    />
                </div>
            </div>
        ) : <Redirect to="/dashboard" />
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
})

const mapDispatchToProps = (dispatch) => {
    return {
        startAddBlog: (blog) => dispatch(startAddBlog(blog))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBlogPage);