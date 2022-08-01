import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Colors from '../constants/Colors';

import { useRoute } from '@react-navigation/native';

export default function DetailsScreen() {
    const route = useRoute();

    const author = route.params[0];
    const text = route.params[1];

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.author}>{author}</Text>
                <ScrollView>
                    <Text style={styles.text}>{text}</Text>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: Colors.bag1Bg,
    },
    content: {
        marginTop: '12%',
        marginBottom: '22%',
        padding: '5%',
    },
    author: {
        backgroundColor: Colors.white,
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.black,
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        backgroundColor: Colors.white,
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.black,
        fontSize: 22
    }
})