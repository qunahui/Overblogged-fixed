import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import LoadingPage from './LoadingPage';

const BlogList = (props) => {
    return (
        <div className="content-container">
            <div className="">
                {
                    props.blogs.length === 0 ? (
                        <LoadingPage />
                    ) : (
                            props.blogs.map((blog) => {
                                return <Link
                                    className="list-item"
                                    to={{
                                        pathname: '/blog/' + blog.id,
                                        state: {
                                            ...blog
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
    )
};

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs.allBlogs
    };
};
export default connect(mapStateToProps)(BlogList);
