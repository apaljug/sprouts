import React, { Component } from 'react'
import { View, Switch, StyleSheet } from 'react-native'

class ToggleSwitch extends React.Component{

  constructor() {
    super();
    this.state = {
      value: false,
    }
  }

  ToggleSwitch = (value) => {
    this.setState({value: !this.state.value});
  };

  render() {
    return (
      <Switch
        style = {styles.switch}
        onValueChange = {this.toggleSwitch}
        value = {this.state.value}/>
    );
  }
}
const styles = StyleSheet.create ({
  switch: {
    backgroundColor: '#E5E5E5',
    borderRadius: 17,
  }
});

ToggleSwitch.defaultProps = {startValue: true};

export default ToggleSwitch
