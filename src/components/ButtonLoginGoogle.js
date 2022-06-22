import { TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'

const ButtonLoginGoogle = ({ onPress }) => {
    return (
        <TouchableOpacity
            style={style.btn_body}
            onPress={onPress}
        >
            <Image source={require('../assets/btn_google_login_light.png')} />
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    btn_body: {
        flex: 1,
        marginBottom: 10,
    }
});

export default ButtonLoginGoogle