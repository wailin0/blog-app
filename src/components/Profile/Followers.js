import React, {useEffect, useState} from "react";
import UserList from "../UserList";
import {Text, View} from "react-native";
import {color} from "../../styles/theme";
import userService from "../../services/user";

const Followers = ({navigation, userId}) => {
    const [followers, setFollowers] = useState(null)

    useEffect(() => {
        userService.getFollower(userId)
            .then(response => {
                setFollowers(response)
            })
    }, [])

    if (!followers) {
        return null
    }

    return (
        <>
            <Text style={{color: color.darkBlue, marginBottom: 20, fontSize: 20}}>
                Followers
            </Text>
            {followers.map(user =>
                <View key={user.id}>
                    <UserList user={user.follower} navigation={navigation}/>
                </View>
            )}
        </>
    )
}

export default Followers