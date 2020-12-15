import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { CircleImgItem } from '../components/ListComponents/CircleImgItem';
import muscleGroups from '../jsonDump/muscleGroups.json';

interface HomeState {
    startAnimation: Animated.ValueXY;
}

export class Home extends Component<{ navigation: any }, HomeState> {
    constructor(props: any) {
        super(props)
        this.state = {
            startAnimation: new Animated.ValueXY({ x: 0, y: 400 })
        }
    }

    startAnimation = () => {
        Animated.sequence([
            Animated.timing(this.state.startAnimation, {
                toValue: { x: 0, y: -15 },
                duration: 300,
                useNativeDriver: false
            }),
            Animated.timing(this.state.startAnimation, {
                toValue: { x: 0, y: 0 },
                duration: 100,
                useNativeDriver: false
            }),
            Animated.timing(this.state.startAnimation, {
                toValue: { x: 0, y: -10 },
                duration: 100,
                useNativeDriver: false
            }),
            Animated.timing(this.state.startAnimation, {
                toValue: { x: 0, y: 0 },
                duration: 100,
                useNativeDriver: false
            }),
            Animated.timing(this.state.startAnimation, {
                toValue: { x: 0, y: -5 },
                duration: 100,
                useNativeDriver: false
            }),
            Animated.timing(this.state.startAnimation, {
                toValue: { x: 0, y: 0 },
                duration: 100,
                useNativeDriver: false
            }),
        ]).start()
    }

    componentDidMount() {
        this.startAnimation()
    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.FlatList
                    style={this.state.startAnimation.getLayout()}
                    keyExtractor={(item: any, index: any) => index.toString()}
                    numColumns={2}
                    data={muscleGroups.mainGroups}
                    renderItem={({ item, index }: any) => <CircleImgItem {...item}
                        onPress={() => { this.props.navigation.navigate("ExercisesList", { muscleGroup: item.systemName }) }} />}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    }
});