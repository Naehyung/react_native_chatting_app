import React, { useState, useEffect } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native'
import { icons, images, SIZES, COLORS, FONTS } from '../constants';
import { getUsers } from '../actions/users'
import { getAuthUser } from "../actions/auth";
import { createChatRoom } from '../actions/chatRooms'
import { useDispatch, useSelector } from 'react-redux'

const Home = ({ navigation, route }) => {

    const users = useSelector(state =>
        state.users
    )
    const authUser = useSelector(state =>
        state.auth
    )
    const userId = route.params.userId

    const dispatch = useDispatch();

    const onPress = (item) => {
        dispatch(createChatRoom({ AUTH: authUser, USER: item }))
    }

    useFocusEffect(
        React.useCallback(() => {
            dispatch(getAuthUser({ UserID: userId}))
            dispatch(getUsers())
        }, [navigation])
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
                    <Text style={{ ...FONTS.h2, color: COLORS.black, fontWeight: 'bold' }}>Friends</Text>
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

    function MyPage() {
        return (
            <View style={{
                flexDirection: 'row',
                height: 70,
                alignItems: "center",
                borderBottomColor: COLORS.black,
                borderBottomWidth: 1,
            }}>
                <View style={{
                    paddingLeft: SIZES.padding * 2,
                }}>
                    <Image
                        source={{
                            uri: authUser.imageFile
                        }}
                        resizeMode="contain"
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: SIZES.radius / 2,
                            overflow: "hidden",
                            borderWidth: 2,
                            borderColor: COLORS.black
                        }}
                    />
                </View>
                <View style={{
                    paddingLeft: SIZES.padding * 2,
                }}>
                    <Text
                        style={{
                            ...FONTS.h2,
                            fontWeight: "bold",
                            color: COLORS.black
                        }}>{authUser.username}
                    </Text>
                    <Text>{authUser.status}</Text>
                </View>
            </View>
        )
    }

    function FriendsList() {

        const renderItem = ({ item }) => (
            <View>
                <TouchableOpacity
                    onPress={() => {
                        onPress(item)
                    }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: 60,
                        paddingLeft: SIZES.padding
                    }}>
                        <Image
                            source={!item.imageFile ? icons.user : {
                                uri: authUser.imageFile
                            }}
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
                        }}>
                            <Text style={{ ...FONTS.h3 }}>{item.username}</Text>
                            <Text style={{ ...FONTS.body4 }}>{item.status}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );

        return (
            <View>
                <View style={{
                    padding: SIZES.padding,
                }}>
                    <Text>{users.length} Friends</Text>
                </View>
                <FlatList
                    data={users}
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
            <SafeAreaView style={styles.container}>
                {MyPage()}
                {FriendsList()}
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

export default Home
