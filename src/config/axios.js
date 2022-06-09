import axios from 'axios';
import tokenStorage from './tokenStorage';

axios.interceptors.request.use(async function (config) {
    // Do something before request is sent
    const token = await tokenStorage.getToken();
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }
    return config;
}, function (error) {
    // Do something with request error
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (error.response.status === 403 || error.response.status === 401) {
        alert("session expired login again")
    }

    return Promise.reject(error);
});

export default axios;