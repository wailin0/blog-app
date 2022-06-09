import {Text, TouchableOpacity, View} from "react-native";
import {color} from "../../../styles/theme";
import {Feather} from "@expo/vector-icons";
import {Context} from "../../../context/Context";
import {useContext} from "react";
import React from "react";

const Header = () => {

    const {user} = useContext(Context)

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: 30,
                marginVertical: 10
            }}
        >
            <Text style={{color: color.darkBlueText, fontSize: 18}}>
                Hi, {user && user.name}
            </Text>
            <TouchableOpacity>
                <Feather name="bell" size={24} color="black"/>
            </TouchableOpacity>
        </View>
    )
}

export default Header