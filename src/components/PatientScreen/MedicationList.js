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




const MedicationList = ({ value }) => (

    <View style={styles.container}>
      <Text style={styles.welcome}>
        Hello
        {value}
      </Text>
      <Button
        title='setKey'
        onPress={
          async function() {
            try {
            console.log('setKey was pressed');
            await AsyncStorage.setItem('test', 'I hope this works');
          } catch (error) {
            console.log(error)
          }
          }
        }
      />

      <Button
        title='getKey'
        onPress={
          async function() {
          try {
            const value = await AsyncStorage.getItem('test');
            console.log(value)
        } catch(error){
          console.log(error)
        }
      }
    }
    />
    </View>
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
    marginTop: 10,
    justifyContent: 'space-between'

  }
});

export default MedicationList;
