import {baseUrl} from "../config/api";
import axios from "../config/axios";

const getPopularArticles = async () => {
    const response = await axios.get(`${baseUrl}/article/popular-articles`)
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

const getArticles = async (articleTitle, topic, page) => {
    const response = await axios.get(`${baseUrl}/article?title=${articleTitle}&topic=${topic}&page=${page}`)
    return response.data
}

const createArticle = async (newArticle) => {
    const response = await axios.post(`${baseUrl}/article`,newArticle)
    return response.data
}

const updateArticle = async (updatedArticle) => {
    const response = await axios.put(`${baseUrl}/article/${updatedArticle.id}`,updatedArticle)
    return response.data
}

const deleteArticle = async (articleId) => {
    const response = await axios.delete(`${baseUrl}/article/${articleId}`)
    return response.data
}

const getTopics = async () => {
    const response = await axios.get(`${baseUrl}/article/topic`)
    return response.data
}

const uploadImage = async (data) => {
    const response = await axios.post(`https://api.cloudinary.com/v1_1/dt4ob4b4c/image/upload`, data)
    return response.data
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