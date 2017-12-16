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


const Realm = require('realm');

class ConnectComponent extends Component {

    constructor(props) {
      super(props);
      this.state = { realm: null };
    }

    componentWillMount() {
      Realm.open({
        schema: [{name: 'Dog', properties: {name: 'string'}}]
      }).then(realm => {
        realm.write(() => {
          realm.create('Dog', {name: 'Rex'});
        });
        this.setState({ realm });
      });
    }

    render() {
    const info = this.state.realm
          ? 'Number of dogs in this Realm: ' + this.state.realm.objects('Dog').length
          : 'Loading...';

    return (
      <View>
        <Text> CONNECTCOMPONENT {info}</Text>
      </View>
    )

    }
}

const Connect = ({ navigation }) => (
  <ConnectComponent />
);

// const Connect = ({ navigation }) => (
//   <WebView
//     sou rce={{ uri: 'https://fiance.yahoo.com' }}
//     style={{ marginTop: 0 }}
//   />
// );

// const styles = StyleSheet.create({
//
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   button: {
//     flex: 1,
//     marginTop: 100,
//     justifyContent: 'space-between'
//
//   }
// });

export default Connect;
