import { View, Text } from 'react-native'
import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import DetailsScreen from '../screens/DetailsScreen'
import Statements from '../screens/Statements';
import StatementCreate from '../screens/StatementCreate';

const Stack = createStackNavigator()

export default function StatementsStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="StatementsScreen" component={Statements} />
            <Stack.Screen name="StatementsCreate" component={StatementCreate} />
            <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        </Stack.Navigator>
    )
}