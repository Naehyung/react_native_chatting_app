import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import AsyncStorage from "@react-native-community/async-storage";
import { icons, images, SIZES, COLORS, FONTS } from '../constants';
import decode from 'jwt-decode';

const Loading = ({ navigation }) => {

    const checkAuthentification = async () => {
        
        const user = await AsyncStorage.getItem("profile")
        
        if (user) {
            const token = JSON.parse(user).token
            const UserID = JSON.parse(user).result._id
            const decodedToken = decode(token);
            
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                navigation.navigate("Login");
            } else {
                navigation.navigate("Home",{
                    userId: UserID,
                });
            };
        } else {
            navigation.navigate("Login");
        }

    }

    useEffect(() => {
        checkAuthentification();
    },[])

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Loading
