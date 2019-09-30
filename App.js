import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';

import firebase from 'react-native-firebase';
import { createAppContainer } from 'react-navigation';
import { createSwitchNavigator } from 'react-navigation'
// import the different screens
import Loading from 'screens/Loading'
import SignUp from 'screens/SignUp'
import Login from 'screens/Login'
import Main from 'screens/Main'
// create our app's navigation stack
const RootStack = createSwitchNavigator(  {
    Loading,
    SignUp,
    Login,
    Main
  },
  {
    initialRouteName: 'Loading'
  });

const AppContainer = createAppContainer(RootStack);
export default AppContainer;
