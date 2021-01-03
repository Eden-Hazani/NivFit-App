import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, Animated, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { LoadingAnimation } from '../../animations/LoadingAnimation';
import { AppText } from '../../components/AppText';
import { AppTextHeader } from '../../components/AppTextHeader';
import { DifficultyLevelIcon } from '../../components/DifficultyLevelIcon';
import AnimatedExerciseList from '../../components/ListComponents/AnimatedExerciseList';
import AnimatedExerciseTrainingList from '../../components/ListComponents/AnimatedExerciseTrainingList';
import { ListItemSeparator } from '../../components/ListComponents/ListItemSeperatorLine';
import { VideoPlayer } from '../../components/VideoPlayer';
import { ExerciseModel } from '../../models/ExerciseModel';
import { Colors } from '../../utility/colors';
import { requireCouchImageSwitch } from '../../utility/requireCouchImageSwitch';
import Modal from 'react-native-modal';
import { ViewExercise } from '../ViewExercise';
import { IconGen } from '../../utility/IconGen';

const { width, height } = Dimensions.get('screen');
interface ViewTrainingProgramExerciseState {
    exercise: ExerciseModel;
    loading: boolean;
    couchImage: any;
    superSet: ExerciseModel[]
    fullListIntroAnimation: Animated.ValueXY
    isFavorite: boolean;
    superSetInfoModal: boolean,
    pickedSuperSet: ExerciseModel
}

export class ViewTrainingProgramExercise extends Component<{ program: any }, ViewTrainingProgramExerciseState> {
    constructor(props: any) {
        super(props)
        this.state = {
            isFavorite: false,
            fullListIntroAnimation: new Animated.ValueXY({ x: 1000, y: 0 }),
            exercise: new ExerciseModel(),
            superSet: [],
            loading: true,
            couchImage: '',
            pickedSuperSet: new ExerciseModel(),
            superSetInfoModal: false
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
        if (this.props.program.superSet) {
            let superSet = this.state.superSet;
            superSet = this.props.program.superSet;
            this.startAnimation()
            this.setState({ superSet, loading: false })
            return
        }
        requireCouchImageSwitch(this.props.program.exercise.instructorImg)
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
                    this.state.superSet.length === 0 ?
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
                                <View style={{ paddingLeft: 15, paddingTop: 10, bottom: 70 }}>
                                    <AppTextHeader>Difficulty Level</AppTextHeader>
                                    <DifficultyLevelIcon difficulty={this.state.exercise.difficultyLevel ? this.state.exercise.difficultyLevel : 1} animationX={200} animationY={0} />
                                </View>
                            </View>
                        </View>
                        :
                        <View style={{ flex: 1, backgroundColor: Colors.white, justifyContent: "center" }}>
                            <View style={{ flex: 1, borderColor: Colors.mahogany, position: "absolute", borderWidth: 10, height: Dimensions.get('window').height - 45, width: Dimensions.get('screen').width }}></View>
                            <View style={{ flex: .3 }}>
                                <AppTextHeader color={Colors.mahogany} fontSize={25} textAlign={'center'}>Super Set</AppTextHeader>
                                <View style={{ top: 15, justifyContent: "center", alignItems: "center" }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{ backgroundColor: Colors.black, margin: 5, padding: 5, borderRadius: 15 }}>
                                            <AppTextHeader color={Colors.mahogany} fontSize={18} textAlign={'center'}>
                                                Sets{`\n`}{this.props.program.superSet[0].numberOfSets}</AppTextHeader>
                                        </View>
                                        <View style={{ backgroundColor: Colors.black, margin: 5, padding: 5, borderRadius: 15 }}>
                                            <AppTextHeader color={Colors.mahogany} fontSize={18} textAlign={'center'}>
                                                Repetitions each{`\n`}{this.props.program.superSet[0].numberOfReps}</AppTextHeader>
                                        </View>
                                    </View>
                                    <View style={{ backgroundColor: Colors.black, margin: 5, padding: 5, borderRadius: 15 }}>
                                        <AppTextHeader color={Colors.mahogany} textAlign={'center'} fontSize={18}>
                                            Muscle group{`\n`}{this.props.program.superSet[0].muscleGroup}</AppTextHeader>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: .7 }}>
                                <FlatList
                                    keyExtractor={(item: any, index: any) => index.toString()}
                                    data={this.state.superSet}
                                    renderItem={({ item, index }: any) =>
                                        <View style={{
                                            padding: 5, justifyContent: "center",
                                            width: Dimensions.get('window').width
                                        }}>
                                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                                <AppTextHeader fontSize={20}>{item.exercise.mainList?.[0].name}</AppTextHeader>
                                            </View>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                <View style={{ paddingLeft: 30, top: 5 }}>
                                                    <AppTextHeader>Difficulty Level</AppTextHeader>
                                                    <DifficultyLevelIcon difficulty={this.state.exercise.difficultyLevel ? this.state.exercise.difficultyLevel : 1} animationX={-200} animationY={0} />
                                                </View>
                                                <TouchableOpacity style={{ justifyContent: "center", top: 5, right: 20 }}
                                                    onPress={() => {
                                                        this.setState({ superSetInfoModal: true, pickedSuperSet: item.exercise })
                                                    }}>
                                                    <IconGen name={'question'} size={50} backgroundColor={Colors.black} iconColor={Colors.mahogany} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    }
                                    horizontal={false}
                                    scrollEnabled={false}
                                    showsHorizontalScrollIndicator={false}
                                    ItemSeparatorComponent={() => <ListItemSeparator />}
                                />
                            </View>
                            <Modal style={{
                                backgroundColor: 'white',
                                margin: 0,
                                marginTop: 30,
                                alignItems: undefined,
                                justifyContent: undefined,
                            }} isVisible={this.state.superSetInfoModal}
                                swipeDirection={["up", "down"]}
                                swipeThreshold={5}
                                onSwipeComplete={(e) => { this.setState({ superSetInfoModal: false }) }}>
                                <View style={{ flex: 1 }}>
                                    <View style={{ flex: .5, backgroundColor: Colors.inactiveTint, marginTop: 0 }}>
                                        <VideoPlayer videoUrl={this.state.pickedSuperSet.videoURL || "error"} />
                                    </View>
                                    <Animated.View style={[this.state.fullListIntroAnimation.getLayout(), { flex: .95, paddingLeft: 20, paddingRight: 40, backgroundColor: Colors.skyBlue }]}>
                                        <AnimatedExerciseTrainingList data={this.state.pickedSuperSet} />
                                    </Animated.View>
                                    <View style={{ flex: .5, flexDirection: "row", backgroundColor: Colors.white, justifyContent: "space-between", alignItems: "flex-end" }}>
                                        <View style={{ paddingLeft: 15, paddingTop: 10, bottom: 70 }}>
                                            <AppTextHeader>Difficulty Level</AppTextHeader>
                                            <DifficultyLevelIcon difficulty={this.state.pickedSuperSet.difficultyLevel ? this.state.pickedSuperSet.difficultyLevel : 1} animationX={200} animationY={0} />
                                        </View>
                                    </View>
                                </View>
                            </Modal>
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