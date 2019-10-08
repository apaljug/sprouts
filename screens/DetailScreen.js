import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel'

class DetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Tips',
  };

  static defaultProps = {
    entries: [
      {image: require('assets/basil-leaves-herb.jpg')},
      {image: require('assets/images.jpeg')}
    ],
  }

  _renderItem ({item, index}) {
    return (
        <View style={styles.slide}>
            <Image source={item.image}/>
        </View>
    )
  }

  render() {
    console.log(this.props.entries)
    return (
      <Fragment>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <Text style={styles.sectionTitle}>Title Goes Here</Text>
              <Carousel
                ref={(c) => {this._carousel = c; }}
                data={this.props.entries}
                renderItem={this._renderItem}
                sliderWidth={250}
                itemWidth={100}
              />
              <Text style={styles.sectionDescription}>
                Body Goes Here
              </Text>
            </View>
          </ScrollView>
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

export default DetailScreen;