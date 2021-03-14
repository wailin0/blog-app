import React from 'react'
import {Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import {articles} from "../dummy";
import {color} from "../styles/theme";

const ArticleDetail = ({navigation, route}) => {

    const {articleId} = route.params

    const article = articles.find(a => a.id === articleId)

    const Header = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Feather name="chevron-left" size={32} color="black"/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Feather name="more-horizontal" size={32} color="black"/>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View
                style={{
                    marginHorizontal: 30,
                    marginVertical: 10
                }}
            >
                {Header()}
                <Text
                    style={{
                        fontSize: 24,
                        color: color.darkBlue,
                        marginVertical: 10,
                        fontWeight: '700'
                    }}>
                    {article.title}
                </Text>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Image
                        source={{uri: article.author.photo}}
                        style={{
                            width: 38, height: 38,
                            borderRadius: 12,
                            backgroundColor: 'red'
                        }}
                    />
                    <View style={{marginRight: 'auto', marginLeft: 10}}>
                        <Text style={{
                            color: color.darkBlueText,
                            fontSize: 14,
                        }}>
                            {article.author.name}
                        </Text>
                        <Text style={{
                            color: color.darkGrey,
                            fontSize: 12
                        }}
                        >{article.createdDate}</Text>
                    </View>
                    <TouchableOpacity>
                        <Feather name="share" size={24} color={color.blue} style={{marginRight: 20}}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather name="bookmark" size={24} color={color.blue}/>
                    </TouchableOpacity>
                </View>
            </View>


            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {/*    article cover */}
                <Image
                    source={{uri: article.cover}}
                    style={{
                        borderTopLeftRadius: 28,
                        borderTopRightRadius: 28,
                        backgroundColor: 'red',
                        height: 200
                    }}
                />

                <Text style={{
                    marginVertical: 20, marginHorizontal: 30,
                    fontSize: 14, color: color.darkBlueText
                }}>
                    {article.body}
                </Text>
            </ScrollView>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 30,
                    backgroundColor: color.blue,
                    borderRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 5,
                    width: 111, height: 48
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Feather name="thumbs-up" size={24} color='white' style={{marginRight: 10}}/>
                    <Text style={{color: 'white', fontSize: 16}}>3.3k</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ArticleDetail