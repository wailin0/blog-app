import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {color, input} from "../../styles/theme";
import React from "react";

const SignUp = ({setTab}) => {
    return (
        <>
            <Text style={{color: color.darkBlue, fontSize: 24, fontWeight: '700', marginBottom: 10}}>
                Create new account
            </Text>
            <Text style={{color: color.darkBlueText, fontSize: 14}}>Username</Text>
            <TextInput
                style={{...input}}
            />
            <Text style={{color: color.darkBlueText, fontSize: 14}}>Email</Text>
            <TextInput
                style={{...input}}
            />
            <Text style={{color: color.darkBlueText, fontSize: 14}}>Password</Text>
            <TextInput
                style={{...input}}
            />
            <Text style={{color: color.darkBlueText, fontSize: 14}}>Confirm password</Text>
            <TextInput
                style={{...input}}
            />
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
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>SIGN UP</Text>
            </TouchableOpacity>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text style={{color: color.darkBlueText, marginRight: 10}}>
                    Already have an account?
                </Text>
                <TouchableOpacity
                    onPress={() => setTab(1)}
                >
                    <Text style={{color: color.blue, fontSize: 14, fontWeight: 'bold'}}>SIGN IN</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}


export default SignUp