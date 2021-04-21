import React, { useState, useEffect, useRef } from 'react'
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
import { login, registration } from '../actions/auth'
import { updateStatus } from '../actions/auth'
import { icons, images, SIZES, COLORS, FONTS } from '../constants';
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker'
import {updateImageFile} from '../actions/auth'

const Setting = ({ navigation }) => {


    const [user, setUser] = useState("");
    const [isEditStatusPressed, setIsEditStatusPressed] = useState(false)
    const [status, setStatus] = useState();
    const [imageFile, setImageFile] = useState();
    const dispatch = useDispatch();

    let actionSheet = useRef();
    var optionArray = [
        'Take a photo',
        'Choose from Library',
        'Cancel'
    ];
    const handleLogout = async () => {
        await AsyncStorage.removeItem("profile").then(() => {
            navigation.navigate("Login");
        });

    }

    const retrieveUser = async () => {
        return JSON.parse(await AsyncStorage.getItem("profile")).result
    }

    useFocusEffect(
        React.useCallback(() => {
            retrieveUser().then(setUser)
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
                    <Text style={{ ...FONTS.h2, color: COLORS.black, fontWeight: 'bold' }}>Settings</Text>

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
            }}>
                <View style={{
                    paddingLeft: SIZES.padding * 2,
                }}>
                    <Image
                        source={{
                            uri: imageFile
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
                        }}>{user.username}
                    </Text>
                    <Text>
                        {user.email}
                    </Text>
                </View>
            </View>
        )
    }

    function EditButton({ text, onPress }) {
        return (
            <TouchableOpacity
                onPress={onPress}>
                <View style={{
                    borderWidth: 1,
                    borderRadius: 25,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                }}>
                    <Text>{text}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const showActionSheet = () => {
        //To show the Bottom ActionSheet
        actionSheet.current.show();
    };

    const HandleTakePhoto = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            setImageFile(image.path)
            dispatch(updateImageFile(image.path))
        });
    }

    const HandleChooseFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            setImageFile(image.path)
            dispatch(updateImageFile(image.path))
        });
    }

    function settingsPage() {

        const statusOnPress = async () => {

            if (isEditStatusPressed) {

                const authUserID = user._id;
                dispatch(updateStatus({ Status: status, UserID: authUserID }))
            }

            setIsEditStatusPressed(prevStatus => !prevStatus)
            setStatus("")

        }

        return (
            <View style={{
            }}>
                {isEditStatusPressed
                    ? <View style={{
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: SIZES.padding,
                        marginHorizontal: SIZES.padding,
                    }}>
                        <TextInput
                            value={status}
                            onChangeText={setStatus}
                            placeholder="Type your status" />
                    </View>
                    : null}
                <EditButton text={isEditStatusPressed ? "CONFIRM STATUS" : "CHANGE STATUS"} onPress={statusOnPress} />
                <EditButton text="CHANGE PROFILE IMAGE" onPress={showActionSheet} />
                <ActionSheet
                    ref={actionSheet}
                    title="Upload Photo"
                    // Options Array to show in bottom sheet
                    options={optionArray}
                    // Define cancel button index in the option array
                    // This will take the cancel option in bottom
                    // and will highlight it
                    cancelButtonIndex={2}
                    onPress={(index) => {

                        switch (index) {
                            case 0:
                                HandleTakePhoto()
                            case 1:
                                HandleChooseFromLibrary()
                        }

                    }}
                />
                <EditButton text="LOGOUT" onPress={handleLogout} />
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
                {MyPage()}
                {settingsPage()}
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

export default Setting
