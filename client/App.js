import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';

import firebase from 'react-native-firebase';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import GlobalStyle from './style/GlobalStyle';
// import the different screens
import Loading from 'screens/Loading';
import SignUp from 'screens/SignUp';
import Login from 'screens/Login';
import Main from 'screens/Main';
import DetailScreen from 'screens/DetailScreen';
import InfoScreen from 'screens/InfoScreen';
import Settings from 'screens/Settings';
import FirstTime from 'screens/FirstTime';
import NewPlant from 'screens/NewPlant';
import QRScanner from './screens/QRScanner';
import MainPlants from './screens/MainPlants';
import MainControls from './screens/MainControls';

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
    FirstTime:{
      screen: FirstTime
    },
    InfoScreen: {
      screen: InfoScreen,
    },
    Settings: {
      screen: Settings,
    },
    NewPlant: {
      screen: NewPlant,
    },
    DetailScreen: {
      screen: DetailScreen,
    },
    QR: {
      screen: QRScanner,
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

const PlantStack = createStackNavigator ({
  Plants: {
    screen: MainPlants,
  },
  Settings: {
    screen: Settings,
  },
});

const ControlsStack = createStackNavigator ({
  Controls: {
    screen: MainControls,
  },
  Settings: {
    screen: Settings,
  },
});


const TabStack = createBottomTabNavigator ({
  Plants: {
    screen: PlantStack,
    navigationOptions:{
      tabBarLabel:'Plants',
      tabBarIcon:({tintColor})=>(
        <Icon name="seedling" color={tintColor} size={25}/>
      )
    }
  },
  Controls: {
    screen: ControlsStack,
    navigationOptions:{
      tabBarLabel:'Controls',
      tabBarIcon:({tintColor})=>(
        <Icon name="sliders-h" color={tintColor} size={25}/>
      )
    }
  },
},
{
  tabBarOptions: {
    activeTintColor: '#56CE64',
  }
});

const RootStack = createSwitchNavigator(  {
    Loading: {
      screen: AuthStack,
    },
    Main: {
      screen: TabStack,
    },
  },
  {
    initialRouteName: 'Main'
  });

const AppContainer = createAppContainer(RootStack);
export default AppContainer;
