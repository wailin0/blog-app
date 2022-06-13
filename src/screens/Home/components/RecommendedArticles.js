import React, {useEffect, useState} from "react";
import articleService from "../../../services/article";
import {Text, TouchableOpacity, View} from "react-native";
import {color} from "../../../styles/theme";
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

export default RecommendedArticles