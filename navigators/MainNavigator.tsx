import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from '../utility/colors';
import { Home } from '../screens/Home';
import { ExercisesList } from '../screens/ExercisesList';
import { ViewExercise } from '../screens/ViewExercise';
import { IconGen } from '../utility/IconGen';
import { AppButton } from '../components/AppButton';
import { NavigationBackButton } from '../components/NavigationBackButton';



const Stack = createStackNavigator();
const MainNavigator = ({ navigation }: any) => {
    let state = navigation.dangerouslyGetState();
    console.log(state.routes[0].state)
    return <Stack.Navigator screenOptions={{
        headerTransparent: true, headerLeft: () => {
            if ((state.routes.length === 1 && !state.routes[0].state) || state.routes[0].state.index === 0) {
                return null
            }
            return <NavigationBackButton onPress={() => navigation.goBack(null)} />
        },
        headerTintColor: Colors.black, cardStyle: { backgroundColor: Colors.primaryBackground }, headerStyle: { backgroundColor: Colors.primaryBackground, height: 45 }, headerTitleAlign: "center"
    }}>
        <Stack.Screen options={{ title: "" }} name="Home" component={Home} />
        <Stack.Screen options={{ title: "" }} name="ExercisesList" component={ExercisesList} />
        <Stack.Screen options={{ title: "" }} name="ViewExercise" component={ViewExercise} />
    </Stack.Navigator>
}

export default MainNavigator;