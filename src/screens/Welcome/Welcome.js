import React, {useState} from 'react'
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import logo from '../../../assets/logo.png'
import {color} from "../../styles/theme";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Welcome = ({navigation}) => {
    const [tab, setTab] = useState(1)
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
                        onPress={() => setTab(1)}
                    >
                        <Text style={{color: tab===1 ? 'white' : 'darkgrey', fontSize: 18, fontWeight: 'bold'}}>
                            SIGN IN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setTab(2)}
                    >
                        <Text style={{color: tab===2 ? 'white' : 'darkgrey', fontSize: 18, fontWeight: 'bold'}}>
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
                        {tab===1
                            ? <SignIn navigation={navigation}/>
                            : <SignUp setTab={setTab} navigation={navigation}/>
                        }
                    </View>
                </ScrollView>

            </View>

        </View>
    )
}

export default Welcome