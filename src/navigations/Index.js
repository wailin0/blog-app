import {NavigationContainer} from "@react-navigation/native";
import React, {useEffect, useMemo, useState} from "react";
import {StatusBar, View} from "react-native";
import {Context} from "../context/Context";
import MainNavigation from "./MainNavigation";
import WelcomeNavigation from "./WelcomeNavigation";
import authService from "../services/user";
import tokenStorage from "../config/tokenStorage";
import axios from "axios";

const Index = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        tokenStorage.getToken()
            .then(token => {
                if (token) {
                    authService.getLoginUser().then(res => {
                        setUser(res)
                    })
                }
            })
    }, [])

    const [error, setError] = useState();

    useMemo(() => {
        axios.interceptors.response.use(function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
        }, function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error

            if (error.response.status === 403 || error.response.status === 401) {
                alert("session expired login again")
                tokenStorage.deleteToken()
                setUser(null)
            }

            return Promise.reject(error);
        });

    }, [setError])

    return (
        <View style={{flex: 1, marginTop: StatusBar.currentHeight}}>
            <Context.Provider value={{user, setUser}}>
                <NavigationContainer>
                    {user
                        ? <MainNavigation/>
                        : <WelcomeNavigation/>
                    }
                </NavigationContainer>
            </Context.Provider>
        </View>
    )
}

export default Index