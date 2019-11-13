import React, { Component } from 'react'
import { View, Switch, StyleSheet } from 'react-native'

class ToggleSwitch extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch
        style = {styles.switch}
        onValueChange = {this.props.toggleSwitch}
        value = {this.props.value}
      />
    );
  }
}
const styles = StyleSheet.create ({
  switch: {
    backgroundColor: '#E5E5E5',
    borderRadius: 17,
  }
});

export default ToggleSwitch
