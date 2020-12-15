import React, { Component } from 'react';
import { Animated, View, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
import { Colors } from '../utility/colors';
import { AppButton } from '../components/AppButton';
import { Easing } from 'react-native-reanimated';
import MainContext from '../utility/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AnimatedLogoEntranceState {
    jiggleAnimationVal: Animated.ValueXY;
    buttonAnimationVal: Animated.ValueXY;
    spinValue: any;
    logoSpin: any
    fall: Animated.ValueXY;
}

export class AnimatedLogoEntrance extends Component<any, AnimatedLogoEntranceState>{
    static contextType = MainContext;

    constructor(props: any) {
        super(props)
        this.state = {
            jiggleAnimationVal: new Animated.ValueXY({ x: 200, y: 150 }),
            buttonAnimationVal: new Animated.ValueXY({ x: 0, y: 0 }),
            spinValue: new Animated.Value(0),
            logoSpin: new Animated.Value(0),
            fall: new Animated.ValueXY({ x: 0, y: 0 })
        }
    }

    componentDidMount() {
        this.jiggle();
        this.logoSpin();
        setTimeout(() => {
            this.button();
            this.spin();
        }, 200);
    }

    jiggle = () => {
        Animated.sequence([
            Animated.timing(this.state.jiggleAnimationVal, {
                toValue: { x: 30, y: 0 },
                duration: 450,
                useNativeDriver: false
            }),

        ]).start()
    }

    button = () => {
        Animated.sequence([
            Animated.timing(this.state.buttonAnimationVal, {
                toValue: { x: -55, y: -20 },
                duration: 200,
                useNativeDriver: false
            }),

        ]).start()
    }

    fall = () => {
        Animated.sequence([
            Animated.timing(this.state.fall, {
                toValue: { x: 0, y: 500 },
                duration: 250,
                useNativeDriver: false
            }),

        ]).start()
    }

    spin = () => {
        Animated.timing(
            this.state.spinValue,
            {
                toValue: 1,
                duration: 250,
                easing: Easing.linear as any,
                useNativeDriver: false
            }
        ).start()
    }
    logoSpin = () => {
        Animated.timing(
            this.state.logoSpin,
            {
                toValue: 1,
                duration: 400,
                easing: Easing.linear as any,
                useNativeDriver: false
            }
        ).start()
    }


    render() {
        const { firstUse, setFirstUse } = this.context
        const spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '-20deg']
        })
        const logoSpin = this.state.logoSpin.interpolate({
            inputRange: [0, 1],
            outputRange: ['180deg', '0deg']
        })
        return (
            <View style={styles.logoContainer}>
                <Animated.View style={this.state.fall.getLayout()}>
                    <View style={{ zIndex: 10, position: "absolute", top: 0, left: 0, right: 0, bottom: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <Animated.View style={[this.state.buttonAnimationVal.getLayout(), { transform: [{ rotate: spin }] }]}>
                            <AppButton title={"Let's start!"} backgroundColor={Colors.skyBlue} width={130} height={60} borderRadius={25} fontSize={18} onPress={async () => {
                                this.fall();
                                await AsyncStorage.setItem('isFirstUse', JSON.stringify(false))
                                setTimeout(() => {
                                    setFirstUse(false)
                                }, 300);
                            }} />
                        </Animated.View>
                    </View>
                    <Animated.View style={[this.state.jiggleAnimationVal.getLayout(), { transform: [{ rotate: logoSpin }] }]}>
                        <Image style={styles.icon} source={require('../assets/logo.png')} />
                    </Animated.View>
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        height: 90,
        marginTop: 5,
        marginBottom: 10,
        resizeMode: "contain"
    },
    logoContainer: {
        paddingTop: 50,
        alignItems: "center",
        paddingBottom: 150,
    },
})