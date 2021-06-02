import {baseUrl} from "../config/api";

const getTopTenUser = async () => {
    const response = await fetch(`${baseUrl}/topten-users`)
    return response.json()
}

const loginUser = async (loginData) => {
    const response = await fetch(`${baseUrl}/login`, {method: "POST", body: JSON.stringify(loginData)})
    return response.json()
}

const getUserById = async (userId) => {
    const response = await fetch(`${baseUrl}/user/${userId}`)
    return response.json()
}

const createUser = async (newUser) => {
    const response = await fetch(`${baseUrl}/user`, {method: "POST", body: JSON.stringify(newUser)})
    return response.json()
}

const getUserFollowers = async (userId) => {
    const response = await fetch(`${baseUrl}/user/${userId}/followers`)
    return response.json()
}

const getFollowingUsers = async (userId) => {
    const response = await fetch(`${baseUrl}/user/${userId}/following`)
    return response.json()
}

const updateUser = async (updatedUser) => {
    return await fetch(`${baseUrl}/user/${updatedUser.id}`, {method: "PUT", body: updatedUser})
}

export default {
    loginUser,
    getUserById,
    getTopTenUser,
    getUserFollowers,
    getFollowingUsers,
    createUser,
    updateUser
}