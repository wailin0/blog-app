import React, {useEffect, useState} from 'react'
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import {color} from "../styles/theme";
import {articles, user as userdummy, users} from "../dummy";
import ArticleList from "../components/ArticleList";
import Following from "../components/Profile/Following";
import Followers from "../components/Profile/Followers";

const Profile = ({navigation, route}) => {
    const [tab, setTab] = useState(1)
    const [user, setUser] = useState(null)

    const userId = route.params?.userId

    useEffect(() => {
        if (userId) setUser(users.find(user => user.id === userId))
        else setUser(userdummy)
    }, [])

    const Header = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 30,
                    marginVertical: 10,
                    justifyContent: 'space-between'
                }}
            >
                {userId
                && <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Feather name="chevron-left" size={32} color="black"/>
                </TouchableOpacity>
                }
                <Text
                    style={{
                        color: color.darkBlue,
                        fontSize: 18,
                        marginRight: 'auto'
                    }}
                >
                    {userId ? `${user.name}'s Profile` : 'Your Profile'}
                </Text>
                <TouchableOpacity>
                    <Feather name="more-horizontal" size={32} color="black"/>
                </TouchableOpacity>
            </View>
        )
    }

    if (!user) {
        return null
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            {Header()}
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={{marginHorizontal: 30}}>
                    <View
                        style={{
                            backgroundColor: "white",
                            borderRadius: 16,
                            paddingHorizontal: 20,
                            paddingVertical: 30
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <View
                                style={{
                                    borderColor: color.blue,
                                    borderWidth: 1,
                                    borderRadius: 28,
                                    padding: 5
                                }}
                            >
                                <Image
                                    source={{uri: user.photo}}
                                    style={{
                                        borderRadius: 22,
                                        width: 67, height: 67,
                                        backgroundColor: 'red',
                                        borderWidth: 1
                                    }}
                                />
                            </View>
                            <View style={{marginRight: 'auto', marginLeft: 20}}>
                                <Text style={{fontSize: 18, color: color.darkBlue}}>
                                    {user.name}
                                </Text>
                                <Text style={{fontSize: 16, color: color.blue}}>
                                    {user.headline}
                                </Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{
                                marginTop: 20,
                                marginBottom: 5,
                                fontSize: 16,
                                color: color.darkBlue,
                                fontWeight: '700'
                            }}>
                                About me
                            </Text>
                            <Text style={{marginBottom: 20, fontSize: 14, color: color.darkBlueText}}>
                                {user.aboutMe}
                            </Text>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    backgroundColor: color.darkGrey,
                                    borderRadius: 12,
                                    position: 'absolute',
                                    bottom: -70,
                                    width: '100%',
                                    height: 68,
                                    elevation: 10
                                }}
                            >
                                <TouchableOpacity
                                    style={tab === 1 ? styles.activeTab : styles.inactiveTab}
                                    onPress={() => setTab(1)}
                                >
                                    <Text style={styles.tabTextPrimary}>43</Text>
                                    <Text style={styles.tabTextSecondary}>Post</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={tab === 2 ? styles.activeTab : styles.inactiveTab}
                                    onPress={() => setTab(2)}
                                >
                                    <Text style={styles.tabTextPrimary}>250</Text>
                                    <Text style={styles.tabTextSecondary}>Following</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={tab === 3 ? styles.activeTab : styles.inactiveTab}
                                    onPress={() => setTab(3)}
                                >
                                    <Text style={styles.tabTextPrimary}>43K</Text>
                                    <Text style={styles.tabTextSecondary}>Followers</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        marginTop: 60,
                        borderTopLeftRadius: 28,
                        borderTopRightRadius: 28,
                        backgroundColor: 'white',
                        flex: 1,
                        paddingHorizontal: 30,
                        paddingTop: 20
                    }}
                >
                    <Text style={{color: color.darkBlue, marginBottom: 20, fontSize: 20}}>
                        {tab === 1 && 'My Posts'}
                        {tab === 2 && 'Following'}
                        {tab === 3 && 'Followers'}
                    </Text>

                    {tab === 1 && articles.map(article =>
                        <View key={article.id}>
                            <ArticleList article={article} navigation={navigation}/>
                        </View>
                    )}

                    {tab === 2 && <Following navigation={navigation}/>}
                    {tab === 3 && <Followers navigation={navigation}/>}
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    tabTextPrimary: {
        color: 'white', fontSize: 20,
        fontWeight: 'bold'
    },
    tabTextSecondary: {
        color: 'lightgrey', fontSize: 12
    },
    activeTab: {
        backgroundColor: color.blue,
        borderRadius: 12,
        flex: 1,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inactiveTab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Profile