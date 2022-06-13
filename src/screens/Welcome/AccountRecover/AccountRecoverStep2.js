import React, {useState} from 'react'
import {ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import logo from "../../../../assets/logo.png";
import {color, input} from "../../../styles/theme";
import authService from "../../../services/auth";

const AccountRecoverStep2 = ({navigation, route}) => {
    const [code, setCode] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const email = route.params?.email

    const verifyCode = async () => {
        setError(null)
        setLoading(true)
        try {
            await authService.verifyCode({code, email})
            setLoading(false)
            navigation.navigate("Account Recover Step 3", {code, email})
        } catch (e) {
            setError(e.response.data.message)
            setLoading(false)
        }
    }

    const sendRecoveryMail = async () => {
        setLoading(true)
        try {
            await authService.sendRecoverEmail({email})
            setLoading(false)
        } catch (e) {
            setError(e.response.data.message)
            setLoading(false)
        }
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
                            <Text style={{color: color.darkBlue, fontSize: 24, fontWeight: '700', marginBottom: 10}}>
                                Password Recovery
                            </Text>
                            <Text style={{color: color.darkBlueText, fontSize: 14, marginBottom: 20}}>
                                A verification code was sent to your email
                            </Text>
                            <View>
                                <Text style={{color: color.darkBlueText, fontSize: 14}}>
                                    Enter Code
                                </Text>
                                <TextInput
                                    value={code}
                                    onChangeText={text => setCode(text)}
                                    maxLength={10}
                                    style={{...input, fontSize: 15}}
                                />
                            </View>
                            {error
                            && <Text
                                style={{color: 'red', marginBottom: 10}}
                            >
                                {error}
                            </Text>
                            }
                            <TouchableOpacity
                                disabled={!email || loading}
                                onPress={verifyCode}
                                style={{
                                    backgroundColor: color.blue,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 20,
                                    marginBottom: 10,
                                    borderRadius: 12
                                }}
                            >
                                {loading
                                    ?
                                    <ActivityIndicator size="small" color="#fff"/>
                                    :
                                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                                        Confirm
                                    </Text>
                                }
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
                                <TouchableOpacity
                                    disabled={!email || loading}
                                    onPress={sendRecoveryMail}
                                >
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

export default AccountRecoverStep2