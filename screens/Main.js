// Main.js
import React, {Fragment} from 'react'
import {   SafeAreaView,
StyleSheet, Platform,   StatusBar,
  Switch, Text, View , Button} from 'react-native'
import firebase from 'react-native-firebase'
import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation'

import PlantCircle from 'components/PlantCircle'
import ProgressCircle from 'components/ProgressCircle'
import GlobalStyle from 'style/GlobalStyle'
import ToggleSwitch from 'components/ToggleSwitch'

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateCircles = this.updateCircles.bind(this);

    this.state = {
      currentUser: null,
      nutrientDays: 0,
      waterLevel: 0,
    };
  }

  static navigationOptions = { header: null };
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.updateCircles();
        /*const userId = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + userId).set({
          waterLevel: .25,
          nutrientDays: 30
        });*/
      } else {
        this.props.navigation.navigate('Login')
      }
    })
    const { currentUser } = firebase.auth()
    this.setState({ currentUser });

  }
  updateCircles() {
    const userId = firebase.auth().currentUser.uid;
    console.log(userId +"id")

    firebase.database().ref('/users/' + userId ).once('value').then(function(snapshot) {
      this.setState({nutrientDays: snapshot.val().nutrientDays,
        waterLevel: snapshot.val().waterLevel});
      console.log(snapshot.val().nutrientDays + "toasty")
    }.bind(this));
  }

  navigateToDetails() {

  }

  render() {
    const { currentUser } = this.state;

    const DIAMETER = 75;
    const startValue = true;

    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View>
            <View style={styles.navBar}>
              <View style={styles.leftContainer}>
                <View style={{marginLeft: 25}}>
                  <Icon name={'cog'}
                        type={'font-awesome'}
                        color={'#707070'}
                        onPress={() => this.props.navigation.navigate('Settings')}
                  />
                </View>
              </View>
              <Text style={[GlobalStyle.fontStyles, styles.header]}>My Dashboard</Text>
              <View style={styles.rightContainer}/>
            </View>
            <View style={[styles.modWrapper, {backgroundColor: '#8BD9C7'}]}>
              <Text style={[GlobalStyle.fontStyles, styles.modTitle]}>
                My Plants
              </Text>
              <Text style={[GlobalStyle.fontStyles, styles.modSubtitle]}>
                My Planter
              </Text>
              <View style={styles.circleRow}>
                <PlantCircle hasPlant={true} percent={0.8} diameter={DIAMETER} navigation={this.props.navigation}/>
                <PlantCircle diameter={DIAMETER} navigation={this.props.navigation}/>
                <PlantCircle diameter={DIAMETER} navigation={this.props.navigation}/>
              </View>
              <View style={styles.circleRow}>
                <PlantCircle diameter={DIAMETER} navigation={this.props.navigation}/>
                <PlantCircle diameter={DIAMETER} navigation={this.props.navigation}/>
                <PlantCircle diameter={DIAMETER} navigation={this.props.navigation}/>
              </View>
            </View>
          </View>

          <View style={[styles.modWrapper, {backgroundColor: '#FCD488'}]}>
            <View style={{flexDirection: 'row'}}>
              <View style={{alignSelf: 'flex-start'}}>
                <Text style={[GlobalStyle.fontStyles, styles.modLeftTitle]}>
                  Lights
                </Text>
                <Text style={[GlobalStyle.fontStyles, styles.modLeftSubtitle]}>
                  My Planter
                </Text>
              </View>
              <View style={{marginLeft: 'auto', marginTop: 3}}>
                <ToggleSwitch/>
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 25}}>

            <View style={[styles.modWrapper, {backgroundColor: '#88C3FC', marginRight: 10, marginLeft: 0}]}>
              <Text style={[GlobalStyle.fontStyles, styles.modTitle]}>
                Water
              </Text>
              <Text style={[GlobalStyle.fontStyles, styles.modSubtitle]}>
                My Planter
              </Text>
              <View style={{justifyContent: 'center'}}>
                <View style={styles.centerText}>
                  <Text style={{color: "#0361F8", fontSize: 20}}>
                    {this.state.waterLevel * 100}%
                  </Text>
                </View>
                <ProgressCircle percent={this.state.waterLevel} primaryColor={"#0361F8"} secondaryColor={"#6BA3FD"}/>
              </View>
            </View>

            <View style={[styles.modWrapper, {backgroundColor: '#75D091', marginLeft: 10, marginRight: 0}]}>
              <Text style={[GlobalStyle.fontStyles, styles.modTitle]}>
                Nutrients
              </Text>
              <Text style={[GlobalStyle.fontStyles, styles.modSubtitle]}>
                My Planter
              </Text>
              <View style={{justifyContent: 'center'}}>
                <View style={styles.centerText}>
                  <Text style={{color: "#008E2C", fontSize: 20}}>
                    {this.state.nutrientDays}
                  </Text>
                  <Text style={{color: "#008E2C", fontSize: 10}}>
                    days left
                  </Text>
                </View>
                <ProgressCircle percent={(this.state.nutrientDays)/30} primaryColor={"#008E2C"} secondaryColor={"#7CEB9E"}/>
              </View>
            </View>
          </View>
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
  modWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginHorizontal: 25,
    marginTop: 15,
    borderRadius: 10,
    padding: 15,
    paddingHorizontal: 25,
    shadowColor: 'black',
    shadowRadius: 6,
    shadowOpacity: 0.16,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  modTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 0,
    fontSize: 20,
  },
  modSubtitle: {
    textAlign: 'center',
    fontSize: 10,
    marginBottom: 15,
  },
  modLeftTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  modLeftSubtitle: {
    fontSize: 10,
  },
  circleRow: {
    alignSelf: 'center',
    flexDirection: 'row',
    textAlign: 'center',
  },
  centerText: {
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center'
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems:'center'
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  settings: {
    marginLeft: 25
  }
});
