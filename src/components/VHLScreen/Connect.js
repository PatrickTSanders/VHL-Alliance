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

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Blog from './Blog';
import Facebook from './Facebook';


// import Databank from './Databank';
// import CareCenter from './CareCenter';
// import NewsEvents from './NewsEvents';
// import Research from './Research';

const facebookColor = '#3b5998';
const twitterColor = '#00aced';
//facebook #3b5998
//Twitter #00aced
//insta #

const ConnectHome = /*({ navigation })*/() => (
  //<View style={{ flex: 1 }}>

    <View style={{ flex: 1}} >
      <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Icon
          name='facebook-box'
          size={150}
          color = {facebookColor}
          //containerViewStyle={styles.button}
          //onPress={() => navigation.navigate('Facebook')}
          onPress = { () => this.openAppOrURL('https://www.facebook.com/groups/VHLawareness/', 'Facebook', 284882218, '', '')}
        />
        <Icon
          name="twitter"
          size={150}
          color = {twitterColor}
          onPress = { () => this.openAppOrURL('https://twitter.com/VHLAlliance', 'Twitter', 333903271, '', '')}
        />
      </View>

      <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Icon
          title='blogger'
          size={150}
          //onPress = { () => this.openAppOrURL('https://www.info@vhl.org', 'Instagram', 389801252, '', '')}
        />
        <Icon
          name='instagram'
          size={150}
          onPress = { () => this.openAppOrURL('https://www.instagram.com/vhl_alliance/', 'Instagram', 389801255, '', '')}
        />
      </View>


    <View style={{ flex: 1, flexDirection: 'row' }}>

      <View style={{flex:3, flexDirection: 'column'}}>
        <Icon
          name = 'phone'
          size = {75}
        />
      </View>
      <View style={{flex:7, flexDirection: 'column', justifyContent: 'center'}}>
        <Text>(617) 277-5667 x4</Text>
      </View>

    </View>

    <View style={{ flex: 1, flexDirection: 'row' }}>

      <View style={{flex:3, flexDirection: 'column'}}>
        <Icon
          name = 'email-outline'
          size = {75}
        />
      </View>
      <View style={{flex:7, flexDirection: 'column', justifyContent: 'center'}}>
        <Text> info@vhl.org </Text>
      </View>

    </View>

  </View>
);

openAppOrURL = async (
  url,
   appName, appStoreId, appStoreLocale, playStoreId
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


// const stackNavConnect = StackNavigator({
//
//   Home: {
//       screen: MainConnect,
//       navigationOptions: ({ navigation, defaultHeader }) => ({
//         ...defaultHeader,
//         backgroundColor: '#3D6DCC',
//         title: 'VHL HomePage',
//         headerTintColor: '#3D6DCC',
//     }),
//
//   },
//
//   Blog: {
//         screen: Blog,
//         path: '/',
//         headerTitle: 'Blog',
//         navigationOptions: ({ navigation }) => ({
//           title: 'Blog',
//         }),
//   },
//
//   Facebook: {
//         screen: Facebook,
//         path: '/',
//         headerTitle: 'Facebook',
//         navigationOptions: ({ navigation }) => ({
//           title: 'Facebook',
//         }),
//   },
//
// });

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

export default ConnectHome;
