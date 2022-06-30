import { View, Text, StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform, StatusBar, TouchableOpacity, BackHandler } from 'react-native'
import React from 'react'

import { handleLoginGoogleAsync, handleLoginEmailAsync } from '../database/auth'

import ButtonLoginGoogle from '../components/ButtonLoginGoogle'
import { Checkbox } from 'react-native-paper'

import * as Animatable from 'react-native-animatable'
import Colors from '../constants/Colors'

export default function Login({ navigation }) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passVisibility, setPassVisibility] = React.useState(true);
    const [error, setError] = React.useState('');
    const animText = React.useRef(null);
    const animForm = React.useRef(null);
    const animError = React.useRef(null);
    const [animAway, setAnimAway] = React.useState(false);
    const [animPassword, setAnimPassword] = React.useState(false);

    navigation.addListener('focus', () => {
        if (!animAway) {
            animText.current.fadeInLeft(500);
            animForm.current.fadeInUp(500);
            setAnimAway(false);
        }
    })

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[styles.container, styles.AndroidSafeArea]}>

            <Animatable.View
                animation={animAway || animPassword ? 'fadeOutLeft' : 'fadeInLeft'}
                delay={500}
                style={styles.containerHeader}
                ref={animText}
                onAnimationEnd={() => { if (animAway) navigation.navigate('TabBar') }}>
                <Text style={styles.message}>Bem vinde!</Text>
            </Animatable.View>

            <Animatable.View
                style={styles.containerForm}
                animation={animAway || animPassword ? 'fadeOutDown' : 'fadeInUp'}
                ref={animForm}
                onAnimationEnd={() => {
                    if (animAway) {
                        navigation.replace('TabBar')
                    }
                    if (animPassword) {
                        navigation.navigate('Password')
                    }
                }}
            >
                <Text style={styles.title}>Email</Text>
                <TextInput
                    placeholder='Digite seu email'
                    style={styles.input}
                    onChangeText={text => setEmail(text)}
                />

                <Text style={styles.title}>Senha</Text>
                <TextInput
                    placeholder='Digite sua senha'
                    style={styles.input}
                    secureTextEntry={passVisibility}
                    onChangeText={text => setPassword(text)}
                />

                <View style={styles.checkbox}>
                    <Checkbox
                        status={!passVisibility ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setPassVisibility(!passVisibility)
                        }}
                        color={Colors.skyBlue}
                    />
                    <Text style={{ fontSize: 12, color: 'black', fontWeight: 'bold' }}>Mostrar senha</Text>
                </View>

                {error.length > 0 && <Animatable.Text animation='shake' duration={500} style={styles.error} ref={animError}>{error}</Animatable.Text>}

                <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                        const user = await handleLoginEmailAsync(email, password)

                        console.log(user)

                        if (user != null && user?.user?.emailVerified) {
                            setAnimAway(true)
                        }

                        if (!user.user && user?.startsWith('[auth/')) setError('Email ou senha incorretos, favor verificar seu email e senha')
                        if (error.length > 0) animError.current.shake(500)

                    }}
                >
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <ButtonLoginGoogle
                    onPress={async () => {
                        const user = await handleLoginGoogleAsync()
                        if (user != null && user?.user?.emailVerified) {
                            setAnimAway(true)
                        }

                        if (!user.user && user?.startsWith('[auth/')) setError('Ops, algo deu errado!\nTente novamente mais tarde')
                        if (error.length > 0) animError.current.shake(500)
                    }
                    }
                    styleProps={{ alignSelf: 'center', marginTop: 14 }}
                >
                </ButtonLoginGoogle>

                <TouchableOpacity
                    style={styles.buttonRegister}
                    onPress={() => {
                        setAnimPassword(true)
                    }}>
                    <Text style={styles.buttonRegisterText}>Esqueci minha senha</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonRegister}>
                    <Text style={styles.buttonRegisterText}>Não possui uma conta? Cadastre-se</Text>
                </TouchableOpacity>

            </Animatable.View>

        </KeyboardAvoidingView >
    )
}

const styles = StyleSheet.create({

    /**
     * AndroidSafeArea - Android only.
     * 
     * For iOS use 'SafeAreaView' instead.
     * 
     * @platform android
     * @see https://reactnative.dev/docs/statusbar#currentheight-android
     */
    AndroidSafeArea: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.lightPink,
    },
    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',
    },
    message: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.white,
    },
    containerForm: {
        backgroundColor: Colors.white,
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    title: {
        fontSize: 20,
        marginTop: 28,
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
    },
    button: {
        backgroundColor: Colors.lightPink,
        width: '51%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonRegister: {
        marginTop: 14,
        alignSelf: 'center',
    },
    buttonRegisterText: {
        color: Colors.lightGray,
    },
    checkbox: {
        marginBottom: 10,
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    error: {
        color: Colors.red,
    }
})
