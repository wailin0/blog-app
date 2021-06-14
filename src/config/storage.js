import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
    const token = await AsyncStorage.getItem('token')
    return token
}

export default {
    getToken
}