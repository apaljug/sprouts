import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import GlobalStyle from 'style/GlobalStyle'

class PlantCircle extends React.Component {

  circleStyle = function(d) {
    return {
      width: d,
      height: d,
      borderRadius: d/2,
      backgroundColor: '#FFFFFF',
    }
  };

  render() {
    return (
      <TouchableOpacity
        className="GeneralButton"
        type="submit"
        style={[this.circleStyle(this.props.diameter), styles.wrapper, GlobalStyle.shadow]}
      >
        <Text style={[styles.plusIcon, GlobalStyle.fontStyles]}>
          +
        </Text>
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
  }
});

export default PlantCircle;
