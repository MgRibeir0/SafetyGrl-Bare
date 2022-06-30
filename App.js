import React from "react";
import { StatusBar, BackHandler } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth'

import SignUp from "./src/screens/SignUp";
import Login from "./src/screens/Login";
import VerifyEmail from "./src/screens/VerifyEmail";
import SplashScreen from './src/screens/SplashScreen';
import TabBar from "./src/navigator/TabBar";
import Password from "./src/screens/Password";

BackHandler.addEventListener('hardwareBackPress', () => {
    return true;
})

const Stack = createNativeStackNavigator();

function App() {

    const [initializing, setInitializing] = React.useState(true);
    const [user, setUser] = React.useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    React.useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    if (!user) {
        return (
            <NavigationContainer>
                <StatusBar
                    backgroundColor={'transparent'}
                    translucent
                />
                <Stack.Navigator
                    initialRouteName="SplashScreen"
                    screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Splash" component={SplashScreen} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                    <Stack.Screen name="TabBar" component={TabBar} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Password" component={Password} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

    if (user?.emailVerified === true) {
        return (
            <NavigationContainer>
                <StatusBar
                    backgroundColor={'transparent'}
                    translucent
                />
                <Stack.Navigator
                    initialRouteName="SplashScreen"
                    screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Splash" component={SplashScreen} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="TabBar" component={TabBar} />
                    <Stack.Screen name="Password" component={Password} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    } else {

        return (
            <NavigationContainer>
                <StatusBar
                    backgroundColor={'transparent'}
                    translucent
                />
                <Stack.Navigator
                    initialRouteName="VerifyEmail"
                    screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default App;