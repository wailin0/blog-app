import React, {useEffect, useState} from 'react'
import {articles} from "../../dummy";
import {Text, View} from "react-native";
import ArticleList from "../ArticleList";
import {color} from "../../styles/theme";
import articleService from "../../services/article";

const MyPosts = ({navigation, userId}) => {
    // const [myPosts, setMyPosts] = useState(null)
    //
    // useEffect(() => {
    //     articleService.getUserArticles(userId)
    //         .then(response => setMyPosts(response))
    // }, [])
    //
    // if (!myPosts) {
    //     return null
    // }

    return (
        <>
            <Text style={{color: color.darkBlue, marginBottom: 20, fontSize: 20}}>
                My Posts
            </Text>
            {
                articles.map(article =>
                    <View key={article.id}>
                        <ArticleList article={article} navigation={navigation}/>
                    </View>
                )
            }
        </>
    )
}

export default MyPosts