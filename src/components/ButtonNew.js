import React from "react";

import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import Colors from "../constants/Colors";

export default function ButtonNew({ size, focused }) {
    return (
        <View style={[styles.container, { backgroundColor: focused ? Colors.purple : Colors.lightPurple }]}>
            <Icon name='ios-add' size={size} color={focused ? Colors.white : Colors.gray} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    }
})