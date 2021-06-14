import React, {useEffect, useState} from 'react'
import {SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {color} from "../styles/theme";
import articleService from "../services/article";
import {useDispatch} from "react-redux";
import {addArticle, updateArticle} from "../redux/reducers/ArticleReducer";
import {Picker} from '@react-native-picker/picker';
import {CommonActions} from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";
import {updateUser} from "../redux/reducers/UserReducer";
import {Image} from "react-native-web";

const CreateArticle = ({navigation, route}) => {
    const [title, setTitle] = useState(null)
    const [topics, setTopics] = useState(null)
    const [topic, setTopic] = useState(null)
    const [content, setContent] = useState(null)
    const [photo, setPhoto] = useState(null)
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
        const newArticle = {
            title,
            topic,
            content
        }
        const createdArticle = await articleService.createArticle(newArticle)

        const photoName = Math.random().toString(36).substring(7);
        const response = await fetch(photo)
        const blob = await response.blob();
        const ref = firebase.storage().ref().child(`/article/${createdArticle.id}`).child(`${photoName}.png`);
        ref.put(blob)
            .then(() => {
                ref.getDownloadURL().then(uploadedPhotoURL => {
                    articleService.updateArticle({id: createdArticle.id ,photo: uploadedPhotoURL})
                        .then(res => {
                            dispatch(addArticle(res))
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
            })
            .catch(e => console.log(e))
    }


    const uploadImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setPhoto(result.uri)
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
                    backgroundColor: 'darkgray',
                    width: 150,
                    marginVertical: 20,
                    borderRadius: 40,
                    textAlign: 'center'
                }}
                onPress={uploadImage}
            >
                <Text>upload cover photo</Text>
            </TouchableOpacity>

            <Image
                source={{uri: photo}}
                style={{
                    width: 300,
                    height: 50
                }}

            />

            <View
                style={{
                    marginVertical: 10,
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
            >
                <Text style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 16
                }}>
                    {article ? 'Update' : 'Publish'}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default CreateArticle