import React, {Fragment} from 'react';
import {
  SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import { Carousel } from 'react-native-snap-carousel';

class NewPlant extends React.Component {
  static navigationOptions = {
    //   Add props
    title: 'New Plant',
  };

  render() {
    return (
      <Fragment>
        <SafeAreaView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

export default NewPlant;
