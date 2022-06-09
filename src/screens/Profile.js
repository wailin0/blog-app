import React, {useContext, useEffect, useState} from 'react'
import {Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import {color} from "../styles/theme";
import Following from "../components/Profile/Following";
import Followers from "../components/Profile/Followers";
import MyArticles from "../components/Profile/MyArticles";
import userService from "../services/user";
import * as ImagePicker from 'expo-image-picker';
import articleService from "../services/article";
import Loading from "../components/Loading";
import {Context} from "../context/Context";

const Profile = ({navigation, route}) => {
    const [tab, setTab] = useState(1)
    const [user, setUser] = useState(null)
    const [alreadyFollow, setAlreadyFollow] = useState(false)

    const {user: authUser} = useContext(Context)

    const userId = route.params?.userId


    useEffect(() => {
        if (userId) {
            userService.getUserById(userId)
                .then(response => setUser(response))
                .catch(e => console.log(e))

            userService.checkFollow(userId)
                .then(res => setAlreadyFollow(res))
        } else setUser(authUser)

        return () => {
            setUser(null)
        }
    }, [authUser])

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const uploadImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
            base64: true
        });
        if (!result.cancelled) {
            let data = {
                "file": `data:image/jpg;base64,${result.base64}`,
                "upload_preset": "rztxsnps",
            }
            const uploadImage = await articleService.uploadImage(data)
            await userService.updateUser({photo: uploadImage.url})
        }
    }

    const follow = () => {
        userService.followUser({followedId: user.id})
            .then(() => {
                setAlreadyFollow(true)
            })
    }

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
                    {user.id === authUser.id ? 'Your profile' : `${user.name}'s profile`}
                </Text>
            </View>
        )
    }

    if (!user) {
        return <Loading/>
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
                                {user.id === authUser.id &&
                                <TouchableOpacity
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        padding: 5,
                                        right: 0,
                                        borderRadius: 50,
                                        backgroundColor: 'darkgray'
                                    }}
                                    onPress={uploadImage}
                                >
                                    <Feather name='edit-2' size={15} color='black'/>
                                </TouchableOpacity>
                                }
                            </View>
                            <View style={{marginRight: 'auto', marginLeft: 20}}>
                                <Text style={{fontSize: 18, color: color.darkBlue}}>
                                    {user.name}
                                </Text>
                                <Text style={{fontSize: 16, color: color.blue}}>
                                    {user.headline}
                                </Text>
                            </View>


                            {(user.id !== authUser.id) &&
                            <TouchableOpacity
                                style={{
                                    top: -20,
                                    right: -10,
                                    elevation: 5,
                                    position: 'absolute',
                                    backgroundColor: color.darkGrey,
                                    borderRadius: 5,
                                    width: 80,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 3
                                }}
                                onPress={() => follow()}
                            >
                                {alreadyFollow
                                    ?
                                    <Text>Following</Text>
                                    :
                                    <>
                                        <Feather name='user-plus' size={15} color='white'/>
                                        <Text style={{marginLeft: 5, color: 'white'}}>Follow</Text>
                                    </>

                                }
                            </TouchableOpacity>
                            }


                        </View>

                        <View>
                            <Text style={{
                                marginTop: 10,
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
                                    <Text style={styles.tabTextPrimary}>{user.articleCount}</Text>
                                    <Text style={styles.tabTextSecondary}>Post</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={tab === 2 ? styles.activeTab : styles.inactiveTab}
                                    onPress={() => setTab(2)}
                                >
                                    <Text style={styles.tabTextPrimary}>{user.followingCount}</Text>
                                    <Text style={styles.tabTextSecondary}>Following</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={tab === 3 ? styles.activeTab : styles.inactiveTab}
                                    onPress={() => setTab(3)}
                                >
                                    <Text style={styles.tabTextPrimary}>{user.followerCount}</Text>
                                    <Text style={styles.tabTextSecondary}>Follower</Text>
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
                    {tab === 1 && <MyArticles navigation={navigation} userId={user.id}/>}
                    {tab === 2 && <Following navigation={navigation} userId={user.id}/>}
                    {tab === 3 && <Followers navigation={navigation} userId={user.id}/>}
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