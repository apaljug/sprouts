import React from 'react'

import {
  View,
  Text,
  Image,
  Button
 } from 'react-native';
class TipCard extends React.Component {

  constructor(props) {
    super(props);

    //console.log("This1", this)

  }

  onPress() {
    //console.log("This2", this)

    this.props.navigation.navigate('DetailScreen')
  }

  render() {
    return (
      <View>
        {/* TODO: Will change this to touchable opacity when I update styles   */}
        <Button title="DetailView" onPress={this.onPress.bind(this)}/>
        <Image source={require('assets/sproutLogo.png')} style={{width: 20, height: 20}}/>
        <Text>Harvest</Text>
        <Text>Learn how to harvest your plant</Text>
      </View>
    )
  }
}

export default TipCard
