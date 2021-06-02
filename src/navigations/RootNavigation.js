import React from 'react'
import {createStackNavigator} from "@react-navigation/stack";
import Tabs from "./Tabs";
import ArticleDetail from "../screens/ArticleDetail";
import Profile from "../screens/Profile";
import Settings from "../screens/Settings";
import Account from "../screens/Settings/Account";
import About from "../screens/About";

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
            <Stack.Screen name='Settings' options={{headerShown: true}} component={Settings} />
            <Stack.Screen name='Account' options={{headerShown: true}} component={Account} />
            <Stack.Screen name='About' options={{headerShown: true}} component={About} />
        </Stack.Navigator>
    )
}

export default RootNavigation