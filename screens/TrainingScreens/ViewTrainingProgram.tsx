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
import * as Notifications from 'expo-notifications';
import NumberTimeScroll from '../../components/ListComponents/NumberTimeScroll';
const { width, height } = Dimensions.get('screen');

interface ViewTrainingProgramState {
    trainingProgram: TrainingProgramModal
    approveModal: boolean
    loading: boolean
    timeFormat: string
    setHours: string,
    setMins: string
}
const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];

export class ViewTrainingProgram extends Component<{ navigation: any, route: any }, ViewTrainingProgramState>{
    constructor(props: any) {
        super(props)
        this.state = {
            setHours: "",
            setMins: "",
            timeFormat: "24H",
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
            this.scheduleNotification()
            this.setState({ approveModal: false })
            this.props.navigation.navigate("PersonalSpace")
        });
    }


    setTimeFromAmPm = (item: string) => {
        const time = item.substr(0, 2);
        if (item.includes("am")) {
            if (time === "12") { // 12am edge-case
                return parseInt(time.replace(item.slice(0, 2), "24"));
            }
            return parseInt(time)
        }
        if (item.includes("pm")) {
            if (time !== "12") {
                return parseInt(time.replace(item.slice(0, 2), String(parseInt(time) + 12)))
            }
            return parseInt(time);
        }
        //if 24H
        return parseInt(time);
    }


    scheduleNotification = async () => {
        if (this.state.trainingProgram.week) {
            Notifications.cancelAllScheduledNotificationsAsync();
            let index: number = 1;
            for (let item of Object.entries(this.state.trainingProgram.week)) {
                if (item[1].length > 0) {
                    Notifications.scheduleNotificationAsync({
                        content: {
                            title: 'You have a workout today!',
                            body: "Get up and go sweat!",
                        },
                        trigger: {
                            channelId: `trainingDayNotification${index}`,
                            weekday: index,
                            hour: this.state.setHours !== "" ? this.setTimeFromAmPm(this.state.setHours) : 13,
                            minute: this.state.setMins !== "" ? parseInt(this.state.setMins) : 0,
                            repeats: true
                        }
                    });

                }
                index++
            }
        }
    };

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
                                <View style={{ flex: .4 }}>
                                    <ConfirmedAnimation visible={this.state.approveModal} />
                                </View>
                                <View style={{ flex: .4 }}>
                                    <AppTextHeader textAlign={'center'} fontSize={25}>You have selected your new training program!</AppTextHeader>
                                    <AppText textAlign={'center'} fontSize={17}>Remember that you can switch these programs at any time, although we do recommend that you try and stick with one program for at least a couple of weeks</AppText>
                                </View>

                                <View style={{ flex: .5, justifyContent: "center", alignItems: "center" }}>
                                    <View style={{ padding: 12 }}>
                                        <AppText textAlign={'center'} fontSize={17}>Want to set a reminder for your workouts?</AppText>
                                        <AppText textAlign={'center'} fontSize={17}>Pick a time of day and NivFit will notify you :)</AppText>
                                    </View>
                                    <View style={{ alignSelf: "flex-end", right: 30 }}>
                                        <AppButton title={`${this.state.timeFormat}`} width={50} height={50} fontSize={15} backgroundColor={Colors.skyBlue}
                                            borderRadius={50} onPress={() => {
                                                this.state.timeFormat === "24H" ? this.setState({ timeFormat: "AMPM" }) : this.setState({ timeFormat: "24H" })
                                            }} />
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: width / 1.2 }}>
                                        <NumberTimeScroll startLetter={"H"} timeFormat={this.state.timeFormat} getValue={(val: any) => {
                                            this.setState({ setHours: val.viewableItems[0].item })
                                        }} />
                                        <NumberTimeScroll startLetter={"M"} timeFormat={"Mins"} getValue={(val: any) => { this.setState({ setMins: val.viewableItems[0].item }) }} />
                                    </View>
                                </View>
                                <View style={{ flex: .2 }}>
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