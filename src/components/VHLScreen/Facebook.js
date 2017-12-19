import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  // Text,
  View,
  WebView
} from 'react-native';
// import {
//   Header,
//   Button
// } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';


const Facebook = ({ navigation }) => (
  // <View style={{ width: 300 }} >

    <WebView
      //source={{ uri: 'https://databank.vhl.org/' }}
      source={{ uri: 'http://m.facebook.com/VHLAlliance/' }}
      //style={{flex:1, marginTop: 0}}
      style={{flex:1}}
      scalesPageToFit={true}
      automaticallyAdjustContentInsets={false}
    />

  // </View>
);

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    flex: 1,
    marginTop: 100,
    justifyContent: 'space-between'

  }
});

export default Facebook;
