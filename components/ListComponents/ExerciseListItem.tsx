import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { Colors } from '../../utility/colors';
import { AppText } from '../AppText';
import { AppTextHeader } from '../AppTextHeader';
import { LinearGradient } from 'expo-linear-gradient';
import { IconGen } from '../../utility/IconGen';
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
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <AppTextHeader textAlign={this.props.headTextAlign} fontSize={20} color={Colors.black}>{this.props.mainList[0].name}</AppTextHeader>
                                </View>
                                {this.props.isFavorite &&
                                    <View style={{ left: Math.ceil(width / 1.3), position: 'absolute', bottom: 0, top: 0, right: 0, alignItems: 'center', justifyContent: "center" }}>
                                        <IconGen backgroundColor={'white'} name={'heart'} size={50} iconColor={Colors.skyBlue} />
                                    </View>
                                }
                            </View>
                        </LinearGradient>
                        <Image style={{
                            borderRadius: this.props.borderRadius ? this.props.borderRadius : 0,
                            zIndex: -10,
                            height: height / 4.5, width: this.props.width ? this.props.width : width, resizeMode: "cover"
                        }} uri={this.props.frontImg} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5
    }
});