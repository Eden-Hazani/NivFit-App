import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from '../utility/colors';
import { Home } from '../screens/Home';
import { ExercisesList } from '../screens/ExercisesList';
import { ViewExercise } from '../screens/ViewExercise';
import { IconGen } from '../utility/IconGen';
import { AppButton } from '../components/AppButton';
import { NavigationBackButton } from '../components/NavigationBackButton';
import { useNavigationState } from '@react-navigation/native';




const Stack = createStackNavigator();
const MainNavigator = ({ navigation }: any) => {
    const routesLength = useNavigationState(state => state.routes[0].state?.routes.length);
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
        <Stack.Screen options={{ title: "" }} name="Home" component={Home} />
        <Stack.Screen options={{ title: "" }} name="ExercisesList" component={ExercisesList} />
        <Stack.Screen options={{ title: "" }} name="ViewExercise" component={ViewExercise} />
    </Stack.Navigator>
}

export default MainNavigator;