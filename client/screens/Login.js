// Login.js
import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ImageBackground, TouchableOpacity, Image
} from 'react-native'
import firebase from 'react-native-firebase'
import GlobalStyle from "../style/GlobalStyle";
export default class Login extends React.Component {

  state = { email: '', password: '', errorMessage: null };

  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
  };

  render() {
    return (
      <ImageBackground source={require('../assets/trees.png')}
                       style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <View style={{height: 90, marginBottom: '20%', marginTop: '-20%'}}>
            <Image source={require('../assets/sproutLogo.png')}
                   style={[{flex: 1, aspectRatio: 2, resizeMode: 'contain'}, GlobalStyle.shadow]}/>
          </View>
          <View style={styles.whiteBox}>
            <TextInput
              style={[styles.textInput, GlobalStyle.fontStyles, {borderBottomWidth: 1}]}
              autoCapitalize="none"
              placeholder="Email"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
            <TextInput
              secureTextEntry
              style={[styles.textInput, GlobalStyle.fontStyles]}
              autoCapitalize="none"
              placeholder="Password"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
            {this.state.errorMessage &&
            <Text style={{ color: 'red', padding: 10 }}>
              {this.state.errorMessage}
            </Text>}
          </View>
          <TouchableOpacity
            type="submit"
            onPress={this.handleLogin}
            style={[styles.loginButton, GlobalStyle.shadow]}
          >
            <Text style={[styles.loginText, GlobalStyle.fontStyles]}>
              Login
            </Text>
          </TouchableOpacity>
          <Button
            title="Don't have an account? Sign Up"
            color={'white'}
            onPress={() => this.props.navigation.navigate('SignUp')}
          />
        </View>
      </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 50,
    width: '85%',
    fontSize: 15,
    borderColor: '#B7B7B7',
    color:'white'
  },
  loginButton: {
    backgroundColor: 'white',
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: 10000,
    marginTop: 50,
    marginBottom: 20,
  },
  loginText: {
    fontSize: 15
  },
  whiteBox: {
    backgroundColor: 'white',
    width: '90%',
    alignItems: 'center',
    borderRadius: 10,
  }
});
