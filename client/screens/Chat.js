import React, { useState, useEffect } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    FlatList,
} from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';

import { icons, images, SIZES, COLORS, FONTS } from '../constants';
import AsyncStorage from "@react-native-community/async-storage";
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import { getChatRooms } from '../actions/chatRooms'

const Chat = ({ navigation }) => {

    const dispatch = useDispatch();

    const chatRooms = useSelector(state =>
        state.chatRooms
    )

    useFocusEffect(
        React.useCallback(() => {
            dispatch(getChatRooms())
        }, [])
    );
    

    function Header() {
        return (
            <View style={{
                flexDirection: 'row',
                height: 60,
            }}>
                <View style={{
                    width: "50%",
                    paddingLeft: SIZES.padding * 2,
                    justifyContent: 'center'
                }}>
                    <Text style={{ ...FONTS.h2, color: COLORS.black, fontWeight: 'bold' }}>Chatting</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'stretch',
                    width: "50%",
                    paddingRight: SIZES.padding * 2,
                }}>
                    <TouchableOpacity
                        style={{
                            paddingLeft: SIZES.padding * 2,
                            justifyContent: 'center'
                        }}>
                        <Image
                            source={icons.back}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30
                            }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            paddingLeft: SIZES.padding * 2,
                            justifyContent: 'center'
                        }}>
                        <Image
                            source={icons.user}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30
                            }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            paddingLeft: SIZES.padding * 2,
                            justifyContent: 'center'
                        }}>
                        <Image
                            source={icons.user}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30
                            }} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function ChattingRoomsList() {
       
        const renderItem = ({ item }) => (

            <View>
                <TouchableOpacity
                    onPress={() => {
                        console.log(`move to Chat room ${item._id}`)
                        navigation.navigate('Room', {
                            roomId: item._id,
                        });
                    }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: 60,
                        paddingLeft: SIZES.padding,
                    }}>
                        <Image
                            source={item.imageFile}
                            resizeMode="contain"
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: SIZES.radius / 2,
                                overflow: "hidden",
                                borderWidth: 1,
                                borderColor: COLORS.black,
                            }} />

                        <View style={{
                            paddingLeft: SIZES.padding,
                            flex: 1,
                        }}>
                            <View style={{ flexDirection: 'row' }}>{item.users.map((user) => (
                                <Text style={{ ...FONTS.h3 }}>{user.username} </Text>
                            ))}</View>
                            <Text style={{ ...FONTS.body4 }}>{item.lastMessage ? item.lastMessage.content : ""}</Text>
                        </View>
                        <View style={{
                            paddingRight: SIZES.padding,
                        }}>
                            <Text style={{
                                ...FONTS.body4,
                            }}>{item.lastMessage ? moment(item.lastMessage.createdAt).fromNow() : ""}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );

        return (
            <View>
                <FlatList
                    data={chatRooms}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                />
            </View>

        )
    }

    return (
        <>
            <SafeAreaView style={{
                backgroundColor: COLORS.primary,
            }}>
                {Header()}
            </SafeAreaView>
            <SafeAreaView>
                {ChattingRoomsList()}
            </SafeAreaView>
            
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4,
    },
});


export default Chat
