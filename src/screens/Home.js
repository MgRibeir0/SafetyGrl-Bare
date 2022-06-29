import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Button from '../components/Button'
import auth from '@react-native-firebase/auth'
import * as Animatable from 'react-native-animatable'

export default function Home({ navigation }) {

    const [firstRun, setFirstRun] = React.useState(false);

    React.useEffect(() => {
        if (firstRun === false)
            setFirstRun(true);
    }, [])


    return (

        <Animatable.View style={styles.container} animation={firstRun ? 'fadeInUp' : 'fadeInRight'}>
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