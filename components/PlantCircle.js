import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import GlobalStyle from 'style/GlobalStyle'

class PlantCircle extends React.Component {
  constructor(props) {
    super(props);

    this.displayInternals = this.displayInternals.bind(this);

    this.state = {
      hasPlant: this.props.hasPlant,
      percent: this.props.percent,
    };
  }

  circleStyle = function(d) {
    return {
      width: d,
      height: d,
      borderRadius: d/2,
      backgroundColor: '#FFFFFF',
      overflow: 'hidden',
    }
  };

  displayInternals() {
    if (this.state.hasPlant) {
      return  <TouchableOpacity
                className="GeneralButton"
                type="submit"
                style={[this.circleStyle(this.props.diameter), styles.wrapper, GlobalStyle.shadow]}
                onPress={this.selectPath.bind(this)}
              >
                <View style={[styles.circleFill, { height: (this.state.percent*100)+'%' }]} />
                <Text style={[styles.plantText, GlobalStyle.fontStyles]}> plant </Text>
              </TouchableOpacity>;
    } else {
      return  <TouchableOpacity
                className="GeneralButton"
                type="submit"
                style={[this.circleStyle(this.props.diameter), styles.wrapper, GlobalStyle.shadow]}
                onPress={this.selectPath.bind(this)}
              >
                <Text style={[styles.plusIcon, GlobalStyle.fontStyles]}> + </Text>
              </TouchableOpacity>;
    }
  }

  selectPath() {
    if (this.props.hasPlant) {
      this.props.navigation.navigate('InfoScreen')
    } else {
      this.props.navigation.navigate('NewPlant', {location: this.props.location})
    }
  }

  render() {
    return (
      <TouchableOpacity
        className="GeneralButton"
        type="submit"
        style={[this.circleStyle(this.props.diameter), styles.wrapper, GlobalStyle.shadow]}
        onPress={this.selectPath.bind(this)}
      >
        {this.displayInternals()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  plusIcon: {
    fontSize: 45,
    fontWeight: '200',
    paddingBottom: 5,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 11,
  },
  plantText: {
    fontSize: 20,
    position: 'absolute',
  },
  circleFill: {
    backgroundColor: '#BCE1FF',
    width: '100%',
    bottom: 0,
    position: 'absolute'
  }
});

export default PlantCircle;
