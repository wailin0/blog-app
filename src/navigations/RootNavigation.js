import React from 'react'
import {createStackNavigator} from "@react-navigation/stack";
import Tabs from "./Tabs";
import ArticleDetail from "../screens/ArticleDetail";
import Profile from "../screens/Profile";

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
            <Stack.Screen name='Article Detail' component={ArticleDetail}/>
            <Stack.Screen name='User Profile'  component={Profile}/>
        </Stack.Navigator>
    )
}

export default RootNavigation