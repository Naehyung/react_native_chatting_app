import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import { icons, images, SIZES, COLORS, FONTS } from '../constants';

const initialState = {
    email: "",
    password: "",
    confirmPassword: "",
};

const Login = ({ navigation }) => {

    const errorMessage = useSelector(state =>
        state.error.loginErrorMessage
    )

    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const [formData, setFormData] = useState(initialState);

    function handleLogin() {
        dispatch(login(formData, navigation));
    }

    useEffect(() => {
        setError(errorMessage)
    },[errorMessage])

    function Main() {
        return (
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: "100%",
                height: "35%"
            }}>
                <Text style={{
                    ...FONTS.h1,
                    color: COLORS.black
                }}>Chatting App</Text>
            </View>
        )
    }

    function LoginInput({ ...props }) {
        return (
            <View style={{
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <TextInput {...props}
                    style={{
                        backgroundColor: COLORS.secondary,
                        width: '95%',
                        padding: SIZES.padding * 2,
                        borderRadius: SIZES.radius,
                        marginTop: SIZES.padding,
                    }}
                    autoCapitalize='none'
                    placeholder={"Email"}
                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                />
                <TextInput {...props}
                    style={{
                        backgroundColor: COLORS.secondary,
                        width: '95%',
                        padding: SIZES.padding * 2,
                        borderRadius: SIZES.radius,
                        marginTop: SIZES.padding,
                    }}
                    placeholder={"Password"}
                    autoCapitalize='none'
                    onChangeText={(text) => setFormData({ ...formData, password: text })}
                    secureTextEntry={true}
                />
                <Text style={{
                    color: COLORS.red,
                    padding: SIZES.padding
                }}>
                    {error}
                </Text>
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.primary,
                        width: '95%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: SIZES.padding * 2,
                        borderRadius: SIZES.radius,
                        marginTop: SIZES.padding,
                    }}
                    onPress={handleLogin} >
                    <Text style={{
                        color: COLORS.white,
                        fontWeight: '500',
                        fontSize: 16,
                    }}

                    >Click to login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: '95%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: SIZES.padding * 2,
                    borderRadius: SIZES.radius,
                    marginTop: SIZES.padding,
                }} onPress={() => { navigation.navigate("Registration"); }} >
                    <Text style={{
                        color: COLORS.primary,
                        fontWeight: '500',
                        fontSize: 16,
                    }}>Create an Account</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {Main()}
            {LoginInput()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4,
    },
});

export default Login
