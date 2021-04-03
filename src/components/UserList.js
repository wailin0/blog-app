import React from 'react'
import {Image, Text, TouchableOpacity, View} from "react-native";
import {color} from "../styles/theme";

const UserList = ({user, navigation}) => {
    return (
        <TouchableOpacity
            key={user.id}
            style={{
                marginBottom: 10
            }}
            onPress={() => navigation.push('User Profile', {userId: user.id})}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Image
                    source={{uri: user.photo}}
                    style={{
                        borderRadius: 22,
                        width: 67, height: 67,
                        backgroundColor: 'red',
                        borderWidth: 1
                    }}
                />
                <View style={{marginRight: 'auto', marginLeft: 20}}>
                    <Text style={{fontSize: 16, color: color.darkBlue}}>
                        {user.name}
                    </Text>
                    <Text style={{fontSize: 14, color: color.blue}}>
                        {user.headline}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{fontSize: 13}}>20 Posts</Text>
                        <Text style={{fontSize: 13}}> . 20 Following . </Text>
                        <Text style={{fontSize: 13}}>20 Followers</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default UserList