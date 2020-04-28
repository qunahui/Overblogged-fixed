import React from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import MetaTags from 'react-meta-tags';
import { connect } from 'react-redux'

const BlogListItem = (props) => {
    const state = props.location.state ? props.location.state : props.blog;
    return (
        <div className="content-container content-container__blog">
            <Link to="/dashboard/" className="button button--darkpink">Back</Link>
            {props.isAuthenticated ? <Link to={window.location.pathname + /edit/} className="button button--darkpink">Edit</Link> : null}
            <MetaTags>
                <meta charSet="utf-8" />
                <meta name="keywords" content="Hội Phố, Boardgame, trò chơi người việt, đồ chơi thẻ bài" />
                <meta name="description" content="Hội phố - trò chơi boardgame mới của người Việt" />
                <meta name="google-site-verification" content="JR0NGrFwpYB4Qg7fIi94fLY8UKNwR7_Q9bRm9Uo5IsE" />
                <title>{state.title}</title>
            </MetaTags>
            <div className="content-container__blog">
                {ReactHtmlParser(state.content)}
            </div>
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        blog: state.blogs.allBlogs.find((blog) => props.match.params.id === blog.id),
        isAuthenticated: !!state.auth.uid
    }
}

export default connect(mapStateToProps)(BlogListItem);