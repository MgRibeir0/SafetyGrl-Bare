import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Statements from '../screens/Statements';
import User from '../screens/User';
import Complaint from './../screens/Complaint';
import Settings from './../screens/Settings';
import Colors from "../constants/Colors";

const Tab = createBottomTabNavigator();

export default function TabBar() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                style: {
                    backgroundColor: Colors.lightGray,
                    borderTopColor: 'transparent'
                },
                activeTintColor: Colors.purple,
                tabStyle: {
                    paddingBottom: 5,
                    paddingTop: 5,
                }
            }}

        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Statements" component={Statements} />
            <Tab.Screen name="User" component={User} />
            <Tab.Screen name="Settings" component={Settings} />
            <Tab.Screen name="Complaint" component={Complaint} />
        </ Tab.Navigator>
    )
}