import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, } from 'react-native';
import { AnimatedLogoEntrance } from '../animations/AnimatedLogoEntrance';
import { AppButton } from '../components/AppButton';
import { AppText } from '../components/AppText';
import { AppTextHeader } from '../components/AppTextHeader';
import { Colors } from '../utility/colors';
import MainContext from '../utility/context';


export class Welcome extends Component {

    render() {
        return (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={{ padding: 20 }}>
                    <AppTextHeader textAlign={'center'} fontSize={30}>NivFit</AppTextHeader>
                    <AppText textAlign={'center'} fontSize={20}>Welcome to NivFit</AppText>
                    <AppText textAlign={'center'} fontSize={20}>The focus of this app is to give everyone free and informative instructions and tips on how to workout correctly.</AppText>
                    <AppText textAlign={'center'} fontSize={20}>NivFit can help you improve your results in the gym or at home by showing you the correct way to work your muscle groups.</AppText>
                </View>
                <View>
                    <AppTextHeader textAlign={'center'} fontSize={20}>Ready?</AppTextHeader>
                    <View style={{ paddingTop: 20 }}>
                        <AnimatedLogoEntrance />
                    </View>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({

});