import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import GlobalStyle from '../style/GlobalStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from "react-native-linear-gradient";

export default class PlantCard extends React.Component {

  constructor(props) {
    super(props);
  }

  onPress() {
    this.props.navigation.navigate('DetailScreen')
  }

  get plantImage() {
    console.log(this.props.type);
    switch (this.props.type) {
      case "lettuce":
        return require('../assets/lettuceIcon.png');
      case "strawberry":
        return require('../assets/strawberryIcon.png');
      default:
        return require('../assets/sproutLogo.png');
    }
  }

  render() {
    /*const {typeDict} = {
      'Lettuce' : '../assets/lettuceIcon.png',
      'Strawberry' : '../assets/lettuceIcon.png',
    };*/

    return (
      <TouchableOpacity onPress={this.onPress.bind(this)} style={[styles.card, GlobalStyle.shadow]}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0.7, y: 1 }} locations={[0.0, 0.99]} colors={['#67F55B', '#56D064']} style={[styles.circle]}>
          <Text style={styles.circleText}>{this.props.num}</Text>
        </LinearGradient>
        <Image source={this.plantImage}
               style={[{aspectRatio: 2, resizeMode: 'contain'}, styles.imageDimensions]}/>
        <View style={styles.labels}>
          <Text style={[styles.title, GlobalStyle.fontStyles]}>{this.props.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    paddingBottom: 12,
    paddingTop: 23,
    paddingHorizontal: 5,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    flexDirection: 'column'
  },
  labels: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 15,
    marginTop: 3,
    textAlign: 'center',
  },
  imageDimensions: {
    height: 40,
  },
  circleText: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 2,
    fontSize: 13
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 15,
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 3,
    right: 3,
  }
});
