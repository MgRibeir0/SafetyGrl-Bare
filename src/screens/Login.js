import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'

import { handleLoginGoogleAsync } from '../database/auth'

import ButtonLoginGoogle from '../components/ButtonLoginGoogle'
import Button from '../components/Button'

export default function Login() {
    return (
        <View style={styles.container}>
            <View style={{ width: '60%' }}>
                <View style={styles.emailContainer}>
                    <Text>Email</Text>
                    <TextInput
                        style={{ backgroundColor: '#fff', borderRadius: 5, padding: 10, marginBottom: 10 }}
                        placeholder='Enter your email'
                    />
                </View>

                <View style={styles.passwordContainer}>
                    <Text>Password</Text>
                    <TextInput
                        style={{ backgroundColor: '#fff', borderRadius: 5, padding: 10, marginBottom: 10 }}
                        placeholder='Enter your password'
                        secureTextEntry
                    />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Button text={'Entrar'} onPress={() => alert('clicou')} size='small' />
                    <ButtonLoginGoogle onPress={async () => {
                        const user = await handleLoginGoogleAsync();

                        console.log("user é :", user);

                        if (user != null) {
                            alert('Login realizado com sucesso')
                        }
                        else {
                            alert('Login falhou')
                        }

                    }} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emailContainer: {
        width: '100%',
        justifyContent: 'center',
        marginBottom: 1,
    },
    passwordContainer: {
        width: '100%',
        justifyContent: 'center',
        marginBottom: 5,
    }
})