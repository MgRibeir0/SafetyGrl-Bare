import React from 'react'
import { Text, View, TouchableOpacity, Dimensions } from 'react-native'


const width = Dimensions.get('window').width


const Button = ({ text, onPress, type = 'filled', bordered = false, size = 'large', colorBg = '#3f51b5', colorText = '#6371c2' }) => {
    const large = width / 1.3
    const small = width / 2
    const btnSize = size === 'large' ? large : size === 'small' ? small : size
    const btnBgColor = type === 'filled' ? colorBg : 'transparent'
    const btnTextColor = type === 'filled' ? '#ffffff' : colorText
    const btnBorderRadius = bordered ? 30 : 5

    const containerCommonStyle = {
        backgroundColor: btnBgColor,
        paddingVertical: 8,
        width: btnSize,
        borderRadius: btnBorderRadius,
        marginBottom: 10,
        height: 'auto'
    }

    const textCommonStyle = {
        color: btnTextColor,
        fontSize: 16,
        textTransform: 'uppercase',
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium'
    }

    const border = type === 'outlined' && { borderColor: '#e7e7e7', borderWidth: 2 }

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            <View style={[containerCommonStyle, border]}>
                <Text style={[textCommonStyle]}> {text} </Text>
            </View>
        </TouchableOpacity>
    )
}

export default Button