import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {color} from "../../../styles/theme";
import React, {useEffect, useState} from "react";
import userService from "../../../services/user";

const PopularUsers = ({navigation}) => {
    const [topTenUser, setTopTenUser] = useState(null)

    useEffect(() => {
        userService.getTopTenUser()
            .then(response => setTopTenUser(response))
    }, [])


    if (!topTenUser) {
        return null
    }


    const renderItem = ({item}) => {
        return (
            <TouchableOpacity
                style={{
                    marginRight: 10,
                }}
                onPress={() => navigation.navigate("User Profile", {userId: item.id})}
            >
                <View style={{
                    alignItems: 'center'
                }}>
                    <View
                        style={{
                            borderWidth: 1,
                            borderRadius: 18,
                            padding: 4,
                            borderColor: color.blue
                        }}
                    >
                        <Image
                            source={{uri: item.photo}}
                            style={{
                                backgroundColor: 'red',
                                width: 54, height: 54,
                                borderRadius: 18
                            }}
                        />
                    </View>
                    <Text
                        numberOfLines={2}
                        style={{
                            textAlign: 'center',
                            color: color.darkBlueText,
                            fontSize: 12,
                            width: 60
                        }}>
                        {item.name}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{marginTop: 10}}>
            <FlatList
                data={topTenUser}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingLeft: 30}}
            />
        </View>
    )
}

export default PopularUsers