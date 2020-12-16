import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { LoadingAnimation } from '../animations/LoadingAnimation';
import { AppText } from '../components/AppText';
import { AppTextHeader } from '../components/AppTextHeader';
import { VideoPlayer } from '../components/VideoPlayer';
import { ExerciseModel } from '../models/ExerciseModel';
import { Colors } from '../utility/colors';
import { requireCouchImageSwitch } from '../utility/requireCouchImageSwitch';
const { width, height } = Dimensions.get('screen');
interface ViewExerciseState {
    exercise: ExerciseModel;
    loading: boolean;
    couchImage: any;
}

export class ViewExercise extends Component<{ route: any }, ViewExerciseState> {
    constructor(props: any) {
        super(props)
        this.state = {
            exercise: new ExerciseModel(),
            loading: true,
            couchImage: requireCouchImageSwitch(this.props.route.params.exercise.instructorImg)
        }

    }
    componentDidMount() {
        this.setState({ exercise: this.props.route.params.exercise }, () => {
            this.setState({ loading: false })
        })
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.loading ? <LoadingAnimation visible={this.state.loading} />
                    :
                    <View style={styles.container}>
                        <View style={{ flex: .3, backgroundColor: Colors.inactiveTint, marginTop: 15 }}>
                            <VideoPlayer videoUrl={this.state.exercise.videoURL || "error"} />
                        </View>
                        <View style={{ flex: .5, paddingLeft: 20, paddingRight: 40, backgroundColor: Colors.skyBlue }}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ width: width / 2 }}>
                                    <AppTextHeader fontSize={22}>{this.state.exercise.name}</AppTextHeader>
                                </View>
                                <View>
                                    <Image style={{ width: 150, height: 150 }} resizeMode="center" source={this.state.couchImage} />
                                </View>
                            </View>
                            <AppText fontSize={18}>{this.state.exercise.description}</AppText>
                        </View>
                        <View style={{ flex: .3, backgroundColor: Colors.white }}>

                        </View>
                    </View>
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.inactiveTint
    }
});