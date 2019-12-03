
import React, { Component, Fragment, View } from 'react';
import { StyleSheet } from 'react-native'

export default class Circle extends React.Component{
  static defaultProps = {
    color: '#1E95FA',
  }

  render() {
    return (
      <Fragment>
        <View style={[styles.outerCircle, {borderColor: this.props.color}]}><View style={[styles.innerCircle, {backgroundColor: this.props.color}]}/></View>
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  innerCircle: {
    position: 'absolute',
    width: 6,
    height: 6,
    zIndex: 1,
    left: 1,
    top: 1,
    borderRadius: 6/2,
  },
  outerCircle: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    height: 10,
    width: 10,
    borderRadius: 10/2,
    left: -4,
    position: 'absolute',
  },
})