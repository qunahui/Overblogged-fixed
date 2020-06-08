import React from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux'
import database from '../firebase/firebase'
import LoadingPage from './LoadingPage';

class BlogListItem extends React.Component {
    constructor(props) {
        super(props);
        // window.location.href.substr(window.location.href.lastIndexOf("/") + 1, window.location.href.length)
        this.state = {
            blogState: this.props.location.state ? this.props.location.state : this.props.blog,
            isSameAuthor: false,
            blogUID: '',
        }
    }

    componentDidMount() {
        const ID = window.location.href.substr(window.location.href.lastIndexOf("/") + 1, window.location.href.length)
        database.ref(`author-blog/${ID}`).once('value').then(snapshot => {
            this.setState({ blogUID: snapshot.val() })
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.blog != prevProps.blog) {
            this.setState({ blogState: this.props.blog })
        }
    }


    render() {
        const { blogState } = this.state;
        return (
            <div className="content-container content-container__blog">
                <Link to="/dashboard/" className="button button--darkpink">Back</Link>
                {this.state.blogUID === this.props.currentUID ? <Link to={window.location.pathname + /edit/} className="button button--darkpink">Edit</Link> : null}
                {
                    this.state.blogState ? (
                        <div>
                            <Helmet>
                                {
                                    blogState.meta.length > 0 ?
                                        blogState.meta.map((metaInfo, index) => {
                                            return <meta key={index} name={metaInfo.name} content={metaInfo.content} />;
                                        }) : null
                                }
                                <title>{blogState.title}</title>
                            </Helmet>
                            <div className="content-container__blog">
                                {ReactHtmlParser(blogState.content)}
                            </div>
                        </div>
                    ) : <LoadingPage />
                }
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        blog: state.blogs.allBlogs.find((blog) => props.match.params.id === blog.id),
        isAuthenticated: !!state.auth.uid,
        currentUID: state.auth.uid
    }
}

export default connect(mapStateToProps)(BlogListItem);