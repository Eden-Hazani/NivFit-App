import React, { Component, useContext } from 'react';
import { View, StyleSheet, Text, Dimensions, Animated, } from 'react-native';
import { AnimatedLogoEntrance } from '../animations/AnimatedLogoEntrance';
import { AppButton } from '../components/AppButton';
import { AppText } from '../components/AppText';
import { AppTextHeader } from '../components/AppTextHeader';
import { Colors } from '../utility/colors';
import MainContext from '../utility/context';
import welcomeData from '../jsonDump/welcomeData.json'
import { Image } from 'react-native-expo-image-cache';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window')

const Indicator = ({ scrollY, items }: any) => {
    return (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: "flex-end", alignItems: "flex-end", }}>
            {items.map((_: any, i: any) => {
                const inputRange = [(i - 1) * height, i * height, (i + 1) * height]
                const scale: any = scrollY.interpolate({
                    inputRange,
                    outputRange: [0.8, 1.4, 0.8],
                    extrapolate: 'clamp'
                })
                const opacity: any = scrollY.interpolate({
                    inputRange,
                    outputRange: [0.4, 0.9, 0.6],
                    extrapolate: 'clamp'
                })
                return <Animated.View key={`indicator-${i}`}
                    style={{
                        height: 10, width: 10, borderRadius: 5,
                        backgroundColor: Colors.skyBlue, margin: 10,
                        transform: [{ scale }],
                        opacity
                    }}>

                </Animated.View>
            })}
        </View>
    )
}

const Item = ({ scrollY, index, headline, leftTextBlock, rightTextBlock, ImgUrl, finishButton, onPress }: any) => {
    const context: any = useContext(MainContext)
    const inputRange = [(index - 1) * height, index * height, (index + 1) * height];
    const scale = scrollY.interpolate({
        inputRange,
        outputRange: [0, 1, 0]
    })
    const translateYHeadline = scrollY.interpolate({
        inputRange,
        outputRange: [height * 0.5, 0, -height * 0.5]
    })
    const translateXRTB = scrollY.interpolate({
        inputRange,
        outputRange: [-height * 1.8, 0, -height * 1.8]
    })
    const translateXLTB = scrollY.interpolate({
        inputRange,
        outputRange: [height * 2, 0, +height * 2]
    })
    const opacity: any = scrollY.interpolate({
        inputRange,
        outputRange: [0, 1, 0],
        extrapolate: 'clamp'
    })

    return (
        <View style={styles.itemStyle}>
            <View style={styles.textContainer}>
                <Animated.Text style={[styles.heading,
                { transform: [{ translateY: translateYHeadline }], color: Colors.black }
                ]}>{headline}</Animated.Text>
            </View>
            <View style={{}}>
                <Animated.Text style={[styles.description,
                { transform: [{ translateX: translateXLTB }] }
                ]}>{leftTextBlock}</Animated.Text>
                <Animated.Text style={[styles.description,
                { transform: [{ translateX: translateXRTB }] }
                ]}>{rightTextBlock}</Animated.Text>
            </View>
            {finishButton &&
                <Animated.View style={{ paddingTop: 40 }}>
                    <AppButton color={Colors.white} title={"Let's Start!"} width={120} height={70} fontSize={22} backgroundColor={Colors.skyBlue}
                        borderRadius={20} onPress={async () => {
                            await AsyncStorage.setItem('isFirstUse', JSON.stringify(false))
                            setTimeout(() => {
                                context.setFirstUse(false)
                            }, 300);
                        }} />
                </Animated.View>
            }
            <Animated.View style={{ opacity }}>
                <Image uri={ImgUrl} style={{ width: 250, height: 250 }} />
            </Animated.View>
        </View >
    )
}



export default function Welcome() {
    const scrollY = React.useRef(new Animated.Value(0)).current
    const list: any = welcomeData.data;
    const finishedList = list.concat([
        {
            "headline": "Ready?",
            "leftTextBlock": "We hope you enjoy NivFit and it's features",
            "rightTextBlock": "Now, let's start working out!",
            "ImgUrl": "https://i.imgur.com/fzMA3sg.png",
            "finishButton": true
        }
    ])
    return (
        <View style={styles.container}>
            <Animated.FlatList
                style={{ zIndex: 10, flex: 1 }}
                keyExtractor={(item: any, index: any) => index.toString()}
                data={finishedList}
                renderItem={({ item, index }: any) => <Item {...item} index={index} scrollY={scrollY} />}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            />
            <Indicator scrollY={scrollY} items={Object.values(finishedList)} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        zIndex: -10,
        flex: 1,

    },
    itemStyle: {
        height,
        flex: 1,
        top: 40,
        alignItems: "center"
    },
    textContainer: {
        alignItems: 'center',
        alignSelf: "center",
        paddingLeft: 15,
    },
    heading: {
        textAlign: "center",
        fontFamily: "Raleway-ExtraBold",
        textTransform: 'uppercase',
        fontSize: width / 10,
        fontWeight: '800',
        letterSpacing: 3,
        marginBottom: 10,
    },
    description: {
        color: Colors.skyBlue,
        fontFamily: "Raleway-ExtraLight",
        textAlign: 'center',
        width: width * 0.85,
        fontSize: 22,
    },
});