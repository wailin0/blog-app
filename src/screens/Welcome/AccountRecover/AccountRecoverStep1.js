import React, {useState} from 'react'
import {ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import logo from "../../../../assets/logo.png";
import {color, input} from "../../../styles/theme";
import authService from "../../../services/auth";

const AccountRecoverStep1 = ({navigation}) => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const sendRecoveryMail = async () => {
        setError(null)
        setLoading(true)
        try {
            await authService.sendRecoverEmail({email})
            setLoading(false)
            navigation.navigate("Account Recover Step 2", {email})
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
                                Forget Password
                            </Text>
                            <Text style={{color: color.darkBlueText, fontSize: 14, marginBottom: 20}}>
                                Enter your email to reset password
                            </Text>
                            <View>
                                <Text style={{color: color.darkBlueText, fontSize: 14}}>
                                    Your Email
                                </Text>
                                <TextInput
                                    value={email}
                                    onChangeText={text => setEmail(text)}
                                    keyboardType="email-address"
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
                                onPress={sendRecoveryMail}
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
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default AccountRecoverStep1