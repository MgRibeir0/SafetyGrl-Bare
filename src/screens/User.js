import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function User() {

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>🚧🚧 Under Construction 🚧🚧</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow'
    },
})