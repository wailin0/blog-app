import React from 'react'
import {createStackNavigator} from "@react-navigation/stack";
import Tabs from "./Tabs";
import Home from "../screens/Home";

const Stack = createStackNavigator()

const RootNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName='Home'
        >
            <Stack.Screen name='Home' component={Tabs}/>
            <Stack.Screen name='Blog Detail' component={Home}/>
        </Stack.Navigator>
    )
}

export default RootNavigation