import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../utility/colors';

export class ListItemSeparator extends Component<any> {
    render() {
        return (
            <View style={[styles.container, { backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : Colors.inactiveTint }]}>
                <View style={[styles.separator, { backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : Colors.inactiveTint }]} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginTop: 10
    },
    separator: {
        width: '70%',
        height: 1,
    }
})
