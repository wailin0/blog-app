import React, {useEffect, useState} from 'react'
import {
    Image,
    Modal,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {Feather} from "@expo/vector-icons";
import {articles} from "../dummy";
import {color} from "../styles/theme";
import articleService from "../services/article";

const ArticleDetail = ({navigation, route}) => {
    const [popup, setPopup] = useState(false)
    // const [article, setArticle] = useState(null)

    const {articleId} = route.params

    // useEffect(() => {
    //     articleService.getArticleById(articleId)
    //         .then(res => setArticle(res.data))
    // }, [])


    const article = articles.find(a => a.id === articleId)

    const Header = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
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

    if (!article) {
        return null
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View
                style={{
                    marginHorizontal: 30,
                    marginVertical: 10
                }}
            >
                {Header()}
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
                        onPress={() => navigation.navigate('User Profile', {userId: article.author.id})}
                    >
                        <Image
                            source={{uri: article.author.photo}}
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
                                {article.author.name}
                            </Text>
                            <Text style={{
                                color: color.darkGrey,
                                fontSize: 12
                            }}
                            >{article.createdDate}</Text>
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


            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {/*    article cover */}
                <Image
                    source={{uri: article.cover}}
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
                    {article.body}
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