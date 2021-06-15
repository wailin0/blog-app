import {ActivityIndicator, View} from "react-native";
import React from "react";

const Loading = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="red" animating={true}/>
        </View>
    )
}

export default Loading