import {NavigationContainer} from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import {StatusBar, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from "react-redux";
import {getLoginUser, setLoginUser} from "../redux/reducers/UserReducer";
import {AuthContext} from "../context/Context";
import RootNavigation from "./RootNavigation";
import WelcomeNavigation from "./WelcomeNavigation";
import {getFollowing} from "../redux/reducers/FollowingReducer";
import userService from "../services/user";


const Index = () => {
    const [auth, setAuth] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        AsyncStorage.getItem('token')
            .then(token => {
                if (token) {
                    userService.getLoginUser()
                        .then(res => {
                            dispatch(setLoginUser(res))
                            dispatch(getFollowing(res.id))
                            setAuth(true)
                        })
                }
            })

    }, [])

    return (
        <View style={{flex: 1, marginTop: StatusBar.currentHeight}}>
            <AuthContext.Provider value={{setAuth}}>
                <NavigationContainer>
                    {auth
                        ? <RootNavigation/>
                        : <WelcomeNavigation/>
                    }
                </NavigationContainer>
            </AuthContext.Provider>
        </View>
    )
}

export default Index