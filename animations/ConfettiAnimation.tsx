import React, { Component } from 'react';
import LottieView from 'lottie-react-native';

export class ConfettiAnimation extends Component<{ visible: boolean }>{

    render() {
        if (!this.props.visible) return null;
        return <LottieView style={{
            zIndex: 1,
            width: 250,
            marginTop: "5%",
            alignSelf: 'center',
        }} resizeMode="cover" autoPlay loop={true} source={require('./lottieAnimation/confeetiAnimation.json')} />
    }
}