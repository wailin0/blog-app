import React, {useContext, useState} from 'react'
import {FlatList, SafeAreaView, Text, TouchableOpacity} from "react-native";
import {Feather} from "@expo/vector-icons";
import {color} from "../styles/theme";
import {AuthContext} from "../context/Context";
import AsyncStorage from '@react-native-async-storage/async-storage'

const more = [
    {
        name: "Settings",
        icon: "settings"
    },
    {
        name: "Help",
        icon: "help-circle"
    },
    {
        name: "About",
        icon: "info"
    },
    {
        name: "Dark Mode",
        icon: "sun"
    },
    {
        name: "Log Out",
        icon: "log-out"
    }
]

const More = ({navigation}) => {

    const [darkmode, setDarkMode] = useState(false)

    const {setAuth} = useContext(AuthContext)


    const renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 100,
                    width: 150,
                    marginVertical: 20
                }}
                onPress={() => {
                    if (index === 3) setDarkMode(!darkmode)
                    else if (index === 4) {
                        AsyncStorage.removeItem('token')
                        setAuth(false)
                    }
                    else navigation.navigate(item.name)
                }}
            >
                <Feather
                    name={index === 3 ? (darkmode ? 'moon' : 'sun') : item.icon}
                    size={40}
                    color={color.blue}
                />
                <Text style={{
                    color: color.darkBlueText,
                    fontSize: 18,
                    marginTop: 10
                }}>
                    {index === 3 ? (darkmode ? item.name : 'Light Mode') : item.name}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <FlatList
                data={more}
                renderItem={renderItem}
                numColumns={2}
                keyExtractor={item => item.name.toString()}
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1
                }}
            />
        </SafeAreaView>
    )
}
export default More