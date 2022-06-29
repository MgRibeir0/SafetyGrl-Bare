import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Button from '../components/Button'
import auth from '@react-native-firebase/auth'
import * as Animatable from 'react-native-animatable'
import { useIsFocused } from '@react-navigation/native'

export default function Home({ navigation }) {

    const [firstRun, setFirstRun] = React.useState(true)
    const animView = React.useRef(null)

    navigation.addListener('blur', () => {
        setFirstRun(false)
    })

    navigation.addListener('focus', () => {
        if (!firstRun)
            animView.current.fadeInRight(500);
        if (firstRun)
            animView.current.fadeInUp(500)
    })

    return (
        <Animatable.View style={styles.container} ref={animView}>

            <Text>Home</Text>
            <Button onPress={() => {
                auth().signOut();
                navigation.replace('Login');
            }}
                text={'Sair'}
                size={'small'}
            />
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})