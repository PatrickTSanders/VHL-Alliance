import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView,
  AsyncStorage
} from 'react-native';
import {
  Header,
  Button
} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import storage from 'react-native-storage-wrapper';
import MedicationList from './MedicationList'

class MedicationListHandling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textHolder: 'Current Placeholder'
    };
  }
  render() {
    return (
      <MedicationList value='Placeholder' />
    );
  }
}
export default MedicationListHandling;
