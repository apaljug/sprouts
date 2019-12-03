// Main.js
import React, {Fragment} from 'react'
import {   SafeAreaView,
  StyleSheet, Platform,   StatusBar,
  Switch, Text, View , Button} from 'react-native'
import firebase from 'react-native-firebase'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { NavigationActions } from 'react-navigation'

import ProgressCircle from 'components/ProgressCircle'
import GlobalStyle from 'style/GlobalStyle'
import ToggleSwitch from 'components/ToggleSwitch'
import WaterLevel from 'components/WaterLevel';

export default class MainControls extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateCircles = this.updateCircles.bind(this);
    this.updateLight = this.updateLight.bind(this);

    this.state = {
      currentUser: null,
      nutrientDays: 0,
      waterLevel: 0,
      lightOn: false,
      temp: 0,
    };
  }

  static navigationOptions = { header: null };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.updateCircles();
        this.updateLight();
        /*const userId = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + userId).set({
          waterLevel: .25,
          nutrientDays: 30
        });*/
      } else {
        this.props.navigation.navigate('Login')
      }
    });
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
  }

  updateCircles() {
    const userId = firebase.auth().currentUser.uid;

    firebase.database().ref('/users/' + userId + "/planter").once('value').then(function(snapshot) {
      this.setState({nutrientDays: snapshot.val().nutrientDays,
        waterLevel: snapshot.val().waterLevel,
      temp:snapshot.val().temp},
      );
    }.bind(this));
  }

  updateLight() {
    const userId = firebase.auth().currentUser.uid;

    firebase.database().ref('/users/' + userId + "/planter").once('value').then(function(snapshot) {
      this.setState({
        lightOn: snapshot.val().lightOn
      });
    }.bind(this));
  }

  toggleSwitch = (value) => {
    this.setState({lightOn: value});
    const { currentUser } = firebase.auth();
    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref('users/'+ userId +'/planter').update({lightOn: value});
  };

  render() {
    const { currentUser } = this.state;
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
                        color={GlobalStyle.fontStyles.color}
                        size={20}
                        onPress={() => this.props.navigation.navigate('Settings')}
                  />
                </View>
              </View>
              <Text style={[GlobalStyle.fontStyles, styles.header]}>Controls</Text>
              <View style={styles.rightContainer}/>
            </View>
          </View>
          <View style={[styles.modWrapper, {backgroundColor: 'white'}]}>
            <View style={{flexDirection: 'row'}}>
              <View style = {styles.iconWrapper}>
                <Icon name={'lightbulb'}
                      size={40}
                      color={'#FFD138'}
                      onPress={() => this.props.navigation.navigate('Settings')}
                />
              </View>
              <View style={{alignSelf: 'flex-start'}}>
                <Text style={[GlobalStyle.fontStyles, styles.modLeftTitle]}>
                  Lights
                </Text>
                <Text style={[GlobalStyle.fontStyles, styles.modLeftSubtitle]}>
                  13 Hours/Day
                </Text>
              </View>
              <View style={{marginLeft: 'auto', marginTop: 3}}>
                <ToggleSwitch value={this.state.lightOn} toggleSwitch={this.toggleSwitch}/>
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 20}}>

            <View style={[styles.modWrapper, {backgroundColor: 'white', marginRight: 10, marginLeft: 0, flex: 1}]}>
              <Text style={[GlobalStyle.fontStyles, styles.modTitle]}>
                Water
              </Text>
              <View style = {{justifyContent: 'center', alignItems: 'center', marginTop: 13, marginBottom: 5}}>
                <WaterLevel selected={this.state.waterLevel}/>
              </View>
            </View>

            <View style={[styles.modWrapper, {backgroundColor: 'white', marginLeft: 10, marginRight: 0, flex: 1}]}>
              <Text style={[GlobalStyle.fontStyles, styles.modTitle]}>
                Nutrients
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
                <View style = {{justifyContent: 'center', alignItems: 'center', marginTop: 13, marginBottom: 5}}>
                  <ProgressCircle percent={(this.state.nutrientDays)/30} primaryColor={"#56CE64"} secondaryColor={"#BBFDB6"}/>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.modWrapper, {backgroundColor: 'white'}]}>
            <View style={{flexDirection: 'row'}}>
              <View style = {styles.iconWrapper}>
                <Icon name={'thermometer-half'}
                      size={40}
                      color={'#F05F5F'}
                      onPress={() => this.props.navigation.navigate('Settings')}
                />
              </View>
              <View style={{alignSelf: 'flex-start'}}>
                <Text style={[GlobalStyle.fontStyles, styles.modLeftTitle]}>
                  Temperature
                </Text>
                <Text style={[GlobalStyle.fontStyles, styles.modLeftSubtitle]}>
                  Ideal is 70º F
                </Text>
              </View>
              <View style={{marginLeft: 'auto', marginTop: 3}}>
                <Text style={styles.temperatureFont}>{Math.round(this.state.temp)}º F</Text>
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
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    padding: 15,
    paddingHorizontal: 20,
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
    fontSize: 13,
    marginBottom: 15,
  },
  modLeftTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  modLeftSubtitle: {
    fontSize: 13,
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
  },
  temperatureFont: {
    fontSize: 25,
    marginTop: 3,
  },
  iconWrapper: {
    marginRight: 20,
  },
});
