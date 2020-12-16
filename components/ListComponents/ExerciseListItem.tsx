import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { Colors } from '../../utility/colors';
import { AppText } from '../AppText';
import { AppTextHeader } from '../AppTextHeader';
import { LinearGradient } from 'expo-linear-gradient';
const { width, height } = Dimensions.get('screen');


export class ExerciseListItem extends Component<any>{
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.onPress} >
                    <View style={{
                        justifyContent: this.props.justifyContent, alignItems: this.props.alignListItem ? this.props.alignListItem : 'center',
                        flexDirection: this.props.direction
                    }}>
                        <LinearGradient colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0)']} start={[0, 1]} end={[.6, 0]} style={{ zIndex: 10, position: 'absolute', left: 10, padding: 15, paddingRight: 200, borderRadius: 15 }}>
                            <AppTextHeader textAlign={this.props.headTextAlign} fontSize={20} color={Colors.black}>{this.props.name}</AppTextHeader>
                            <AppText textAlign={this.props.subTextAlign} fontSize={17} color={Colors.black}>{this.props.shortDescription}</AppText>
                        </LinearGradient>
                        <Image style={{
                            zIndex: -10,
                            height: height / 6, width: width, resizeMode: "cover"
                        }} uri={this.props.frontImg} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: 5
    }
});