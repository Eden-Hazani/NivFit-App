import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Platform, StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native';
import AppNavigator from './navigators/AppNavigator';
import navigationTheme from './navigators/navigationTheme';
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelcomeScreenNavigator from './navigators/WelcomeScreenNavigator';
import MainContext from './utility/context';
import * as Updates from 'expo-updates';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

interface AppState {
  isReady: boolean
  isFirstUse: boolean
}

export class App extends React.Component<{}, AppState>{
  static contextType = MainContext;
  constructor(props: any) {
    super(props)
    this.state = {
      isReady: false,
      isFirstUse: false
    }

  }


  askPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return false;
    }
    return true;
  };

  checkForUpdates = async () => {
    if ((await Updates.checkForUpdateAsync()).isAvailable) {
      Updates.fetchUpdateAsync().then(() => {
        Updates.reloadAsync();
      })
    }
  }



  async componentDidMount() {
    if (!__DEV__) {
      this.checkForUpdates()
    }
    this.askPermissions()
    await AsyncStorage.removeItem('isFirstUse')
    const isFirstUse = await AsyncStorage.getItem('isFirstUse');
    if (isFirstUse === null) {
      this.setState({ isFirstUse: true })
    }
    Font.loadAsync({
      'Raleway-ExtraLight': require('./assets/fonts/Raleway-ExtraLight.ttf'),
      'Raleway-ExtraBold': require('./assets/fonts/Raleway-ExtraBold.ttf')
    }).then(() => {
      this.setState({ isReady: true })
    })
  }

  setFirstUse = (isFirstUse: boolean) => {
    this.setState((prevState) => ({ isFirstUse }))
  }

  render() {
    const firstUse = this.state.isFirstUse
    const { setFirstUse } = this
    console.log(firstUse)
    return (
      <SafeAreaView style={styles.container}>
        {this.state.isReady ?
          <MainContext.Provider value={{ firstUse, setFirstUse }}>
            <NavigationContainer onStateChange={() => { }} theme={navigationTheme}>
              {this.state.isFirstUse ? <WelcomeScreenNavigator /> : <AppNavigator />}
            </NavigationContainer>
          </MainContext.Provider>
          : <AppLoading />
        }
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});


export default App;