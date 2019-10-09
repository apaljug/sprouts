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
import GlobalStyle from 'style/GlobalStyle';

const screenWidth = Dimensions.get('window').width

class InfoScreen extends React.Component {

  static navigationOptions = {
    //   Add props
    title: 'Peppers',
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
  }

  constructor(props) {
    super(props);
    this.state = {
      graph: props.graph,
      harvestTime: props.harvestTime,
      height: props.height,
      lastHarvest: props.lastHarvest,
    };
  }

  componentDidMount() {
    newGraph = {
      data: [ 200, 10, 28, 80, 99, 100 ]
    }
    this.setState({
      graph: {
        labels: this.state.graph.labels,
        datasets: [newGraph]
      }
    })
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView>
          <View style={styles.wrapper}>
            <Text style={[styles.header, GlobalStyle.fontStyles]}>Your Plant</Text>
            <Text style={[styles.title, GlobalStyle.fontStyles]}>Growth</Text>

            <LineChart          
              data={this.state.graph}
              width={screenWidth - 50}
              height={220}
              withDots={false}
              withInnerLines={false}
              bezier
              style={{borderRadius: 12}}
              chartConfig={{
                // backgroundGradientFrom: '#000000',
                // backgroundGradientTo: '#000000',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientFromOpacity: 1,
                backgroundGradientTo: '#ffffff',
                backgroundGradientToOpacity: 1,
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => {
                  return `rgba(75, 75, 75, 0.9)`
                }, // Gray until I can figure out how to differiate label color from line color
                style: {
                  borderRadius: 16
                }
              }}
            />

            <View style={styles.stats}>
              <View style={styles.labels}>
                <Text style={[styles.label, GlobalStyle.fontStyles]}>Time to Harvest</Text>
                <Text style={[styles.label, GlobalStyle.fontStyles]}>Current Height</Text>
                <Text style={[styles.label, GlobalStyle.fontStyles]}>Last Harvest</Text>
              </View>
              <View style={styles.entries}>
                <Text style={[styles.entry, GlobalStyle.fontStyles]}>{this.state.height} in</Text>
                <Text style={[styles.entry, GlobalStyle.fontStyles]}>{this.state.harvestTime} days</Text>
                <Text style={[styles.entry, GlobalStyle.fontStyles]}>{this.state.lastHarvest} days ago</Text>
              </View>
            </View>

            <Text style={[styles.header, GlobalStyle.fontStyles]}>Tips</Text>
            <TipCard navigation={this.props.navigation}/>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 0,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    marginEnd: 5,
    marginBottom: 2,
  },
  labels: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  entry: {
    marginStart: 5,
    marginBottom: 2,
    fontSize: 15,
    flexDirection: 'column'
  },
  entries: {
    // marginBottom: 5,
  },
  stats: {
    alignSelf: 'center',
    flexDirection: 'row',
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
  wrapper: {
    marginHorizontal: 25,
  }
});

export default InfoScreen;