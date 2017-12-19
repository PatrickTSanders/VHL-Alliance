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

import Blog from './Blog';
import Facebook from './Facebook';

// import Databank from './Databank';
// import CareCenter from './CareCenter';
// import NewsEvents from './NewsEvents';
// import Research from './Research';

const MainConnect = ({ navigation }) => (
  <ConnectHome navigation={navigation} title={'Connect'} />
);

const ConnectHome = ({ navigation }) => (
  //<View style={{ flex: 1 }}>

    <View style={{ flex: 1 }} >
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Button
          title='Blog'
          containerViewStyle={styles.button}
          iconRight={{ type: 'font-awesome' }}
          onPress={() => navigation.navigate('Blog')}
        />
        <Button
          title='Facebook'
          containerViewStyle={styles.button}
          onPress={() => navigation.navigate('Facebook')}
        />
      </View>



    </View>

  //</View>
);

const stackNavConnect = StackNavigator({

  Home: {
      screen: MainConnect,
      navigationOptions: ({ navigation, defaultHeader }) => ({
        ...defaultHeader,
        backgroundColor: '#3D6DCC',
        title: 'VHL HomePage',
        headerTintColor: '#3D6DCC',
    }),

  },

  Blog: {
        screen: Blog,
        path: '/',
        headerTitle: 'Blog',
        navigationOptions: ({ navigation }) => ({
          title: 'Blog',
        }),
  },

  Facebook: {
        screen: Facebook,
        path: '/',
        headerTitle: 'Facebook',
        navigationOptions: ({ navigation }) => ({
          title: 'Facebook',
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

export default stackNavConnect;
