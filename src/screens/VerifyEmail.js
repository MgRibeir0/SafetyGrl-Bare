import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Button from '../components/Button'

import auth from '@react-native-firebase/auth'
import { verificationEmail } from '../database/auth'

export default function VerifyEmail() {
    return (
        <View style={styles.container}>
            <Text>Verifique seu email para poder acessar.</Text>
            <Text>Não recebeu o e-mail? <Text style={{ color: '#0000FF' }} onPress={async () => { await verificationEmail() }}>Clique aqui!</Text></Text>
            <Button onPress={() => {
                auth().signOut();
            }}
                text={'Sair'}
                size={'small'}
            />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})