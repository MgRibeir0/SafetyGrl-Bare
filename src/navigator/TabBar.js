import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Statements from '../screens/Statements';
import User from '../screens/User';
import Complaint from './../screens/Complaint';
import Settings from './../screens/Settings';
import Colors from "../constants/Colors";

import Icon from 'react-native-vector-icons/Ionicons'
import ButtonNew from "../components/ButtonNew";

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
                },
            }}

        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ size, color, focused }) => (<Icon name={focused ? 'ios-home' : 'ios-home-outline'} size={size} color={color} />)
                }}
            />

            <Tab.Screen
                name="Statements"
                component={Statements}
                options={{
                    tabBarIcon: ({ size, color, focused }) => (<Icon name={focused ? 'ios-chatbox-ellipses' : 'ios-chatbox-ellipses-outline'} size={size} color={color} />)
                }}
            />

            <Tab.Screen
                name="Complaint"
                component={Complaint}
                options={{
                    tabBarIcon: ({ size, focused }) => (<ButtonNew size={size} focused={focused} />)
                }}
            />
            <Tab.Screen
                name="User"
                component={User}
                options={{
                    tabBarIcon: ({ size, color, focused }) => (<Icon name={focused ? 'ios-person-circle' : 'ios-person-circle-outline'} size={size} color={color} />)
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarIcon: ({ size, color, focused }) => (<Icon name={focused ? 'ios-settings' : 'ios-settings-outline'} size={size} color={color} />)
                }}
            />
        </Tab.Navigator>
    );
}
