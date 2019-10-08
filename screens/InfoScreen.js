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

const screenWidth = Dimensions.get('window').width

class InfoScreen extends React.Component {
  static navigationOptions = {
    //   Add props
    title: 'Peppers',
  };

  static defaultProps = {
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [{
        data: [ 20, 45, 28, 80, 99, 43 ]
      }]
    }
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView>
          <Text>Your Plant</Text>
          <LineChart          
            data={this.props.data}
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
          {/* TODO: Update to props */}
          <Text>23 days</Text>
          <Text>Current Height</Text>
          <Text>15 in</Text>
          <Text>Last Harvest</Text>
          <Text>17 days ago</Text>

          <Text>Tips</Text>
          <TipCard/>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
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