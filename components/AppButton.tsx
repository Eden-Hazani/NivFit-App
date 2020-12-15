import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Colors } from '../utility/colors';
import { AppText } from './AppText';


/**
 * 
 * @param  title: string 
 * @param  onPress: function 
 *   
 */

export class AppButton extends Component<any>{
    render() {
        return (
            <TouchableOpacity disabled={this.props.disabled} activeOpacity={.8} style={[styles.container, { padding: this.props.padding ? this.props.padding : 0 }]} onPress={this.props.onPress}>
                <View style=
                    {[styles.button,
                    {
                        marginBottom: this.props.marginBottom,
                        backgroundColor: this.props.disabled ? Colors.inactiveTint : this.props.backgroundColor, width: this.props.width, height: this.props.height,
                        borderRadius: this.props.borderRadius, display: this.props.display
                    }]}>
                    <AppText color={this.props.color} fontSize={this.props.fontSize}
                        textAlign={"center"}>{this.props.title ? this.props.title.replace(" ", '\n') : " "}</AppText>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        elevation: 10,
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: 100,
        borderRadius: 25,
    },
    disabled: {
    }
})