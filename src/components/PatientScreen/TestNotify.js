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

import PushNotification from 'react-native-push-notification';


/*const TestNotify = ({ value }) => (

    <View style={styles.container}>
      <Text style={styles.welcome}>
        Hello
        {value}
      </Text>

    </View>
);*/



class TestNotify extends Component {

/*const sixteenPlus = ["Physical examination by physician informed about VHL" ,
                  "Dilated eye/retinal examination with indirect ophthalmoscope by ophthalmologist informed about VHL",
                  "Quality ultrasound and at least every other year when not pregnant, an MRI scan) of abdomen with
                   and without contrast to assess kidneys, pancreas, and adrenals",
                   "Test for fractionated metanephrines, especially normetanephrine in “plasma free metanephrines blood test
                    or 24-hour urine test. Abdominal MRI or MIBG scan if biochemical abnormalities found" ];


  //const age = 16;

  var PushNotification = require('react-native-push-notification');

  componentDidMount(){
    PushNotification.configure( {
      onNotification: function(notification) {
          console.log( 'NOTIFICATION:', notification );
      },

    })

  }*/

  render() {
    return <Text> hi </Text>;
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
    marginTop: 10,
    justifyContent: 'space-between'

  }
});

export default TestNotify;
