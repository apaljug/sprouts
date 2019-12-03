// Main.js
import React, {Fragment} from 'react'
import {   SafeAreaView, ScrollView,
  StyleSheet, Platform,   StatusBar,
  Switch, Text, View , Button, TouchableOpacity, Animated} from 'react-native'
import firebase from 'react-native-firebase'
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationActions } from 'react-navigation'

import PlantCard from '../components/PlantCard';
import TipCard from '../components/TipCard';

import GlobalStyle from 'style/GlobalStyle';

export default class MainPlants extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);

    this.state = {
      currentUser: null,
      nutrientDays: 0,
      waterLevel: 0,
      lightOn: false,
      plant: [],
      curPlantName: "Red Lettuce",
      curPlantType: "Lettuce",
      curPlantDay: 20,
      curPlantNumber: 1,
      curHarvest: 0,
      curHarvestTotal: 10,
    };
  }

  static navigationOptions = { header: null };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.updatePlants();
      } else {
        this.props.navigation.navigate('Login')
      }
    });
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });

  }

  setSummary(plantNum) {
    console.log(this.state.plant)
    console.log(plantNum)
    plantNum = plantNum - 1;
    this.setState({
      curPlantName: this.state.plant[plantNum].plantName,
      curPlantType: this.state.plant[plantNum].plantType,
      curPlantDay: this.state.plant[plantNum].plantDay,
      curPlantNumber: this.state.plant[plantNum].plantNumber,
      curHarvest: this.state.plant[plantNum].harvest,
      curHarvestTotal: this.state.plant[plantNum].harvestTotal,
    })
  }

  updatePlants() {
    const userId = firebase.auth().currentUser.uid;
    var plants = [];

    firebase.database().ref('/users/' + userId + "/planter").once('value').then(function(snap) {
    var num = snap.val().number;
    for (var i = 1; i <= num; i++) {
      firebase.database().ref('/users/' + userId + "/plants/" + i).once('value').then(function(snapshot) {

        plants.push({
              plantName: snapshot.val().plantName,
              plantType: snapshot.val().plantType,
              plantDay: snapshot.val().plantDay,
              plantNumber: snapshot.val().plantNumber,
              harvest: snapshot.val().harvest,
              harvestTotal: snapshot.val().harvestTotal,
        });
        //this.setState({plantCount: count});
        this.setState({plant: plants});

      }.bind(this));
    }
    }.bind(this));
  }
  //update plant view based on clicks!



  render() {
    console.log(this.state)
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
              <Text style={[GlobalStyle.fontStyles, styles.header]}>Plants</Text>
              <View style={styles.rightContainer}>
                <View style={{marginRight: 25}}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('NewPlant')}>
                    <Text style={[GlobalStyle.fontStyles, {fontSize: 35, marginBottom: 4, fontWeight: '300'}]}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style = {{ shadowColor: 'black', shadowRadius: 6, shadowOpacity: 0.16, shadowOffset: {width: 0, height: 3}}}>
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0.7, y: 1 }} locations={[0.0, 0.99]} colors={['#67F55B', '#56D064']} style={[styles.modWrapper]}>
                <Text style = {[styles.summaryTitle]}>{this.state.curPlantName}</Text>
                <Text style = {[styles.summarySubTitle]}>{this.state.curPlantType} - Day {this.state.curPlantDay}</Text>
                <View style = {styles.summaryCircle}>
                  <Text style = {styles.summaryCircleText}>{this.state.curPlantNumber}</Text>
                </View>
                <Text style={{marginTop: 'auto', fontWeight: 'bold', fontSize: 20, color: 'white', marginBottom: 5}}>
                  Harvest
                </Text>
                <View style={styles.progressBar}>
                  <View style={styles.circle}/>
                  <Animated.View style={[{ backgroundColor: "#FFFFFF", width: 100 * this.state.curPlantDay / 30 + '%', height: '100%'}]}/>
                  <View style={{height: 10, width: 3, borderRadius: 10, backgroundColor: "white", overflow: 'visible'}}>
                    <Text style={{position:"absolute", top: -23, left: -10, width: 25, paddingVertical: 1, textAlign: 'center', backgroundColor: 'white', borderRadius: 5, fontWeight: 'bold', color: '#94F88C'}}>{this.state.curPlantDay}</Text>
                  </View>
                  <View style={[styles.circle, {marginLeft: 'auto', borderColor: '#C6C6C6'}]}/>
                </View>
                <View style={{flexDirection: 'row', marginTop: 7}}>
                  <Text style={{color: 'white'}}>Last - 0</Text>
                  <Text style={{marginLeft: 'auto', color: 'white'}}>Next - 30</Text>
                </View>
              </LinearGradient>
            </View>
            <ScrollView style={styles.sideScroll} horizontal={true} showsHorizontalScrollIndicator={false}>


            { this.state.plant.map(item => (
            <PlantCard key={item.plantNumber} num={item.plantNumber} type={item.plantType} name={item.plantName} update={this.setSummary.bind(this)}/>
          ))}

            </ScrollView>
          </View>
          <View style = {{marginHorizontal: 25}}>
            <Text style={[{marginBottom: 7.5, fontSize: 20, fontWeight: 'bold', marginTop: 30}, GlobalStyle.fontStyles]}></Text>
            <View style = {[{marginHorizontal: -7.5, backgroundColor: '#000000'}, styles.tipsContainer]}>
              <TipCard file = {'../assets/sproutLogo.png'} title = {"Plant Health"}/>
              <TipCard file = {'../assets/sproutLogo.png'} title = {"Harvesting"}/>
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
  circle: {
    backgroundColor: '#56CE64',
    borderColor: 'white',
    borderWidth: 2,
    height: 15,
    width: 15,
    borderRadius: 15/2,
  },
  modWrapper: {
    flexDirection: 'column',
    alignItems: 'stretch',
    marginHorizontal: 20,
    marginTop: 15,
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
    //Here is a hard coded height for the green box cause I wanted to see how it looked. This should be changed.
    height: 200,
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
  },
  sideScroll: {
    marginHorizontal: 12.5,
    marginTop: 7.5,
  },
  summaryTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  summarySubTitle: {
    fontSize: 13,
    color: 'white',
  },
  summaryCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    position: 'absolute',
    right: 20,
    top: 20,
  },
  summaryCircleText: {
    color: '#56CE64',
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 3,
  },
  tipsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  progressBar: {
    flexDirection: 'row',
    // alignContent: 'center',
    // marginTop: 'auto',
    marginTop: 20,
    alignItems: 'center',
    height: 3,
    width: '100%',
    backgroundColor: '#C6C6C6',
    borderWidth: 0,
    // borderRadius: 5
  },
});
