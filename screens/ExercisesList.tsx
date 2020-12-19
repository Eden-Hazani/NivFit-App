import React, { Component } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { ExerciseModel } from '../models/ExerciseModel';
import * as muscleGroupFolder from "../jsonDump";
import { ExerciseListItem } from '../components/ListComponents/ExerciseListItem';
import { ListItemSeparator } from '../components/ListComponents/ListItemSeperatorLine';
import { AppText } from '../components/AppText';
import { LoadingAnimation } from '../animations/LoadingAnimation';
import { SearchBar } from 'react-native-elements';
import { Colors } from '../utility/colors';
const { width, height } = Dimensions.get('screen')

interface ExercisesListState {
    muscleGroup: string
    exercisesList: ExerciseModel[]
    startAnimation: Animated.ValueXY;
    loading: boolean
    search: string
}



export class ExercisesList extends Component<{ route: any, navigation: any }, ExercisesListState>{
    constructor(props: any) {
        super(props)
        this.state = {
            search: "",
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

    updateSearch = async (search: string) => {
        this.setState({ search })
        if (search.trim() === "") {
            const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];
            const exercisesList = getKeyValue(muscleGroupFolder, this.state.muscleGroup as any)
            this.setState({ exercisesList: exercisesList.exercises })
            return;
        }
        console.log(search)
        const exercisesList = this.state.exercisesList.filter((exercise) => { return exercise.mainList && exercise.mainList[0] && exercise.mainList[0].name && exercise.mainList[0].name.includes(search) })
        if (exercisesList.length > 0) {
            this.setState({ exercisesList })
            return;
        }
        if (exercisesList.length === 0) {
            const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];
            const exercisesList = getKeyValue(muscleGroupFolder, this.state.muscleGroup as any)
            this.setState({ exercisesList: exercisesList.exercises })
        }
    }


    render() {
        return (
            <View style={styles.container}>
                {this.state.loading ? <LoadingAnimation visible={this.state.loading} /> :
                    <View>
                        <View style={{ width: width / 1.5, alignSelf: 'center' }}>
                            <SearchBar
                                searchIcon={false}
                                containerStyle={{ backgroundColor: Colors.white, borderRadius: 150 }}
                                inputContainerStyle={{ backgroundColor: Colors.white }}
                                lightTheme={true}
                                placeholder="Search Exercises"
                                onChangeText={this.updateSearch}
                                value={this.state.search}
                            />
                        </View>
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