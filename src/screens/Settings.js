import { View, Text, Animated, StyleSheet } from 'react-native'
import React from 'react'

export default function Settings() {
    return (
        <View>
            <Animated.View style={styles.test}>
                <Text>Settings</Text>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({

    test: {
        flex: 1,
    }

});