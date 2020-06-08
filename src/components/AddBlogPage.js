import React, { Suspense } from 'react';
import { connect } from 'react-redux';
const BlogForm = React.lazy(() => import("./BlogForm"));
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
                    <Suspense fallback={<div></div>}>
                        <BlogForm
                            onSubmit={this.onSubmit}
                            isUpdating={false}
                        />
                    </Suspense>
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