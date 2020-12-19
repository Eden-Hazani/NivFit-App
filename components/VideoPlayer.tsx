import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import WebView from 'react-native-webview';
import { LoadingAnimation } from '../animations/LoadingAnimation';
import { Colors } from '../utility/colors';
import { AppTextHeader } from './AppTextHeader';
const { width, height } = Dimensions.get('screen');

interface VideoPlayerState {
    videoHasNotLoaded: boolean
    videoHasRendered: boolean
}

export class VideoPlayer extends Component<{ videoUrl: string }, VideoPlayerState> {
    constructor(props: any) {
        super(props)
        this.state = {
            videoHasNotLoaded: true,
            videoHasRendered: false
        }
    }

    videoLoading = () => {
        this.setState({ videoHasNotLoaded: false }, () => {
            setTimeout(() => {
                this.setState({ videoHasRendered: true })
            }, 500);
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View pointerEvents="none" style={{ borderColor: Colors.inactiveTint, borderWidth: 20, zIndex: 10, height: height / 3.8, width: width, borderRadius: 50, bottom: 5 }}>
                </View>
                <View style={{ height: height / 4.5, width: width / 1.08, overflow: 'hidden', position: 'absolute', top: 10, left: width / 27, right: 0, bottom: 0, justifyContent: 'center' }}>
                    {(this.state.videoHasNotLoaded || !this.state.videoHasRendered) && (
                        <View>
                            <View style={{ top: 30 }}>
                                <AppTextHeader textAlign={'center'} color={Colors.skyBlue}>Video Loading</AppTextHeader>
                            </View>
                            <LoadingAnimation visible={this.state.videoHasNotLoaded || !this.state.videoHasRendered} />
                        </View>
                    )}
                    <WebView
                        style={{ opacity: this.state.videoHasRendered ? 1 : 0, zIndex: -10 }}
                        onLoad={() => { this.videoLoading() }}
                        javaScriptEnabled
                        domStorageEnabled={true}
                        mediaPlaybackRequiresUserAction={true}
                        source={{ uri: this.props.videoUrl }}
                        scalesPageToFit={true}
                    />
                </View>
            </View >
        )
    }
}


const styles = StyleSheet.create({
    container: {

    }
});