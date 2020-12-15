import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from '../utility/colors';
import { Home } from '../screens/Home';
import { ExercisesList } from '../screens/ExercisesList';
import { ViewExercise } from '../screens/ViewExercise';



const Stack = createStackNavigator();
const MainNavigator = () => {
    return <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: Colors.primaryBackground }, headerStyle: { backgroundColor: Colors.primaryBackground, height: 45 }, headerTitleAlign: "center" }}>
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Stack.Screen options={{ headerShown: false }} name="ExercisesList" component={ExercisesList} />
        <Stack.Screen options={{ headerShown: false }} name="ViewExercise" component={ViewExercise} />
    </Stack.Navigator>
}

export default MainNavigator;