import React, {useCallback, useEffect, useState} from 'react'
import {FlatList, RefreshControl, SafeAreaView, TextInput, TouchableOpacity, View} from "react-native";
import {color} from "../styles/theme";
import {Feather} from "@expo/vector-icons";
import ArticleList from "../components/ArticleList";
import ArticleGrid from "../components/ArticleGrid";
import {Picker} from '@react-native-picker/picker';
import articleService from "../services/article";
import {getArticles} from "../redux/reducers/ArticleReducer";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../components/Loading";

const Article = ({navigation, route}) => {
    const topic = route.params?.topic
    const articles = useSelector(state => state.article)
    const [searchTitle, setSearchTitle] = useState("")
    const [searchTopic, setSearchTopic] = useState("")
    const [submit, setSubmit] = useState(false)
    const [topics, setTopics] = useState([])
    const [tab, setTab] = useState(1)
    const [refreshing, setRefreshing] = React.useState(false);
    const dispatch = useDispatch()

    const [page, setPage] = useState(0)

    useEffect(() => {
        setPage(0)
        if (topic) {
            setSearchTopic(topic)
        }
    }, [topic])

    useEffect(() => {
        articleService.getTopics()
            .then(res => setTopics(res))
    }, [])

    useEffect(() => {
        dispatch(getArticles(searchTitle, searchTopic, page))
    }, [searchTopic, submit])

    const onRefresh = useCallback(async () => {
        setPage(0)
        setRefreshing(true)
        await dispatch(getArticles(searchTitle, searchTopic, 0))
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
                        bottom: 8
                    }}
                    onPress={() => setSubmit(!submit)}
                >
                    <Feather name="search" size={20} color='gray'/>
                </TouchableOpacity>
            </View>
        )
    }


    if (!topics && !articles) {
        return null
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
                <View
                    style={{
                        width: 150,
                        height: 30,
                        justifyContent: 'center',
                        marginRight: 'auto',
                        elevation: 2,
                        borderRadius: 10,
                        backgroundColor: 'white',
                    }}
                >
                    <Picker
                        selectedValue={searchTopic}
                        onValueChange={(itemValue, itemIndex) =>
                            setSearchTopic(itemValue)
                        }>
                        <Picker.Item label="Any Topic" value=""/>
                        {
                            topics.map((topic) =>
                                <Picker.Item key={topic.title} label={topic.title} value={topic.title}/>
                            )
                        }
                    </Picker>
                </View>

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
        </SafeAreaView>
    )
}

export default Article