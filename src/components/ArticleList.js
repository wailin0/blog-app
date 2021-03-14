import React from 'react'
import {Image, Text, TouchableOpacity, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import {color} from "../styles/theme";

const ArticleList = ({article, navigation}) => {

    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                textOverflow: 'auto',
                marginBottom: 10
            }}
            onPress={() => navigation.navigate("Article Detail", {
                articleId: article.id
            })}
        >
            <Image
                source={{uri: article.cover}}
                style={{
                    width: 92, height: 141,
                    borderRadius: 16,
                    backgroundColor: 'red'
                }}
            />
            <View style={{marginLeft: 20}}>
                <Text style={{marginBottom: 5, fontSize: 14, color: color.blue, fontWeight: 'bold'}}>
                    {article.topic}</Text>
                <Text style={{fontSize: 14, color: color.darkBlue}}>{article.title}</Text>

                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
                    <Feather name="thumbs-up" size={16} color={color.darkBlueText}/>
                    <Text style={{
                        fontSize: 16,
                        color: color.darkBlueText,
                        marginLeft: 5,
                        marginRight: 20
                    }}>2.1k</Text>
                    <Feather name="clock" size={16} color={color.darkBlueText}/>
                    <Text style={{
                        fontSize: 16,
                        color: color.darkBlueText,
                        marginLeft: 5,
                        marginRight: 20
                    }}>2.1k</Text>
                    <Feather name="bookmark" size={16} color={color.blue}/>
                </View>
            </View>
        </TouchableOpacity>
    )

}

export default ArticleList