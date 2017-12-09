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


class Databank extends Component {
  static navigationOptions = {
    headerTitle: 'Databank'
  }
  render() {
      const { navigate } = this.props.navigation;
      return (
        /*
        <View style={{ flex: 1 }}>

          <View style={{ flex: 1 }} >

            <Header
                statusBarProps={{ barStyle: 'light-content' }}
                leftComponent={{ icon: 'menu', color: '#0B92D1' }}
                centerComponent={{ text: 'Databank', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff' }}
                outerContainerStyles={{ backgroundColor: '#3D6DCC' }}

            />
          </View>



        </View>
        */
        <WebView
          source={{ uri: 'https://databank.vhl.org/' }}
          style={{ marginTop: 20 }}
        />
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

export default Databank;
