import React, { Component } from 'react';
import { View, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface FavoriteButtonState {
    animatedValue: Animated.Value
}

export class FavoriteButton extends Component<any, FavoriteButtonState>{
    constructor(props: any) {
        super(props)
        this.state = {
            animatedValue: new Animated.Value(0)
        }
    }

    handleAnimation = () => {
        Animated.timing(this.state.animatedValue, {
            toValue: 1,
            duration: 100,
            useNativeDriver: false,
            easing: Easing.ease
        }).start(() => {
            Animated.timing(this.state.animatedValue, {
                toValue: 0,
                duration: 100,
                useNativeDriver: false,
                easing: Easing.ease
            }).start()
        })
    }
    componentDidUpdate() {
        if (this.props.clicked) {
            this.handleAnimation()
        }
    }

    render() {
        return (
            <Animated.View style={[styles.container, {
                width: this.props.size,
                height: this.props.size,
                borderRadius: this.props.size / 2,
                backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : null,
                justifyContent: "center",
                alignItems: "center",
                transform: [
                    {
                        scaleX: this.state.animatedValue.interpolate({
                            inputRange: [0, 1, 1],
                            outputRange: [1, 1.5, .2]
                        })
                    },
                    {
                        scaleY: this.state.animatedValue.interpolate({
                            inputRange: [0, 1, 1],
                            outputRange: [1, 1.5, .2]
                        })
                    }
                ]
            }]}>
                <MaterialCommunityIcons name={this.props.name} color={this.props.iconColor} size={this.props.size * 0.5} />
            </Animated.View>
        )
    }
}


const styles = StyleSheet.create({
    container: {

    }
});