import React from 'react'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Explore from "../screens/Explore";
import Article from "../screens/Article";
import {Feather} from "@expo/vector-icons";
import {color} from "../styles/theme";
import CreateArticle from "../screens/CreateArticle";
import {TouchableOpacity, View} from "react-native";

const Tab = createBottomTabNavigator()

const CustomTabBarButton = ({children, onPress, accessibilityState}) => {
    let isSelected = accessibilityState.selected
    return (
        <TouchableOpacity
            style={{
                top: -20,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius:30,
                padding:4
            }}
            onPress={onPress}
        >
            <View
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 35,
                    backgroundColor: isSelected ? color.darkBlue : color.blue
                }}
            >
                {children}
            </View>
        </TouchableOpacity>
    )
}

const Tabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarIcon: ({focused}) =>
                        <Feather name="home" size={24}
                                 color={focused ? color.blue : color.darkGrey}/>
                }}
            />
            <Tab.Screen
                name='Article'
                component={Article}
                options={{
                    tabBarIcon: ({focused}) =>
                        <Feather name="book-open" size={24}
                                 color={focused ? color.blue : color.darkGrey}/>
                }}
            />
            <Tab.Screen
                name='CreateArticle'
                component={CreateArticle}

                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({focused}) =>
                        focused
                            ? <Feather name="x" size={30} color='white'/>
                            : <Feather name="plus" size={30} color='white'/>,
                    tabBarButton: (props => <CustomTabBarButton {...props} />)
                }}
            />
            <Tab.Screen
                name='Explore'
                component={Explore}
                options={{
                    tabBarIcon: ({focused}) =>
                        <Feather name="search" size={24}
                                 color={focused ? color.blue : color.darkGrey}/>
                }}
            />
            <Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                    tabBarIcon: ({focused}) =>
                        <Feather name="user" size={24}
                                 color={focused ? color.blue : color.darkGrey}/>
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs