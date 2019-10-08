import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { LineChart } from 'react-native-chart-kit';
import { Carousel } from 'react-native-snap-carousel';
import TipCard from 'components/TipCard.js'
import firebase from "react-native-firebase";

const screenWidth = Dimensions.get('window').width

class InfoScreen extends React.Component {

  static navigationOptions = {
    //   Add props
    title: 'Plant',
  };

  static defaultProps = {
    graph: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [{
        data: [ 20, 10, 28, 80, 99, 100 ]
      }]
    },
    harvestTime: 23,
    height: 15,
    lastHarvest: 17,
    plantType: 'unknown',
  }

  constructor(props) {
    super(props);
    this.state = {
      graph: this.props.graph,
      harvestTime: this.props.harvestTime,
      height: this.props.height,
      lastHarvest: this.props.lastHarvest,
      plantType: this.props.plantType,
    };
  }

  componentDidMount() {
    this.updateLabels();
    newGraph = {
      data: [ 200, 10, 28, 80, 99, 100 ]
    };
    this.setState({
      graph: {
        datasets: [newGraph]
      }
    });
  }

  updateLabels() {
    const { navigation } = this.props;
    const userId = firebase.auth().currentUser.uid;
    const plantNum = JSON.stringify(navigation.getParam('location', 'NO-LOCATION'));
    firebase.database().ref('/users/' + userId + '/plants/' + plantNum).once('value').then(function(snapshot) {
      console.log(snapshot.val());
      this.setState({
        harvestTime: snapshot.val().timeToHarvest,
        height: snapshot.val().height,
        lastHarvest: snapshot.val().lastHarvest,
        plantType: snapshot.val().plantType,
      });

    }.bind(this));
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView>
          <Text style={styles.header}>Your Plant</Text>
          <Text style={styles.title}>Growth</Text>
          <LineChart
            data={this.state.graph}
            width={screenWidth}
            height={220}
            withDots={false}
            chartConfig={{
              backgroundGradientFrom: '#ffffff',
              backgroundGradientFromOpacity: '1',
              backgroundGradientTo: '#ffffff',
              backgroundGradientToOpacity: '1',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(10, 10, 10, ${opacity})`, // Gray until I can figure out how to differiate label color from line color
              style: {
                borderRadius: 16
              }
            }}
            bezier
          />
          <Text>Estimated Time to Harvest</Text>
          <Text>{this.state.harvestTime} days</Text>
          <Text>Current Height</Text>
          <Text>{this.state.height} in</Text>
          <Text>Last Harvest</Text>
          <Text>{this.state.lastHarvest} days ago</Text>

          <Text>Tips</Text>
          <TipCard navigation={this.props.navigation}/>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#707070', // TODO: This needs to be a variable
    margin: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#707070',
    margin: 10,
  },
  image: {
    resizeMode: 'contain',
    height: 200,
  },
  imageScrollView: {
    flexDirection: 'row',
    // showsHorizontalScrollIndicator: false,
    maxHeight: 200,
  },
});

export default InfoScreen;
