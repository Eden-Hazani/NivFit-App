import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Colors } from '../utility/colors';
import { IconGen } from '../utility/IconGen';

interface DifficultyLevelIconState {
    difficultyAmount: string[]
    difficultyAnimationArray: Animated.ValueXY[];
}

const difficultyIcon = 'lightning-bolt'

export class DifficultyLevelIcon extends Component<{ difficulty: number }, DifficultyLevelIconState>{
    constructor(props: any) {
        super(props)
        this.state = {
            difficultyAmount: [],
            difficultyAnimationArray: []
        }
    }
    componentDidMount() {
        let difficultyAmount = this.state.difficultyAmount;
        let difficultyAnimationArray = this.state.difficultyAnimationArray;
        for (let index = 0; index < this.props.difficulty; index++) {
            difficultyAmount.push(difficultyIcon)
            difficultyAnimationArray.push(new Animated.ValueXY({ x: 0, y: 200 }))
        }
        this.setState({ difficultyAmount, difficultyAnimationArray }, () => {
            let animationTimeOut: number = 300
            setTimeout(() => {
                for (let item in difficultyAnimationArray) {
                    Animated.sequence([
                        Animated.timing(this.state.difficultyAnimationArray[item], {
                            toValue: { x: 0, y: 0 },
                            duration: animationTimeOut,
                            useNativeDriver: false
                        }),
                    ]).start()
                    animationTimeOut = animationTimeOut + 50
                }
            }, 200);
        })
    }


    render() {
        return (
            <View style={styles.container}>
                {this.state.difficultyAmount.map((item, index) => <Animated.View key={index} style={[this.state.difficultyAnimationArray[index].getLayout(), { margin: 2 }]}>
                    <IconGen name={item} size={30} backgroundColor={Colors.black} iconColor={Colors.white} />
                </Animated.View>)}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    }
});