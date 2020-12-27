import React, { Component } from 'react';
import LottieView from 'lottie-react-native';

export class ConfirmedAnimation extends Component<{ visible: boolean }>{

    render() {
        if (!this.props.visible) return null;
        return <LottieView style={{
            zIndex: 1,
            width: 150,
            marginTop: "5%",
            alignSelf: 'center',
        }} resizeMode="cover" autoPlay loop={false} source={require('../jsonDump/lottieAnimation/confirmed.json')} />
    }
}