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
import { useDispatch, useSelector } from 'react-redux'
import { login, registration } from '../actions/auth'
import { icons, images, SIZES, COLORS, FONTS } from '../constants';

const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const Registration = ({ navigation }) => {

    const errorMessage = useSelector(state =>         
        state.error.regErrorMessage
    )
    const dispatch = useDispatch();

    const [formData, setFormData] = useState(initialState);
    const [error, setError] = useState("");
    function handleRegistration() {
        dispatch(registration(formData,navigation))
    }

    useEffect(() => {
        setError(errorMessage)
    },[errorMessage])

    function Header() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.goBack()}>
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

    function Main() {
        return (
            <View style={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "25%"
            }}>
                <Text style={{
                    ...FONTS.h1,
                    color: COLORS.black,
                }}>
                    Registration
                </Text>
            </View>

        )
    }

    function RegistrationInput({ ...props }) {
        return (<View style={{
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
                placeholder={"Username"}
                onChangeText={(text) => setFormData({ ...formData, username: text })}
            />
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
                autoCapitalize='none'
                placeholder={"Password"}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
                secureTextEntry={true}
            />
            <TextInput {...props}
                style={{
                    backgroundColor: COLORS.secondary,
                    width: '95%',
                    padding: SIZES.padding * 2,
                    borderRadius: SIZES.radius,
                    marginTop: SIZES.padding,
                }}
                autoCapitalize='none'
                placeholder={"Confirm Password"}
                onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                secureTextEntry={true}
            />
            <Text style={{
                color: COLORS.red,
                padding: SIZES.padding
            }}>
            {error}    
            </Text>
            <TouchableOpacity style={{
                backgroundColor: COLORS.primary,
                width: '95%',
                alignItems: 'center',
                justifyContent: 'center',
                padding: SIZES.padding * 2,
                borderRadius: SIZES.radius,
                marginTop: SIZES.padding,
            }} onPress={handleRegistration} >
                <Text style={{
                    color: COLORS.white,
                    fontWeight: '500',
                    fontSize: 16,
                }}>Create an Account</Text>
            </TouchableOpacity>
                
        </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {Header()}
            {Main()}
            {RegistrationInput()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4,
    },
});

export default Registration
