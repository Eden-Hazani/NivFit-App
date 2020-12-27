import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, Animated, ScrollView, FlatList } from 'react-native';
import { LoadingAnimation } from '../../animations/LoadingAnimation';
import { AppText } from '../../components/AppText';
import { AppTextHeader } from '../../components/AppTextHeader';
import { DifficultyLevelIcon } from '../../components/DifficultyLevelIcon';
import AnimatedExerciseList from '../../components/ListComponents/AnimatedExerciseList';
import AnimatedExerciseTrainingList from '../../components/ListComponents/AnimatedExerciseTrainingList';
import { VideoPlayer } from '../../components/VideoPlayer';
import { ExerciseModel } from '../../models/ExerciseModel';
import { Colors } from '../../utility/colors';
import { requireCouchImageSwitch } from '../../utility/requireCouchImageSwitch';
const { width, height } = Dimensions.get('screen');
interface ViewTrainingProgramExerciseState {
    exercise: ExerciseModel;
    loading: boolean;
    couchImage: any;
    fullListIntroAnimation: Animated.ValueXY
    isFavorite: boolean;
}

export class ViewTrainingProgramExercise extends Component<{ program: any }, ViewTrainingProgramExerciseState> {
    constructor(props: any) {
        super(props)
        this.state = {
            isFavorite: false,
            fullListIntroAnimation: new Animated.ValueXY({ x: 1000, y: 0 }),
            exercise: new ExerciseModel(),
            loading: true,
            couchImage: requireCouchImageSwitch(this.props.program.exercise.instructorImg)
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
        this.setState({ exercise: this.props.program.exercise }, async () => {
            this.startAnimation()
            this.setState({ loading: false })
        })
    }




    render() {
        return (
            <ScrollView nestedScrollEnabled={true} style={styles.container}>
                {this.state.loading ?
                    <LoadingAnimation visible={this.state.loading} />
                    :
                    <View style={styles.innerContainer}>
                        <View style={{ backgroundColor: Colors.inactiveTint, marginTop: 15 }}>
                            <VideoPlayer videoUrl={this.state.exercise.videoURL || "error"} />
                        </View>
                        <Animated.View style={[this.state.fullListIntroAnimation.getLayout(), { flex: .95, paddingLeft: 20, paddingRight: 40, backgroundColor: Colors.skyBlue }]}>
                            <AnimatedExerciseTrainingList data={this.state.exercise} />
                        </Animated.View>
                        <View style={{ flexDirection: "row", backgroundColor: Colors.white, justifyContent: "space-between", alignItems: "flex-end", flex: .49 }}>
                            <View style={{ left: 15 }}>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ backgroundColor: Colors.black, margin: 5, padding: 5, borderRadius: 15 }}>
                                        <AppTextHeader color={Colors.skyBlue} fontSize={18} textAlign={'center'}>Sets{`\n`}{this.props.program.numberOfSets}</AppTextHeader>
                                    </View>
                                    <View style={{ backgroundColor: Colors.black, margin: 5, padding: 5, borderRadius: 15 }}>
                                        <AppTextHeader color={Colors.skyBlue} fontSize={18} textAlign={'center'}>Repetitions{`\n`}{this.props.program.numberOfReps}</AppTextHeader>
                                    </View>
                                </View>
                                <View style={{ backgroundColor: Colors.black, margin: 5, padding: 5, borderRadius: 15 }}>
                                    <AppTextHeader color={Colors.skyBlue} textAlign={'center'} fontSize={18}>Muscle group{`\n`}{this.props.program.muscleGroup}</AppTextHeader>
                                </View>
                            </View>
                            <View style={{ paddingLeft: 15, paddingTop: 10, bottom: 20 }}>
                                <AppTextHeader>Difficulty Level</AppTextHeader>
                                <DifficultyLevelIcon difficulty={this.state.exercise.difficultyLevel ? this.state.exercise.difficultyLevel : 1} animationX={200} animationY={0} />
                            </View>
                        </View>
                    </View>
                }
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 1,
        backgroundColor: Colors.inactiveTint
    },
    innerContainer: {
        flex: 1
    }
});