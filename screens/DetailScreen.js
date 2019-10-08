import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel'
import GlobalStyle from '../style/GlobalStyle';

const screenWidth = Dimensions.get('window').width

class DetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Tips',
  };

  static defaultProps = {
    entries: [
      {image: require('assets/basil-leaves-herb.jpg')},
      {image: require('assets/images.jpeg')}
    ],
    title: 'Growth Indicators',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }

  _renderItem ({item, index}) {
    return (
        <View style={styles.slide}>
            <Image source={item.image} style={styles.image}/>
        </View>
    )
  }

  render() {
    console.log(this.props.entries)
    return (
      <Fragment>
        <SafeAreaView>
          <ScrollView>
            <View style={styles.body}>
              <Text style={[GlobalStyle.fontStyles, styles.header]}>{this.props.title}</Text>
              <Carousel
                ref={(c) => {this._carousel = c; }}
                data={this.props.entries}
                renderItem={this._renderItem}
                sliderWidth={screenWidth}
                // TODO: Fix this jank shit
                itemWidth={200}
              />
              <Text style={styles.sectionDescription}>
                {this.props.body}
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  imageView: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  header: {
    textAlign: 'left',
    fontSize: 22,
    fontWeight: 'bold',
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

export default DetailScreen;