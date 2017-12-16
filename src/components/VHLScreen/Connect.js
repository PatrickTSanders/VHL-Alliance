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


export default Connect;
