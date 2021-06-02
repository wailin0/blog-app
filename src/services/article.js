import {baseUrl} from "../config/api";
import {articles} from "../dummy";

const getArticles = async () => {
    const response = await fetch(`${baseUrl}/article`)
    return response.json()
}

const getPopularArticles = async () => {
    const response = await fetch(`${baseUrl}/popular-articles`)
    return response.json()
}

const getUserArticles = async (userId) => {
    const response = await fetch(`${baseUrl}/user/${userId}/articles`)
    return response.json()
}

const getArticleById = async (articleId) => {
    const response = await fetch(`${baseUrl}/article/${articleId}`)
    return response.json()
}

const searchArticles = async (articleName, topic) => {
    const response = await fetch(`${baseUrl}/article?name=${articleName}&topic=${topic}`)
    return response.json()
}

const createArticle = async (newArticle) => {
    const response = await fetch(`${baseUrl}/article`,
        {method: "POST", body: JSON.stringify(newArticle)})
    return response.json()
}

const updateArticle = async (updatedArticle) => {
    const response = await fetch(`${baseUrl}/article/${updatedArticle.id}`,
        {method: "PUT", body: JSON.stringify(updatedArticle)})
    return response.json()
}

const deleteArticle = async (articleId) => {
    const response = await fetch(`${baseUrl}/article/${articleId}`,
        {method: "DELETE"})
    return response.json()
}

export default {
    getArticles,
    getPopularArticles,
    getArticleById,
    searchArticles,
    createArticle,
    getUserArticles,
    updateArticle,
    deleteArticle
}