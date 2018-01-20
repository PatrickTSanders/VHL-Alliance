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

import Icon from 'react-native-vector-icons/Entypo';

import OneSignal from 'react-native-onesignal';


class AppBeginning extends Component {

  componentDidMount() {
    //Decide whether to ask for permission on app open for notifications
      OneSignal.configure({});

    }

    render() {
      return (
        <AppBeginningNav />
      )
    }
  }

const AppBeginningNav = TabNavigator({
  VHL: {
    screen: vhlHome,
    navigationOptions: ({ navigation }) => ({
      title: 'VHL',
      tabBarIcon: ({ tintColor }) => (
      <Icon
        name='home'
        size={30}
        color="#4F8EF7"
      />
    ),
    }),
   },
  Patient: {
    screen: patientHome,
    navigationOptions: ({navigation}) => ({
      title: 'Patient',
      tabBarIcon: ({ tintColor }) => (
      <Icon
        name='user'
        size={30}
        color="#4F8EF7"
      />
    ),
    }),
  },
});

export default AppBeginning;
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
