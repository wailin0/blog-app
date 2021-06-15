import {baseUrl} from "../config/api";
import storage from '../config/storage'

const getPopularArticles = async () => {
    const response = await fetch(`${baseUrl}/article/popular-articles`)
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

const getArticles = async (articleTitle, topic, page) => {
    const response = await fetch(`${baseUrl}/article?title=${articleTitle}&topic=${topic}&page=${page}`)
    return response.json()
}

const createArticle = async (newArticle) => {
    const token = await storage.getToken()
    const response = await fetch(`${baseUrl}/article`,
        {
            method: "POST",
            body: JSON.stringify(newArticle),
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
    return response.json()
}

const updateArticle = async (updatedArticle) => {
    const response = await fetch(`${baseUrl}/article/${updatedArticle.id}`,
        {
            method: "PUT",
            body: JSON.stringify(updatedArticle),
            headers: {
                "Content-Type": "application/json"
            }
        })
    return response.json()
}

const deleteArticle = async (articleId) => {
    const token = await storage.getToken()
    const response = await fetch(`${baseUrl}/article/${articleId}`,
        {
            method: "DELETE",
            headers: {"Authorization": token}
        })
    return response.json()
}

const getTopics = async () => {
    const response = await fetch(`${baseUrl}/article/topic`)
    return response.json()
}

const uploadImage = async (data) => {
    const response = await fetch(`https://api.cloudinary.com/v2/dt4ob4b4c/image/upload`,
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        })
    return response.json()
}

export default {
    getPopularArticles,
    getArticleById,
    getArticles,
    createArticle,
    getUserArticles,
    updateArticle,
    deleteArticle,
    getTopics,
    uploadImage
}