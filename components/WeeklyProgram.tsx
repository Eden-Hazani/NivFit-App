import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Dimensions, Modal } from 'react-native';
import { LoadingAnimation } from '../animations/LoadingAnimation';
import { TrainingProgramModal } from '../models/TrainingProgramModal';
import { Colors } from '../utility/colors';
import { IconGen } from '../utility/IconGen';
import { AppButton } from './AppButton';
import { AppText } from './AppText';
import { AppTextHeader } from './AppTextHeader';
const { width, height } = Dimensions.get('screen');

interface WeeklyProgramState {
    activeWeekDay: number
    restDayMessageModal: boolean
    weekDays: any[]
    loading: boolean
    completedDatesArray: boolean[]
}

export class WeeklyProgram extends Component<{ trainingProgram: TrainingProgramModal, navigation: any }, WeeklyProgramState> {
    navigationSubscription: any;
    constructor(props: any) {
        super(props)
        this.state = {
            completedDatesArray: [],
            loading: true,
            weekDays: [],
            activeWeekDay: this.getDate(),
            restDayMessageModal: false
        }
        this.navigationSubscription = this.props.navigation.addListener('focus', this.onFocus);
    }

    onFocus = () => {
        this.setState({ loading: true }, () => {
            this.setState({ weekDays: this.setWholeDateList() }, () => {
                this.programsThatHaveBeenCompleted().then(() => {
                    this.setState({ loading: false })
                })
            })
        });
    }

    componentDidMount() {
        this.setState({ weekDays: this.setWholeDateList() }, () => {
            this.programsThatHaveBeenCompleted().then(() => {
                this.setState({ loading: false })
            })
        })
    }

    getDate = () => {
        const date = new Date();
        const day = date.getDay();
        return day
    }

    setWholeDateList = () => {
        const date = new Date();
        const currentDay = date.getDay()
        const wholeDate = date.toLocaleDateString()
        const dateList = [{ day: 'Sunday', date: "" }, { day: "Monday", date: "" }, { day: "Tuesday", date: "" }, { day: "Wednesday", date: "" },
        { day: "Thursday", date: "" }, { day: "Friday", date: "" }, { day: "Saturday", date: "" }]
        dateList[currentDay] = { day: dateList[currentDay].day, date: wholeDate }
        const newDateList = dateList.map((item, index) => {
            const newObjDate = `${new Date(new Date().getTime() + (24 * 60 * 60 * 1000) * (- currentDay + index))}`
            const cleanTimeObj = `${newObjDate.substr(3, 4)} ${newObjDate.substr(8, 2)}/${newObjDate.substr(13, 2)}`
            return item = { day: item.day, date: cleanTimeObj }
        })
        return newDateList
    }

    setWeekDayIcon = (item: string) => {
        const day = this.props.trainingProgram.week && Object.entries(this.props.trainingProgram.week).find((day, index) => {
            if (day[0] === item.toLowerCase()) {
                return day[1]
            }
        })
        if (day && day[1].length > 0) {
            return "dumbbell"
        } else {
            return "coffee"
        }
    }

    openProgramDay = (currentDay: string) => {
        const day = this.props.trainingProgram.week && Object.entries(this.props.trainingProgram.week).find((day, index) => {
            if (day[0] === currentDay.toLowerCase()) {
                return day[1]
            }
        })
        if (day && day[1].length === 0) {
            this.setState({ restDayMessageModal: true })
            return;
        } else {
            day && this.props.navigation.navigate("TrainingProgramRun", { program: day[1] })
        }
    }

    programsThatHaveBeenCompleted = async () => {
        const finishedDatesString = await AsyncStorage.getItem("finishedProgramDates");
        console.log(finishedDatesString)
        if (finishedDatesString) {
            for (let item of JSON.parse(finishedDatesString)) {
                let completedDatesArray = this.state.weekDays.map((day, index) => {
                    if (item === day.date) {
                        return true
                    } else {
                        return false
                    }
                })
                this.setState({ completedDatesArray })
            }
        }
    }

    render() {
        return (
            <View>
                {this.state.loading ? <LoadingAnimation visible={this.state.loading} /> :
                    <View>
                        <View>
                            <AppTextHeader textAlign={'center'}>{this.props.trainingProgram.name}</AppTextHeader>
                        </View>
                        <View style={styles.container}>
                            <FlatList
                                contentContainerStyle={{
                                    alignSelf: "flex-start",
                                    alignItems: "center"
                                }}
                                keyExtractor={(item: any, index: any) => index.toString()}
                                data={this.state.weekDays}
                                numColumns={4}
                                renderItem={({ item, index }: any) =>
                                    <View>
                                        <View style={this.state.completedDatesArray[index] ? styles.showCompletedIcon : styles.hideCompletedIcon}>
                                            <IconGen backgroundColor={Colors.white} size={45} name={'check'} iconColor={'green'} />
                                        </View>
                                        <TouchableOpacity
                                            disabled={index === this.state.activeWeekDay ? false : true}
                                            onPress={() => { this.openProgramDay(item.day) }}
                                            style={[styles.item,
                                            { backgroundColor: index === this.state.activeWeekDay ? Colors.skyBlue : Colors.inactiveTint }]} key={index}>
                                            <AppTextHeader textAlign={'center'}>{item.day.substr(0, 3)}</AppTextHeader>
                                            <IconGen size={40} name={this.setWeekDayIcon(item.day)} />
                                        </TouchableOpacity>
                                        <AppText textAlign={'center'}>{item.date}</AppText>
                                    </View>}
                                scrollEnabled={true}
                            />
                        </View>
                        <Modal visible={this.state.restDayMessageModal} animationType="slide">
                            <View style={{ flex: 1 }}>
                                <View style={{ flex: .3, justifyContent: "center", alignItems: "center" }}>
                                    <IconGen name={'coffee'} size={150} />
                                </View>
                                <View style={{ flex: .5, padding: 5 }}>
                                    <AppTextHeader textAlign={'center'} fontSize={25}>It's your rest day!</AppTextHeader>
                                    <AppText textAlign={'center'} fontSize={17}>Enjoy your well earned day off</AppText>
                                    <AppText textAlign={'center'} fontSize={17}>If you feel energetic we recommend going for a jog or a run to improve your overall health</AppText>
                                </View>
                                <View style={{ flex: .3 }}>
                                    <AppButton title={"Ok"} width={120} height={70} fontSize={22} backgroundColor={Colors.skyBlue} borderRadius={20} onPress={() => { this.setState({ restDayMessageModal: false }) }} />
                                </View>
                            </View>
                        </Modal>
                    </View>
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width
    },
    item: {
        alignItems: "center",
        justifyContent: "center",
        width: 70,
        height: 70,
        borderRadius: 70,
        margin: 5
    },
    showCompletedIcon: {
        position: "absolute",
        zIndex: 10,
        justifyContent: "center",
        alignItems: "center",
        top: 25,
        right: 60,
        left: 0,
        bottom: 0,
    },
    hideCompletedIcon: {
        display: "none"
    }
});