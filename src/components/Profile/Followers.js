import React, {useEffect, useState} from "react";
import UserList from "../UserList";
import {users} from "../../dummy";
import {View} from "react-native";

const Followers = ({navigation}) => {
    const [followers, setFollowers] = useState(null)

    useEffect(() => {
        setFollowers(users)
    }, [])

    if(!followers){
        return null
    }

    return (
        <>
            {followers.map(user =>
                <View key={user.id}>
                    <UserList user={user} navigation={navigation}/>
                </View>
            )}
        </>
    )
}

export default Followers