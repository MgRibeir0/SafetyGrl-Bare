import { Text, StyleSheet, KeyboardAvoidingView, Platform, StatusBar, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable'
import Colors from '../constants/Colors'
import auth from '@react-native-firebase/auth'


export default function Password() {

    const [email, setEmail] = React.useState('');

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[styles.container, styles.AndroidSafeArea]}
        >
            <Animatable.View animation='fadeInLeft' style={styles.containerHeader}>
                <Text style={styles.message}>Alterar senha!</Text>
            </Animatable.View>
            <Animatable.View animation='fadeInUp' style={styles.containerForm}>
                <Text style={styles.title}>E-mail</Text>
                <TextInput
                    placeholder='Digite seu email'
                    style={styles.input}
                    onChangeText={text => setEmail(text)}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                        try {
                            const result = await auth().sendPasswordResetEmail(email)
                            console.log(result)
                        }
                        catch (error) {
                            if (error) {
                                console.log(error)
                            }
                        }
                    }}
                >
                    <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
            </Animatable.View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
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
        justifyContent: 'center',
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
})