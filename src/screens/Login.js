import { View, Text, StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform, StatusBar } from 'react-native'
import React from 'react'

import { handleLoginGoogleAsync, handleLoginEmailAsync } from '../database/auth'

import ButtonLoginGoogle from '../components/ButtonLoginGoogle'
import Button from '../components/Button'
import { Checkbox } from 'react-native-paper'

import * as gStyles from '../global/styles'

export default function Login({ navigation }) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passVisibility, setPassVisibility] = React.useState(true);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[styles.container, styles.AndroidSafeArea]}>

            <View style={{ width: '60%' }}>
                <View style={styles.emailContainer}>
                    <Text>Email</Text>
                    <TextInput
                        style={{ backgroundColor: '#fff', borderRadius: 5, padding: 10, marginBottom: 10 }}
                        placeholder='Enter your email'
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>

                <View style={styles.passwordContainer}>
                    <Text>Password</Text>
                    <TextInput
                        style={{ backgroundColor: '#fff', borderRadius: 5, padding: 10, marginBottom: 10 }}
                        placeholder='Enter your password'
                        secureTextEntry={passVisibility}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <View style={{ marginBottom: 10, alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Checkbox
                            status={!passVisibility ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setPassVisibility(!passVisibility)
                            }}
                            color='#00ff'
                        />
                        <Text style={{ fontSize: 12, color: 'black', fontWeight: 'bold' }}>Mostrar senha</Text>
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Button
                        text={'Entrar'}
                        onPress={async () => {
                            const user = await handleLoginEmailAsync(email, password);
                            if (user != null && user?.emailVerified) {
                                Alert.alert('✅ Login realizado com sucesso', 'Redirecionando você pra a página inicial...')
                                navigation.navigate('Home')
                            }
                            if (user != null && !user?.emailVerified) {
                                Alert.alert('⚠️ Atenção', 'Você precisa verificar seu email para continuar.')
                            }
                        }}
                        size='small'
                    />
                    <ButtonLoginGoogle onPress={async () => {
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
                    } />
                    <Text
                        onPress={() => navigation.navigate('SignUp')}
                        style={{ marginTop: 100, color: '#0000FF', textDecorationLine: 'underline', fontSize: 12 }}>

                        Sem conta? Crie uma aqui
                    </Text>
                </View>
            </View>
        </KeyboardAvoidingView>
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
        marginBottom: 2,
    }
})