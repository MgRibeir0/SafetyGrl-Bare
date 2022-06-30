import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

export default function Header() {
    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Image style={styles.logo} source={require('../assets/logo.png')} />
                <Image style={styles.nameLogo} source={require('../assets/header.png')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "15%",
        zIndex: -2,
        marginBottom: 10
    },
    containerLogo: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 300,
        paddingTop: 100,
        position: 'absolute'
    },
    logo: {
        width: 80,
        height: 70,

    },
    nameLogo: {
        width: 170,
        height: 40,

    },
});
