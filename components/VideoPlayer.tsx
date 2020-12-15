import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import WebView from 'react-native-webview';
import { LoadingAnimation } from '../animations/LoadingAnimation';
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
                <View style={{ height: height / 4, width: width / 1.05, overflow: 'hidden', position: 'absolute', top: 0, left: width / 40, right: 0, bottom: 0, justifyContent: 'center' }}>
                    {(this.state.videoHasNotLoaded || !this.state.videoHasRendered) && (
                        <LoadingAnimation visible={this.state.videoHasNotLoaded || !this.state.videoHasRendered} />
                    )}
                    <WebView
                        style={{ opacity: this.state.videoHasRendered ? 1 : 0 }}
                        onLoad={() => { this.videoLoading() }}
                        javaScriptEnabled
                        source={{ uri: this.props.videoUrl }}
                        scalesPageToFit={true}
                    />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {

    }
});