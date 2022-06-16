import React, {useEffect, useState} from "react";
import articleService from "../../../services/article";
import {View} from "react-native";
import ArticleList from "../../../components/ArticleList";


const RecommendedArticles = ({navigation}) => {
    const [popularArticles, setPopularArticles] = useState(null)

    useEffect(() => {
        articleService.getRecommendedArticles()
            .then(response => setPopularArticles(response))
    }, [])

    if (!popularArticles) {
        return null
    }

    return (
        <View style={{marginHorizontal: 30}}>
            {popularArticles.map(article =>
                <ArticleList key={article.id} article={article} navigation={navigation}/>
            )}
        </View>
    )
}

export default RecommendedArticles