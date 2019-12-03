import React, { Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class WaterLevel extends React.Component {
  static defaultProps = {
    height: 90,
    selected: 0,
  }

  render() {
    return (
      <View style={{flexDirection: "row"}}>
        <View style={styles.bar}>
          <LinearGradient colors={["#58AEFE", "#80C3FC", "#BDE1FF"]} style={[styles.rectangle, {height: this.props.height}]}/>
          <Circle/>
          <View style={{position: 'absolute', top: this.props.height / 2}}>
            <Circle color="#80C3FC"/>
          </View>
          <View style={{position: 'absolute', top: this.props.height}}>
            <Circle color="#BDE1FF"/>
          </View>
        </View>
        {/* Not sure why this doesn't align properly, temporary fix */}
        <View style={[styles.texts, {height: this.props.height + 12}]}>
          <LinearGradient 
            style={this.props.selected == 0 ? styles.selectedBackground : styles.unselected}
            start={{ x: 0, y: 2 }} 
            end={{ x: 0.7, y: 1 }} 
            locations={[0.0, 0.99]}
            colors={this.props.selected == 0 ? ["#8FC9F8", "#1E95FA"] : ['transparent']}>
            <Text style={this.props.selected == 0 ? styles.selectedText : styles.unselected}>Fully Filled</Text>
          </LinearGradient>

          <LinearGradient 
            style={this.props.selected == 1 ? styles.selectedBackground : styles.unselected}
            start={{ x: 0, y: 2 }} 
            end={{ x: 0.7, y: 1 }} 
            locations={[0.0, 0.99]}
            colors={this.props.selected == 1 ? ["#8FC9F8", "#1E95FA"] : ['transparent']}>
            <Text style={this.props.selected == 1 ? styles.selectedText : styles.unselected}>Partially Filled</Text>
          </LinearGradient>

          <LinearGradient 
            style={this.props.selected == 2 ? styles.selectedBackground : styles.unselected}
            start={{ x: 0, y: 2 }} 
            end={{ x: 0.7, y: 1 }} 
            locations={[0.0, 0.99]}
            colors={this.props.selected == 2 ? ["#8FC9F8", "#1E95FA"] : ['transparent']}>
            <Text style={this.props.selected == 2 ? styles.selectedText : styles.unselected}>Needs Filling</Text>
          </LinearGradient>
        </View>
      </View>
    )
  }
}

class Circle extends React.Component{
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
  bar: {
    flexDirection: "column",
    marginHorizontal: 10,
  },
  texts: {
    flexDirection: "column",
    justifyContent: "space-between"
  },
  rectangle: {
    position: 'absolute',
    backgroundColor: '#1E95FA',
    width: 2,
  },
  circle: {
    position: 'absolute',
    width: 6,
    height: 6,
    zIndex: 1,
    left: -2,
    borderRadius: 6/2,
    backgroundColor: '#1E95FA'
  },
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
  selectedText: {
    textAlign: "center",
    color: '#F5F5F5',
  },
  selectedBackground: {
    borderRadius: 10,
    height: 22,
    width: '110%',
  },
  unselected: {
    textAlign: "center",
    color: '#D9D9D9',
  },
});