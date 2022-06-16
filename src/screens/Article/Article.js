import React, {useCallback, useEffect, useState} from 'react'
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {color} from "../../styles/theme";
import {Feather} from "@expo/vector-icons";
import ArticleList from "../../components/ArticleList";
import ArticleGrid from "../../components/ArticleGrid";
import articleService from "../../services/article";
import TopicModal from "./components/TopicModal";

const Article = ({navigation, route}) => {
    const topic = route.params?.topic

    const [articles, setArticles] = useState(null)

    const [searchTitle, setSearchTitle] = useState("")
    const [searchTopic, setSearchTopic] = useState("")
    const [submit, setSubmit] = useState(false)
    const [tab, setTab] = useState(1)
    const [refreshing, setRefreshing] = React.useState(false);

    const [limit, setLimit] = useState(20)

    const [topicModal, setTopicModal] = useState(false)

    useEffect(() => {
        if (topic) {
            setSearchTopic(topic)
        }
    }, [topic])

    const getArticles = async () => {
        setArticles(null)
        try {
            const response = await articleService.getArticles(searchTitle, searchTopic, limit)
            console.log(response)
            setArticles(response)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getArticles()
    }, [searchTopic, submit])

    const onRefresh = useCallback(async () => {
        setLimit(20)
        setRefreshing(true)
        await getArticles()
        setRefreshing(false)
    }, [])

    const Search = () => {
        return (
            <View>
                <TextInput
                    placeholder="search articles..."
                    value={searchTitle}
                    onChangeText={value => setSearchTitle(value)}
                    onSubmitEditing={() => setSubmit(!submit)}
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
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        right: 45,
                        bottom: 10
                    }}
                    onPress={() => setSubmit(!submit)}
                >
                    <Feather name="search" size={20} color='gray'/>
                </TouchableOpacity>
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
                <TouchableOpacity
                    onPress={() => setTopicModal(true)}
                    style={{
                        width: 150,
                        height: 30,
                        justifyContent: 'space-between',
                        paddingHorizontal: 10,
                        marginRight: 'auto',
                        elevation: 2,
                        borderRadius: 8,
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <Text
                        numberOfLines={1}
                        style={{
                            width: '80%'
                        }}>
                        {searchTopic ? searchTopic : "Any Topic"}
                    </Text>
                    <Feather name="chevron-down" size={24}/>
                </TouchableOpacity>

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

            {!articles &&
            <ActivityIndicator size="large" color={color.blue}/>
            }

            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />}
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

            {topicModal &&
            <TopicModal topicModal={topicModal}
                        setTopicModal={setTopicModal}
                        searchTopic={searchTopic}
                        setSearchTopic={setSearchTopic}
            />
            }

        </SafeAreaView>
    )
}

export default Article