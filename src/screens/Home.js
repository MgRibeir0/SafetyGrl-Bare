import { View, Text, StyleSheet, Dimensions, PermissionsAndroid, Platform } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth'
import Colors from '../constants/Colors'
import * as Animatable from 'react-native-animatable'
import MapView from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'

import Header from '../components/Header'

export default function Home({ navigation }) {
    const user = auth().currentUser;
    const [region, setRegion] = React.useState(null);

    function getMyLocation() {
        Geolocation.getCurrentPosition(info => {
            setRegion({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            })
        }, error => { console.log(error) }, {
            enableHighAccuracy: true,
            timeout: 2000,
        })
    }

    React.useEffect(() => {
        getMyLocation();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.containerBar}>
                <Header />
                <View style={styles.displayBar}>
                    <Text style={styles.displayBarText}>Olá {user.displayName}</Text>
                </View>
            </View>

            <View style={styles.containerBody}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.riskText}>Áreas de Risco</Text>
                </View>
                <View style={styles.containerRisk}>
                    <MapView
                        onMapReady={() => {
                            Platform.OS === 'android' ?
                                PermissionsAndroid.request(
                                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(() => {
                                        console.log('Permission granted')
                                    }
                                    ) :
                                ''
                        }}
                        style={styles.contentMap}
                        region={region}
                        showsUserLocation={true}
                        loadingEnabled={true}
                        minZoomLevel={15}
                    ></MapView>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bag1Bg,
    },
    containerBar: {
        flex: 1,
        backgroundColor: Colors.bag1Bg,
    },
    contentMap: {
        flex: 1,
        width: Dimensions.get('window').width / 1.5,
        borderRadius: 4,
        borderWidth: 1,
        overflow: "hidden",
    },
    content: {
        flexDirection: "row",
        backgroundColor: Colors.lightPink,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: Colors.lightRed,
        marginLeft: "8%",
        marginRight: "8%",
        alignItems: "center",
        justifyContent: "space-between",
    },
    containerRisk:
    {
        flex: 1,
        marginTop: "20%",
        alignSelf: "center",
        marginBottom: '10%',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "black",
        overflow: "hidden",
    },
    displayBar: {
        height: "13%",
        flexDirection: "row",
        backgroundColor: Colors.lightPink,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: Colors.lightRed,
        marginLeft: "8%",
        marginRight: "8%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "30%",
    },
    containerBody: {
        backgroundColor: Colors.lightPink,
        flex: 1.5,
        borderRadius: 8,
        paddingTop: "5%",
        marginLeft: "8%",
        marginRight: "8%",
        marginBottom: "15%",
        borderWidth: 2,
        borderColor: Colors.lightRed,
    },
    titulos: {
        fontSize: 22,
        fontWeight: "bold",
        alignSelf: "center",
        top: "5%",
    },
    displayBarText: {
        fontSize: 14,
        fontWeight: "bold",
    },
    riskText: {
        fontSize: 18,
        fontWeight: "bold",
    }
});