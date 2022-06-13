import React, {useState} from 'react'
import {ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import logo from "../../../../assets/logo.png";
import {color, input} from "../../../styles/theme";
import authService from "../../../services/auth";

const AccountRecoverStep3 = ({navigation, route}) => {
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const {email, code} = route.params

    const resetPassword = async () => {
        setError(null)
        setLoading(true)
        try {
            const response = await authService.resetPassword({
                email,
                code,
                newPassword
            })
            setLoading(false)
            navigation.navigate("Welcome")
            alert(response.message)
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
                                Reset Password
                            </Text>
                            <View style={{marginTop: 20}}>
                                <Text style={{color: color.darkBlueText, fontSize: 14}}>
                                    New Password
                                </Text>
                                <TextInput
                                    value={newPassword}
                                    onChangeText={text => setNewPassword(text)}
                                    style={{...input, fontSize: 15}}
                                />
                            </View>
                            <View>
                                <Text style={{color: color.darkBlueText, fontSize: 14}}>
                                    Confirm New Password
                                </Text>
                                <TextInput
                                    value={confirmNewPassword}
                                    onChangeText={text => setConfirmNewPassword(text)}
                                    style={{...input, fontSize: 15}}
                                />
                            </View>
                            {newPassword !== confirmNewPassword &&
                            <Text
                                style={{color: 'red', marginBottom: 10}}
                            >
                                must be the same as above
                            </Text>
                            }
                            {error &&
                            <Text
                                style={{color: 'red', marginBottom: 10}}
                            >
                                {error}
                            </Text>
                            }
                            <TouchableOpacity
                                disabled={!(newPassword && confirmNewPassword && (newPassword === confirmNewPassword) || loading)}
                                onPress={resetPassword}
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

export default AccountRecoverStep3