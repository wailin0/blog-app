import React from 'react'
import {FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {articles, popularUsers, topics} from "../dummy";
import {color} from "../styles/theme";

const Home = () => {

    const Header = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 20
                }}
            >
                <Text style={{color: color.darkBlueText, fontSize: 18}}>
                    Hi, Wai Lin
                </Text>

            </View>
        )
    }

    const PopularUsers = () => {

        const renderItem = ({item}) => {
            return (
                <TouchableOpacity
                    style={{
                        marginRight: 10,
                    }}
                >
                    <View
                        style={{
                            borderWidth: 1,
                            borderRadius: 18,
                            padding: 4,
                            borderColor: color.blue
                        }}
                    >
                        <Image
                            source={{uri: item.photo}}
                            style={{
                                backgroundColor: 'red',
                                width: 54, height: 54,
                                borderRadius: 18
                            }}
                        />
                    </View>
                    <Text style={{textAlign: 'center', color: color.darkBlueText, fontSize: 12}}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )
        }

        return (
            <View style={{marginVertical: 20}}>
                <FlatList
                    data={popularUsers}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )
    }

    const Topics = () => {

        const renderItem = ({item}) => {
            return (
                <TouchableOpacity
                    style={{
                        marginRight: 10
                    }}
                >
                    <Image
                        source={{uri: item.photo}}
                        style={{
                            backgroundColor: 'red',
                            width: 236, height: 273,
                            borderRadius: 28
                        }}
                    />
                    <Text
                        style={{
                            position: 'absolute',
                            color: 'white',
                            bottom: 30,
                            left: 20,
                            fontSize: 18
                        }}
                    >
                        {item.title}
                    </Text>
                </TouchableOpacity>
            )
        }

        return (
            <View style={{marginVertical: 20}}>
                <FlatList
                    data={topics}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )
    }

    const LatestArticles = () => {
        return (
            <View style={{marginRight: 30}}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 20
                }}>
                    <Text style={{color: color.darkBlue, fontSize: 20}}>
                        Latest Articles
                    </Text>
                    <TouchableOpacity>
                        <Text style={{color: color.blue, fontSize: 14}}>
                            More
                        </Text>
                    </TouchableOpacity>
                </View>
                {articles.map(article =>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
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
                            <Text>{article.topic}</Text>
                            <Text>{article.title}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        )
    }

    return (
        <SafeAreaView style={{flex: 1, marginLeft: 30, marginVertical: 20}}>
            {Header()}
            <Text style={{fontSize: 24, color: color.darkBlue}}>
                Explore today's
            </Text>
            <ScrollView>
                {PopularUsers()}
                {Topics()}
                {LatestArticles()}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home