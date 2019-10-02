import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';

import firebase from 'react-native-firebase';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createSwitchNavigator } from 'react-navigation'
import GlobalStyle from './style/GlobalStyle'
// import the different screens
import Loading from 'screens/Loading'
import SignUp from 'screens/SignUp'
import Login from 'screens/Login'
import Main from 'screens/Main'
import Settings from 'screens/Settings'
// create our app's navigation stack
const AuthStack = createSwitchNavigator({
    Loading: {
      screen: Loading
    },
    SignUp: {
      screen: SignUp
    },
    Login: {
      screen: Login
    },
  });

const MainStack = createStackNavigator({
    Main: {
      screen: Main,
    },
    Settings: {
      screen: Settings,
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        height: 60,
      },
      headerTitleStyle: {
        fontWeight: 'normal',
        fontSize: 25,
        color: GlobalStyle.fontStyles.color,
      },
    }
  });

const RootStack = createSwitchNavigator(  {
    Loading: {
      screen: AuthStack,
    },
    Main: {
      screen: MainStack,
    },
  },
  {
    initialRouteName: 'Loading'
  });

const AppContainer = createAppContainer(RootStack);
export default AppContainer;
