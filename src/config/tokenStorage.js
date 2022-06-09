import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
    const token = await AsyncStorage.getItem('token')
    return token
}

const saveToken = async (token) => {
    await AsyncStorage.setItem('token', token)

}

const deleteToken = async (token) => {
    await AsyncStorage.removeItem('token')
}

export default {
    getToken,
    saveToken,
    deleteToken
}