import { View, Text, StyleSheet, TextInput, StatusBar, Platform, Alert } from 'react-native'
import React from 'react'
import { getDatabase } from './../database/realtime';
import Button from '../components/Button';
import uuid from 'react-native-uuid';
import { Checkbox } from 'react-native-paper';
import Colors from '../constants/Colors';
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native';

const db = getDatabase();

export default function Statements() {

    const navigation = useNavigation();

    const [testText, setTestText] = React.useState('')
    const [toggleCheckBox, setToggleCheckBox] = React.useState(false)

    return (

        <View style={styles.container}>
            <View style={styles.fieldContainers}>
                <Text style={styles.textTitle}>Realizar um depoimento!</Text>
                <TextInput
                    multiline
                    style={styles.textInput}
                    onChangeText={(text) => { setTestText(text) }}
                    placeholder="Insira um texto de exemplo"
                />
                <View style={{
                    position: 'absolute',
                    bottom: 20,
                }}>
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            status={toggleCheckBox ? "checked" : "unchecked"}
                            onPress={() => setToggleCheckBox(!toggleCheckBox)}
                            color={'black'}
                        />
                        <Text>Depoimento anonimo?</Text>
                    </View>
                    <Button text={'Test'} bordered onPress={() => {
                        createStatement(testText, toggleCheckBox)
                        Alert.alert('Depoimento enviado com sucesso!')
                        navigation.goBack();
                    }} />
                </View>
            </View>
        </View>
    )
}

const createStatement = (text, anom) => {

    const uniqueID = uuid.v4();
    db.ref('statements/' + uniqueID).set({
        key: uniqueID,
        text: text,
        author: anom ? 'Anonimo' : auth().currentUser.displayName,
    })
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingBottom: 35,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 5 : 0,
        backgroundColor: Colors.bag1Bg
    },
    fieldContainers: {
        height: '100%',
        marginRight: '8%',
        marginLeft: '8%',
        backgroundColor: Colors.lightPink,
        alignItems: 'center',
        borderRadius: 10,
        borderColor: Colors.lightRed,
        borderWidth: 2,
    },
    textTitle: {
        marginTop: 50,
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.black,
        marginBottom: 10,
    },
    textInput: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        width: '80%',
        height: 'auto',
        textAlignVertical: 'top',
        marginTop: 70,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
})