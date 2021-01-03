import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { LoadingAnimation } from '../animations/LoadingAnimation';
import { AchievementModal } from '../models/AchievementModal';
import { Colors } from '../utility/colors';
import { AppButton } from './AppButton';
import AnimatedAchievementList from './ListComponents/AnimatedAchievementList';

interface AchievementWindowState {
    loading: boolean
    achievements: AchievementModal[]
}

export class AchievementWindow extends Component<{}, AchievementWindowState>{
    constructor(props: any) {
        super(props)
        this.state = {
            achievements: [],
            loading: true
        }
    }

    loadAchievements = async () => {
        const stringedAchievements = await AsyncStorage.getItem('achievements');
        if (!stringedAchievements) {
            return
        }
        const achievements = JSON.parse(stringedAchievements);
        this.setState({ achievements })
    }

    async componentDidMount() {
        this.loadAchievements().then(() => {
            this.setState({ loading: false })
        })
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.loading ? <LoadingAnimation visible={this.state.loading} /> :
                    <View style={{ flex: 1 }}>
                        {this.state.achievements.length > 0 &&
                            <View style={{ flex: 1, bottom: 100 }}>
                                <AnimatedAchievementList data={this.state.achievements} />
                            </View>
                        }
                    </View>}

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1
    }
});