import React from 'react'
import {Image, Text, TouchableOpacity, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import {color} from "../styles/theme";

const ArticleGrid = ({article, navigation}) => {

    return (
        <TouchableOpacity
            style={{

                alignItems: 'center',
                backgroundColor: 'red',
                marginBottom: 30,
                width: '48%',
                borderRadius: 12,
                height: 141
            }}
            onPress={() => navigation.navigate("Article Detail", {
                articleId: article.id
            })}
        >
            <Image
                source={{uri: article.cover}}
                style={{
                    width: '100%', height: '100%',
                    borderRadius: 16
                }}
            />
            <View style={{
                position: 'absolute',
                bottom: 5,
                left: 10,
                right:10
            }}>
                <Text style={{color: 'white', fontSize: 14}}>{article.title}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                <Feather name="thumbs-up" color={color.darkBlueText}/>
                <Text style={{
                    fontSize: 15,
                    color: color.darkBlueText,
                    marginLeft: 5,
                    marginRight: 10
                }}>2.1k</Text>
                <Feather name="clock" color={color.darkBlueText}/>
                <Text style={{
                    fontSize: 12,
                    color: color.darkBlueText,
                    marginLeft: 5,
                    marginRight: 10
                }}>2.1k</Text>
                <Feather name="bookmark" color={color.blue}/>
            </View>
        </TouchableOpacity>
    )

}

export default ArticleGrid