import React, { Component } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { ExerciseModel } from '../models/ExerciseModel';
import * as muscleGroupFolder from "../muscleAndTrainingJson";
import { ExerciseListItem } from '../components/ListComponents/ExerciseListItem';
import { ListItemSeparator } from '../components/ListComponents/ListItemSeperatorLine';
import { AppText } from '../components/AppText';
import { LoadingAnimation } from '../animations/LoadingAnimation';
import { SearchBar } from 'react-native-elements';
import { Colors } from '../utility/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('screen')

interface ExercisesListState {
    muscleGroup: string
    exercisesList: ExerciseModel[]
    startAnimation: Animated.ValueXY;
    loading: boolean
    search: string
    isFavorite: boolean[]
}



export class ExercisesList extends Component<{ route: any, navigation: any }, ExercisesListState>{
    navigationSubscription: any;
    constructor(props: any) {
        super(props)
        this.state = {
            isFavorite: [],
            search: "",
            exercisesList: [],
            muscleGroup: this.props.route.params.muscleGroup,
            startAnimation: new Animated.ValueXY({ x: 400, y: 0 }),
            loading: true
        }
        this.navigationSubscription = this.props.navigation.addListener('focus', this.onFocus);
    }

    componentDidMount() {
        const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];
        const exercisesList = getKeyValue(muscleGroupFolder, this.state.muscleGroup as any)
        this.setState({ exercisesList: exercisesList.exercises }, async () => {
            await this.checkForFavoritism()
            this.setState({ loading: false }, () => {
                this.startAnimation()
            })
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

    onFocus = () => {
        this.setState({ loading: true }, () => {
            setTimeout(async () => {
                await this.checkForFavoritism().then(() => {
                    this.setState({ loading: false })
                })
            }, 250);

        })
    }

    checkForFavoritism = async () => {
        let isFavorite: any[] = [];
        const favoriteExercisesString = await AsyncStorage.getItem('favoriteExercises');
        if (!favoriteExercisesString) {
            return
        }
        if (favoriteExercisesString) {
            const favoriteExercises = JSON.parse(favoriteExercisesString);
            for (let item of favoriteExercises) {
                this.state.exercisesList.find((exercise, index) => {
                    if (exercise.mainList?.[0].name === item.mainList?.[0].name) {
                        isFavorite[index] = true;
                    }
                }
                );
            }
            this.setState({ isFavorite })
        }
    }


    render() {
        return (
            <View style={styles.container}>
                {this.state.loading ? <LoadingAnimation visible={this.state.loading} /> :
                    <View style={{ flex: 1 }}>
                        <View style={{ width: width / 1.5, alignSelf: 'center', flex: 0.1 }}>
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
                            style={[this.state.startAnimation.getLayout(), { flex: 0.8, backgroundColor: Colors.skyBlue }]}
                            keyExtractor={(item: any, index: any) => index.toString()}
                            data={this.state.exercisesList}
                            renderItem={({ item, index }: any) => <ExerciseListItem {...item}
                                padding={20} width={width} height={60}
                                isFavorite={this.state.isFavorite[index]}
                                headTextAlign={"left"}
                                subTextAlign={"left"}
                                direction={'row'}
                                justifyContent={"flex-start"} textDistanceFromImg={10}
                                onPress={() => { this.props.navigation.navigate("ViewExercise", { exercise: item }) }} />}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});