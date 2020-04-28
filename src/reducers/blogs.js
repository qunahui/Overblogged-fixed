const defaultState = {
    allBlogs: [],
    myBlogs: []
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_BLOG':
            return {
                ...state,
                allBlogs: [
                    ...state.allBlogs,
                    action.blog
                ],
                myBlogs: [
                    ...state.myBlogs,
                    action.blog
                ]
            }
        case 'SET_BLOGS':
            return {
                ...state,
                allBlogs: action.blogs,
            }
        case 'SET_USER_BLOGS':
            return {
                ...state,
                myBlogs: action.myBlogs,
            }
        case 'REMOVE_BLOG':
            return {
                ...state,
                allBlogs: state.allBlogs.filter(({ id }) => id !== action.id),
                myBlogs: state.myBlogs.filter(({ id }) => id !== action.id)
            }
        case 'EDIT_BLOG':
            return {
                ...state,
                allBlogs: state.myBlogs.map((blog) => {
                    if (blog.id === action.id) {
                        return {
                            ...blog,
                            ...action.updates
                        }
                    } else {
                        return blog;
                    }
                }),
                myBlogs: state.allBlogs.map((blog) => {
                    if (blog.id === action.id) {
                        return {
                            ...blog,
                            ...action.updates
                        }
                    } else {
                        return blog;
                    }
                })
            }
        default: return state;
    }
}
