import React, {Fragment} from 'react';
import {
  SafeAreaView,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { Carousel } from 'react-native-snap-carousel';

class NewPlant extends React.Component {
  static navigationOptions = {
    //   Add props
    title: 'New Plant',
  };

  render() {
    const { navigation } = this.props;
    return (
      <Fragment>
        <SafeAreaView>
          <Text>
            {JSON.stringify(navigation.getParam('location', 'NO-LOCATION'))}
          </Text>
        </SafeAreaView>
      </Fragment>
    );
  }
}

export default NewPlant;
