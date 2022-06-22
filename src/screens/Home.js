import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Button from '../components/Button'
import auth from '@react-native-firebase/auth'

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <Button onPress={() => {
                auth().signOut();
                navigation.replace('Login');
            }}
                text={'Sair'}
                size={'small'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})