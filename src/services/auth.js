import {baseUrl} from "../config/api";
import axios from "../config/axios";

const loginUser = async (loginData) => {
    const response = await axios.post(`${baseUrl}/auth/signin`, loginData)
    return response.data
}

const getLoginUser = async () => {
    const response = await axios.get(`${baseUrl}/auth/user`)
    return response.data
}

const registerUser = async (newUser) => {
    const response = await axios.post(`${baseUrl}/auth/signup`, newUser)
    return response.data
}

const sendRecoverEmail = async (email) => {
    const response = await axios.post(`${baseUrl}/auth/recover`, email)
    return response.data
}

const verifyCode = async (data) => {
    const response = await axios.post(`${baseUrl}/auth/verify`, data)
    return response.data
}

const resetPassword = async (data) => {
    const response = await axios.post(`${baseUrl}/auth/reset`, data)
    return response.data
}

export default {
    loginUser,
    getLoginUser,
    registerUser,
    sendRecoverEmail,
    verifyCode,
    resetPassword
}