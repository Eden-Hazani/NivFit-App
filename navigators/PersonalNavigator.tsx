import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from '../utility/colors';

import { IconGen } from '../utility/IconGen';
import { AppButton } from '../components/AppButton';
import { NavigationBackButton } from '../components/NavigationBackButton';
import { PersonalSpace } from '../screens/PersonalSpace';
import { PickTrainingPrograms } from '../screens/TrainingScreens/PickTrainingPrograms';
import { useNavigationState } from '@react-navigation/native';
import { ViewTrainingProgram } from '../screens/TrainingScreens/ViewTrainingProgram';
import { TrainingProgramRun } from '../screens/TrainingScreens/TrainingProgramRun';
import { ViewExercise } from '../screens/ViewExercise';
import { FavoriteItemList } from '../screens/FavoriteItemList';



const Stack = createStackNavigator();
const PersonalNavigator = ({ navigation }: any) => {
    const routesLength = useNavigationState(state => state.routes[1].state?.routes.length);
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
        <Stack.Screen options={{ title: "" }} name="PersonalSpace" component={PersonalSpace} />
        <Stack.Screen options={{ title: "" }} name="PickTrainingPrograms" component={PickTrainingPrograms} />
        <Stack.Screen options={{ title: "" }} name="ViewTrainingProgram" component={ViewTrainingProgram} />
        <Stack.Screen options={{ title: "" }} name="TrainingProgramRun" component={TrainingProgramRun} />
        <Stack.Screen options={{ title: "" }} name="FavoriteItemList" component={FavoriteItemList} />
        <Stack.Screen options={{ title: "" }} name="ViewExercise" component={ViewExercise} />

    </Stack.Navigator>
}

export default PersonalNavigator;