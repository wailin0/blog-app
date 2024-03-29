import {baseUrl} from "../config/api";
import axios from "../config/axios";

const getTopTenUser = async () => {
    const response = await axios.get(`${baseUrl}/user/topten-users`)
    return response.data
}

const getUserById = async (userId) => {
    const response = await axios.get(`${baseUrl}/user/${userId}`)
    return response.data
}

const updateUser = async (updatedUser) => {
    const response = await axios.put(`${baseUrl}/user`, updatedUser)
    return response.data
}

const getUserArticles = async (userId) => {
    const response = await axios.get(`${baseUrl}/user/${userId}/article`)
    return response.data
}

const getFollower = async (userId) => {
    const response = await axios.get(`${baseUrl}/user/${userId}/follower`)
    return response.data
}

const getFollowing = async (userId) => {
    const response = await axios.get(`${baseUrl}/user/${userId}/following`)
    return response.data
}

const checkEmail = async (email) => {
    const response = await axios.post(`${baseUrl}/user/checkemail`, email)
    return response.data
}

const followUser = async (followedId) => {
    const response = await axios.post(`${baseUrl}/user/follow`, followedId)
    return response.data
}

const unfollowUser = async (followedId) => {
    const response = await axios.post(`${baseUrl}/user/unfollow`, followedId)
    return response.data
}

const checkFollow = async (userId) => {
    const response = await axios.get(`${baseUrl}/user/${userId}/checkfollow`)
    return response.data
}


export default {
    getUserById,
    getTopTenUser,
    updateUser,
    getUserArticles,
    getFollower,
    getFollowing,
    checkEmail,
    followUser,
    unfollowUser,
    checkFollow
}