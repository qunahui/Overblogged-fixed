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
        const URL = window.location.href;
        const ID = URL.substr(URL.split("/", 4).join("/").length + 1, 20);
        this.state = {
            blogState: this.props.location.state ? this.props.location.state : this.props.blog,
            isSameAuthor: false,
            blogUID: '',
            ID
        }
    }

    getPosition = (string, subString, index) => {
        return string.split(subString, index).join(subString).length;
    }

    componentDidMount() {
        database.ref(`author-blog/${this.state.ID}`).once('value').then(snapshot => {
            this.setState({ blogUID: snapshot.val() })
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.blog != prevProps.blog) {
            this.setState({ blogState: this.props.blog })
            if (window.location.pathname.lastIndexOf("/") !== window.location.pathname.length - 1) {
                window.history.pushState(null, null, window.location.pathname + "/");
            }
            console.log(window.location.pathname.split("/").length);
            if (window.location.pathname.split("/").length === 4) {
                window.history.pushState(null, null, window.location.pathname + this.props.blog.title.split(" ").join("-") + "/");
            }
        }
    }


    render() {
        const { blogState, ID } = this.state;
        return (
            <div className="content-container content-container__blog">
                <Link to="/dashboard/" className="button button--darkpink">Back</Link>
                {
                    this.props.currentUID ? <Link to={"/blog/" + ID + "/edit/"} className="button button--darkpink">Edit</Link> : null}
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