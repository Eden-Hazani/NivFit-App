import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { AppTextHeader } from '../components/AppTextHeader';
import { Colors } from '../utility/colors';
import { IconGen } from '../utility/IconGen';
const { width, height } = Dimensions.get('screen');

interface PersonalSpaceState {
    colorBarStartAnimation: Animated.ValueXY
    FavoriteButtonMoveAnimation: Animated.ValueXY
    ButtonSizeEntranceAnimation: Animated.Value
    headerStartAnimation: Animated.ValueXY
}

export class PersonalSpace extends Component<{}, PersonalSpaceState>{
    constructor(props: any) {
        super(props)
        this.state = {
            headerStartAnimation: new Animated.ValueXY({ x: 0, y: -60 }),
            FavoriteButtonMoveAnimation: new Animated.ValueXY({ x: -200, y: 0 }),
            ButtonSizeEntranceAnimation: new Animated.Value(0),
            colorBarStartAnimation: new Animated.ValueXY({ x: -500, y: -500 })
        }
    }

    animateStartColorBar = () => {
        Animated.sequence([
            Animated.timing(this.state.colorBarStartAnimation, {
                toValue: { x: -200, y: -170 },
                duration: 300,
                useNativeDriver: false
            }),
        ]).start()
    }
    animateStartFavoriteButton = () => {
        Animated.sequence([
            Animated.timing(this.state.FavoriteButtonMoveAnimation, {
                toValue: { x: 0, y: 0 },
                duration: 300,
                useNativeDriver: false
            }),
        ]).start()
    }
    animateStartButtonSizeEntrance = () => {
        Animated.sequence([
            Animated.timing(this.state.ButtonSizeEntranceAnimation, {
                toValue: 1,
                duration: 450,
                useNativeDriver: false
            }),
        ]).start()
    }
    animateStartHeaderText = () => {
        Animated.sequence([
            Animated.timing(this.state.headerStartAnimation, {
                toValue: { x: 0, y: 0 },
                duration: 450,
                useNativeDriver: false
            }),
        ]).start()
    }

    componentDidMount() {
        this.animateStartColorBar()
        this.animateStartFavoriteButton()
        this.animateStartButtonSizeEntrance()
        this.animateStartHeaderText()
    }

    render() {
        return (
            <View >
                <Animated.View style={[this.state.colorBarStartAnimation.getLayout(), { position: 'absolute', backgroundColor: Colors.lightGray, width: width * 2, height: 400, transform: [{ rotate: '-35deg' }] }]} />
                <Animated.Text style={[styles.headerText, this.state.headerStartAnimation.getLayout()]}>YOUR PERSONALIZED {'\n'}TRAINING SPACE</Animated.Text>
                <View style={{ alignItems: "flex-start", left: 40, top: height / 6.5 }}>
                    <Animated.View style={[this.state.FavoriteButtonMoveAnimation.getLayout(), {
                        transform: [
                            {
                                scale: this.state.ButtonSizeEntranceAnimation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [.2, 1]
                                })
                            },
                        ]
                    }]}>
                        <TouchableOpacity style={[{
                            backgroundColor: Colors.skyBlue, width: 110, height: 110,
                            borderRadius: 100, justifyContent: "flex-end", alignItems: "center"
                        }]}>
                            <View style={{ top: 10 }}>
                                <AppTextHeader fontSize={12} letterSpacing={3}>FAVORITES</AppTextHeader>
                            </View>
                            <IconGen name={"heart"} size={70} />
                        </TouchableOpacity>
                    </Animated.View>
                </View>

                <View style={{ alignItems: "flex-start", left: 150, top: -height / 10 }}>
                    <Animated.View style={[this.state.FavoriteButtonMoveAnimation.getLayout(), {
                        transform: [
                            {
                                scale: this.state.ButtonSizeEntranceAnimation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [.2, 1]
                                })
                            },
                        ]
                    }]}>
                        <TouchableOpacity style={[{
                            backgroundColor: Colors.skyBlue, width: 110, height: 110,
                            borderRadius: 100, justifyContent: "flex-end", alignItems: "center"
                        }]}>
                            <View style={{ top: 10 }}>
                                <AppTextHeader textAlign={'center'} fontSize={12} letterSpacing={3}>TRAINING PROGRAMS</AppTextHeader>
                            </View>
                            <IconGen name={"file-document-outline"} size={70} />
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    headerText: {
        fontFamily: "Raleway-ExtraBold",
        letterSpacing: 3,
        fontSize: 18
    }
});