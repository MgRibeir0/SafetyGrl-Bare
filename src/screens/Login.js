import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import React from 'react'

import { handleLoginGoogleAsync, handleLoginEmailAsync } from '../database/auth'

import ButtonLoginGoogle from '../components/ButtonLoginGoogle'
import Button from '../components/Button'

export default function Login({ navigation }) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <View style={styles.container}>
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
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>
                <View style={{ alignItems: 'center', borderWidth: 1, borderColor: 'black' }}>
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
        marginBottom: 2,
    }
})