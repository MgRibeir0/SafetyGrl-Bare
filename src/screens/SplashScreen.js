import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';
import Colors from '../constants/Colors'

export default function SplashScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Animatable.Image
                    animation='flipInY'
                    source={require('../assets/logo.png')}
                    style={{ width: '100%' }}
                    resizeMode="contain"
                />
            </View>

            <Animatable.View
                delay={600}
                animation='fadeInUp'
                style={styles.containerForm}
            >

                <Text style={styles.title}>Veja zonas de risco, denuncias e depoimentos em tempo real!</Text>
                <Text style={styles.text}>Faça o login para começar</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </Animatable.View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightPink,
    },
    containerLogo: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lightPink,
    },
    containerForm: {
        flex: 1,
        backgroundColor: Colors.white,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 12,
    },
    text: {
        color: Colors.lightGray,
    },
    button: {
        position: 'absolute',
        backgroundColor: Colors.lightPink,
        borderRadius: 50,
        paddingVertical: 8,
        width: '60%',
        alignSelf: 'center',
        bottom: '15%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: Colors.white,
        fontWeight: 'bold',
    }
})