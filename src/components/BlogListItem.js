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

    getPosition = (string, subString, index) => {
        return string.split(subString, index).join(subString).length;
    }

    componentDidMount() {
        const URL = window.location.href;
        const ID = URL.substr(URL.split("/", 4).join("/").length + 1, 20);
        console.log("ID: ", ID);
        database.ref(`author-blog/${ID}`).once('value').then(snapshot => {
            this.setState({ blogUID: snapshot.val() })
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.blog != prevProps.blog) {
            this.setState({ blogState: this.props.blog })
        }
        console.log("Blog user ID:", this.state.blogUID);
        console.log("Current user ID:", this.props.currentUID);
    }


    render() {
        const { blogState } = this.state;
        console.log(window.location.href.substr(0, window.location.href.lastIndexOf("/")) + /edit/);
        return (
            <div className="content-container content-container__blog">
                <Link to="/dashboard/" className="button button--darkpink">Back</Link>
                {
                    this.props.currentUID ? <Link to={"/blog/" + blogState.id + "/edit/"} className="button button--darkpink">Edit</Link> : null}
                {
                    this.state.blogState ? (
                        <div>
                            <Helmet>
                                {
                                    blogState.meta != undefined ?
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