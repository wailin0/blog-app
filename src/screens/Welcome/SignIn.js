import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {color, input} from "../../styles/theme";
import google from "../../../assets/google.png";
import facebook from "../../../assets/facebook.png";
import twitter from "../../../assets/twitter.png";
import React, {useContext, useState} from "react";
import {AuthContext} from "../../context/Context";
import userService from "../../services/user";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getLoginUser, setLoginUser} from "../../redux/reducers/UserReducer";
import {useDispatch, useSelector} from "react-redux";
import {getFollowing} from "../../redux/reducers/FollowingReducer";

const SignIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(true)
    const [error, setError] = useState(null)

    const dispatch = useDispatch()
    const {setAuth} = useContext(AuthContext)

    const signIn = () => {
        const loginData = {
            email,
            password
        }
        userService.loginUser(loginData)
            .then(response => {
                console.log(response)
                AsyncStorage.setItem('token', response.token)
                AsyncStorage.getItem('token')
                    .then(token => {
                        if (token) {
                            userService.getLoginUser()
                                .then(res => {
                                    dispatch(setLoginUser(res))
                                    dispatch(getFollowing(res.id))
                                    setAuth(true)
                                })
                        }
                    })
            })
            .catch(() => setError('wrong username or password'))

        if (email === 'wailin@' && password === 'pass') {
            setAuth(true)
        } else {
            setError('wrong email or password')
        }
    }


    return (
        <View>
            <Text style={{color: color.darkBlue, fontSize: 24, fontWeight: '700', marginBottom: 10}}>
                Welcome back
            </Text>
            <Text style={{color: color.darkBlueText, fontSize: 14, marginBottom: 20}}>
                Sign in with your account
            </Text>
            <Text style={{color: color.darkBlueText, fontSize: 14}}>Email</Text>
            <TextInput
                keyboardType='email-address'
                value={email}
                onChangeText={value => setEmail(value)}
                style={{...input}}
            />
            <View>
                <Text style={{color: color.darkBlueText, fontSize: 14}}>Password</Text>
                <TextInput
                    value={password}
                    onChangeText={value => setPassword(value)}
                    style={{...input}}
                    secureTextEntry={showPassword}
                />
                <Text
                    style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 15,
                        color: color.blue
                    }}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? 'Show' : 'Hide'}
                </Text>
            </View>
            {error
            && <Text
                style={{color: 'red', marginBottom: 10}}
            >
                {error}
            </Text>
            }
            <TouchableOpacity
                style={{
                    backgroundColor: color.blue,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20,
                    marginBottom: 10,
                    borderRadius: 12
                }}
                onPress={() => signIn()}
            >
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                    SIGN IN
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
                            style={{
                                height: 36, width: 36
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            style={{marginHorizontal: 20, height: 36, width: 36}}
                            source={facebook}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={twitter}
                            style={{
                                height: 36, width: 36
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default SignIn