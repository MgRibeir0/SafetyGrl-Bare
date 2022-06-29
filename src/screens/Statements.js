import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Statements({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Statements</Text>
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