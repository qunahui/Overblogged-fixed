import database, { firebase } from '../firebase/firebase'

export const addBlog = (blog) => ({
    type: 'ADD_BLOG',
    blog
});

export const startAddBlog = (blogData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        console.log(uid)
        let blogID;
        return database.ref(`/blogs/`).push(blogData).then((ref) => {
            blogID = ref.key;
            dispatch(addBlog({
                id: ref.key,
                ...blogData
            }))
        }).then((res) => {
            console.log(res)
            database.ref(`author-blog/`).update({
                [blogID]: uid
            })
        })
    }
};

export const setBlogs = (blogs) => ({
    type: 'SET_BLOGS',
    blogs
});

export const setUserBlogs = (myBlogs) => ({
    type: 'SET_USER_BLOGS',
    myBlogs
})

export const startSetBlogs = () => {
    return (dispatch, getState) => {
        const blogs = [];
        return database.ref(`blogs/`)
            .once('value')
            .then((snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    blogs.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    })
                })
                dispatch(setBlogs(blogs));
            })
    }
};

export const startSetMyBlogs = () => {
    return (dispatch, getState) => {
        const myBlogs = [];
        const blogRef = database.ref('blogs/')
        const uid = getState().auth.uid;
        return database.ref(`author-blog`)
            .once('value', snap => snap.val())
            .then(childSnapshot => {
                childSnapshot.forEach((blog) => {
                    if (blog.val() == uid) {
                        blogRef.child(blog.key).once('value').then(blogSnapshot => {
                            myBlogs.push({
                                id: blogSnapshot.key,
                                ...blogSnapshot.val()
                            })
                        })
                    }
                })
                dispatch(setUserBlogs(myBlogs));
            })
    }
}

export const removeBlog = ({ id }) => ({
    type: 'REMOVE_BLOG',
    id
})

export const startRemoveMyBlog = ({ id }) => {
    console.log('Start remove')
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`blogs/${id}`).remove().then(() => {
            database.ref(`author-blog/${id}`).remove().then(() => {
                dispatch(removeBlog({ id }));
            })
        });
    }
}


export const editBlog = (id, updates) => ({
    type: 'EDIT_BLOG',
    id,
    updates
})

export const startEditMyBlog = (id, updates) => {
    console.log('Start edit')
    return (dispatch, getState) => {
        return database.ref(`blogs/${id}`).update(updates).then(() => {
            dispatch(editBlog(id, updates));
        });
    }
}



//            dispatch(setUserBlogs(myBlogs));