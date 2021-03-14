import React from 'react'
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {topics, users} from "../dummy";

const Explore = () => {

    return (
        <SafeAreaView style={{flex: 1}}>
            <View
                style={{
                    flex: 1,
                    marginHorizontal: 15,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <TouchableOpacity
                    style={styles.button}
                >
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        {topics.map(topic =>
                            <Image
                                source={topic.photo}
                                style={styles.list}
                            />
                        )}
                    </View>
                    <Text style={styles.text}>Topics</Text>
                </TouchableOpacity>
                <View style={{marginVertical: 10}}></View>
                <TouchableOpacity
                    style={styles.button}
                >
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        {users.map(user =>
                            <Image
                                source={user.photo}
                                style={styles.list}
                            />
                        )}
                    </View>
                    <Text style={styles.text}>People</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'red',
        width: '100%', height: '40%',
        borderRadius: 28
    },
    text: {
        color: 'white',
        fontSize: 30,
        position: 'absolute',
        top: '50%',
        left: '40%'
    },
    list: {
        width: 90, height: 90,
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 12,
        backgroundColor: 'blue'
    }
})

export default Explore