import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {color} from "../styles/theme";
import google from "../../assets/google.png";
import facebook from "../../assets/facebook.png";
import twitter from "../../assets/twitter.png";
import React from "react";

const SignIn = () => {

    // const {setAuth} = useContext(Context)

    return (
        <>
            <Text style={{color: color.darkBlue, fontSize: 24, fontWeight: '700', marginBottom: 10}}>
                Welcome back
            </Text>
            <Text style={{color: color.darkBlueText, fontSize: 14, marginBottom: 20}}>
                Sign in with your account
            </Text>
            <Text style={{color: color.darkBlueText, fontSize: 14}}>Username</Text>
            <TextInput
                style={{
                    borderBottomWidth: 1,
                    borderBottomColor: color.darkGrey,
                    marginBottom: 20
                }}
            />
            <Text style={{color: color.darkBlueText, fontSize: 14}}>Password</Text>
            <TextInput
                style={{
                    borderBottomWidth: 1,
                    borderBottomColor: color.darkGrey
                }}
            />
            <TouchableOpacity
                style={{
                    backgroundColor: color.blue,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20,
                    marginVertical: 20,
                    borderRadius: 12
                }}
            >
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>SIGN IN</Text>
            </TouchableOpacity>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text style={{color: color.darkBlueText, marginRight: 10}}>
                    Forget your password?
                </Text>
                <TouchableOpacity>
                    <Text style={{color: color.blue, fontSize: 14, fontWeight: 'bold'}}>Reset here</Text>
                </TouchableOpacity>
            </View>

            <View
                style={{
                    alignItems: 'center',
                    marginTop: 20
                }}
            >
                <Text
                    style={{
                        color: color.darkBlueText,
                        fontSize: 12
                    }}
                >
                    OR SIGN IN WITH
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        marginVertical: 10
                    }}
                >
                    <TouchableOpacity>
                        <Image
                            source={google}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            style={{marginHorizontal: 20}}
                            source={facebook}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={twitter}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default SignIn