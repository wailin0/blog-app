import {NavigationContainer} from "@react-navigation/native";
import React, {useState} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Auth from "./src/screens/Auth";
import RootNavigation from "./src/navigations/RootNavigation";


const App = () => {
    const [auth, setAuth] = useState(true)

    return (
        // <Context.Provider value={{setAuth}}>
        <NavigationContainer>
            {auth
                ? <RootNavigation/>
                : <Auth/>
            }
        </NavigationContainer>
        // </Context.Provider>
    )
}

export default App