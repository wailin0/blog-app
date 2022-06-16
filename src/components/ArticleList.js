import React from 'react'
import {Image, Text, TouchableOpacity, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import {color} from "../styles/theme";
import moment from "moment";
import {scaleHeight, scaleWidth} from "../config/responsive";

const ArticleList = ({article, navigation}) => {

    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10
            }}
            onPress={() => navigation.navigate("Article Detail", {
                articleId: article.id
            })}
        >
            <Image
                source={{uri: article.photo}}
                style={{
                    width: scaleWidth(100), height: scaleHeight(150),
                    borderRadius: 5,
                    backgroundColor: 'red'
                }}
            />
            <View style={{marginLeft: 10, flex: 1}}>
                <Text style={{marginBottom: 5, fontSize: 14, color: color.blue, fontWeight: 'bold'}}>
                    {article.topic.title}</Text>
                <Text style={{fontSize: 14, color: color.darkBlue}}>
                    {article.title}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
                    <Feather name="thumbs-up" size={16} color={color.darkBlueText}/>
                    <Text style={{
                        fontSize: 16,
                        color: color.darkBlueText,
                        marginLeft: 5,
                        marginRight: 10
                    }}>
                        {article.likeCount}
                    </Text>
                    <Feather name="clock" size={16} color={color.darkBlueText}/>
                    <Text style={{
                        fontSize: 16,
                        color: color.darkBlueText,
                        marginLeft: 5
                    }}>{moment(article.createdAt).fromNow(true)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

}

export default ArticleList