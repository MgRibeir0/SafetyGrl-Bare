import { View, Text, StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform, StatusBar, TouchableOpacity } from 'react-native'
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
    const animText = React.useRef(null);
    const animForm = React.useRef(null);
    const [animAway, setAnimAway] = React.useState(false);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[styles.container, styles.AndroidSafeArea]}>

            <Animatable.View animation={animAway ? 'fadeOutLeft' : 'fadeInLeft'} delay={500} style={styles.containerHeader} ref={animText}>
                <Text style={styles.message}>Bem vinde!</Text>
            </Animatable.View>

            <Animatable.View style={styles.containerForm} animation={animAway ? 'fadeOutDown' : 'fadeInUp'} ref={animForm} onAnimationEnd={() => {
                if (animAway) {
                    navigation.replace('TabBar')
                }
            }}>
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


                <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                        // const user = await handleLoginEmailAsync(email, password)

                        // console.log(`user.user.emailVerified: ${user?.user?.emailVerified}`)
                        // console.log(`user: ${user}`)

                        // if (animAway) navigation.navigate('Home')

                        // if (user != null && user?.user?.emailVerified) {
                        //     setAnimAway(true)
                        // }
                        // if (user != null && !user?.user?.emailVerified) {
                        //     Alert.alert('⚠️ Atenção', 'Você precisa verificar seu email para continuar.')
                        //     navigation.navigate('VerifyEmail')
                        // }

                        setAnimAway(true)

                    }}
                >
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <ButtonLoginGoogle
                    onPress={async () => {
                        try {
                            const user = await handleLoginGoogleAsync();
                            if (user != null) {
                                Alert.alert('✅ Login realizado com sucesso', 'Redirecionando você pra a página inicial...')
                                navigation.navigate('Home')
                            }
                        } catch (error) {
                            console.log(error.message);
                            Alert.alert('❌ Error', error.message);
                        }
                    }
                    }
                    styleProps={{ alignSelf: 'center', marginTop: 14 }}
                >
                </ButtonLoginGoogle>

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
    }
})
