import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../utility/colors';
import { IconGen } from '../utility/IconGen';

export class NavigationBackButton extends Component<any> {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.onPress}>
                    <IconGen name={"chevron-right"} backgroundColor={Colors.skyBlue} size={50} />
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        top: 5
    }
});