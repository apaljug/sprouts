import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

class QRScanner extends Component {
  onSuccess = (e) => {
    // Linking
    //   .openURL(e.data)
    //   .catch(err => console.error('An error occured', err));
    this.props.navigation.navigate('Main');
  }

  render() {
    console.log(QRCodeScanner);
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        cameraProps={{captureAudio: false}}
        // flashMode={QRCodeScanner.Constants.FlashMode.torch}      
        topContent={
          <Text style={styles.centerText}>
            Scan the QR code located on the bottom of your pod
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>

            {/* TODO: Change to "go back" */}
            <Text style={styles.buttonText} onPress={this.onSuccess}>Skip</Text>
          </TouchableOpacity>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default QRScanner