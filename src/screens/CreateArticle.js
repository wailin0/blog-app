import React from 'react'
import {SafeAreaView, ScrollView, Text, TextInput, View} from "react-native";
import {color} from "../styles/theme";
import articleService from "../services/article";

const CreateArticle = ({navigation}) => {

    const createArticle = () => {
        const newArticle = {
            title: "",
            topic: "",

        }
        articleService.createArticle(newArticle)
            .then(response => {
                navigation.navigate("Article Detail", {articleId: response.id})
            })
    }

    return (
        <SafeAreaView style={{flex: 1, marginTop: 10, marginHorizontal: 30}}>
            <Text style={{fontSize: 20, color: color.darkBlue}}>
                Article Title
            </Text>
            <TextInput
                multiline
                style={{
                    color: color.darkBlue,
                    fontSize: 22,
                    borderBottomColor: color.darkGrey,
                    borderBottomWidth: 1
                }}
            />

            <View style={{
                marginVertical: 30,
                borderBottomWidth: 1,
                borderBottomColor: color.darkGrey,
                width: '50%'
            }}>
                <Text style={{fontSize: 18, color: color.darkBlue}}>
                    Select Topic
                </Text>
            </View>

            <Text style={{fontSize: 18, color: color.darkBlue}}>
                Article Content
            </Text>
            <ScrollView style={{marginBottom: 5}}>
                <TextInput
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
        </SafeAreaView>
    )
}

export default CreateArticle