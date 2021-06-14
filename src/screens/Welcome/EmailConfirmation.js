import React from 'react'
import {Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import logo from "../../../assets/logo.png";
import {color, input} from "../../styles/theme";

const EmailConfirmation = ({navigation, route}) => {

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
                            <Text style={{color: color.darkBlue, fontSize: 24, fontWeight: '700', marginBottom: 10}}>
                                Confirm Email
                            </Text>
                            <Text style={{color: color.darkBlueText, fontSize: 14, marginBottom: 20}}>
                                A verification code was sent to your email
                            </Text>
                            <View>
                                <Text style={{color: color.darkBlueText, fontSize: 14}}>Enter Code</Text>
                                <TextInput
                                    style={{...input, fontSize: 30}}
                                    maxLength={6}
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
                            >
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                                    Confirm
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

export default EmailConfirmation