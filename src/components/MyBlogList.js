import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import { startSetMyBlogs } from '../actions/blogs'


export const MyBlogList = (props) => {
    return props.isAuthenticated ? (
        <div>
            <div className="page-header">
                <div className="content-container  content-container--smaller">
                    <h1 className="page-header__title">My blogs</h1>
                    <Link to="/create" className="button button--greypink">Create</Link>
                    <Link to="/dashboard" className="button button--greypink" style={{ display: 'inline-block' }}>Back to dashboard</Link>
                </div>
            </div>
            <div className="content-container" >
                <div className="list-body">
                    {
                        props.blogs.length === 0 ? (
                            <div>
                                <span className="list-item list-item--message">No Blog</span>
                            </div>
                        ) :
                            (
                                props.blogs.map((blog) => {
                                    return <Link
                                        className="list-item"
                                        to={{
                                            pathname: '/blog/' + blog.id,
                                            state: {
                                                id: blog.id,
                                                content: blog.content
                                            }
                                        }}
                                        key={blog.id}
                                    >
                                        <span className="list-item__title">{blog.title}</span>
                                        <div className="list-item__data">
                                            <span>{blog.description}</span>
                                            <img src={blog.thumbnail} style={{ height: '100px', width: '100px' }} />
                                        </div>
                                    </Link>
                                })
                            )
                    }
                </div>
            </div>
        </div>
    ) : <Redirect to="/dashboard" />
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        blogs: state.blogs.myBlogs,
        isAuthenticated: !!state.auth.uid
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startSetMyBlogs: () => dispatch(startSetMyBlogs())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBlogList);

    //     let blogs = this.props.blogs;
    //     if (this.state.blogs) {
    //         blogs = this.state.blogs
    //     }
    //     const pageData = blogs.length === 0 ? (

    //     ): (
    //             blogs.map((blog) => {
    //                 return <Link
    //                     className="list-item"
    //                     to={{
    //                         pathname: '/blog/' + blog.id,
    //                         state: {
    //                             id: blog.id,
    //                             content: blog.content
    //                         }
    //                     }}
    //                     key={blog.id}
    //                 >
    //                     {blog.title}
    //                     <div>{blog.description}</div>
    //                 </Link>
    //             })
    //         )
    //     return (
    //         <div className="content-container" >
    //             <div className="list-header">
    //                 <div className="show-for-mobile">My blogs</div>
    //                 <div className="show-for-desktop">My blogs</div>
    //             </div>
    //             <div className="list-body">
    //                 {this.state.blogs ?

    //                     :
    //                     <div>
    //                         <span className="list-item list-item--message">No Blog</span>
    //                     </div>
    //                 }
    //             </div>
    //         </div>
    //     )