import { LinearGradient } from 'expo-linear-gradient';
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Dimensions, ImageBackground, Animated } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { AppTextHeader } from '../AppTextHeader';
const { width, height } = Dimensions.get('screen');






export class HomeList extends Component<any>{

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} activeOpacity={.95}>
                <View>
                    <ImageBackground style={{
                        left: 0,
                        bottom: this.props.bottom,
                        transform: [{ rotate: `${this.props.rotate}` }],
                        width: width + 50,
                        height: 280,
                        justifyContent: 'center', alignSelf: 'center',
                        borderBottomColor: '#fff',
                        borderBottomWidth: 10,
                        borderTopColor: '#fff',
                        borderTopWidth: 10,
                    }} source={{ uri: this.props.imgUrl }} >
                        <LinearGradient colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0)']} start={[0, .5]} end={[.6, .2]}
                            style={{
                                position: 'absolute', width: width + 50, height: height / 2, top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'
                                , padding: 5, paddingRight: 200, borderRadius: 15
                            }}>
                        </LinearGradient>
                        <View style={{
                            position: 'absolute', top: 0, left: 30, right: 0, bottom: 0,
                            justifyContent: "center", alignItems: "baseline", zIndex: 10, transform: [{ rotate: this.props.index % 2 === 0 ? '5.5deg' : '-5.5deg' }]
                        }}>
                            <AppTextHeader textAlign={this.props.headTextAlign} fontSize={30} color={Colors.black}>{this.props.name}</AppTextHeader>
                        </View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },


});