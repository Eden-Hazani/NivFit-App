import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { ExerciseModel } from '../models/ExerciseModel';
import * as muscleGroupFolder from "../jsonDump";
import { ExerciseListItem } from '../components/ListComponents/ExerciseListItem';
import { ListItemSeparator } from '../components/ListComponents/ListItemSeperatorLine';
import { AppText } from '../components/AppText';
import { LoadingAnimation } from '../animations/LoadingAnimation';
interface ExercisesListState {
    muscleGroup: string
    exercisesList: ExerciseModel[]
    startAnimation: Animated.ValueXY;
    loading: boolean
}



export class ExercisesList extends Component<{ route: any, navigation: any }, ExercisesListState>{
    constructor(props: any) {
        super(props)
        this.state = {
            exercisesList: [],
            muscleGroup: this.props.route.params.muscleGroup,
            startAnimation: new Animated.ValueXY({ x: 400, y: 0 }),
            loading: true
        }
    }

    componentDidMount() {
        const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];
        const exercisesList = getKeyValue(muscleGroupFolder, this.state.muscleGroup as any)
        this.setState({ exercisesList: exercisesList.exercises, loading: false }, () => {
            this.startAnimation()
        })
    }

    startAnimation = () => {
        Animated.sequence([
            Animated.timing(this.state.startAnimation, {
                toValue: { x: 15, y: 0 },
                duration: 300,
                useNativeDriver: false
            }),
            Animated.timing(this.state.startAnimation, {
                toValue: { x: 0, y: 0 },
                duration: 100,
                useNativeDriver: false
            }),
            Animated.timing(this.state.startAnimation, {
                toValue: { x: 5, y: 0 },
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


    render() {
        return (
            <View style={styles.container}>
                {this.state.loading ? <LoadingAnimation visible={this.state.loading} /> :
                    <View>
                        {console.log(this.state.exercisesList)}
                        <Animated.FlatList
                            style={this.state.startAnimation.getLayout()}
                            keyExtractor={(item: any, index: any) => index.toString()}
                            data={this.state.exercisesList}
                            renderItem={({ item, index }: any) => <ExerciseListItem {...item}
                                padding={20} width={60} height={60}
                                headTextAlign={"left"}
                                subTextAlign={"left"}
                                direction={'row'}
                                justifyContent={"flex-start"} textDistanceFromImg={10}
                                onPress={() => { this.props.navigation.navigate("ViewExercise", { exercise: item }) }} />}
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={16}
                            ItemSeparatorComponent={ListItemSeparator}
                        />
                    </View>
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {

    }
});