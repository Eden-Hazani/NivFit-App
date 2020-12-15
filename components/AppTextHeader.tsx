import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Colors } from '../utility/colors';

/**
 * 
 * @param  color: #string 
 * @param  padding: number or string% 
 * @param  textAlign: string
 * @param  fontSize: number
 * @param  numberOfLines: string
 *   
 */



export class AppTextHeader extends Component<any, any> {
    constructor(props: any) {
        super(props)
    }


    render() {
        return (
            <Text numberOfLines={this.props.numberOfLines} style={{
                fontWeight: this.props.fontWeight,
                width: this.props.width,
                flex: this.props.flex,
                fontSize: this.props.fontSize,
                padding: this.props.padding,
                textAlign: this.props.textAlign,
                fontFamily: "Raleway-ExtraBold",
                color: this.props.color ? this.props.color : Colors.black
            }}>{this.props.children}</Text>
        )
    }
}




