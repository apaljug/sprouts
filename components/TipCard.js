import React from 'react'

import { 
  View,
  Text,
  Image
 } from 'react-native';
class TipCard extends React.Component {
  render() {
    return (
      <View>
        <Image source={require('assets/sproutLogo.png')} style={{width: 20, height: 20}}/>
        <Text>Harvest</Text>
        <Text>Learn how to harvest your plant</Text>
      </View>
    )
  }
}

export default TipCard