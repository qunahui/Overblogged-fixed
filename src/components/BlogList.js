import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
const LoadingPage = React.lazy(() => import('./LoadingPage'));

const BlogList = (props) => {
    return (
        <div className="content-container">
            <div className="">
                {
                    props.blogs.length === 0 ? (
                        <Suspense fallback={<div></div>}>
                            <LoadingPage />
                        </Suspense>
                    ) : (
                            props.blogs.map((blog) => {
                                return <Link
                                    className="list-item"
                                    to={{
                                        pathname: '/blog/' + blog.id + '/' + blog.title.split(" ").join("-"),
                                        state: {
                                            ...blog
                                        }
                                    }}
                                    key={blog.id}
                                >
                                    <span className="list-item__title">{blog.title}</span>
                                    <div className="list-item__data">
                                        <span>{blog.description}</span>
                                        <img src={blog.thumbnail} style={{ height: '100px', width: '100px' }} alt="thumbnail" />
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
