import {SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {color} from "../styles/theme";
import {Feather} from "@expo/vector-icons";

const settings = [
    "Account",
    "Security",
    "Privacy"
]

const Settings = ({navigation}) => {

    return (
        <SafeAreaView style={{flex: 1, marginHorizontal: 30}}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                {settings.map((setting, index) =>
                    <TouchableOpacity
                        key={index}
                        style={{
                            backgroundColor: 'white',
                            height: 50,
                            paddingHorizontal: 20,
                            width: '100%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderRadius: 10,
                            flexDirection: 'row',
                            marginBottom: 20
                        }}
                        onPress={() => navigation.navigate(setting)}
                    >
                        <Text style={{
                            color: color.darkBlue,
                            fontSize: 20
                        }}>{setting}</Text>
                        <Feather name="arrow-right" size={24} color="black"/>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    )
}

export default Settings