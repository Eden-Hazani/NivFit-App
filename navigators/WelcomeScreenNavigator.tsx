import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from '../utility/colors';
import { Welcome } from '../screens/Welcome';



const Stack = createStackNavigator();
const WelcomeScreenNavigator = () => {
    return <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: Colors.primaryBackground }, headerStyle: { backgroundColor: Colors.primaryBackground, height: 45 }, headerTitleAlign: "center" }}>
        <Stack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome} />
    </Stack.Navigator>
}

export default WelcomeScreenNavigator;