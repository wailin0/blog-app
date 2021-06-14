import React, {useEffect, useState} from "react";
import UserList from "../UserList";
import {Text, View} from "react-native";
import {color} from "../../styles/theme";
import userService from "../../services/user";

const Following = ({navigation, userId}) => {
    const [followingUsers, setFollowingUsers] = useState(null)

    useEffect(() => {
        userService.getFollowing(userId)
            .then(response => {
                setFollowingUsers(response)
            })
    }, [])

    if (!followingUsers) {
        return null
    }

    return (
        <>
            <Text style={{color: color.darkBlue, marginBottom: 20, fontSize: 20}}>
                Following
            </Text>
            {followingUsers.map(user =>
                <View key={user.id}>
                    <UserList user={user.following} navigation={navigation}/>
                </View>
            )}
        </>
    )
}

export default Following