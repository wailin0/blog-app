import React, {useEffect, useState} from 'react'
import {Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {color} from "../styles/theme";
import articleService from "../services/article";
import {useDispatch} from "react-redux";
import {addArticle, updateArticle} from "../redux/reducers/ArticleReducer";
import {Picker} from '@react-native-picker/picker';
import {CommonActions} from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker";
import {Feather} from "@expo/vector-icons";
import {getLoginUser} from "../redux/reducers/UserReducer";

const CreateArticle = ({navigation, route}) => {
    const [title, setTitle] = useState(null)
    const [topics, setTopics] = useState(null)
    const [topic, setTopic] = useState(null)
    const [content, setContent] = useState(null)
    const [photo, setPhoto] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const article = route.params?.article

    useEffect(() => {
        articleService.getTopics()
            .then(res => setTopics(res))
    }, [])

    useEffect(() => {
        if (article) {
            setTitle(article.title)
            setTopic(article.topic)
            setContent(article.content)
            setPhoto(article.photo)
        }
    }, [article])

    const createArticle = async () => {
        setLoading(true)
        const newArticle = {
            id: article && article.id,
            title,
            topic,
            content
        }
        let createdArticle = null
        if (article) {
            createdArticle = await articleService.updateArticle(newArticle)
        } else {
            createdArticle = await articleService.createArticle(newArticle)
            dispatch(getLoginUser())
        }

        let data = {
            "file": photo,
            "upload_preset": "rztxsnps",
        }
        articleService.uploadImage(data)
            .then((uploadImage) => {
                articleService.updateArticle({id: createdArticle.id, photo: uploadImage.url})
                    .then(response => {
                        if (article) {
                            dispatch(updateArticle(response))
                        } else {
                            dispatch(addArticle(response))
                        }
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 1,
                                routes: [
                                    {name: 'Home'},
                                    {
                                        name: 'Article Detail',
                                        params: {articleId: response.id},
                                    },
                                ],
                            })
                        )
                    })
            })
    }


    const uploadImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
            base64: true
        });

        if (!result.cancelled) {
            setPhoto(`data:image/jpg;base64,${result.base64}`)
        }
    };


    if (!topics) {
        return null
    }

    return (
        <SafeAreaView style={{flex: 1, marginTop: 10, marginHorizontal: 30}}>
            <Text style={{fontSize: 20, color: color.darkBlue}}>
                Title
            </Text>
            <TextInput
                multiline
                value={title}
                onChangeText={value => setTitle(value)}
                style={{
                    color: color.darkBlue,
                    fontSize: 22,
                    borderBottomColor: color.darkGrey,
                    borderBottomWidth: 1
                }}
            />

            <TouchableOpacity
                style={{
                    backgroundColor: 'lightgray',
                    width: '100%',
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 10,
                    borderRadius: 5,
                    textAlign: 'center'
                }}
                onPress={uploadImage}
            >
                {photo ?
                    <Image
                        source={{uri: photo}}
                        style={{
                            width: '100%',
                            height: 100
                        }}
                    />
                    :
                    <Feather name="image" size={24} color="black"/>
                }
            </TouchableOpacity>

            <View
                style={{
                    marginBottom: 10,
                    width: 160,
                    height: 30,
                    justifyContent: 'center',
                    marginRight: 'auto',
                    elevation: 2,
                    borderRadius: 10,
                    backgroundColor: 'white',
                }}
            >
                <Picker
                    selectedValue={topic}
                    onValueChange={(itemValue, itemIndex) =>
                        setTopic(itemValue)
                    }>
                    <Picker.Item label="Select Topic" value=""/>
                    {
                        topics.map((topic) =>
                            <Picker.Item key={topic.title} label={topic.title} value={topic.title}/>
                        )
                    }
                </Picker>
            </View>

            <Text style={{fontSize: 18, color: color.darkBlue}}>
                Content
            </Text>
            <ScrollView style={{marginBottom: 5}}>
                <TextInput
                    value={content}
                    onChangeText={value => setContent(value)}
                    multiline
                    style={{
                        height: '100%',
                        color: color.darkBlue,
                        fontSize: 14,
                        borderBottomColor: color.darkGrey,
                        borderBottomWidth: 1
                    }}
                />
            </ScrollView>
            <TouchableOpacity
                style={{
                    backgroundColor: color.blue,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                    marginBottom: 20,
                    borderRadius: 12
                }}
                onPress={() => createArticle()}
                disabled={!(title && topic && content && photo)}
            >
                <Text style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 16
                }}>
                    {loading && (article ? 'Updating...' : 'Publishing...')}
                    {!loading && (article ? 'Update' : 'Publish')}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default CreateArticle