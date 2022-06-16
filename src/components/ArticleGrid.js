import React from 'react'
import {Image, Text, TouchableOpacity, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import {color} from "../styles/theme";
import moment from "moment";
import {scaleHeight} from "../config/responsive";

const ArticleGrid = ({article, navigation}) => {

    return (
        <TouchableOpacity
            style={{
                marginBottom: 30,
                width: '48%',
                borderRadius: 12,
            }}
            onPress={() => navigation.navigate("Article Detail", {
                articleId: article.id
            })}
        >
            <Image
                source={{uri: article.photo}}
                style={{
                    width: '100%', height: scaleHeight(150),
                    borderRadius: 16
                }}
            />
            <Text
                numberOfLines={1}
                style={{fontSize: 14, marginVertical: 5}}
            >
                {article.title}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Feather name="thumbs-up" color={color.darkBlueText}/>
                <Text style={{
                    fontSize: 13,
                    color: color.darkBlueText,
                    marginLeft: 5,
                    marginRight: 10
                }}>
                    {article.likeCount}
                </Text>
                <Feather name="clock" color={color.darkBlueText}/>
                <Text style={{
                    fontSize: 13,
                    color: color.darkBlueText,
                    marginLeft: 5,
                    marginRight: 10
                }}>{moment(article.createdAt).fromNow(true)}</Text>
            </View>
        </TouchableOpacity>
    )

}

export default ArticleGrid