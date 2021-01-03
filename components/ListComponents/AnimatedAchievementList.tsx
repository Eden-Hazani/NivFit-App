import React, { useEffect } from 'react';
import {
    Animated,
    Dimensions,
    Text,
    View,
    StyleSheet,
    Image,
    StatusBar,
    SafeAreaView,
    Modal,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import checkForAchievement from '../../functions/checkForAchievement';
import { AchievementModal } from '../../models/AchievementModal';
import { Colors } from '../../utility/colors';
import { requireCouchImageSwitch } from '../../utility/requireCouchImageSwitch';
import { AppButton } from '../AppButton';
const { width, height } = Dimensions.get('window');

const Indicator = ({ scrollX, items }: any) => {
    return (
        <View style={{ flexDirection: 'row', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "flex-end", }}>
            {items.map((_: any, i: any) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
                const scale: any = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.8, 1.4, 0.8],
                    extrapolate: 'clamp'
                })
                const opacity: any = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.4, 0.9, 0.6],
                    extrapolate: 'clamp'
                })
                return <Animated.View key={`indicator-${i}`}
                    style={{
                        height: 10, width: 10, borderRadius: 5,
                        backgroundColor: Colors.black, margin: 10,
                        transform: [{ scale }],
                        opacity
                    }}>

                </Animated.View>
            })}
        </View>
    )
}

const Item = ({ scrollX, index, description, img }: any) => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
    const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0, 1, 0]
    })
    const translateXDesc = scrollX.interpolate({
        inputRange,
        outputRange: [width * 0.6, 0, -width * 0.2]
    })

    return (
        <TouchableOpacity style={styles.itemStyle} activeOpacity={1}>
            <Animated.Image
                source={{ uri: img }}
                style={[
                    styles.imageStyle,
                    {
                        transform: [{ scale: scale }],
                    },
                ]}
            />
            <View style={styles.textContainer}>
                <Animated.Text style={[styles.heading,
                { textAlign: 'center', transform: [{ translateX: translateXDesc }], color: Colors.black }
                ]}>{description}</Animated.Text>
            </View>
        </TouchableOpacity >
    )
}



export default function AnimatedAchievementList(data: any) {
    const scrollX = React.useRef(new Animated.Value(0)).current
    let achievements: AchievementModal[] = [];
    for (let achievement of data.data) {
        achievements.push(checkForAchievement(achievement));
    }
    console.log(achievements)
    return (
        <View style={styles.container}>
            <Animated.FlatList
                style={{ zIndex: 50 }}
                keyExtractor={(item: any, index: any) => index.toString()}
                data={achievements}
                renderItem={({ item, index }: any) => <Item {...item} index={index} scrollX={scrollX} />}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                horizontal
                scrollEnabled={true}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            />
            <Indicator scrollX={scrollX} items={Object.values(achievements)} />
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        zIndex: -10,
        flex: 1,
        flexDirection: 'row',

    },
    itemStyle: {
        width,
        height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        borderRadius: 150,
        width: 150,
        height: 150,
    },
    textContainer: {
        alignItems: 'center',
        alignSelf: "center",
    },
    heading: {
        fontFamily: "Raleway-ExtraBold",
        textTransform: 'uppercase',
        fontSize: 22,
        fontWeight: '800',
        letterSpacing: 2,
        width: width * 0.75,
        marginBottom: 10,
    },
    description: {
        fontFamily: "Raleway-ExtraLight",
        textAlign: 'left',
        width: width * 0.75,
        marginRight: 10,
        fontSize: 16,
    },
})