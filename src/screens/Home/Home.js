import React from 'react'
import {SafeAreaView, ScrollView, Text} from "react-native";
import {color} from "../../styles/theme";
import Header from "./components/Header";
import PopularUsers from "./components/PopularUsers";
import Topics from "./components/Topics";
import RecommendedArticles from "./components/RecommendedArticles";

const Home = ({navigation}) => {

    return (
        <SafeAreaView style={{flex: 1}}>
            <Header/>
            <ScrollView>
                <Text style={{fontSize: 24, marginLeft: 30, color: color.darkBlue}}>
                    Explore today's
                </Text>
                <PopularUsers navigation={navigation}/>
                <Topics navigation={navigation}/>
                <RecommendedArticles navigation={navigation}/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home