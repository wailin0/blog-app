import React, {useContext, useEffect, useState} from 'react'
import {Alert, Image, Modal, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import {color} from "../styles/theme";
import articleService from "../services/article";
import moment from "moment";
import Loading from "../components/Loading";
import {Context} from "../context/Context";

const ArticleDetail = ({navigation, route}) => {
    const [popup, setPopup] = useState(false)
    const [article, setArticle] = useState(null)
    const [error, setError] = useState(false)

    const {user} = useContext(Context)

    const {articleId} = route.params

    useEffect(() => {
        articleService.getArticleById(articleId)
            .then(res => {
                if (!res) {
                    setError(true)
                }
                {
                    setArticle(res)
                }
            })
            .catch(e => console.log(e))
    }, [])

    const deleteUserArticle = () => {
        Alert.alert(
            'Delete Article?',
            "Do you really wanna do tis?",
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log("Cancel Pressed"),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: async () => {
                        await articleService.deleteArticle(articleId)
                        setPopup(false)
                        navigation.goBack()
                    }
                },
            ]
        )
    }


    const Header = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginHorizontal: 30
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Feather name="chevron-left" size={32} color="black"/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setPopup(!popup)}
                >
                    <Feather name="more-horizontal" size={32} color="black"/>
                </TouchableOpacity>
            </View>
        )
    }

    if (error) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'red', fontSize: 20}}>
                    This article isn't available
                </Text>
            </View>
        )
    }

    if (!article) {
        return <Loading/>
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            {
                Header()
            }

            <ScrollView>
                <View
                    style={{
                        marginHorizontal: 30,
                        marginBottom: 10
                    }}
                >
                    <Text
                        style={{
                            fontSize: 24,
                            color: color.darkBlue,
                            marginVertical: 10,
                            fontWeight: '700'
                        }}>
                        {article.title}
                    </Text>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                marginRight: 'auto'
                            }}
                            onPress={() => navigation.push('User Profile', {userId: article.user.id})}
                        >
                            <Image
                                source={{uri: article.user.photo}}
                                style={{
                                    width: 38, height: 38,
                                    borderRadius: 12,
                                    backgroundColor: 'red'
                                }}
                            />
                            <View style={{marginLeft: 10}}>
                                <Text style={{
                                    color: color.darkBlueText,
                                    fontSize: 14,
                                }}>
                                    {article.user.name}
                                </Text>
                                <Text style={{
                                    color: color.darkGrey,
                                    fontSize: 12
                                }}
                                >{moment(article.createdAt).fromNow()}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => console.log('share!')}
                        >
                            <Feather name="share" size={24} color={color.blue} style={{marginRight: 20}}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Feather name="bookmark" size={24} color={color.blue}/>
                        </TouchableOpacity>
                    </View>
                </View>

                {/*    article cover */
                }
                <Image
                    source={{uri: article.photo}}
                    style={{
                        borderTopLeftRadius: 28,
                        borderTopRightRadius: 28,
                        backgroundColor: 'red',
                        height: 200
                    }}
                />

                <Text style={{
                    marginVertical: 20, marginHorizontal: 30,
                    fontSize: 14, color: color.darkBlueText
                }}>
                    {article.content}
                </Text>

            </ScrollView>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 30,
                    backgroundColor: color.blue,
                    borderRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 5,
                    width: 111, height: 48
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Feather name="thumbs-up" size={24} color='white' style={{marginRight: 10}}/>
                    <Text style={{color: 'white', fontSize: 16}}>3.3k</Text>
                </View>
            </TouchableOpacity>

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
                        {(user && user.id === article.user.id)
                            ?
                            <>
                                <TouchableOpacity
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginBottom: 15
                                    }}
                                    onPress={() => {
                                        navigation.push("Create Article", {article})
                                        setPopup(false)
                                    }}
                                >
                                    <Feather name="edit" style={{marginRight: 10}} size={20} color="black"/>
                                    <Text style={{fontSize: 17}}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginBottom: 15
                                    }}
                                    onPress={() => deleteUserArticle()}
                                >
                                    <Feather name="trash" style={{marginRight: 10}} size={20} color="black"/>
                                    <Text style={{fontSize: 17}}>Delete</Text>
                                </TouchableOpacity>
                            </>
                            :
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginBottom: 15
                                }}
                            >
                                <Feather name="bookmark" style={{marginRight: 10}} size={20} color="black"/>
                                <Text style={{fontSize: 17}}>Save</Text>
                            </TouchableOpacity>

                        }
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 15
                            }}
                        >
                            <Feather name="share" style={{marginRight: 10}} size={20} color="black"/>
                            <Text style={{fontSize: 17}}>Share</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <Feather name="flag" style={{marginRight: 10}} size={20} color="black"/>
                            <Text style={{fontSize: 17}}>
                                Report
                            </Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

        </SafeAreaView>
    )
}

export default ArticleDetail