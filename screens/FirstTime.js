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
export default class FirstTime extends React.Component {



      constructor(props) {
             super(props);

             this.componentDidMount = this.componentDidMount.bind(this);

             this.state = {currentUser: null,
                      planterName: '',
              };
           }

           static navigationOptions = { header: null };
           componentDidMount() {
             const { currentUser } = firebase.auth()
             this.setState({ currentUser });


        }

/*
const userId = firebase.auth().currentUser.uid;
firebase.database().ref('users/' + userId).set({
  waterLevel: .25,
  nutrientDays: 30
});*/

            handleSubmit = async () => {

                //e.preventDefault();
                const { currentUser } = firebase.auth()
                const userId = firebase.auth().currentUser.uid;

                const userRef = firebase.database().ref('users/'+ userId);
                const planter =
                { planter:
                  {
                    planterName: this.state.planterName,
                    waterLevel: .75,
                    nutrientDays: `15`
                  },
                  plants:
                  {
                    plantA:"",
                  	plantB:"",
                  	plantC:"",
                  	plantD:"",
                  	plantE:"",
                  	plantF:""
                  }
                };
                userRef.set(planter);
                this.props.navigation.navigate('Main');

              }
  render() {
    return (
      <View style={styles.container}>
        <View style={{height: 90, marginBottom: '20%', marginTop: '-20%'}}>
          <Image source={require('../assets/sproutLogo.png')}
                 style={[{flex: 1, aspectRatio: 2, resizeMode: 'contain'}, GlobalStyle.shadow]}/>
        </View>
        <TextInput
          placeholder="Planter Name"
          autoCapitalize="words"
          style={styles.textInput}
          onChangeText={name => this.setState({planterName: name})}
          value={this.state.name}
        />

        <TouchableOpacity
          type="submit"
          onPress={this.handleSubmit}
          style={[styles.signUpButton, GlobalStyle.shadow]}
        >
          <Text style={styles.signUpText}>
            Continue
          </Text>
        </TouchableOpacity>
        <Button
          title="Already have an account? Login."
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
