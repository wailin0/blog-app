import articleService from "../../services/article";

const ArticleReducer = (state = [], action) => {
    switch (action.type) {
        case "GET_ARTICLES":
            return action.data
        case "CREATE_ARTICLE":
            return [action.data, ...state]
        case 'DELETE_ARTICLE':
            return state.filter(article => article.id !== action.articleId)
        case 'UPDATE_ARTICLE':
            const updatedArticle = action.data
            return state.map(article => article.id === updatedArticle.id ? updatedArticle : article)
        case "LOAD_MORE_ARTICLES":
            return [...state, ...action.data]
        default:
            return state;
    }
}

export const loadMoreArticles = (data) => {
    return async dispatch => {
        dispatch({
            type: 'LOAD_MORE_ARTICLES',
            data
        })
    }
}


export const getArticles = (searchTitle, searchTopic, page) => {
    return async dispatch => {
        const data = await articleService.getArticles(searchTitle, searchTopic, page)
        dispatch({
            type: 'GET_ARTICLES',
            data
        })
    }
}


export const addArticle = (article) => {
    return async dispatch => {
        dispatch({
            type: 'CREATE_ARTICLE',
            data: article
        })
    }
}

export const updateArticle = (article) => {
    return async dispatch => {
        const data = await articleService.updateArticle(article)
        dispatch({
            type: 'UPDATE_ARTICLE',
            data
        })
    }
}

export const deleteArticle = (articleId) => {
    return async dispatch => {
        await articleService.deleteArticle(articleId)
        dispatch({
            type: 'DELETE_ARTICLE',
            articleId
        })
    }
}

export default ArticleReducer