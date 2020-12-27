import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { TrainingProgramModal } from '../../models/TrainingProgramModal';
import * as trainingJson from '../../jsonDump/trainingPrograms.json';
import { TrainingProgramListItem } from '../../components/ListComponents/TrainingProgramListItem';

interface PickTrainingProgramsState {
    trainingPrograms: TrainingProgramModal[]
}

export class PickTrainingPrograms extends Component<{ navigation: any }, PickTrainingProgramsState>{
    constructor(props: any) {
        super(props)
        this.state = {
            trainingPrograms: trainingJson.programs as any
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    keyExtractor={(item: any, index: any) => index.toString()}
                    data={this.state.trainingPrograms}
                    renderItem={({ item, index }: any) => <TrainingProgramListItem {...item}
                        padding={20} width={60} height={60}
                        headTextAlign={"left"}
                        subTextAlign={"left"}
                        direction={'row'}
                        justifyContent={"flex-start"} textDistanceFromImg={10}
                        onPress={() => { this.props.navigation.navigate("ViewTrainingProgram", { program: item }) }} />}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {

    }
});