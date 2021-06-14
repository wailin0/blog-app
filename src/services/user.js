import {baseUrl} from "../config/api";
import axios from 'axios'
import storage from "../config/storage";

const getTopTenUser = async () => {
    const response = await fetch(`${baseUrl}/user/topten-users`)
    return response.json()
}

const loginUser = async (loginData) => {
    const response = await axios.post(`${baseUrl}/user/signin`, loginData)
    return response.data
}

const getLoginUser = async () => {
    const token = await storage.getToken()
    const response = await fetch(`${baseUrl}/user`, {
        headers: {
            "Authorization": token
        }
    })
    return response.json()
}

const getUserById = async (userId) => {
    const response = await fetch(`${baseUrl}/user/${userId}`)
    return response.json()
}

const createUser = async (newUser) => {
    const response = await axios.post(`${baseUrl}/user/signup`, newUser)
    return response.data
}

const updateUser = async (updatedUser) => {
    const token = await storage.getToken()
    const response = await fetch(`${baseUrl}/user`,
        {
            method: "PUT",
            body: JSON.stringify(updatedUser),
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
    return response.json()
}

const getUserArticles = async (userId) => {
    const response = await fetch(`${baseUrl}/user/${userId}/article`)
    return response.json()
}

const getFollower = async (userId) => {
    const response = await fetch(`${baseUrl}/user/${userId}/follower`)
    return response.json()
}

const getFollowing = async (userId) => {
    const response = await fetch(`${baseUrl}/user/${userId}/following`)
    return response.json()
}

const checkEmail = async (email) => {
    const response = await fetch(`${baseUrl}/user/checkemail`,
        {
            method: "POST",
            body: JSON.stringify(email),
            headers: {
                "Content-Type": "application/json"
            }
        })
    return response.json()
}

export default {
    loginUser,
    getUserById,
    getLoginUser,
    getTopTenUser,
    createUser,
    updateUser,
    getUserArticles,
    getFollower,
    getFollowing,
    checkEmail
}