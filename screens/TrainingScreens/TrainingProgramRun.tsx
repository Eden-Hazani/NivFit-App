import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Dimensions, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { ConfettiAnimation } from '../../animations/ConfettiAnimation';
import { AppButton } from '../../components/AppButton';
import { AppText } from '../../components/AppText';
import { AppTextHeader } from '../../components/AppTextHeader';
import checkForAchievement from '../../functions/checkForAchievement';
import { AchievementModal } from '../../models/AchievementModal';
import { TrainingExerciseModal } from '../../models/TrainingExerciseModal';
import { Colors } from '../../utility/colors';
import { IconGen } from '../../utility/IconGen';
import { ViewTrainingProgramExercise } from './ViewTrainingProgramExercise';

interface TrainingProgramRunState {
    program: TrainingExerciseModal[]
    finishedModal: boolean
    listEnded: boolean
    achievementOn: boolean
    achievementDetails: AchievementModal
}

export class TrainingProgramRun extends Component<{ navigation: any, route: any }, TrainingProgramRunState>{
    private flatList: any
    constructor(props: any) {
        super(props)
        this.state = {
            achievementOn: false,
            achievementDetails: new AchievementModal(),
            finishedModal: false,
            listEnded: false,
            program: this.props.route.params.program
        }
    }
    buildFinishModal = async () => {
        const newObjDate = `${new Date(new Date().getTime())}`
        const cleanTimeObj = `${newObjDate.substr(3, 4)} ${newObjDate.substr(8, 2)}/${newObjDate.substr(13, 2)}`
        const finishedPrograms = await AsyncStorage.getItem('finishedProgramDates');
        if (!finishedPrograms) {
            await AsyncStorage.setItem('finishedProgramDates', JSON.stringify([`${newObjDate.substr(3, 4)} ${newObjDate.substr(8, 2)}/${newObjDate.substr(13, 2)}`])).then(() => {
                this.eligibleForAchievement();
            });
            return
        }
        const objFinishedPrograms = JSON.parse(finishedPrograms);
        if (objFinishedPrograms.includes(cleanTimeObj)) {
            this.closeProgram();
            return;
        }
        objFinishedPrograms.push(cleanTimeObj);
        await AsyncStorage.setItem('finishedProgramDates', JSON.stringify(objFinishedPrograms)).then(() => {
            this.eligibleForAchievement();
        });
    }


    closeProgram = () => {
        this.setState({ finishedModal: false }, () => {
            this.props.navigation.navigate("PersonalSpace");
        })
    }



    eligibleForAchievement = async () => {
        const finishedPrograms = await AsyncStorage.getItem('finishedProgramDates');
        if (finishedPrograms) {
            const finishedProgramsObj = JSON.parse(finishedPrograms);
            const result = checkForAchievement(finishedProgramsObj.length);
            if (result) {
                this.setState({ achievementOn: true, achievementDetails: result }, async () => {
                    const userAchievements = await AsyncStorage.getItem('achievements');
                    if (userAchievements) {
                        const userAchievementsObj = JSON.parse(userAchievements);
                        userAchievementsObj.push(finishedProgramsObj.length);
                        AsyncStorage.setItem('achievements', JSON.stringify(userAchievementsObj))
                        this.setState({ finishedModal: true })
                        return;
                    }
                    AsyncStorage.setItem('achievements', JSON.stringify([finishedProgramsObj.length]))
                    this.setState({ finishedModal: true })
                })
                return;
            }
        }
        this.setState({ finishedModal: true })
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    keyExtractor={(item: any, index: any) => index.toString()}
                    data={this.state.program}
                    renderItem={({ item, index }: any) =>
                        <View style={{ flex: 1, height: Dimensions.get('window').height }}>
                            <ViewTrainingProgramExercise program={item} />
                            <View style={{ alignItems: "flex-end", right: 20, bottom: 65 }}>
                                {this.state.listEnded ?
                                    <AppButton
                                        borderRadius={20} title={"Finish!"} backgroundColor={Colors.skyBlue} width={100} height={50} onPress={() => { this.buildFinishModal() }} />
                                    :
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity style={{ margin: 5 }} onPress={() => { if (index !== 0) { this.flatList.scrollToIndex({ index: index - 1 }) } }}>
                                            <AppText fontSize={18} textAlign={'center'}>back</AppText>
                                            <IconGen name={"chevron-double-left"} size={50} backgroundColor={Colors.skyBlue} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ margin: 5 }} onPress={() => { this.flatList.scrollToIndex({ index: index + 1 }) }}>
                                            <AppText fontSize={18} textAlign={'center'}>next</AppText>
                                            <IconGen name={"chevron-double-right"} size={50} backgroundColor={Colors.skyBlue} />
                                        </TouchableOpacity>
                                        {/* <AppButton disabled={this.state.listEnded ? true : false}
                                            borderRadius={20} title={"Next Exercise"} backgroundColor={Colors.skyBlue} width={100} height={50} onPress={() => this.flatList.scrollToIndex({ index: index + 1 })} /> */}
                                        {/* <AppButton disabled={this.state.listEnded ? true : false}
                                            borderRadius={20} title={"Next Exercise"} backgroundColor={Colors.skyBlue} width={100} height={50} onPress={() => this.flatList.scrollToIndex({ index: index + 1 })} /> */}
                                    </View>
                                }
                            </View>

                        </View>
                    }
                    onEndReachedThreshold={0.5}
                    onEndReached={() => { this.setState({ listEnded: true }) }}
                    ref={ref => (this.flatList = ref)}
                    pagingEnabled
                    scrollEnabled={false}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                />
                <Modal visible={this.state.finishedModal}>
                    <ScrollView>
                        <ConfettiAnimation visible={this.state.finishedModal} />
                        <AppTextHeader textAlign={'center'} fontSize={25} color={Colors.skyBlue}>You have Finished your workout for today!</AppTextHeader>
                        <AppText textAlign={'center'} fontSize={18} padding={5}>Don't forget to stretch out and go grab something healthy to eat :)</AppText>
                        {this.state.achievementOn && this.state.achievementDetails.img &&
                            <View style={{ paddingTop: 15, justifyContent: "center", alignItems: "center" }}>
                                <AppTextHeader color={Colors.skyBlue} fontSize={22} textAlign={'center'}>You have collected an achievement!</AppTextHeader>
                                <AppText fontSize={18} textAlign={'center'}>{this.state.achievementDetails.description}</AppText>
                                <Image style={{ height: 150, width: 150 }} uri={this.state.achievementDetails.img} />
                            </View>
                        }
                        <View style={{ paddingTop: 20 }}>
                            <AppButton
                                borderRadius={20} title={"O.K"} backgroundColor={Colors.skyBlue}
                                width={100} height={50} onPress={() => { this.closeProgram() }} />
                        </View>
                    </ScrollView>
                </Modal>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});