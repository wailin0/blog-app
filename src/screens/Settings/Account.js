import {Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {color, input} from "../../styles/theme";
import userService from "../../services/user";
import {Context} from "../../context/Context";

const Account = ({navigation}) => {
    const [name, setName] = useState("")
    const [headline, setHeadline] = useState("")
    const [aboutMe, setAboutMe] = useState("")

    const {user} = useContext(Context)

    useEffect(() => {
        setName(user.name)
        setHeadline(user.headline)
        setAboutMe(user.aboutMe)
    }, [user])


    const update = () => {
        const updatedUser = {
            name,
            headline,
            aboutMe
        }
        userService.updateUser(updatedUser)
            .then(res => {
                setName(res.name)
                setHeadline(res.headline)
                setAboutMe(res.aboutMe)
                Alert.alert("Update success!")
            })
            .catch(e => console.log(e))
    }

    return (
        <SafeAreaView style={{flex: 1, marginHorizontal: 30}}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center'
                }}
            >
                <View>
                    <Text style={{color: color.darkBlueText, fontSize: 14}}>name</Text>
                    <TextInput
                        style={{...input}}
                        value={name}
                        onChangeText={value => setName(value)}
                    />
                    <Text style={{color: color.darkBlueText, fontSize: 14}}>Who are you?</Text>
                    <TextInput
                        style={{...input}}
                        placeholder="eg. Teacher, Software Developer, etc"
                        value={headline}
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
                    onPress={() => update()}
                >
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                        Update
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Account