import {baseUrl} from "../config/api";
import axios from "../config/axios";

const getRecommendedArticles = async () => {
    const response = await axios.get(`${baseUrl}/article/recommended`)
    return response.data
}

const getUserArticles = async (userId) => {
    const response = await axios.get(`${baseUrl}/user/${userId}/articles`)
    return response.data
}

const getArticleById = async (articleId) => {
    const response = await axios.get(`${baseUrl}/article/${articleId}`)
    return response.data
}

const getArticles = async (title, topic, limit) => {
    const response = await axios.get(`${baseUrl}/article?title=${title}&topic=${topic}&limit=${limit}`)
    return response.data
}

const createArticle = async (newArticle) => {
    const response = await axios.post(`${baseUrl}/article`, newArticle)
    return response.data
}

const updateArticle = async (updatedArticle) => {
    const response = await axios.put(`${baseUrl}/article/${updatedArticle.id}`, updatedArticle)
    return response.data
}

const deleteArticle = async (articleId) => {
    const response = await axios.delete(`${baseUrl}/article/${articleId}`)
    return response.data
}

const getTopics = async () => {
    const response = await axios.get(`${baseUrl}/topic`)
    return response.data
}

const uploadImage = async (photo) => {
    let data = {
        "file": photo,
        "upload_preset": "rztxsnps",
    }
    const response = await fetch(`https://api.cloudinary.com/v1_1/dt4ob4b4c/image/upload`,
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        })
    return response.json()
}

const likeArticle = async (articleId) => {
    const response = await axios.post(`${baseUrl}/article/${articleId}/like`)
    return response.data
}

const unlikeArticle = async (articleId) => {
    const response = await axios.post(`${baseUrl}/article/${articleId}/unlike`)
    return response.data
}

const checkLike = async (articleId) => {
    const response = await axios.post(`${baseUrl}/article/${articleId}/checklike`)
    return response.data
}

export default {
    getRecommendedArticles,
    getArticleById,
    getArticles,
    createArticle,
    getUserArticles,
    updateArticle,
    deleteArticle,
    getTopics,
    uploadImage,
    likeArticle,
    unlikeArticle,
    checkLike
}