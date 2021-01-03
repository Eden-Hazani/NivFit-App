import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { LoadingAnimation } from '../animations/LoadingAnimation';
import { AchievementWindow } from '../components/AchievementWindow';
import { AppText } from '../components/AppText';
import { AppTextHeader } from '../components/AppTextHeader';
import { WeeklyProgram } from '../components/WeeklyProgram';
import { TrainingProgramModal } from '../models/TrainingProgramModal';
import { Colors } from '../utility/colors';
import { IconGen } from '../utility/IconGen';
import Modal from 'react-native-modal';
const { width, height } = Dimensions.get('screen');

interface PersonalSpaceState {
    colorBarStartAnimation: Animated.ValueXY
    FavoriteButtonMoveAnimation: Animated.ValueXY
    ButtonSizeEntranceAnimation: Animated.Value
    headerStartAnimation: Animated.ValueXY
    weekProgramStartAnimation: Animated.ValueXY
    achievementsStartAnimation: Animated.ValueXY
    activeWeeklyProgram: TrainingProgramModal
    loading: boolean
    achievementModal: boolean
}

export class PersonalSpace extends Component<{ navigation: any }, PersonalSpaceState>{
    navigationSubscription: any;

    constructor(props: any) {
        super(props)
        this.state = {
            achievementModal: false,
            achievementsStartAnimation: new Animated.ValueXY({ x: -200, y: 0 }),
            loading: true,
            activeWeeklyProgram: new TrainingProgramModal(),
            headerStartAnimation: new Animated.ValueXY({ x: 0, y: -60 }),
            FavoriteButtonMoveAnimation: new Animated.ValueXY({ x: -200, y: 0 }),
            ButtonSizeEntranceAnimation: new Animated.Value(0),
            colorBarStartAnimation: new Animated.ValueXY({ x: -500, y: -500 }),
            weekProgramStartAnimation: new Animated.ValueXY({ x: 0, y: 500 }),
        }
        this.navigationSubscription = this.props.navigation.addListener('focus', this.onFocus);

    }

    animateStartColorBar = () => {
        Animated.sequence([
            Animated.timing(this.state.colorBarStartAnimation, {
                toValue: { x: -200, y: -170 },
                duration: 300,
                useNativeDriver: false
            }),
        ]).start()
    }
    animateStartFavoriteButton = () => {
        Animated.sequence([
            Animated.timing(this.state.FavoriteButtonMoveAnimation, {
                toValue: { x: 0, y: 0 },
                duration: 300,
                useNativeDriver: false
            }),
        ]).start()
    }
    animateStartButtonSizeEntrance = () => {
        Animated.sequence([
            Animated.timing(this.state.ButtonSizeEntranceAnimation, {
                toValue: 1,
                duration: 450,
                useNativeDriver: false
            }),
        ]).start()
    }
    animateStartHeaderText = () => {
        Animated.sequence([
            Animated.timing(this.state.headerStartAnimation, {
                toValue: { x: 0, y: 0 },
                duration: 450,
                useNativeDriver: false
            }),
        ]).start()
    }
    animateStartWeekProgram = () => {
        Animated.sequence([
            Animated.timing(this.state.weekProgramStartAnimation, {
                toValue: { x: 0, y: 0 },
                duration: 450,
                useNativeDriver: false
            }),
        ]).start()
    }
    animateStartAchievements = () => {
        Animated.sequence([
            Animated.timing(this.state.achievementsStartAnimation, {
                toValue: { x: -100, y: -100 },
                duration: 450,
                useNativeDriver: false
            }),
        ]).start()
    }

    getActiveTrainingProgram = async () => {
        const trainingProgramString = await AsyncStorage.getItem('activeTrainingProgram');
        if (!trainingProgramString) {
            this.setState({ loading: false })
            return
        }
        const trainingProgram = JSON.parse(trainingProgramString);
        this.setState({ activeWeeklyProgram: trainingProgram, loading: false })
    }

    onFocus = () => {
        this.getActiveTrainingProgram()
    }

    componentDidMount() {
        this.animateStartAchievements()
        this.getActiveTrainingProgram()
        this.animateStartColorBar()
        this.animateStartFavoriteButton()
        this.animateStartButtonSizeEntrance()
        this.animateStartHeaderText()
        this.animateStartWeekProgram()
    }

    render() {
        return (
            <View>
                {this.state.loading ? <LoadingAnimation visible={this.state.loading} /> :
                    <View>

                        <Animated.View style={[this.state.colorBarStartAnimation.getLayout(), { position: 'absolute', backgroundColor: Colors.lightGray, width: width * 2, height: 400, transform: [{ rotate: '-35deg' }] }]} />
                        <Animated.Text style={[styles.headerText, this.state.headerStartAnimation.getLayout()]}>YOUR PERSONALIZED {'\n'}TRAINING SPACE</Animated.Text>
                        <View style={{ alignItems: "flex-start", left: 40, top: height / 6.5 }}>
                            <Animated.View style={[this.state.FavoriteButtonMoveAnimation.getLayout(), {
                                transform: [
                                    {
                                        scale: this.state.ButtonSizeEntranceAnimation.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [.2, 1]
                                        })
                                    },
                                ]
                            }]}>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('FavoriteItemList') }}
                                    style={[{
                                        backgroundColor: Colors.skyBlue, width: 110, height: 110,
                                        borderRadius: 100, justifyContent: "flex-end", alignItems: "center"
                                    }]}>
                                    <View style={{ top: 10 }}>
                                        <AppTextHeader fontSize={12} letterSpacing={3}>FAVORITES</AppTextHeader>
                                    </View>
                                    <IconGen name={"heart"} size={70} />
                                </TouchableOpacity>
                            </Animated.View>
                        </View>

                        <View style={{ alignItems: "flex-start", left: 150 }}>
                            <Animated.View style={[this.state.achievementsStartAnimation.getLayout(), {
                                transform: [
                                    {
                                        scale: this.state.ButtonSizeEntranceAnimation.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [.2, 1]
                                        })
                                    },
                                ]
                            }]}>
                                <TouchableOpacity onPress={() => { this.setState({ achievementModal: true }) }} style={[{
                                    backgroundColor: Colors.skyBlue, width: 105, height: 105,
                                    borderRadius: 100, justifyContent: "flex-end", alignItems: "center"
                                }]}>
                                    <View style={{ top: 10 }}>
                                        <AppTextHeader textAlign={'center'} fontSize={12} letterSpacing={1}>Achievements</AppTextHeader>
                                    </View>
                                    <IconGen name={"star"} size={70} />
                                </TouchableOpacity>
                            </Animated.View>
                        </View>

                        <View style={{ alignItems: "flex-start", left: 150, top: -height / 5.2 }}>
                            <Animated.View style={[this.state.FavoriteButtonMoveAnimation.getLayout(), {
                                transform: [
                                    {
                                        scale: this.state.ButtonSizeEntranceAnimation.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [.2, 1]
                                        })
                                    },
                                ]
                            }]}>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('PickTrainingPrograms') }} style={[{
                                    backgroundColor: Colors.skyBlue, width: 110, height: 110,
                                    borderRadius: 100, justifyContent: "flex-end", alignItems: "center"
                                }]}>
                                    <View style={{ top: 10 }}>
                                        <AppTextHeader textAlign={'center'} fontSize={12} letterSpacing={3}>TRAINING PROGRAMS</AppTextHeader>
                                    </View>
                                    <IconGen name={"file-document-outline"} size={70} />
                                </TouchableOpacity>
                            </Animated.View>
                        </View>

                        <Animated.View style={[this.state.weekProgramStartAnimation.getLayout(), { left: 30, alignItems: "center" }]}>
                            <AppTextHeader fontSize={20}>YOUR WEEKLY PROGRAM</AppTextHeader>
                            {this.state.activeWeeklyProgram.week ?
                                <WeeklyProgram trainingProgram={this.state.activeWeeklyProgram} navigation={this.props.navigation} />
                                :
                                <AppText fontSize={15} width={width / 1.3} textAlign={'center'}>No Program selected, please choose one from the various training programs</AppText>
                            }
                        </Animated.View>
                    </View>
                }
                <Modal style={{
                    backgroundColor: 'white',
                    margin: 0,
                    marginTop: 30,
                    alignItems: undefined,
                    justifyContent: undefined,
                }} isVisible={this.state.achievementModal}
                    swipeDirection={["up", "down"]}
                    swipeThreshold={5}
                    onSwipeComplete={(e) => { this.setState({ achievementModal: false }) }}>
                    <View style={{ flex: 1 }}>
                        <AchievementWindow />
                    </View>
                </Modal>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    headerText: {
        fontFamily: "Raleway-ExtraBold",
        letterSpacing: 3,
        fontSize: 18
    }
});