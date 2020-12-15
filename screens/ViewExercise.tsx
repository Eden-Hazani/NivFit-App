import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { VideoPlayer } from '../components/VideoPlayer';
import { ExerciseModel } from '../models/ExerciseModel';

interface ViewExerciseState {
    exercise: ExerciseModel
    loading: boolean
}

export class ViewExercise extends Component<{ route: any }, ViewExerciseState> {
    constructor(props: any) {
        super(props)
        this.state = {
            exercise: new ExerciseModel(),
            loading: true
        }
    }
    componentDidMount() {
        this.setState({ exercise: this.props.route.params.exercise, loading: false })
        console.log(this.props.route.params.exercise)
    }
    render() {
        return (
            <View style={styles.container}>
                <VideoPlayer videoUrl={this.state.exercise.videoURL || "error"} />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {

    }
});