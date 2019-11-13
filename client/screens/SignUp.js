// SignUp.js
import React from 'react'
import { StyleSheet,
         Text,
         TextInput,
         View,
         Button,
         Image,
         TouchableOpacity,
        } from 'react-native'
import firebase from 'react-native-firebase'
import GlobalStyle from '../style/GlobalStyle'
export default class SignUp extends React.Component {

  state = {name: '',
           email: '',
           password: '',
           errorMessage: null };

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('FirstTime'))
      .catch(error => this.setState({ errorMessage: error.message }))
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{height: 90, marginBottom: '20%', marginTop: '-20%'}}>
          <Image source={require('../assets/sproutLogo.png')}
                 style={[{flex: 1, aspectRatio: 2, resizeMode: 'contain'}, GlobalStyle.shadow]}/>
        </View>
        <TextInput
          placeholder="Name"
          autoCapitalize="words"
          style={styles.textInput}
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        {this.state.errorMessage &&
        <Text style={{ color: 'red', padding: 15 }}>
          {this.state.errorMessage}
        </Text>}
        <TouchableOpacity
          type="submit"
          onPress={this.handleSignUp}
          style={[styles.signUpButton, GlobalStyle.shadow]}
        >
          <Text style={styles.signUpText}>
            Sign Up
          </Text>
        </TouchableOpacity>
        <Button
          title="Already have an account? Login"
          color={'#56CE64'}
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
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
