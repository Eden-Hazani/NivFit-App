import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Animated, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { Colors } from '../../utility/colors';
import { AppButton } from '../AppButton';
import { AppText } from '../AppText';
import { AppTextHeader } from '../AppTextHeader';
import { ListItemSeparator } from './ListItemSeperatorLine';

const { width, height } = Dimensions.get('window')

const Item = ({ item, scrollX, index }: any) => {
    const inputRange = [(index - 1) * (height / 10), index * (height / 10), (height / 10) * (height / 10)];
    const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0, 1, 0]
    })
    const opacity: any = scrollX.interpolate({
        inputRange,
        outputRange: [0.4, 0.9, 0.6],
        extrapolate: 'clamp'
    })
    return <View style={styles.item}>
        <Animated.Text style={{
            opacity,
            fontFamily: "Raleway-ExtraLight",
            fontSize: 40,
            color: Colors.skyBlue,
            transform: [{ scale: scale }]
        }}>{item}</Animated.Text>
    </View>
}

const getAmPm = () => {
    let totalTime = [];
    totalTime.push(`12am`)
    for (let item = 1; item <= 11; item++) {
        item.toString().length === 1 ? totalTime.push(`0${item}am`) : totalTime.push(`${item}am`)
    }
    totalTime.push(`12pm`)
    for (let item = 1; item <= 11; item++) {
        item.toString().length === 1 ? totalTime.push(`0${item}pm`) : totalTime.push(`${item}pm`)
    }
    return totalTime;
}

const get24Hour = () => {
    let totalTime = [];
    for (let item = 1; item <= 23; item++) {
        item.toString().length === 1 ? totalTime.push(`0${item}`) : totalTime.push(`${item}`)
    };
    totalTime.push('00');
    return totalTime
}

const getMinList = () => {
    let minList: string[] = ["00"];
    let item: string = '';
    const numberArray: string[] = Array.from({ length: 60 }, (x, i) => {
        (i + 1).toString().length === 1 ? item = `0${i + 1}` : item = `${i + 1}`
        return item
    });
    return minList.concat(numberArray);

}


export default function NumberTimeScroll({ timeFormat, getValue, startLetter }: any) {
    React.useEffect(() => {
        if (timeFormat === "AMPM") {
            setCurrentList(getAmPm())
            return
        }
        if (timeFormat === "24H") {
            setCurrentList(get24Hour())
            return
        }
        if (timeFormat === "Mins") {
            setCurrentList(getMinList())
            return
        }
    }, [timeFormat]);
    const [currentList, setCurrentList] = useState(getAmPm());
    const [primeIndex, setPrimeIndex] = useState(0);
    const increment: any = React.useRef(null);
    const scrollX = React.useRef(new Animated.Value(0)).current
    const moveIndexRef: any = React.useRef(null)
    const onViewRef = React.useRef((viewableItems: any) => {
        if (!viewableItems || !viewableItems.viewableItems || !viewableItems.viewableItems[0] || !viewableItems.viewableItems[0].index) {
            return
        }
        setPrimeIndex(viewableItems.viewableItems[0].index)
        getValue(viewableItems)
    })
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: (height / 10) })

    const getItemLayout = (data: any, index: any) => (
        { length: (height / 10), offset: (height / 10) * index, index }
    )

    return (
        <View style={styles.container}>
            <View style={{ height: height / 8, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                {startLetter &&
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <AppText fontSize={40}>{startLetter}</AppText>
                    </View>
                }
                <View>
                    <ListItemSeparator backgroundColor={Colors.skyBlue} />
                    <Animated.FlatList
                        data={currentList}
                        viewabilityConfig={viewConfigRef.current}
                        onViewableItemsChanged={onViewRef.current}
                        keyExtractor={(item: any) => item.toString()}
                        numColumns={1}
                        getItemLayout={getItemLayout}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        scrollEventThrottle={5}
                        decelerationRate={"fast"}
                        snapToOffsets={[...Array(currentList.length)].map((x, i) => (i * (height / 10) - ((height / 5.5) * 0.5)))}
                        onEndReachedThreshold={0.5}
                        ref={moveIndexRef}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollX } } }],
                            { useNativeDriver: true }
                        )}
                        renderItem={({ item, index }: any) =>
                            <TouchableOpacity>
                                <Item item={item} scrollX={scrollX} index={index} />
                            </TouchableOpacity>
                        } />
                    <ListItemSeparator backgroundColor={Colors.skyBlue} />
                </View>


            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    item: {
        height: (height / 10),
        alignItems: 'center',
        justifyContent: 'center',
    },
});