import {NavigationContainer} from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import {StatusBar, View} from "react-native";
import {AuthContext} from "../context/Context";
import RootNavigation from "./RootNavigation";
import WelcomeNavigation from "./WelcomeNavigation";
import userService from "../services/user";
import tokenStorage from "../config/tokenStorage";

const Index = () => {
    const [user, setUser] = useState(false)

    useEffect(() => {
        tokenStorage.getToken()
            .then(token => {
                if (token) {
                    userService.getLoginUser().then(res => setUser(res))
                }
            })
    }, [])

    return (
        <View style={{flex: 1, marginTop: StatusBar.currentHeight}}>
            <AuthContext.Provider value={{user, setUser}}>
                <NavigationContainer>
                    {user
                        ? <RootNavigation/>
                        : <WelcomeNavigation/>
                    }
                </NavigationContainer>
            </AuthContext.Provider>
        </View>
    )
}

export default Index