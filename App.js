/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';
import {
  Header,
  Button
} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { TabNavigator } from "react-navigation";

import vhlHome from './src/components/VHLScreen/vhlHome';
import patientHome from './src/components/PatientScreen/patientHome';

const App = TabNavigator({
  VHL: {
    screen: vhlHome,
    navigationOptions: ({ navigation }) => ({
      title: 'VHL',
    }),
   },
  Patient: {
    screen: patientHome,
    navigationOptions: ({navigation}) => ({
      title: 'Patient',
    }),
  },
});


export default App;
