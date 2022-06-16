import React, {useEffect, useState} from "react";
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import articleService from "../../../services/article";

const Topics = ({navigation}) => {
    const [topics, setTopics] = useState(null)

    useEffect(() => {
        articleService.getTopics()
            .then(res => setTopics(res))
    }, [])

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity
                style={{
                    marginRight: 10
                }}
                onPress={() => navigation.navigate("Article", {topic: item.title})}
            >
                <Image
                    source={{uri: item.image_url}}
                    style={{
                        backgroundColor: 'red',
                        opacity: .7,
                        width: 100, height: 100,
                        borderRadius: 10
                    }}
                />
                <Text
                    style={{
                        position: 'absolute',
                        color: 'white',
                        bottom: 15,
                        fontWeight: 'bold',
                        left: 15,
                        fontSize: 13
                    }}
                >
                    {item.title}
                </Text>
            </TouchableOpacity>
        )
    }

    if (!topics) {
        return null
    }

    return (
        <View style={{marginVertical: 20}}>
            <FlatList
                data={topics}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingLeft: 30}}
            />
        </View>
    )
}

export default Topics