import React, { Component } from 'react';
import { View, StyleSheet, Animated, ScrollView } from 'react-native';
import { AppText } from '../components/AppText';
import { HomeList } from '../components/ListComponents/HomeList';
import muscleGroups from '../jsonDump/muscleGroups.json';
import { Colors } from '../utility/colors';

interface HomeState {
    animatedValueList: Animated.Value[]
    animatedMovingValueList: Animated.ValueXY[],
    loading: boolean
}

export class Home extends Component<{ navigation: any }, HomeState> {
    constructor(props: any) {
        super(props)
        this.state = {
            loading: true,
            animatedMovingValueList: [],
            animatedValueList: []
        }
    }

    componentDidMount() {
        let animatedValueList = this.state.animatedValueList;
        let animatedMovingValueList = this.state.animatedMovingValueList;
        for (let item in muscleGroups.mainGroups) {
            parseInt(item) % 2 === 0 ? animatedMovingValueList.push(new Animated.ValueXY({ x: 200, y: 0 })) : animatedMovingValueList.push(new Animated.ValueXY({ x: -200, y: 0 }));
            animatedValueList.push(new Animated.Value(0))
        }
        this.setState({ animatedValueList, animatedMovingValueList, loading: false }, () => {
            let animationTimeOut = 350
            for (let item in this.state.animatedValueList) {
                Animated.sequence([
                    Animated.timing(this.state.animatedValueList[item], {
                        toValue: 1,
                        duration: animationTimeOut,
                        useNativeDriver: false
                    }),
                ]).start()
                Animated.sequence([
                    Animated.timing(this.state.animatedMovingValueList[item], {
                        toValue: { x: 0, y: 0 },
                        duration: 300,
                        useNativeDriver: false
                    }),
                ]).start()

                animationTimeOut = animationTimeOut + 350
            }
        })
    }



    render() {
        return (
            <ScrollView style={{ top: 0, bottom: 0 }}>
                {this.state.loading ? <View></View> :
                    <View style={{}}>
                        <View style={{ bottom: 40 }}>
                            {muscleGroups.mainGroups.map((item, index) =>
                                <Animated.View key={index} style={[this.state.animatedMovingValueList[index].getLayout(), { opacity: this.state.animatedValueList[index] }]}>
                                    <View>
                                        <HomeList {...item} lastIndex={muscleGroups.mainGroups.length - 1} index={index} rotate={index % 2 === 0 ? '-5.5deg' : '5.5deg'} bottom={index * 30} key={index}
                                            onPress={() => { this.props.navigation.navigate("ExercisesList", { muscleGroup: item.systemName }) }} />
                                    </View>
                                </Animated.View>
                            )}
                        </View>
                        <View style={{ backgroundColor: Colors.skyBlue }}>
                            <AppText>ddfgdfg</AppText>
                        </View>
                    </View>

                }
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({

});