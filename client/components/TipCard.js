import React from 'react'

import {
  View,
  Text,
  ImageBackground,
  Button,
  StyleSheet
 } from 'react-native';

import GlobalStyle from 'style/GlobalStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class TipCard extends React.Component {

  constructor(props) {
    super(props);

    this.state =  {
      imageAddress: '../assets/sproutLogo.png',
    }
  }

  componentDidMount() {
    const backImage = this.props.file ? require('../assets/harvestLettuce.jpg') : require('../assets/sproutLogo.png');
    this.setState({imageAddress: backImage});
  }

  onPress() {
    this.props.navigation.navigate('DetailScreen')
  }

  render() {
    return (
      //<View style = {{width: '50%'}}>
        <TouchableOpacity onPress={this.onPress.bind(this)} style={[styles.card, GlobalStyle.shadow]}>
          <ImageBackground source={require('../assets/sproutLogo.png')} style={styles.imageWrapper}>
            <View style={styles.labels}>
              <Text style={[styles.title, GlobalStyle.fontStyles]}>{this.props.title}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      //</View>
    )
  }
}

const styles = StyleSheet.create({
  imageWrapper: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  card: {
    margin: 7.5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 100,
    flexBasis: '50%',
  },
  title: {
    fontSize: 15,
    margin: 20,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
