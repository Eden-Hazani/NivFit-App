import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from '../utility/colors';

import { IconGen } from '../utility/IconGen';
import { AppButton } from '../components/AppButton';
import { NavigationBackButton } from '../components/NavigationBackButton';
import { PersonalSpace } from '../screens/PersonalSpace';



const Stack = createStackNavigator();
const PersonalNavigator = ({ navigation }: any) => {
    let state = navigation.dangerouslyGetState();
    return <Stack.Navigator screenOptions={{
        headerTransparent: true, headerLeft: () => {
            console.log(navigation.canGoBack())
            if (navigation.canGoBack()) {
                return <NavigationBackButton onPress={() => navigation.goBack(null)} />
            } else {
                return null
            }
        },
        headerTintColor: Colors.black, cardStyle: { backgroundColor: Colors.primaryBackground }, headerStyle: { backgroundColor: Colors.primaryBackground, height: 45 }, headerTitleAlign: "center"
    }}>
        <Stack.Screen options={{ title: "" }} name="PersonalSpace" component={PersonalSpace} />
    </Stack.Navigator>
}

export default PersonalNavigator;