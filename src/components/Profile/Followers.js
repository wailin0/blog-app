import React, {useEffect, useState} from "react";
import UserList from "../UserList";
import {users} from "../../dummy";
import {Text, View} from "react-native";
import {color} from "../../styles/theme";
import userService from "../../services/user";

const Followers = ({navigation, userId}) => {
    // const [followers, setFollowers] = useState(null)
    //
    // useEffect(() => {
    //     userService.getUserFollowers(userId)
    //         .then(response => setFollowers(response))
    // }, [])
    //
    // if (!followers) {
    //     return null
    // }

    return (
        <>
            <Text style={{color: color.darkBlue, marginBottom: 20, fontSize: 20}}>
                Followers
            </Text>
            {users.map(user =>
                <View key={user.id}>
                    <UserList user={user} navigation={navigation}/>
                </View>
            )}
        </>
    )
}

export default Followers