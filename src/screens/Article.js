import React, {useEffect, useState} from 'react'
import {FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {color} from "../styles/theme";
import {Feather} from "@expo/vector-icons";
import {articles} from "../dummy";
import ArticleList from "../components/ArticleList";
import ArticleGrid from "../components/ArticleGrid";
import articleService from "../services/article";

const Article = ({navigation}) => {
    // const [articles, setArticles] = useState(null)
    const [tab, setTab] = useState(1)


    // useEffect(() => {
    //     articleService.getArticles()
    //         .then(response => setArticles(response))
    // }, [])


    useEffect(() => {
        articleService.searchArticles()
            .then(response => setArticles(response))
    }, [searchTerm])


    const Search = () => {
        return (
            <View>
                <TextInput
                    placeholder="search articles..."
                    style={{
                        backgroundColor: 'white',
                        color: color.darkBlueText,
                        height: 40,
                        paddingLeft: 20,
                        paddingRight: 45,
                        borderRadius: 20,
                        marginHorizontal: 30,
                    }}
                />
                <Feather
                    style={{
                        position: 'absolute',
                        right: 45,
                        bottom: 8
                    }}
                    name="search" size={20} color='gray'/>
            </View>
        )
    }

    return (
        <SafeAreaView style={{flex: 1, marginTop: 30}}>
            {Search()}
            <View
                style={{
                    marginVertical: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 30,
                    justifyContent: 'space-between'
                }}
            >
                <Text style={{flex: 1, fontSize: 24, color: color.darkBlue}}>
                    All Articles
                </Text>
                <TouchableOpacity
                    onPress={() => setTab(1)}
                >
                    <Feather name="list" size={24} color={tab === 1 ? color.blue : color.darkGrey}
                             style={{marginRight: 20}}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setTab(2)}
                >
                    <Feather name="grid" size={24} color={tab === 2 ? color.blue : color.darkGrey}/>
                </TouchableOpacity>
            </View>

            <FlatList
                renderItem={({item}) =>
                    tab === 1
                        ? <ArticleList article={item} navigation={navigation}/>
                        : <ArticleGrid article={item} navigation={navigation}/>
                }
                data={articles}
                numColumns={tab}
                columnWrapperStyle={tab === 2 && {justifyContent: 'space-between'}}
                keyExtractor={item => item.id.toString()}
                key={tab}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={tab === 1 ? {marginLeft: 30} : {marginHorizontal: 30}}
            />

        </SafeAreaView>
    )
}

export default Article