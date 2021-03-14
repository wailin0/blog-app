import React from 'react'
import {FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {articles, topics, users} from "../dummy";
import {color} from "../styles/theme";
import {Feather} from '@expo/vector-icons';
import ArticleList from "../components/ArticleList";

const Home = ({navigation}) => {

    const Header = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginHorizontal: 30,
                    marginVertical: 10
                }}
            >
                <Text style={{color: color.darkBlueText, fontSize: 18}}>
                    Hi, Wai Lin!
                </Text>
                <Feather name="bell" size={24} color="black"/>
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
            <View style={{marginVertical: 10}}>
                <FlatList
                    data={users}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingLeft: 30}}
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
                    keyExtractor={item => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingLeft: 30}}
                />
            </View>
        )
    }

    const LatestArticles = () => {
        return (
            <View style={{marginHorizontal: 30}}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 20
                }}>
                    <Text style={{color: color.darkBlue, fontSize: 20}}>
                        Latest Articles
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Article")}
                    >
                        <Text style={{color: color.blue, fontSize: 14}}>
                            More
                        </Text>
                    </TouchableOpacity>
                </View>
                {articles.map(article =>
                    <View key={article.id}>
                        <ArticleList article={article} navigation={navigation}/>
                    </View>
                )}
            </View>
        )
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            {Header()}
            <ScrollView>
                <Text style={{fontSize: 24, marginLeft: 30, color: color.darkBlue}}>
                    Explore today's
                </Text>
                {PopularUsers()}
                {Topics()}
                {LatestArticles()}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home