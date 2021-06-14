import React, {useEffect, useState} from 'react'
import {FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {color} from "../styles/theme";
import {Feather} from '@expo/vector-icons';
import ArticleList from "../components/ArticleList";
import articleService from "../services/article";
import userService from "../services/user";
import {useSelector} from "react-redux";

const Home = ({navigation}) => {
    const [topTenUser, setTopTenUser] = useState(null)
    const [topics, setTopics] = useState(null)
    const [popularArticles, setPopularArticles] = useState(null)
    const user = useSelector(state => state.user)

    useEffect(() => {
        articleService.getPopularArticles()
            .then(response => setPopularArticles(response))
            .catch(e => console.log(e))
    }, [])

    useEffect(() => {
        userService.getTopTenUser()
            .then(response => setTopTenUser(response))
            .catch(e => console.log(e))
    }, [])

    useEffect(() => {
        articleService.getTopics()
            .then(res => setTopics(res))
    }, [])


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
                    Hi, {user && user.name}
                </Text>
                <TouchableOpacity>
                    <Feather name="bell" size={24} color="black"/>
                </TouchableOpacity>
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
                    onPress={() => navigation.push("User Profile", {userId: item.id})}
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
                    data={topTenUser}
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
                    onPress={() => navigation.navigate("Article", {topic: item.title})}
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
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingLeft: 30}}
                />
            </View>
        )
    }

    const PopularArticles = () => {
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
                {popularArticles.map(article =>
                    <View key={article.id}>
                        <ArticleList article={article} navigation={navigation}/>
                    </View>
                )}
            </View>
        )
    }

    if(!topics && !user && !popularArticles){
        return null
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
                {popularArticles && PopularArticles()}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home