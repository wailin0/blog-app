import React from 'react'
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import {color} from "../styles/theme";
import {articles, user} from "../dummy";
import ArticleList from "../components/ArticleList";

const Profile = ({navigation}) => {


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
                <Text
                    style={{
                        color: color.darkBlue,
                        fontSize: 24
                    }}
                >Profile</Text>
                <TouchableOpacity>
                    <Feather name="more-horizontal" size={32} color="black"/>
                </TouchableOpacity>
            </View>
        )
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
                                    elevation: 10
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: color.blue,
                                        flex: 1,
                                        borderRadius: 12,
                                        height: 68,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Text style={styles.tabTextPrimary}>43</Text>
                                    <Text style={styles.tabTextSecondary}>Post</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Text style={styles.tabTextPrimary}>250</Text>
                                    <Text style={styles.tabTextSecondary}>Following</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
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
                        My Posts
                    </Text>
                    {articles.map(article =>
                        <View key={article.id}>
                            <ArticleList article={article} navigation={navigation}/>
                        </View>
                    )}
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
    }
})

export default Profile