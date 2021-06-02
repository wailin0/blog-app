import React, {useContext, useEffect, useState} from 'react'
import {Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import {color} from "../styles/theme";
import {articles, user as userdummy, users} from "../dummy";
import ArticleList from "../components/ArticleList";
import Following from "../components/Profile/Following";
import Followers from "../components/Profile/Followers";
import Context from "../Context";
import MyPosts from "../components/Profile/MyPosts";

const Profile = ({navigation, route}) => {
    const [tab, setTab] = useState(1)
    const [user, setUser] = useState(null)
    const [popup, setPopup] = useState(false)

    const {setAuth} = useContext(Context)

    let userId = null
    useEffect(() => {
        userId = route.params?.userId

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
                <TouchableOpacity
                    onPress={() => setPopup(!popup)}
                >
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
                            paddingTop: 30
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
                                fontSize: 16,
                                color: color.darkBlue,
                                fontWeight: '700'
                            }}>
                                About me
                            </Text>
                            <Text style={{fontSize: 14, color: color.darkBlueText}}>
                                {user.aboutMe}
                            </Text>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    backgroundColor: color.darkGrey,
                                    borderRadius: 12,
                                    bottom: -20,
                                    width: '100%',
                                    height: 68
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
                        marginTop: 30,
                        borderTopLeftRadius: 28,
                        borderTopRightRadius: 28,
                        backgroundColor: 'white',
                        flex: 1,
                        paddingHorizontal: 30,
                        paddingTop: 20
                    }}
                >
                    {tab === 1 && <MyPosts navigation={navigation} userId={userId}/>}
                    {tab === 2 && <Following navigation={navigation} userId={userId}/>}
                    {tab === 3 && <Followers navigation={navigation} userId={userId}/>}
                </View>
            </ScrollView>

            <Modal
                visible={popup}
                transparent
                onRequestClose={() => setPopup(false)}
            >
                <TouchableOpacity onPress={() => setPopup(false)} activeOpacity={1} style={{flex: 1}}>
                    <View
                        style={{
                            right: 65,
                            top: 40,
                            position: 'absolute',
                            backgroundColor: 'lightgray',
                            borderRadius: 5,
                            padding: 10,
                            elevation: 5
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 15
                            }}
                            onPress={() => {
                                setPopup(false)
                                navigation.navigate("Settings")
                            }}
                        >
                            <Feather name="settings" style={{marginRight: 10}} size={20} color="black"/>
                            <Text style={{fontSize: 17}}>Settings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                            onPress={() => setAuth(false)}
                        >
                            <Feather name="log-out" style={{marginRight: 10}} size={20} color="black"/>
                            <Text style={{fontSize: 17}}>Log

                                out</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
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