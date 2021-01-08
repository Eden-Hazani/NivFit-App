import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from '../utility/colors';
import { Home } from '../screens/Home';
import { IconGen } from '../utility/IconGen';
import { NavigationBackButton } from '../components/NavigationBackButton';
import { useNavigationState } from '@react-navigation/native';
import { AboutScreen } from '../screens/AboutUsTab/AboutScreen';




const Stack = createStackNavigator();
const AboutNavigator = ({ navigation }: any) => {
    const routesLength = useNavigationState(state => state.routes[2].state?.routes.length);
    return <Stack.Navigator screenOptions={{
        headerTransparent: true, headerLeft: () => {
            if (routesLength && routesLength > 1) {
                return <NavigationBackButton onPress={() => navigation.goBack(null)} />
            }
            else {
                return null
            }
        },
        headerTintColor: Colors.black, cardStyle: { backgroundColor: Colors.primaryBackground }, headerStyle: { backgroundColor: Colors.primaryBackground, height: 45 }, headerTitleAlign: "center"
    }}>
        <Stack.Screen options={{ title: "" }} name="AboutScreen" component={AboutScreen} />

    </Stack.Navigator>
}

export default AboutNavigator;