import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Dimensions, Modal } from 'react-native';
import { ConfettiAnimation } from '../../animations/ConfettiAnimation';
import { AppButton } from '../../components/AppButton';
import { AppText } from '../../components/AppText';
import { AppTextHeader } from '../../components/AppTextHeader';
import { TrainingExerciseModal } from '../../models/TrainingExerciseModal';
import { Colors } from '../../utility/colors';
import { ViewTrainingProgramExercise } from './ViewTrainingProgramExercise';

interface TrainingProgramRunState {
    program: TrainingExerciseModal[]
    finishedModal: boolean
    listEnded: boolean
}

export class TrainingProgramRun extends Component<{ navigation: any, route: any }, TrainingProgramRunState>{
    private flatList: any
    constructor(props: any) {
        super(props)
        this.state = {
            finishedModal: false,
            listEnded: false,
            program: this.props.route.params.program
        }
    }
    finishedDateProgram = async () => {
        const newObjDate = `${new Date(new Date().getTime())}`
        const cleanTimeObj = `${newObjDate.substr(3, 4)} ${newObjDate.substr(8, 2)}/${newObjDate.substr(13, 2)}`
        const finishedPrograms = await AsyncStorage.getItem('finishedProgramDates');
        if (!finishedPrograms) {
            await AsyncStorage.setItem('finishedProgramDates', JSON.stringify([`${newObjDate.substr(3, 4)} ${newObjDate.substr(8, 2)}/${newObjDate.substr(13, 2)}`])).then(() => {
                this.setState({ finishedModal: false }, () => {
                    this.props.navigation.navigate("PersonalSpace");
                })
            });
            return
        }
        const objFinishedPrograms = JSON.parse(finishedPrograms);
        objFinishedPrograms.push(`${newObjDate.substr(3, 4)} ${newObjDate.substr(8, 2)}/${newObjDate.substr(13, 2)}`);
        await AsyncStorage.setItem('finishedProgramDates', JSON.stringify(objFinishedPrograms));
    }
    componentDidMount() {
        console.log(this.state.program)
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    keyExtractor={(item: any, index: any) => index.toString()}
                    data={this.state.program}
                    renderItem={({ item, index }: any) =>
                        <View style={{ flex: 1, height: Dimensions.get('screen').height - 70 }}>
                            <ViewTrainingProgramExercise program={item} />
                            <View style={{ alignItems: "flex-end", right: 10, bottom: 15 }}>
                                {this.state.listEnded ?
                                    <AppButton
                                        borderRadius={20} title={"Finish!"} backgroundColor={Colors.skyBlue} width={100} height={50} onPress={() => { this.setState({ finishedModal: true }) }} />
                                    :
                                    <AppButton disabled={this.state.listEnded ? true : false}
                                        borderRadius={20} title={"Next Exercise"} backgroundColor={Colors.skyBlue} width={100} height={50} onPress={() => this.flatList.scrollToIndex({ index: index + 1 })} />
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
                    <ConfettiAnimation visible={this.state.finishedModal} />
                    <AppTextHeader textAlign={'center'} fontSize={25} color={Colors.skyBlue}>You have Finished your workout for today!</AppTextHeader>
                    <AppText textAlign={'center'} fontSize={18} padding={5}>Don't forget to stretch out and go grab something healthy to eat :)</AppText>
                    <AppButton
                        borderRadius={20} title={"O.K"} backgroundColor={Colors.skyBlue}
                        width={100} height={50} onPress={() => { this.finishedDateProgram() }} />
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