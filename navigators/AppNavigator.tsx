import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconGen } from '../utility/IconGen';
import { Colors } from '../utility/colors';
import MainNavigator from './MainNavigator'
import PersonalNavigator from './PersonalNavigator';


const Tab = createBottomTabNavigator();
const AppNavigator = () => {
    return <Tab.Navigator backBehavior="none" tabBarOptions={{
        activeBackgroundColor: Colors.skyBlue,
        activeTintColor: Colors.black,
        inactiveBackgroundColor: Colors.black,
        inactiveTintColor: Colors.inactiveTint,
        style: { borderTopWidth: 0 }
    }}>
        <Tab.Screen options={{ tabBarIcon: ({ color }) => <IconGen size={50} name={"weight"} iconColor={color} /> }} name="Home" component={MainNavigator} />
        <Tab.Screen options={{ tabBarIcon: ({ color }) => <IconGen size={50} name={"weight-lifter"} iconColor={color} /> }} name="Personal" component={PersonalNavigator} />
    </Tab.Navigator>
}

export default AppNavigator