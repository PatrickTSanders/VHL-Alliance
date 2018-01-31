import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView,
  AsyncStorage,
  TextInput,
  ListView,
  Button as rnButton,
  TouchableHighlight,
  KeyboardAvoidingView,
  Image
} from 'react-native';
import {
  Header,
  Button
} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import storage from 'react-native-storage-wrapper';
import Grid from 'react-native-grid-component';
import { AppStorage } from '../StorageWrapper';
import Swipeout from 'react-native-swipeout';
import EmergencyCardHandling from './EmergencyCardHandling';

class EmergencyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // beforeAppOpenERCardList: [['Name', ''],['Age', ''],['Weight', ''],
      //             ['Current Diagnosis', ''],['Medication List', ''],
      //             ['Contraindicated Medicaitons', ''],
      //             ['Allergies', ''],['Emergency Contact', ''],['Primary Care', '']]
    };
  }
  async componentWillMount() {
    const accessAppStorage2 = new AppStorage();
    console.log('Get Item with key: ERCard');
    const prevList = await accessAppStorage2.GetItem('ERCard');
    //const medList = await accessAppStorage2.GetItem('totalMedList');

    console.log('Test for retrieving', prevList);
    var parsedList = JSON.parse(prevList);

    if (!parsedList) {
      parsedList = [['Name', ''],['Age', ''],['Weight', ''],
                  ['Current Diagnosis', ''],['Medication List', ''],
                  ['Contraindicated Medications', ''],
                  ['Allergies', ''],['Emergency Contact', ''],['Primary Care', '']];
    }

    console.log('Test for retrieving', prevList);
    console.log('State within componentDidMount before setState',
                  this.state.beforeAppOpenERCardList);
    //parsedList[4][1] = medList;
    console.log(parsedList);
    this.setState({ beforeAppOpenERCardList: parsedList });


    console.log('State of beforeAppOpenERCardList: ', this.state.beforeAppOpenERCardList);

  //const medList = await accessAppStorage2.GetItem('totalMedList');

  console.log(this.state.beforeAppOpenERCardList[4]);
}

render() {
  console.log('ABout to pass to child', this.state.beforeAppOpenERCardList);
  console.log('State of beforeAppOpenERCardList: ', this.state.beforeAppOpenERCardList);
  console.log('Is this an array? ', Array.isArray(this.state.beforeAppOpenERCardList));
  console.log('typeof bAOERCL ', typeof this.state.beforeAppOpenERCardList);

    if (!this.state.beforeAppOpenERCardList) {
      return false;
    }
    return (

      <EmergencyCardHandling beforeAppOpenERCardList={this.state.beforeAppOpenERCardList} />


  );}
}

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
    marginTop: 10,
    justifyContent: 'space-between'

  },
  textInput: {
    borderColor: 'black',
    backgroundColor: 'green',
    height: 20,
    width: 100
  }
});

export default EmergencyCard;
