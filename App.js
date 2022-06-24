import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth'

import Home from "./src/screens/Home";
import SignUp from "./src/screens/SignUp";
import Login from "./src/screens/Login";
import VerifyEmail from "./src/screens/VerifyEmail";

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
                    initialRouteName="Login"
                    screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                    <Stack.Screen name="Login" component={Login} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

    if (user?.emailVerified === true)
        return (
            <NavigationContainer>
                <StatusBar
                    backgroundColor={'transparent'}
                    translucent
                />
                <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                    <Stack.Screen name="Login" component={Login} />
                </Stack.Navigator>
            </NavigationContainer>
        )

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

export default App;