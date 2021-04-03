import React, {useEffect, useState} from "react";
import UserList from "../UserList";
import {users} from "../../dummy";
import {View} from "react-native";

const Following = ({navigation}) => {
    const [followingUsers, setFollowingUsers] = useState(null)

    useEffect(() => {
        setFollowingUsers(users)
    }, [])

    if (!followingUsers) {
        return null
    }

    return (
        <>
            {followingUsers.map(user =>
                <View key={user.id}>
                    <UserList user={user} navigation={navigation}/>
                </View>
            )}
        </>
    )
}

export default Following