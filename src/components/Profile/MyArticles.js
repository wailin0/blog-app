import React, {useEffect, useState} from 'react'
import {Text, View} from "react-native";
import ArticleList from "../ArticleList";
import {color} from "../../styles/theme";
import userService from "../../services/user";

const MyArticles = ({navigation, userId}) => {
    const [myPosts, setMyPosts] = useState(null)

    useEffect(() => {
        userService.getUserArticles(userId)
            .then(response => {
                setMyPosts(response)
            })
    }, [userId])

    if (!myPosts) {
        return null
    }

    return (
        <>
            <Text style={{color: color.darkBlue, marginBottom: 20, fontSize: 20}}>
                Articles
            </Text>
            {
                myPosts.map(article =>
                    <View key={article.id}>
                        <ArticleList article={article} navigation={navigation}/>
                    </View>
                )
            }
        </>
    )
}

export default MyArticles