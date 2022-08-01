import React from 'react'
import { View, Text, StyleSheet, TextInput, Platform, StatusBar, Button, Alert, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Select from '@redmin_delishaj/react-native-select';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Colors from '../constants/Colors';
import uuid from 'react-native-uuid';
import { getDatabase } from './../database/realtime';

export default function Complaint() {

    const navigation = useNavigation();

    const [date, setDate] = React.useState(new Date());
    const [local, setLocal] = React.useState(null);
    const [details, setDetails] = React.useState(null);



    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const [selected, setSelected] = React.useState(null);
    const data = [
        { text: 'Assédio', value: 'assedio' },
        { text: 'Discriminação', value: 'discriminacao' },
        { text: 'Estupro', value: 'estupro' },
    ]


    return (
        <KeyboardAvoidingView behavior='padding' style={[styles.AndroidSafeArea, styles.container]}>
            <Text style={styles.textTitle}>Realizar Denúncia</Text>
            <Select
                textBoxStyle={styles.selectMenu}
                dropdownStyle={{ borderRadius: 10, borderWidth: 2, borderColor: '#000' }}
                data={data}
                onSelect={value => setSelected(value)}
                selected={selected}
                searchPlaceholder="Selecione um crime"
                placeholder='Selecione um crime'
            />
            <View style={{ marginTop: 15 }}>
                <Button title="Selecione o horario" onPress={showTimepicker} />
                <Text style={{ marginTop: 5, fontSize: 14 }} >Horário Aproximado: {date ? `${date?.getHours()}:${date?.getMinutes()}` : ''}</Text>
            </View>
            <View style={{ marginTop: 15 }}>
                <Button title="Selecione a data" onPress={showDatepicker} />
                <Text style={{ marginTop: 5, fontSize: 14 }}>Data do ocorrido: {date ? `${date?.getDay()}/${date?.getMonth()}/${date?.getFullYear()}` : ''}</Text>
            </View>
            <View style={{ marginTop: 15, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Local do ocorrido:</Text>
                <TextInput style={styles.textInput} onChangeText={(text) => setLocal(text)} />
            </View>
            <View style={{ marginTop: 15, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Detalhes do ocorrido</Text>
                <TextInput style={[styles.textInput, { height: 'auto' }]} multiline onChangeText={(text) => setDetails(text)} />
            </View>
            <View style={styles.buttonConfirm}>
                <Button title='Confirmar Denúncia' onPress={() => {
                    if (selected && date && local && details) {
                        createComplaint(selected, date, local, details, uuid.v4())
                        Alert.alert('Denúncia enviada com sucesso!')
                        navigation.goBack()
                        return
                    }
                    Alert.alert('Preencha todos os campos!')

                }} />
            </View>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    AndroidSafeArea: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 5 : 0,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.bag1Bg,
    },
    textTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 100,
    },
    selectMenu: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.black,
    },
    textInput: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.black,
        width: 300,
        height: 35,
        marginBottom: 10,
    },
    buttonConfirm: {
        marginTop: 70,
    }
})

const createComplaint = (selected, date, local, details, uuid) => {

    const db = getDatabase();

    db.ref('/complaints/' + uuid).set({
        crime: selected,
        date: date,
        local: local,
        details: details,
        uuid: uuid,
    });

}