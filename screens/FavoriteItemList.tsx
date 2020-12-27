import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { LoadingAnimation } from '../animations/LoadingAnimation';
import { AppText } from '../components/AppText';
import { ExerciseListItem } from '../components/ListComponents/ExerciseListItem';
import { ExerciseModel } from '../models/ExerciseModel';
import { Colors } from '../utility/colors';
const { width, height } = Dimensions.get('screen');
interface FavoriteItemListState {
    startAnimation: Animated.ValueXY;
    favoriteList: ExerciseModel[]
    loading: boolean
    search: string
}

export class FavoriteItemList extends Component<{ navigation: any }, FavoriteItemListState>{
    navigationSubscription: any;
    constructor(props: any) {
        super(props)
        this.state = {
            search: "",
            startAnimation: new Animated.ValueXY({ x: 400, y: 0 }),
            favoriteList: [],
            loading: true
        }
        this.navigationSubscription = this.props.navigation.addListener('focus', this.onFocus);
    }
    componentDidMount() {
        this.getFavorites().then(() => {
            this.setState({ loading: false }, () => {
                this.startAnimation()
            })
        })
    }

    onFocus = async () => {
        this.setState({ loading: true }, () => {
            this.getFavorites().then(() => {
                this.setState({ loading: false }, () => {
                    this.startAnimation()
                })
            })
        })
    }

    getFavorites = async () => {
        const favoriteListString = await AsyncStorage.getItem('favoriteExercises');
        if (favoriteListString) {
            const favoriteList = JSON.parse(favoriteListString);
            this.setState({ favoriteList })
        }
    }

    updateSearch = async (search: string) => {
        this.setState({ search })
        if (search.trim() === "") {
            this.getFavorites()
            return;
        }
        const favoriteList = this.state.favoriteList.filter((favorite) => { return favorite.mainList && favorite.mainList[0] && favorite.mainList[0].name && favorite.mainList[0].name.includes(search) })
        if (favoriteList.length > 0) {
            this.setState({ favoriteList })
            return;
        }
        if (favoriteList.length === 0) {
            this.getFavorites()
            return;
        }
    }

    startAnimation = () => {
        Animated.sequence([
            Animated.timing(this.state.startAnimation, {
                toValue: { x: 15, y: 0 },
                duration: 300,
                useNativeDriver: false
            }),
            Animated.timing(this.state.startAnimation, {
                toValue: { x: 0, y: 0 },
                duration: 100,
                useNativeDriver: false
            }),
            Animated.timing(this.state.startAnimation, {
                toValue: { x: 5, y: 0 },
                duration: 100,
                useNativeDriver: false
            }),
            Animated.timing(this.state.startAnimation, {
                toValue: { x: 0, y: 0 },
                duration: 100,
                useNativeDriver: false
            }),
        ]).start()
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.loading ? <LoadingAnimation visible={this.state.loading} /> :
                    <View>
                        {this.state.favoriteList.length === 0 ?
                            <AppText textAlign={'center'}>dfgdfg</AppText>
                            :
                            <View>
                                <View style={{ width: width / 1.5, alignSelf: 'center' }}>
                                    <SearchBar
                                        searchIcon={false}
                                        containerStyle={{ backgroundColor: Colors.white, borderRadius: 150 }}
                                        inputContainerStyle={{ backgroundColor: Colors.white }}
                                        lightTheme={true}
                                        placeholder="Search Favorites"
                                        onChangeText={this.updateSearch}
                                        value={this.state.search}
                                    />
                                </View>
                                <Animated.FlatList
                                    style={this.state.startAnimation.getLayout()}
                                    keyExtractor={(item: any, index: any) => index.toString()}
                                    data={this.state.favoriteList}
                                    renderItem={({ item, index }: any) => <ExerciseListItem {...item}
                                        padding={20} width={width} height={60}
                                        headTextAlign={"left"}
                                        subTextAlign={"left"}
                                        direction={'row'}
                                        justifyContent={"flex-start"} textDistanceFromImg={10}
                                        onPress={() => { this.props.navigation.navigate("ViewExercise", { exercise: item }) }} />}
                                    pagingEnabled
                                    showsHorizontalScrollIndicator={false}
                                    scrollEventThrottle={16}
                                />

                            </View>
                        }
                    </View>
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {

    }
});