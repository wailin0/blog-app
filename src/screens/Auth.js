import React, {useState} from 'react'
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import logo from '../../assets/logo.png'
import {color} from "../styles/theme";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const Auth = ({navigation}) => {
    const [startScreen, setStartScreen] = useState(true)
    return (
        <View
            style={{
                flex: 1
            }}
        >

            {/* logo */}
            <View
                style={{
                    marginTop: 60, marginBottom: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Image
                    source={logo}
                    resizeMode='contain'
                    style={{
                        width: 110,
                        height: 56
                    }}
                />
            </View>

            {/* signin signup*/}
            <View
                style={{
                    flex: 1,
                    backgroundColor: color.blue,
                    borderTopLeftRadius: 28,
                    borderTopRightRadius: 28
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 20,
                        justifyContent: 'space-around'
                    }}
                >
                    <TouchableOpacity
                        onPress={() => setStartScreen(true)}
                    >
                        <Text style={{color: startScreen ? 'white' : 'darkgrey', fontSize: 18, fontWeight: 'bold'}}>
                            SIGN IN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setStartScreen(false)}
                    >
                        <Text style={{color: startScreen ? 'darkgrey' : 'white', fontSize: 18, fontWeight: 'bold'}}>
                            SIGN UP</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        flex: 1,
                        backgroundColor: 'white',
                        borderTopLeftRadius: 28,
                        borderTopRightRadius: 28
                    }}
                >
                    <View
                        style={{
                            paddingHorizontal: 30, paddingVertical: 20
                        }}
                    >
                        {startScreen
                            ? <SignIn/>
                            : <SignUp setStartScreen={setStartScreen}/>
                        }
                    </View>
                </ScrollView>

            </View>

        </View>
    )
}

export default Auth