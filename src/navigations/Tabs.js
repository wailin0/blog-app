import React from 'react'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Menu from "../screens/Menu";
import Search from "../screens/Search";
import Article from "../screens/Article";

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Home' component={Home}/>
            <Tab.Screen name='Article' component={Article}/>
            <Tab.Screen name='Search' component={Search}/>
            <Tab.Screen name='Menu' component={Menu}/>
        </Tab.Navigator>
    )
}

export default Tabs