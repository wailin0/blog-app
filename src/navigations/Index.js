import {NavigationContainer} from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import {StatusBar, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from "react-redux";
import {getLoginUser} from "../redux/reducers/UserReducer";
import {AuthContext} from "../context/Context";
import RootNavigation from "./RootNavigation";
import WelcomeNavigation from "./WelcomeNavigation";


const Index = () => {
    const [auth, setAuth] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        AsyncStorage.getItem('token')
            .then(token => {
                if (token) {
                    setAuth(true)
                    dispatch(getLoginUser())
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