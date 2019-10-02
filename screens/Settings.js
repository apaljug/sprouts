// Settings.js
import React, {Fragment} from 'react'
import {   SafeAreaView,
  StyleSheet, Platform,   StatusBar,
  Switch, Text, View , Button} from 'react-native'
import firebase from 'react-native-firebase'
import GlobalStyle from 'style/GlobalStyle'

export default class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      nutrientDays: 0,
      waterLevel: 0,
    };
  }

  render() {
    const { currentUser } = this.state;

    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Text style={[GlobalStyle.fontStyles, styles.header]}>Settings</Text>
          <Text>{currentUser}</Text>
        </SafeAreaView>
      </Fragment>
    );
  }
}



const styles = StyleSheet.create({
  body: {
    backgroundColor: '#FFFFFF',
  },
  header: {
    textAlign: 'center',
    fontSize: 30,
    margin: 10,
  },
});
