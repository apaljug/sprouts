import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createSwitchNavigator,createAppContainer } from 'react-navigation'
import firebase from 'react-native-firebase';
// import the different screens
import Loading from './Loading'
import SignUp from './SignUp'
import Login from './Login'
import Main from './Main'
// create our app's navigation stack
const RootStack = createSwitchNavigator (
  {
    Loading,
    SignUp,
    Login,
    Main
  },
  {
    initialRouteName: 'Loading'
  }
)
const appNav = createAppContainer(RootStack);

export default appNav
