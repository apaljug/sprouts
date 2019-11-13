import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
           Text,
           TextInput,
           View,
           Button,
           Image,
           TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase'
import GlobalStyle from 'style/GlobalStyle'

export default class NewPlant extends React.Component {
  static navigationOptions = {
    //   Add props
    title: 'New Plant',
  };

  constructor(props) {
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);

    this.state = {
      currentUser: null,
      plantType: '',
      location: -1
    }
  };

  componentDidMount() {
       const { currentUser } = firebase.auth()
       this.setState({ currentUser });
       const { navigation } = this.props;
       this.setState({location: JSON.stringify(navigation.getParam('location','-1'))});
  }

  handleSubmit = async () => {
    //e.preventDefault();
    const { currentUser } = firebase.auth()
    const userId = firebase.auth().currentUser.uid;

    const userRef = firebase.database().ref('users/'+ userId+"/plants/"+
      this.state.location);
    const addPlant =
    {
            plantType: this.state.plantType,
            plantLocation: this.state.location,
            timeToHarvest: 30,
            height: 0,
            lastHarvest: 0
    };

    userRef.set(addPlant);
    this.props.navigation.navigate('QR');
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={{height: 90, marginBottom: '20%', marginTop: '-20%'}}>
          <Image source={require('../assets/sproutLogo.png')}
                 style={[{flex: 1, aspectRatio: 2, resizeMode: 'contain'}, GlobalStyle.shadow]}/>
        </View>
        <TextInput
          placeholder="Plant Type"
          autoCapitalize="words"
          style={styles.textInput}
          onChangeText={type => this.setState({plantType: type})}
          value={this.state.name}
        />
          <TouchableOpacity
            type="submit"
            onPress={this.handleSubmit}
            style={[styles.signUpButton, GlobalStyle.shadow]}
          >
            <Text style={styles.signUpText}>
              Create Plant.
            </Text>
            <Text>
              {JSON.stringify(navigation.getParam('location', 'NO-LOCATION'))}
            </Text>
          </TouchableOpacity>
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '80%',
    borderColor: '#B7B7B7',
    borderBottomWidth: 1,
    marginTop: 8,
  },
  signUpButton: {
    backgroundColor: '#56CE64',
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: 10000,
    marginTop: 50,
    marginBottom: 20,
  },
  signUpText: {
    color: 'white',
    fontSize: 15
  },
});
