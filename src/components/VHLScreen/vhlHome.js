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

import Connect from './Connect';
import Databank from './Databank';
import CareCenter from './CareCenter';
import NewsEvents from './NewsEvents';
import Research from './Research';
import Handbook from './Handbook';




const MainVHL= ({ navigation }) => (
  <VHLHome navigation={navigation} title={'VHL'} />
);

const VHLHome = ({ navigation }) => (
  <View style={{ flex: 1 }}>
    <View style={{ flex: 8 }} >
      <View style={{ flexDirection: 'row' }}>
        <Button
          title='Care Center'
          containerViewStyle={styles.button}
          iconRight={{ type: 'font-awesome' }}
          onPress={() => navigation.navigate('CareCenter')}
        />
        <Button
          title='Databank'
          containerViewStyle={styles.button}
          onPress={() => navigation.navigate('Databank')}
        />
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Button
          title='Handbook'
          containerViewStyle={styles.button}
          iconRight={{ type: 'font-awesome' }}
          onPress={() => navigation.navigate('Handbook')}
        />

        <Button
          title='Connect'
          containerViewStyle={styles.button}
          onPress={() => navigation.navigate('Connect')}
        />

      </View>
      <View style={{ flexDirection: 'row' }}>
        <Button
          title='News/Events'
          containerViewStyle={styles.button}
          iconRight={{ type: 'font-awesome' }}
          onPress={() => navigation.navigate('NewsEvents')}
        />
        <Button
          title='Research'
          containerViewStyle={styles.button}
          onPress={() => navigation.navigate('Research')}
        />
      </View>
    </View>
  </View>
);

const stackNavVHL = StackNavigator({
  Home: {
    screen: MainVHL,
    navigationOptions: ({ navigation, defaultHeader }) => ({
      ...defaultHeader,
      backgroundColor: '#3D6DCC',
      title: 'VHL HomePage',
      headerTintColor: '#3D6DCC',
  }),

  },
    Databank: {
      screen: Databank,
      path: '/',
      headerTitle: 'Databank',
      navigationOptions: ({ navigation }) => ({
        title: 'Databank',
    }),
  },
  CareCenter: {
    screen: CareCenter,
    path: '/',
    headerTitle: 'Care Centers',
    navigationOptions: ({ navigation }) => ({
      title: 'Care Centers',
    }),
  },
  Connect: {
    screen: Connect,
    path: '/',
    headerTitle: 'Connect',
    navigationOptions: ({ navigation }) => ({
      title: 'Connect',
    }),
  },
  NewsEvents: {
    screen: NewsEvents,
    path: '/',
    headerTitle: 'News & Events',
    navigationOptions: ({ navigation }) => ({
      title: 'News & Events',
    }),
  },
  Research: {
    screen: Research,
    path: '/',
    headerTitle: 'Research',
    navigationOptions: ({ navigation }) => ({
      title: 'Research',
    }),
  },
  Handbook: {
    screen: Handbook,
    path: '/',
    headerTitle: 'Handbook',
    navigationOptions: ({ navigation }) => ({
      title: 'Handbook',
    }),
  },
});

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

export default stackNavVHL;
