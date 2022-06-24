import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import React from 'react';

import {
    handleLoginGoogleAsync,
    signUpEmailPassword,
    verificationEmail,
} from '../database/auth';

import Button from '../components/Button';
import ButtonLoginGoogle from '../components/ButtonLoginGoogle';

export default function Signup() {
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <View style={styles.container}>
            <View style={{ width: '60%' }}>

                <View style={styles.nameContainer}>
                    <Text>Nome</Text>
                    <TextInput
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 5,
                            padding: 10,
                            marginBottom: 10,
                        }}
                        placeholder="Digite seu nome"
                        onChangeText={text => setName(text)}
                    />
                </View>

                <View style={styles.phoneContainer}>
                    <Text>Telefone</Text>
                    <TextInput
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 5,
                            padding: 10,
                            marginBottom: 10,
                        }}
                        placeholder="Digite seu telefone"
                        onChangeText={text => setPhone(text)}
                    />
                </View>

                <View style={styles.emailContainer}>
                    <Text>Email</Text>
                    <TextInput
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 5,
                            padding: 10,
                            marginBottom: 10,
                        }}
                        placeholder="Digite seu email"
                        onChangeText={text => setEmail(text)}
                    />
                </View>

                <View style={styles.passwordContainer}>
                    <Text>Password</Text>
                    <TextInput
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 5,
                            padding: 10,
                            marginBottom: 10,
                        }}
                        placeholder="Enter your password"
                        secureTextEntry
                        onChangeText={text => setPassword(text)}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        text={'Cadastrar'}
                        onPress={async () => {
                            const user = await signUpEmailPassword(
                                email,
                                password,
                                name,
                                phone,
                            );
                            if (user != null) {
                                Alert.alert(
                                    '✅ Cadastro realizado com sucesso',
                                    'Verifique seu email para continuar.',
                                );
                                if (!verificationEmail())
                                    Alert.alert(
                                        '❌ Erro',
                                        'Não foi possível enviar o email. Por favor, tente novamente mais tarde.',
                                    );
                            }
                        }}
                        size="small"
                    />
                    <ButtonLoginGoogle
                        onPress={async () => {
                            try {
                                const user = await handleLoginGoogleAsync();

                                if (user != null) {
                                    Alert.alert(
                                        '✅ Login realizado com sucesso',
                                        'Redirecionando você pra a página inicial...',
                                    );
                                    navigation.navigate('Home');
                                }
                            } catch (error) {
                                console.log(error.message);
                                Alert.alert('❌ Error', error.message);
                            }
                        }}
                    />
                    <Text
                        onPress={() => navigation.navigate('Login')}
                        style={{
                            marginTop: 100,
                            color: '#0000FF',
                            textDecorationLine: 'underline',
                            fontSize: 12,
                        }}>
                        Já tem uma conta? Clique aqui
                    </Text>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black'
    },
});
