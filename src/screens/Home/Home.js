import React, {useEffect, useState} from 'react'
import {FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {color} from "../../styles/theme";
import ArticleList from "../../components/ArticleList";
import articleService from "../../services/article";
import userService from "../../services/user";
import Loading from "../../components/Loading";
import Header from "./components/Header";
import PopularUsers from "./components/PopularUsers";
import Topics from "./components/Topics";
import PopularArticles from "./components/LatestArticles";

const Home = ({navigation}) => {

    return (
        <SafeAreaView style={{flex: 1}}>
            <Header/>
            <ScrollView>
                <Text style={{fontSize: 24, marginLeft: 30, color: color.darkBlue}}>
                    Explore today's
                </Text>
                <PopularUsers navigation={navigation}/>
                <Topics navigation={navigation} />
                <PopularArticles navigation={navigation} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home