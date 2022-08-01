import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet, Platform, StatusBar, RefreshControl } from 'react-native'
import { getDatabase } from './../database/realtime';
import Colors from '../constants/Colors';
import Button from './../components/Button';

const db = getDatabase();

export default function Statements() {

    const navigation = useNavigation();

    const [data, setData] = React.useState([]);
    const dataArr = []

    async function getData() {
        console.log('Getting data')
        const snapshot = await db.ref('statements').once('value');
        const data = snapshot;
        setData(data);
        console.log('Data updated')
    }

    React.useEffect(() => {
        getData();
    }, [refreshing])

    const wait = (timeout) => {
        return new Promise((resolve) => setTimeout(resolve, timeout));
    };

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => {
            getData();
            setRefreshing(false)
        });
    })

    data.forEach((item => {
        dataArr.push(item.val())
    }))

    const Item = ({ text, author }) => (
        <View>
            <Text style={styles.itemTitle}>{author}</Text>
            <Text style={styles.itemText}>{text}</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.buttonFlatlist}
            onPress={() => {
                let arr = []
                arr.push(item.author, item.text)
                navigation.navigate('DetailsScreen', arr)
            }}>
            <Item text={item.text} author={item.author} />
        </TouchableOpacity>
    );

    return (
        <View style={[styles.AndroidSafeArea, styles.container]}>
            <View style={styles.containerFlatlist}>
                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    numColumns={2}
                    style={styles.flatList}
                    data={dataArr}
                    renderItem={renderItem}
                    keyExtractor={item => item.key}
                    ListEmptyComponent={() => <Text style={styles.emptyText}>Ainda não há nenhum depoimento, seja a primeira!</Text>}
                />
                <Button
                    text="Realizar depoimento"
                    onPress={() => navigation.navigate('StatementsCreate')}
                    colorBg={Colors.primary}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    AndroidSafeArea: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 5 : 0,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.bag1Bg,
    },
    containerFlatlist: {
        marginTop: '10%',
        height: '90%',
        width: '100%',
        paddingLeft: '7%',
        paddingRight: '5%',
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    flatList: {
        marginBottom: 15,
    },
    buttonFlatlist: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.black,
        marginRight: 15,
        marginBottom: 15,
        width: '45%',
        height: 150,
        overflow: 'hidden',
        padding: 8,
        paddingBottom: 65,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemText: {
        fontSize: 16,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.black,
        textAlign: 'center',
    }
})