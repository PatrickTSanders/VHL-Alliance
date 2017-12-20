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
import pushNotification from './src/components/PushNotifications';

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
/*
const viewEx = {
  <Text>hi</Text>
};

https://github.com/react-community/react-navigation/issues/2145
export default class App extends React.Component {

    render(){
      return(
          <viewEx />
      );
    }

}
*/
