import React, {useEffect, useState} from "react";
import {FlatList, Image, Modal, Text, TextInput, TouchableOpacity, View} from "react-native";
import Loading from "../../../components/Loading";
import articleService from "../../../services/article";
import {Feather} from "@expo/vector-icons";
import {color} from "../../../styles/theme";

const TopicModal = ({topicModal, setTopicModal, searchTopic, setSearchTopic}) => {
    const [filteredTopic, setFilteredTopic] = useState("")
    const [topics, setTopics] = useState(null)

    useEffect(() => {
        articleService.getTopics()
            .then(res => setTopics(res))
    }, [])


    useEffect(() => {
        if (searchTopic) {
            setFilteredTopic(searchTopic)
        }
    }, [])

    if (!topics) {
        return <Loading/>
    }

    const filteredTopics = topics.filter(topic => topic.title.toLowerCase().includes(filteredTopic.toLowerCase()))

    return (
        <Modal
            onRequestClose={() => setTopicModal(false)}
            visible={topicModal}
            transparant
        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20
            }}>
                <View style={{
                    width: '80%',
                }}>
                    <TextInput
                        value={filteredTopic}
                        onChangeText={text => setFilteredTopic(text)}
                        style={{
                            height: 40,
                            width: '100%',
                            paddingLeft: 20,
                            borderRadius: 20,
                            borderWidth: 1,
                            marginBottom: 20
                        }}
                        placeholder="search topic"
                    />
                    <Feather name="search" size={20} color='gray'
                             style={{
                                 position: 'absolute',
                                 right: 20,
                                 top: 10
                             }}
                    />
                </View>
                <FlatList
                    data={filteredTopics}
                    renderItem={({item}) =>
                        <TouchableOpacity
                            onPress={() => {
                                setSearchTopic(item.title)
                                setTopicModal(false)
                            }}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 20
                            }}
                        >
                            <Image
                                source={{uri: item.image_url}}
                                style={{
                                    backgroundColor: 'red',
                                    width: '50%', height: 100,
                                    borderRadius: 10
                                }}
                            />
                            <Text style={{
                                marginLeft: 10,
                                fontSize: 15
                            }}>
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    }
                />
            </View>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 50,
                marginHorizontal: 20,
                marginVertical: 10,
                justifyContent: 'space-between',
                backgroundColor: 'transparent'
            }}>
                <TouchableOpacity
                    onPress={() => setFilteredTopic("")}
                    style={{
                        width: '48%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: color.darkBlue,
                        borderRadius: 30
                    }}
                >
                    <Text style={{
                        color: '#fff'
                    }}>
                        RESET
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setSearchTopic(filteredTopic)
                        setTopicModal(false)
                    }}
                    style={{
                        width: '48%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: color.blue,
                        borderRadius: 30
                    }}
                >
                    <Text style={{
                        color: '#fff'
                    }}>
                        OK
                    </Text>
                </TouchableOpacity>
            </View>

        </Modal>
    )
}

export default TopicModal