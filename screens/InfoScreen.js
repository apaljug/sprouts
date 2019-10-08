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


  // render() {
  //   console.log(this.props.entries)
  //   return (
  //     <Fragment>
  //       <SafeAreaView>
  //         <ScrollView
  //           contentInsetAdjustmentBehavior="automatic"
  //           style={styles.scrollView}>
  //           {global.HermesInternal == null ? null : (
  //             <View style={styles.engine}>
  //               <Text style={styles.footer}>Engine: Hermes</Text>
  //             </View>
  //           )}
  //           <View style={styles.body}>
  //             <Text style={styles.sectionTitle}>Title Goes Here</Text>
  //             <Carousel
  //               ref={(c) => {this._carousel = c; }}
  //               data={this.props.entries}
  //               renderItem={this._renderItem}
  //               sliderWidth={250}
  //               itemWidth={100}
  //             />
  //             <Text style={styles.sectionDescription}>
  //               Body Goes Here
  //             </Text>
  //           </View>
  //         </ScrollView>
  //       </SafeAreaView>
  //     </Fragment>
  //   );
  // }
  render() {
    return (
      <Fragment>
        <SafeAreaView>
          <Text>Your Plant</Text>
          <LineChart          
            data={this.props.data}
            width={screenWidth}
            height={220}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
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