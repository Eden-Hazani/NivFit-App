import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Animated } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { AppText } from '../../components/AppText';
import { AppTextHeader } from '../../components/AppTextHeader';
import { Colors } from '../../utility/colors';
const { width, height } = Dimensions.get('window');

interface AboutScreenState {
    staringAnimationRight: Animated.ValueXY
    staringAnimationLeft: Animated.ValueXY
}

export class AboutScreen extends Component<{ navigation: any }, AboutScreenState> {
    navigationSubscription: any;
    constructor(props: any) {
        super(props)
        this.state = {
            staringAnimationRight: new Animated.ValueXY({ x: 200, y: 0 }),
            staringAnimationLeft: new Animated.ValueXY({ x: -200, y: 0 }),
        }
        this.navigationSubscription = this.props.navigation.addListener('focus', this.onFocus);

    }
    componentWillUnmount() {
        this.navigationSubscription()
    }
    componentDidMount = () => {
        this.startingAnimation()
    }
    onFocus = () => {

    }
    startingAnimation = () => {
        Animated.sequence([
            Animated.timing(this.state.staringAnimationRight, {
                toValue: { x: -50, y: 0 },
                duration: 250,
                useNativeDriver: false
            }),
            Animated.timing(this.state.staringAnimationRight, {
                toValue: { x: 0, y: 0 },
                duration: 250,
                useNativeDriver: false
            }),
        ]).start()
        Animated.sequence([
            Animated.timing(this.state.staringAnimationLeft, {
                toValue: { x: 50, y: 0 },
                duration: 250,
                useNativeDriver: false
            }),
            Animated.timing(this.state.staringAnimationLeft, {
                toValue: { x: 0, y: 0 },
                duration: 250,
                useNativeDriver: false
            }),
        ]).start()
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <Animated.View style={[styles.firstRow, this.state.staringAnimationRight.getLayout()]}>
                    <View style={styles.personBox}>
                        <View style={{ top: 20, height: 170, width: 170, borderRadius: 150, backgroundColor: Colors.mahogany, justifyContent: "center", alignItems: "center" }}>
                            <Image uri={'https://i.imgur.com/RXDBX62.jpg'} style={{
                                height: 120, width: 120,
                                borderRadius: 120, borderColor: Colors.inactiveTint, borderWidth: 5
                            }} />
                        </View>
                        <View style={{ backgroundColor: Colors.mahogany, padding: 10, borderRadius: 25 }}>
                            <AppTextHeader color={Colors.white} textAlign={'center'} fontSize={23}>Eden Hazani</AppTextHeader>
                            <AppTextHeader textAlign={'center'} fontSize={18}>Lead Developer</AppTextHeader>
                            <AppText color={Colors.white} fontSize={17} textAlign={'center'}>Experienced full stack developer and fitness addict.</AppText>
                            <AppText color={Colors.white} fontSize={17} textAlign={'center'}>Combining the love of coding with the passion of fitness and healthy living.</AppText>
                            <AppText color={Colors.white} fontSize={17} textAlign={'center'}>After losing 120 pounds of fat and gaining muscles Eden decided to combine forces with </AppText>
                            <AppText color={Colors.white} fontSize={17} textAlign={'center'}>His fitness couch that helped him throughout his journey and bring you NivFit!</AppText>
                        </View>
                    </View>
                </Animated.View>
                <Animated.View style={[styles.secondRow, this.state.staringAnimationLeft.getLayout()]}>
                    <View style={styles.personBox}>
                        <View style={{ top: 20, height: 170, width: 170, borderRadius: 150, backgroundColor: Colors.mahogany, justifyContent: "center", alignItems: "center" }}>
                            <Image uri={'https://i.imgur.com/RXDBX62.jpg'} style={{
                                height: 120, width: 120,
                                borderRadius: 120, borderColor: Colors.inactiveTint, borderWidth: 5
                            }} />
                        </View>
                        <View style={{ backgroundColor: Colors.mahogany, padding: 10, borderRadius: 25 }}>
                            <AppTextHeader color={Colors.white} textAlign={'center'} fontSize={23}>Eden Hazani</AppTextHeader>
                            <AppTextHeader textAlign={'center'} fontSize={18}>Lead Developer</AppTextHeader>
                            <AppText color={Colors.white} fontSize={17} textAlign={'center'}>Experienced full stack developer and fitness addict.</AppText>
                            <AppText color={Colors.white} fontSize={17} textAlign={'center'}>Combining the love of coding with the passion of fitness and healthy living.</AppText>
                            <AppText color={Colors.white} fontSize={17} textAlign={'center'}>After losing 120 pounds of fat and gaining muscles Eden decided to combine forces with </AppText>
                            <AppText color={Colors.white} fontSize={17} textAlign={'center'}>His fitness couch that helped him throughout his journey and bring you NivFit!</AppText>
                        </View>
                    </View>
                </Animated.View>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {

    },
    firstRow: {
        justifyContent: "center",
        alignItems: "center",
    },
    secondRow: {
        justifyContent: "center",
        alignItems: "center",
    },
    personBox: {
        justifyContent: "center",
        alignItems: "center",
        width: width / 1.5
    }
});