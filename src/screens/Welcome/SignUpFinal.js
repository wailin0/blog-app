import React, {useContext, useState} from 'react'
import {Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import logo from "../../../assets/logo.png";
import {color, input} from "../../styles/theme";
import authService from "../../services/auth";
import tokenStorage from "../../config/tokenStorage";
import {Context} from "../../context/Context";

const SignUpFinal = ({route}) => {
    const [headline, setHeadline] = useState("")
    const [aboutMe, setAboutMe] = useState("")

    const {setUser} = useContext(Context)

    const signup = async () => {
        const {user} = route.params
        const registerData = {...user, headline, aboutMe}
        const response = await authService.registerUser(registerData)
        await tokenStorage.saveToken(response.token)
        const userData = await authService.getLoginUser()
        setUser(userData)
        alert('Account Created Successfully')
    }

    return (
        <View
            style={{
                flex: 1
            }}
        >
            {/* logo */}
            <View
                style={{
                    marginTop: 30, marginBottom: 30,
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
            <View
                style={{
                    flex: 1,
                    backgroundColor: color.blue,
                    borderTopLeftRadius: 28,
                    borderTopRightRadius: 28
                }}
            >
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
                        <View>
                            <Text style={{color: color.darkBlueText, fontSize: 14, marginBottom: 20}}>
                                Tell us a little bit more about you
                            </Text>
                            <View>
                                <Text style={{color: color.darkBlueText, fontSize: 14}}>Who are you?</Text>
                                <TextInput
                                    style={{...input}}
                                    value={headline}
                                    placeholder="eg. Teacher, Software Developer, etc"
                                    onChangeText={value => setHeadline(value)}
                                />
                                <Text style={{color: color.darkBlueText, fontSize: 14}}>About You</Text>
                                <TextInput
                                    style={{...input}}
                                    multiline
                                    placeholder="Brief detail about you..."
                                    value={aboutMe}
                                    onChangeText={value => setAboutMe(value)}
                                />
                            </View>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: color.blue,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 20,
                                    marginBottom: 10,
                                    borderRadius: 12
                                }}
                                onPress={() => signup()}
                            >
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Text style={{color: color.darkBlueText, marginRight: 10}}>
                                    Didnt get the email?
                                </Text>
                                <TouchableOpacity>
                                    <Text style={{color: color.blue, fontSize: 14, fontWeight: 'bold'}}>Resend</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>

            </View>

        </View>
    )
}

export default SignUpFinal