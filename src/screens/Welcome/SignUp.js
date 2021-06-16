import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {color, input} from "../../styles/theme";
import React, {useState} from "react";
import userService from "../../services/user";

const SignUp = ({setTab, navigation}) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    const checkUniqueEmail = async () => {
        const res = await userService.checkEmail({email})
        setError(res.error)

    }

    const next = async () => {
        await checkUniqueEmail()
        if (!error) {
            const newUser = {
                name,
                email,
                password
            }
            setTab(1)
            navigation.push("SignUp Final", {
                user: newUser
            })
        }
    }

    return (
        <>
            <Text
                style={{color: color.darkBlue, fontSize: 24, fontWeight: '700', marginBottom: 10}}>
                Create new account
            </Text>
            <Text style={{color: color.darkBlueText, fontSize: 14}}>Username</Text>
            <TextInput
                style={{...input}}
                value={name}
                onChangeText={value => setName(value)}
            />
            <Text style={{color: color.darkBlueText, fontSize: 14}}>Email
                {error && <Text style={{color: 'red'}}> ({error})</Text>}
            </Text>
            <TextInput
                keyboardType='email-address'
                style={{...input}}
                onBlur={() => checkUniqueEmail()}
                value={email}
                onChangeText={value => setEmail(value)}
            />
            <Text style={{color: color.darkBlueText, fontSize: 14}}>Password</Text>
            <TextInput
                style={{...input}}
                value={password}
                onChangeText={value => setPassword(value)}
            />
            <Text style={{color: color.darkBlueText, fontSize: 14}}>
                Confirm password {((password && confirmPassword) && password !== confirmPassword)
            && <Text style={{color: 'red'}}>(must be the same as above)</Text>}
            </Text>
            <TextInput
                style={{...input}}
                value={confirmPassword}
                onChangeText={value => setConfirmPassword(value)}
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
                disabled={!(!error && name && email && password && confirmPassword && (password === confirmPassword))}
                onPress={() => next()}
            >
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>Next</Text>
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