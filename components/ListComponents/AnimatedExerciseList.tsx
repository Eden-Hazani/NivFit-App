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
} from 'react-native';
import { Colors } from '../../utility/colors';
import { requireCouchImageSwitch } from '../../utility/requireCouchImageSwitch';
import { AppButton } from '../AppButton';
const { width, height } = Dimensions.get('window');

const Indicator = ({ scrollX, items }: any) => {
    return (
        <View style={{ flexDirection: 'row', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: "flex-end", alignItems: "flex-end", }}>
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

const Item = ({ scrollX, index, name, instructorImg, description, instructorName, shortDescription }: any) => {
    const imgFilePath = instructorImg && requireCouchImageSwitch(instructorImg);
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
    const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0, 1, 0]
    })
    const translateXName = scrollX.interpolate({
        inputRange,
        outputRange: [width * 0.2, 0, -width * 0.2]
    })
    const translateYDesc = scrollX.interpolate({
        inputRange,
        outputRange: [height * 0.5, -140, -height * 0.5]
    })
    const translateXDesc = scrollX.interpolate({
        inputRange,
        outputRange: [width * 1.6, -120, -width * 1.6]
    })
    const translateXShortDesc = scrollX.interpolate({
        inputRange,
        outputRange: [width * 1.4, 5, -width * 1.5]
    })
    const translateYCouchName = scrollX.interpolate({
        inputRange,
        outputRange: [height * .2, -50, -height * 0.5]
    })

    return (
        <View style={styles.itemStyle}>
            {instructorImg &&
                <View >
                    <View style={styles.textContainer}>
                        <Animated.Text style={[styles.heading,
                        { left: 10, transform: [{ translateY: translateYCouchName }], color: Colors.black }
                        ]}>{instructorName}</Animated.Text>
                    </View>
                    <Animated.Image
                        source={imgFilePath}
                        style={[
                            styles.imageStyle,
                            {
                                transform: [{ scale: scale }],
                            },
                        ]}
                    />
                </View>
            }

            <View style={styles.textContainer}>
                <Animated.Text style={[styles.heading,
                { transform: [{ translateX: translateXName }], color: Colors.black }
                ]}>{name}</Animated.Text>
            </View>
            <View style={styles.textContainer}>
                <Animated.Text style={[styles.description,
                { transform: [{ translateX: translateXShortDesc }], color: Colors.black }
                ]}>{shortDescription}</Animated.Text>
            </View>
            {description &&
                <View style={{ flex: 1, bottom: 30 }}>
                    <View style={styles.textContainer}>
                        <Animated.Text style={[styles.heading,
                        { flex: .32, fontSize: 15, transform: [{ translateX: translateXDesc }], color: Colors.black }
                        ]}>Full Exercise Description</Animated.Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Animated.Text style={[styles.description,
                        { flex: 1, transform: [{ translateY: translateYDesc }], color: Colors.black }
                        ]}>{description}</Animated.Text>
                    </View>
                </View>
            }
        </View >
    )
}



export default function AnimatedExerciseList(data: any) {
    const scrollX = React.useRef(new Animated.Value(0)).current
    return (
        <View style={styles.container}>
            <Animated.FlatList
                style={{ zIndex: 50 }}
                keyExtractor={(item: any, index: any) => index.toString()}
                data={data.data.mainList}
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
            <Indicator scrollX={scrollX} items={Object.values(data.data.mainList)} />
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

    },
    imageStyle: {
        borderRadius: 150,
        width: 250,
        height: 250,
    },
    textContainer: {
        alignItems: 'flex-start',
        alignSelf: "flex-start",
        paddingLeft: 15,
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
        fontWeight: '600',
        textAlign: 'left',
        width: width * 0.75,
        marginRight: 10,
        fontSize: 16,
        lineHeight: 16 * 1.5,
    },
})