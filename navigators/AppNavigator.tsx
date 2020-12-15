import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconGen } from '../utility/IconGen';
import { Colors } from '../utility/colors';
import MainNavigator from './MainNavigator'


const Tab = createBottomTabNavigator();
const AppNavigator = () => {
    return <Tab.Navigator tabBarOptions={{
        activeBackgroundColor: Colors.skyBlue,
        activeTintColor: Colors.black,
        inactiveBackgroundColor: Colors.black,
        inactiveTintColor: Colors.inactiveTint,
        style: { borderTopWidth: 0 }
    }}>
        <Tab.Screen options={{ tabBarIcon: ({ color }) => <IconGen size={50} name={"home"} iconColor={color} /> }} name="Home" component={MainNavigator} />
    </Tab.Navigator>
}

export default AppNavigator