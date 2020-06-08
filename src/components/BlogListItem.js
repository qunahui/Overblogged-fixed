import React from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux'
import database from '../firebase/firebase'

class BlogListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogState: this.props.location.state ? this.props.location.state : this.props.blog,
            isSameAuthor: false,
            blogUID: '',
        }
    }

    componentDidMount() {
        database.ref(`author-blog/${this.state.blogState.id}`).once('value').then(snapshot => {
            this.setState({ blogUID: snapshot.val() })
        })
    }

    render() {
        const { blogState } = this.state;
        return (
            <div className="content-container content-container__blog">
                <Link to="/dashboard/" className="button button--darkpink">Back</Link>
                {this.state.blogUID === this.props.currentUID ? <Link to={window.location.pathname + /edit/} className="button button--darkpink">Edit</Link> : null}
                <Helmet>
                    {
                        blogState.meta ?
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