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
import firebase from "react-native-firebase";

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

  constructor(props) {
    super(props)

    this.state = {
      entries: props.entries,
      title: props.title,
      body: props.body,
    }
  }

  _renderItem ({item, index}) {
    return (
      <View style={styles.imageView}>
        <Image source={item.image} style={styles.image}/>
      </View>
    )
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView>
          <ScrollView>
            <View style={styles.body}>
              <Text style={[GlobalStyle.fontStyles, styles.header]}>{this.state.title}</Text>
              <View style={styles.imageScrollView}>
                <Carousel
                  ref={(c) => {this._carousel = c; }}
                  data={this.state.entries}
                  renderItem={this._renderItem}
                  sliderWidth={screenWidth}
                  // TODO: Fix this jank shit (aka don't hardcode image size)
                  itemWidth={200}
                />
              </View>
              <Text style={[GlobalStyle.fontStyles, styles.sectionDescription]}>
                {this.state.body}
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
    marginVertical: 10,
  },
  image: {
    resizeMode: 'contain',
  },
  imageScrollView: {
    marginBottom: 10,
    marginTop: 0,
  },
  body: {
    marginHorizontal: 25,
  },
});

export default DetailScreen;
