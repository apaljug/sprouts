// Main.js
import React from 'react'
import { StyleSheet, Button, Platform, Image, Text, View } from 'react-native'
import firebase from 'react-native-firebase'
export default class Main extends React.Component {
  state = { currentUser: null, loggedIn: null }
  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    /*firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    })*/
  }

render() {
    const { currentUser } = this.state
    //if (this.state.loggedIn) {
      return (
        <View style={styles.container}>
          <Text>
            Hi {currentUser && currentUser.email}!
          </Text>
        </View>
       /*<Button
        title="Sign out"
        onPress={() => firebase.auth().signOut()}
        />
      );
    } else {
      return (
        <Login/>
        */
      );
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
