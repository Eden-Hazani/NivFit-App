import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LoadingAnimation } from '../animations/LoadingAnimation';
import { AppButton } from '../components/AppButton';
import { AppText } from '../components/AppText';
import { AppTextHeader } from '../components/AppTextHeader';
import { DifficultyLevelIcon } from '../components/DifficultyLevelIcon';
import AnimatedExerciseList from '../components/ListComponents/AnimatedExerciseList';
import { VideoPlayer } from '../components/VideoPlayer';
import { ExerciseModel } from '../models/ExerciseModel';
import { Colors } from '../utility/colors';
import { FavoriteButton } from '../utility/FavotireButton';
import { IconGen } from '../utility/IconGen';
import { requireCouchImageSwitch } from '../utility/requireCouchImageSwitch';
const { width, height } = Dimensions.get('screen');
interface ViewExerciseState {
    exercise: ExerciseModel;
    loading: boolean;
    couchImage: any;
    fullListIntroAnimation: Animated.ValueXY
    isFavorite: boolean;
}

export class ViewExercise extends Component<{ route: any }, ViewExerciseState> {
    constructor(props: any) {
        super(props)
        this.state = {
            isFavorite: false,
            fullListIntroAnimation: new Animated.ValueXY({ x: 1000, y: 0 }),
            exercise: new ExerciseModel(),
            loading: true,
            couchImage: requireCouchImageSwitch(this.props.route.params.exercise.instructorImg)
        }

    }
    startAnimation = () => {
        Animated.sequence([
            Animated.timing(this.state.fullListIntroAnimation, {
                toValue: { x: 0, y: 0 },
                duration: 450,
                useNativeDriver: false
            }),
        ]).start()
    }
    async componentDidMount() {
        this.setState({ exercise: this.props.route.params.exercise }, async () => {
            this.checkForFavoritism()
            this.startAnimation()
            this.setState({ loading: false })
        })
    }

    checkForFavoritism = async () => {
        const favoriteExercisesString = await AsyncStorage.getItem('favoriteExercises');
        if (!favoriteExercisesString) {
            this.setState({ isFavorite: false })
        }
        if (favoriteExercisesString) {
            const favoriteExercises = JSON.parse(favoriteExercisesString);
            for (let item of favoriteExercises) {
                if (this.state.exercise.mainList && (item.mainList[0].name === this.state.exercise.mainList[0].name)) {
                    this.setState({ isFavorite: true })
                    return;
                }
            }
            this.setState({ isFavorite: false })
        }
    }

    favorite = async (item: ExerciseModel) => {
        const favoriteExercisesString = await AsyncStorage.getItem('favoriteExercises');
        console.log(favoriteExercisesString)
        if (!favoriteExercisesString) {
            await AsyncStorage.setItem('favoriteExercises', JSON.stringify([item])).then(() => {
                this.checkForFavoritism()
            });
            return;
        }
        const favoriteExercises = JSON.parse(favoriteExercisesString);
        const newFavoriteExercises = favoriteExercises.push(item);
        await AsyncStorage.setItem('favoriteExercises', JSON.stringify(newFavoriteExercises)).then(() => {
            this.checkForFavoritism()
        });
    }

    unFavorite = async (item: ExerciseModel) => {
        const favoriteExercisesString = await AsyncStorage.getItem('favoriteExercises');
        if (!favoriteExercisesString) {
            return;
        }
        const favoriteExercises = JSON.parse(favoriteExercisesString);
        const newFavoriteExercises = favoriteExercises.filter((savedItem: ExerciseModel) => { item.mainList && savedItem.mainList && (savedItem.mainList[0].name !== item.mainList[0].name) });
        if (newFavoriteExercises.length === 0) {
            await AsyncStorage.removeItem('favoriteExercises')
            this.checkForFavoritism();
            return;
        }
        await AsyncStorage.setItem('favoriteExercises', JSON.stringify(newFavoriteExercises)).then(() => {
            this.checkForFavoritism()
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.loading ?
                    <LoadingAnimation visible={this.state.loading} />
                    :
                    <View style={styles.container}>
                        <View style={{ flex: .3, backgroundColor: Colors.inactiveTint, marginTop: 15 }}>
                            <VideoPlayer videoUrl={this.state.exercise.videoURL || "error"} />
                        </View>
                        <Animated.View style={[this.state.fullListIntroAnimation.getLayout(), { flex: .5, paddingLeft: 20, paddingRight: 40, backgroundColor: Colors.skyBlue }]}>
                            <AnimatedExerciseList data={this.state.exercise} />
                        </Animated.View>
                        <View style={{ flex: .3, backgroundColor: Colors.white, flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ paddingLeft: 15, paddingTop: 10 }}>
                                <AppTextHeader>Difficulty Level</AppTextHeader>
                                <DifficultyLevelIcon difficulty={this.state.exercise.difficultyLevel ? this.state.exercise.difficultyLevel : 1} />
                            </View>
                            <View style={{ paddingRight: 20, paddingTop: 10 }}>
                                <TouchableOpacity style={{ justifyContent: "center", backgroundColor: Colors.skyBlue, width: 50, height: 50, borderRadius: 50 }}
                                    onPress={() => {
                                        if (this.state.isFavorite) {
                                            this.unFavorite(this.state.exercise);
                                        }
                                        if (!this.state.isFavorite) {
                                            this.favorite(this.state.exercise)
                                        }

                                    }}>
                                    <View style={{ alignSelf: "center" }}>
                                        <FavoriteButton name={this.state.isFavorite ? "heart" : "heart-outline"} size={50} clicked={this.state.isFavorite} />
                                    </View>
                                </TouchableOpacity>
                                <View style={{ right: 5 }}>
                                    <AppTextHeader color={Colors.skyBlue} fontSize={16} textAlign={'center'}>Favorite</AppTextHeader>
                                </View>
                            </View>
                        </View>
                    </View>
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.inactiveTint
    }
});