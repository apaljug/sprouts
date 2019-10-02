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

    this.componentDidMount = this.componentDidMount.bind(this);

    this.state = {
      currentUser: null,
      nutrientDays: 0,
      waterLevel: 0,
    };
  }

  static navigationOptions = { title: 'Settings' };

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  render() {
    const { currentUser } = this.state;

    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Text>{currentUser && currentUser.email}</Text>
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
