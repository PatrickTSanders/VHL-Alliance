import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Linking,
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
          //onPress={() => navigation.navigate('Facebook')}
          //onPress = { openAppOrURL('https://www.facebook.com/groups/VHLawareness/', {'Facebook', 284882215, ''})}
        />
        <Button
          title='Instagram'
          containerViewStyle={styles.button}
          //onPress={() => navigation.navigate('Facebook')}
        //  onPress = { openAppOrURL('https://www.instagram.com/vhl_alliance/', {'Instagram', 389801252, ''})}
        />
        <Button
          title='Twitter'
          containerViewStyle={styles.button}
          //onPress={() => navigation.navigate('Facebook')}
        //  onPress = { openAppOrURL('https://twitter.com/VHLAlliance', {'Twitter', 333903271, ''})}
        />
      </View>



    </View>

  //</View>
);

const openAppOrURL = async (
  url,
  { appName, appStoreId, appStoreLocale, playStoreId }
) => {
  Linking.openURL(url).catch(err => {
  if (err.code === 'EUNSPECIFIED') {
    if (Platform.OS === 'ios') {

      // check if appStoreLocale is set
      const locale = typeof appStoreLocale === 'undefined' ? 'us' : appStoreLocale;

      Linking.openURL(`https://itunes.apple.com/${locale}/app/${appStoreId}`);
    } else {
      Linking.openURL(
        `https://play.google.com/store/apps/details?id=${playStoreId}`
      );
    }
  } else {
    throw new Error(`Could not open ${appName}. ${err.toString()}`);
  }
});
};


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
