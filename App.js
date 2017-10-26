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
import vhlHome from './src/components/vhlHome';
//import { Header } from './src/components/Header'


export default class App extends Component<{}> {
  render() {
    return (
      /*<WebView
        source={{ uri: 'https://www.vhl.org' }}
        style={{ marginTop: 20 }}
      />*/
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }} >
          <Header
              statusBarProps={{ barStyle: 'light-content' }}
              leftComponent={{ icon: 'menu', color: '#0B92D1' }}
              centerComponent={{ text: 'Patient Homepage', style: { color: '#fff' } }}
              rightComponent={{ icon: 'home', color: '#fff' }}
              outerContainerStyles={{ backgroundColor: '#3D6DCC' }}

          />
        </View>

        <View style={{ flex: 8 }} >
          <View style={{ flexDirection: 'row' }}>
            <Button
              title='Calendar'
              containerViewStyle={styles.button}
              iconRight={{ type: 'font-awesome' }}
            />
            <Button title='Medication List' containerViewStyle={styles.button} />
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Button
              title='Doctor Info'
              containerViewStyle={styles.button}
              iconRight={{ type: 'font-awesome' }}
            />
            <Button title='Personal Info' containerViewStyle={styles.button} />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Button
              title='Button'
              containerViewStyle={styles.button}
              iconRight={{ type: 'font-awesome' }}
            />
            <Button title='Emergency Card' containerViewStyle={styles.button} />
          </View>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 22,
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
