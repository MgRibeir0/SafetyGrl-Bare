import { TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'

const ButtonLoginGoogle = ({ onPress, styleProps }) => {
    return (
        <TouchableOpacity
            style={[style.btn_body, styleProps]}
            onPress={onPress}
        >
            <Image
                source={require('../assets/btn_google_login_light.png')}
            />
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    btn_body: {
        marginBottom: 10,
    }
});

export default ButtonLoginGoogle