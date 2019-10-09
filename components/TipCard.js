import React from 'react'

import { 
  View,
  Text,
  Image,
  Button,
  StyleSheet
 } from 'react-native';

import GlobalStyle from 'style/GlobalStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';


class TipCard extends React.Component {
  
  constructor(props) {
    super(props);
  }

  onPress() {
    this.props.navigation.navigate('DetailScreen')
  }

  render() {
    return (
      <TouchableOpacity onPress={this.onPress.bind(this)} style={[styles.card, GlobalStyle.shadow]}>
        {/* TODO: Will change this to touchable opacity when I update styles   */}
        <Image source={require('assets/sproutLogo.png')} style={styles.icon}/>
        <View style={styles.labels}>
          <Text style={[styles.title, GlobalStyle.fontStyles]}>Harvest</Text>
          <Text style={[styles.subtitle, GlobalStyle.fontStyles]}>Learn how to harvest your plant</Text>
        </View>
        {/* <Image style={styles.arrow} source={require('assets/Arrow.png')}/> */}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 30, 
    height: 30,
    margin: 10,
  },
  card: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center'
  },
  labels: {
    flexDirection: 'column',
    margin: 5,
  },
  title: {
    fontSize: 15,
  },
  subtitle: {
    fontSize: 10,
  },
  arrow: {
    
  }
})

export default TipCard