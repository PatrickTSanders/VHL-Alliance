import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView
}
  from 'react-native';
import {
  Header,
  Button
  }
  from 'react-native-elements';

//import PushNotification from 'react-native-push-notification'


export default class PushNotificationsController extends Component {

/*  const sixteenPlus = ["Physical examination by physician informed about VHL" ,
                  "Dilated eye/retinal examination with indirect ophthalmoscope by ophthalmologist informed about VHL",
                  "Quality ultrasound and at least every other year when not pregnant, an MRI scan) of abdomen with
                   and without contrast to assess kidneys, pancreas, and adrenals",
                   "Test for fractionated metanephrines, especially normetanephrine in “plasma free metanephrines blood test
                    or 24-hour urine test. Abdominal MRI or MIBG scan if biochemical abnormalities found" ];


  const age = 16;

  var PushNotification = require('react-native-push-notification');

  componentDidMount(){
    PushNotification.configure( {
      onNotification: function(notification) {
          console.log( 'NOTIFICATION:', notification );
      },

    })

  }
*/
  render() {
    return null;
  }
}



/*

PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
        console.log( 'TOKEN:', token );
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
    },

    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
    //senderID: "YOUR GCM SENDER ID",

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
      * (optional) default: true
      * - Specified if permissions (ios) and token (android and ios) will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later

    requestPermissions: true,
});
