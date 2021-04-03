import {NavigationContainer} from "@react-navigation/native";
import React, {useState} from "react";
import Auth from "./src/screens/Auth";
import RootNavigation from "./src/navigations/RootNavigation";
import {StatusBar, View} from "react-native";
import Context from "./src/Context";


const App = () => {
    const [auth, setAuth] = useState(false)

    return (
        <View style={{flex: 1, marginTop: StatusBar.currentHeight}}>
            <Context.Provider value={{setAuth}}>
                <NavigationContainer>
                    {auth
                        ? <RootNavigation/>
                        : <Auth/>
                    }
                </NavigationContainer>
            </Context.Provider>
        </View>
    )
}

export default App