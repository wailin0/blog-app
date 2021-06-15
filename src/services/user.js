import {baseUrl} from "../config/api";
import storage from "../config/storage";

const getTopTenUser = async () => {
    const response = await fetch(`${baseUrl}/user/topten-users`)
    return response.json()
}

const loginUser = async (loginData) => {
    const response = await fetch(`${baseUrl}/user/signin`, {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (!response.ok) {
        throw new Error("HTTP status " + response.status);
    } else {
        return response.json()
    }
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
    const response = await fetch(`${baseUrl}/user/signup`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response.json()
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

const followUser = async (followedId) => {
    const token = await storage.getToken()
    const response = await fetch(`${baseUrl}/user/follow`,
        {
            method: "POST",
            body: JSON.stringify(followedId),
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
    return response.json()
}

const checkFollow = async (userId) => {
    const token = await storage.getToken()
    const response = await fetch(`${baseUrl}/user/${userId}/checkfollow`,
        {
            method: "GET",
            headers: {
                "Authorization": token
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
    checkEmail,
    followUser,
    checkFollow
}