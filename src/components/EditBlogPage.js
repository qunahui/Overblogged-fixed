import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
const BlogForm = React.lazy(() => import("./BlogForm"));
import { startRemoveMyBlog, startEditMyBlog } from '../actions/blogs'
import { Redirect } from 'react-router-dom'

class EditBlogPage extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }


    onSubmit = (blog) => {
        console.log("ID: ", this.props.blog.id, "Blog: ", blog)
        this.props.startEditMyBlog(this.props.blog.id, blog);
        this.props.history.push('/myblog');
    }

    onClick = () => {
        this.props.startRemoveMyBlog({ id: this.props.blog.id });
        this.props.history.push('/myblog');
    }

    render() {
        console.log(this.props)
        return this.props.isAuthenticated ? (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Blog</h1>
                    </div>
                </div>
                <div className="content-container"
                >
                    <Suspense fallback={<div></div>}>
                        <BlogForm
                            blog={this.props.blog}
                            onSubmit={this.onSubmit}
                            isUpdating={true}
                            className="content-container__blog"
                        />
                    </Suspense>
                    <button
                        className="button button--darkpink"
                        onClick={this.onClick}>
                        Remove Blog</button>
                </div>
            </div>
        ) : <Redirect to="/dashboard" />
    }
}

const mapStateToProps = (state, props) => {
    return {
        isAuthenticated: !!state.auth.uid,
        blog: state.blogs.myBlogs.find((blog) => {
            return blog.id === props.match.params.id;
        })
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        startRemoveMyBlog: (data) => dispatch(startRemoveMyBlog(data)),
        startEditMyBlog: (id, data) => dispatch(startEditMyBlog(id, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBlogPage);
