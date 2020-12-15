import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { AppTextHeader } from '../AppTextHeader';
const { width, height } = Dimensions.get('screen');
/**
 * 
 * @param  iconBackgroundColor: string 
 * @param  iconName: string 
 * @param  text: string 
 *   
 */



export class CircleImgItem extends Component<any>{
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={{ width: "50%" }}>
                <View style={styles.container}>
                    <Image style={{ height: height / 6, width: width / 2.8, resizeMode: "cover", borderRadius: 25 }} source={{ uri: this.props.imgUrl }} />
                    <View style={{ marginTop: 10, width: '90%' }}>
                        <AppTextHeader fontSize={18} textAlign={"center"}>{this.props.name.replace(' ', '\n')}</AppTextHeader>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flexWrap: "wrap",
        paddingHorizontal: Dimensions.get('screen').width / 20,
        paddingVertical: Dimensions.get('screen').height / 20,
        justifyContent: "space-around"
    }
});