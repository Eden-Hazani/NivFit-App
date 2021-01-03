import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Modal } from 'react-native';
import { ConfirmedAnimation } from '../../animations/ConfirmedAnimation';
import { AppButton } from '../../components/AppButton';
import { AppText } from '../../components/AppText';
import { AppTextHeader } from '../../components/AppTextHeader';
import { ExerciseListItem } from '../../components/ListComponents/ExerciseListItem';
import * as muscleGroupFolder from "../../muscleAndTrainingJson";
import { TrainingExerciseModal } from '../../models/TrainingExerciseModal';
import { TrainingProgramModal } from '../../models/TrainingProgramModal';
import { Colors } from '../../utility/colors';
import { LoadingAnimation } from '../../animations/LoadingAnimation';
const { width, height } = Dimensions.get('screen');

interface ViewTrainingProgramState {
    trainingProgram: TrainingProgramModal
    approveModal: boolean
    loading: boolean
}
const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];

export class ViewTrainingProgram extends Component<{ navigation: any, route: any }, ViewTrainingProgramState>{
    constructor(props: any) {
        super(props)
        this.state = {
            loading: true,
            approveModal: false,
            trainingProgram: JSON.parse(JSON.stringify(this.props.route.params.program))
        }
    }
    componentDidMount() {
        const trainingProgram = { ...this.state.trainingProgram } as any
        Object.entries(this.props.route.params.program.week).map((item: any, index: number) => {
            if (item[1].length === 0) {
                return;
            }
            let innerIndex = 0;
            for (let itemParams of item[1]) {
                if (itemParams.superSet) {
                    const duplicate = JSON.parse(JSON.stringify(itemParams.superSet))
                    let superSet: any = [];
                    for (let superItem of duplicate) {
                        const systemMuscleGroup = muscleGroupFolder.muscleGroups.mainGroups.find((group) => group.name === superItem.muscleGroup)
                        const test = JSON.parse(JSON.stringify(systemMuscleGroup))
                        const exercisesList = getKeyValue(muscleGroupFolder, test?.systemName as any)
                        const exercise = exercisesList.exercises.find((exercise: any) => superItem.exercise === exercise.mainList[0].name);
                        superItem.exercise = exercise;
                        superSet.push(superItem)
                    }
                    trainingProgram.week[item[0]][innerIndex] = { superSet: superSet }
                } else {
                    const systemMuscleGroup = muscleGroupFolder.muscleGroups.mainGroups.find((group) => group.name === itemParams.muscleGroup)
                    const test = JSON.parse(JSON.stringify(systemMuscleGroup))
                    const exercisesList = getKeyValue(muscleGroupFolder, test?.systemName as any)
                    const exercise = exercisesList.exercises.find((exercise: any) => itemParams.exercise === exercise.mainList[0].name)
                    trainingProgram.week[item[0]][innerIndex].exercise = exercise
                }
                innerIndex++
            }
            this.setState({ trainingProgram, loading: false })
        })
    }

    setProgram = async () => {
        await AsyncStorage.setItem('activeTrainingProgram', JSON.stringify(this.state.trainingProgram)).then(() => {
            this.setState({ approveModal: false })
            this.props.navigation.navigate("PersonalSpace")
        });

    }

    render() {
        const training = this.state.trainingProgram as any
        return (
            <ScrollView style={styles.container}>
                {this.state.loading ? <LoadingAnimation visible={this.state.loading} /> :
                    <View>
                        {this.state.trainingProgram.week && Object.entries(this.state.trainingProgram.week).map((item: any, index: number) => {
                            if (item[1].length === 0) {
                                return <View key={index} style={{ borderColor: Colors.black, borderWidth: 1, borderRadius: 15, padding: 5, margin: 10 }}>
                                    <AppTextHeader textAlign={'center'} fontSize={25} letterSpacing={3}>{item[0].toUpperCase()}</AppTextHeader>
                                    <View style={{ padding: 15 }}>
                                        <AppTextHeader textAlign={'center'} fontSize={22} letterSpacing={2}>Rest Day</AppTextHeader>
                                    </View>
                                </View>
                            }
                            return <View key={index} style={{ borderColor: Colors.black, borderWidth: 1, borderRadius: 15, padding: 5, margin: 10 }}>
                                <AppTextHeader textAlign={'center'} fontSize={25} letterSpacing={3}>{item[0].toUpperCase()}</AppTextHeader>
                                {this.state.trainingProgram.week && Object.values(training.week[item[0]]).map((innerItem: any, index: number) => {
                                    if (innerItem.superSet) {
                                        return <View key={index} style={{ borderColor: Colors.mahogany, borderWidth: 2, borderRadius: 25, padding: 8, margin: 5 }}>
                                            <AppTextHeader textAlign={'center'} fontSize={20} color={Colors.mahogany}>Super Set</AppTextHeader>
                                            {
                                                innerItem.superSet.map((superItem: any, index: number) => {
                                                    return <ExerciseListItem  {...superItem.exercise} key={index}
                                                        padding={20} width={width / 1.2} height={60}
                                                        borderRadius={20}
                                                        headTextAlign={"left"}
                                                        subTextAlign={"left"}
                                                        direction={'row'}
                                                        justifyContent={"flex-start"} textDistanceFromImg={10}
                                                    />
                                                })
                                            }
                                        </View>
                                    }
                                    else if (innerItem.exercise.mainList !== undefined) {
                                        return <View key={index}>
                                            <ExerciseListItem  {...innerItem.exercise}
                                                padding={20} width={width / 1.1} height={60}
                                                borderRadius={20}
                                                headTextAlign={"left"}
                                                subTextAlign={"left"}
                                                direction={'row'}
                                                justifyContent={"flex-start"} textDistanceFromImg={10}
                                            />
                                        </View>
                                    }
                                })}
                            </View>

                        })}
                        <View style={{ padding: 20 }}>
                            <AppButton title={"Select Program"} width={120} height={70} fontSize={22} backgroundColor={Colors.skyBlue} borderRadius={20} onPress={() => { this.setState({ approveModal: true }) }} />
                        </View>
                        <Modal visible={this.state.approveModal}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flex: .3 }}>
                                    <ConfirmedAnimation visible={this.state.approveModal} />
                                </View>
                                <View style={{ flex: .5 }}>
                                    <AppTextHeader textAlign={'center'} fontSize={25}>You have selected your new training program!</AppTextHeader>
                                    <AppText textAlign={'center'} fontSize={17}>Remember that you can switch these programs at any time, although we do recommend that you try and stick with one program for at least a couple of weeks</AppText>
                                </View>
                                <View style={{ flex: .3 }}>
                                    <AppButton title={"Ok"} width={120} height={70} fontSize={22} backgroundColor={Colors.skyBlue} borderRadius={20} onPress={() => { this.setProgram() }} />
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

    }
});