import React, { useEffect, useRef } from 'react';
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
import { Colors } from '../../utility/colors';
import { requireCouchImageSwitch } from '../../utility/requireCouchImageSwitch';
import { AppButton } from '../AppButton';
import { AppText } from '../AppText';
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

const Item = ({ scrollX, index, name, instructorImg, startingInstructions, movementInstructions, instructorName, shortDescription, instructorNotes, instructorPref }: any) => {
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
        <View >
            {/* <AppText>sdfsdfdfgfhdfsefsrg</AppText> */}
            {instructorImg &&
                <View>
                    <View style={styles.textContainer}>
                        <Animated.Text style={[styles.heading,
                        { left: 10, transform: [{ translateY: translateYCouchName }], color: Colors.black }
                        ]}>{instructorName}</Animated.Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Animated.Text style={[styles.description,
                        { left: 10, transform: [{ translateY: translateYCouchName }], color: Colors.black }
                        ]}>{instructorPref}</Animated.Text>
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
            {name &&
                <ScrollView >
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
                    <View style={styles.textContainer}>
                        <Animated.Text style={[styles.heading,
                        { flex: .01, fontSize: 15, transform: [{ translateX: translateXDesc }], color: Colors.black }
                        ]}>Notes</Animated.Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Animated.Text style={[styles.description,
                        { left: 10, transform: [{ translateY: translateYCouchName }], color: Colors.black }
                        ]}>{instructorNotes.replace(/\• /g, '\n\n• ').replace(/\- /g, '\n\n- ')}</Animated.Text>
                    </View>
                </ScrollView>
            }
            {startingInstructions &&
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ flex: .5 }}>
                        <View style={styles.textContainer}>
                            <Animated.Text style={[styles.heading,
                            { flex: .07, fontSize: 15, transform: [{ translateX: translateXDesc }], color: Colors.black }
                            ]}>Starting Instructions</Animated.Text>
                        </View>
                        <View style={[styles.textContainer]}>
                            <Animated.Text style={[styles.description,
                            { flex: .2, transform: [{ translateY: translateYDesc }], color: Colors.black }
                            ]}>{startingInstructions.replace(/\• /g, '\n\n• ').replace(/\- /g, '\n\n- ')}</Animated.Text>
                        </View>
                    </View>
                    <View style={{ flex: .5 }}>
                        <View style={styles.textContainer}>
                            <Animated.Text style={[styles.heading,
                            { flex: .07, fontSize: 15, transform: [{ translateX: translateXDesc }], color: Colors.black }
                            ]}>Movement Instructions</Animated.Text>
                        </View>
                        <View style={[styles.textContainer, { paddingBottom: 30 }]}>
                            <Animated.Text style={[styles.description,
                            { flex: .1, transform: [{ translateY: translateYDesc }], color: Colors.black }
                            ]}>{movementInstructions.replace(/\• /g, '\n\n• ').replace(/\- /g, '\n\n- ')}</Animated.Text>
                        </View>
                    </View>
                </ScrollView>
            }
        </View >
    )
}



export default function AnimatedExerciseTrainingList(data: any) {
    const scrollX = React.useRef(new Animated.Value(0)).current
    return (
        <View style={styles.container}>
            <Animated.FlatList
                style={{ flex: 1, width: 150, zIndex: 10, elevation: 10 }}
                keyExtractor={(item: any, index: any) => index.toString()}
                data={data.data.mainList}
                renderItem={({ item, index }: any) =>
                    <Item {...item} index={index} scrollX={scrollX} />
                }
                horizontal
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                pagingEnabled
                scrollEnabled={true}
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
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

    imageStyle: {
        borderRadius: 150,
        width: 150,
        height: 150,
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
        textAlign: 'left',
        width: width * 0.75,
        marginRight: 10,
        fontSize: 16,
    },
})