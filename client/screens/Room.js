import React, { useState, useEffect } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Button,
    FlatList,
} from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { useDispatch, useSelector } from 'react-redux'
import { icons, images, SIZES, COLORS, FONTS } from '../constants';
import AsyncStorage from "@react-native-community/async-storage";
import moment from 'moment'
import { useFocusEffect } from '@react-navigation/native'
import { io } from "socket.io-client";
import { updateLastMessage } from '../actions/messages'

const Room = ({ route, navigation }) => {

    const [message, setMessage] = useState("");
    const [authUser, setAuthUser] = useState([])
    const dispatch = useDispatch();
    const CONNECTION_URL = "http://192.168.0.3:5002"

    const { roomId } = route.params;
    const isMyMessage = (username) => {
        return username === authUser.username;

    }

    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState();
    const [text, setText] = useState("");

    useFocusEffect(
        React.useCallback(() => {

            const getAuthUser = async () => {
                const user = await AsyncStorage.getItem("profile")
                setAuthUser(JSON.parse(user).result)
            }
            getAuthUser();

        }, [])
    );

    useEffect(() => {
        const socket = io(CONNECTION_URL);
        setSocket(socket);
        socket.on("connect", () => {
        });
        socket.emit("joinRoom", roomId);
        socket.on("getMessages", result => {
            setMessages(result)
        })
        socket.on("text", text => {
            setMessages((messages) => [...messages, text]);
        });
    }, [])

    function Header() {

        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={{
                        width: "25%",
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center',
                        alignItems: "flex-start"
                    }}
                    onPress={() => {
                        socket.disconnect()
                        navigation.goBack()
                    }}>
                    <Image
                        source={icons.back}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }} />
                </TouchableOpacity>
                <View style={{
                    width: "50%",
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text>
                        {roomId}
                    </Text>
                </View>
                <TouchableOpacity
                    style={{
                        width: "25%",
                        paddingRight: SIZES.padding * 2,
                        justifyContent: 'center',
                        alignItems: "flex-end"
                    }}>
                    <Image
                        source={icons.back}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }} />
                </TouchableOpacity>



            </View>

        )
    }

    function MessagesList() {

        const renderItem = ({ item }) => (

            <View style={{
                padding: 10,
            }}>
                <View style={{
                    borderRadius: 5,
                    padding: 10,
                    backgroundColor: isMyMessage(item.user.username) ? COLORS.primary : COLORS.white,
                    marginLeft: isMyMessage(item.user.username) ? 50 : 0,
                    marginRight: isMyMessage(item.user.username) ? 0 : 50,
                }}>
                    {!isMyMessage(item.user.username) ? <Text style={{
                        fontWeight: "bold",
                        paddingBottom: 5,
                    }}>{item.user.username}</Text> : null}
                    <Text>{item.content}</Text>
                </View>
                <View style={{
                    marginLeft: isMyMessage(item.user.username) ? 50 : 0,
                    marginRight: isMyMessage(item.user.username) ? 0 : 50,
                }}>
                    <Text>{moment(item.createdAt).fromNow()}</Text>
                </View>
            </View>

        );

        return (
            <View style={{
                flex: 1,
                backgroundColor: 'grey',
            }}>
                <FlatList
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    ref={ref => this.flatList = ref}
                    onContentSizeChange={() => this.flatList.scrollToEnd({ animated: false })}
                    onLayout={() => this.flatList.scrollToEnd({ animated: false })}
                    contentContainerStyle={{ paddingBottom: 10 }}

                />
            </View>

        )

    }

    function InputBox() {
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                height: 60,
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: SIZES.padding,
                    height: 40,
                    borderWidth: 1,
                    borderRadius: 20,
                    marginHorizontal: SIZES.padding
                }}>
                    <TextInput
                        placeholder={"Type a message"}
                        multiline
                        value={message}
                        onChangeText={setMessage}
                        style={{
                            borderRadius: 25,
                        }}
                    />
                </View>
                <View style={{
                    height: 40,
                    paddingRight: 10,
                }}>
                    <Button
                        onPress={() => {
                            const authUserId = authUser._id
                            const date = new Date();
                            socket.emit("sendMessage", { Content: message, RoomID: roomId, UserID: authUserId, Date: date })
                            setMessage("")
                        }}
                        title="SEND" />
                    <Text>{text}</Text>
                </View>
            </View>
        )

    }

    return (
        <SafeAreaView style={{
            height: "100%",
        }}>
            {Header()}
            {MessagesList()}
            {InputBox()}
        </SafeAreaView>
    )
}

export default Room
