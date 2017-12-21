import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView,
  AppState,
  PushNotificationIOS
}
  from 'react-native';
import {
  Header,
  Button
  }
  from 'react-native-elements';

import PushNotification from 'react-native-push-notification';

export default class PushNotificationsController extends Component {

  constructor (props) {
    super(props);

    this.handleAppStateChange = this.handleAppStateChange.bind(this);


  this.state = {
    appState: AppState.currentState,
    age: 16,
    fiveToFifteen: ["Have you scheduled your annual physical examination and neurological assessment by pediatrician informed about VHL, with particular attention to blood pressure (taken while lying down and standing), hearing impairment, neurological disturbance, nystagmus, strabismus, white pupil, and other signs indicating retinal problems", "Dilated eye/retinal examination with indirect ophthalmoscope by ophthalmologist informed about VHL", "Test for fractionated metanephrines, especially normetanephrine in a “plasma free metanephrine” blood test or in a 24-hour urine test. Abdominal ultrasonography annually from 8 years or earlier if indicated. Abdominal MRI or MIBG scan only if biochemical abnormalities found"],
    sixteenPlus: ["Have you scheduled your annual physical examination by physician informed about VHL?","Dilated eye/retinal examination with indirect ophthalmoscope by ophthalmologist informed about VHL", "Test for fractionated metanephrines, especially normetanephrine in “plasma free metanephrines blood test or 24-hour urine test. Abdominal MRI or MIBG scan if biochemical abnormalities found"],
                      //"Quality ultrasound and at least every other year when not pregnant, an MRI scan) of abdomen with
                      // and without contrast to assess kidneys, pancreas, and adrenals",
  };


}


/*PushNotification.localNotification( {

  /* iOS only properties
  alertAction: null, // (optional) default: view
  category: null,// (optional) default: null
  userInfo: null,  // (optional) default: null (object containing additional notification data)

  /* iOS and Android properties
  title: "My Notification Title", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
  message: "My Notification Message", // (required)
  playSound: false, // (optional) default: true
  soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
  number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
  repeatType: 'day', // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
  actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
  }
);*/

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  componentDidMount(){
    AppState.addEventListener('change', this.handleAppStateChange);

    PushNotification.configure( {
      onNotification: function(notification) {
          console.log( 'NOTIFICATION:', notification );
          console.log( 'Did they click', notification.userInteraction);
      },
    })


    //this isn't doing anything rn, however, instead of notifying when they leave the app,
    //it should notify once the user opens the app
    //if(appState === 'active'){
        /*if(this.state.age >= 16){
            (this.state.sixteenPlus).map((x) =>

              PushNotification.localNotificationSchedule({
                message: x, // (required)
                date: new Date(Date.now() + (1000)),
                repeatType: 'year'
              }),
          );
          //console.log("hello");
        }

        if(this.state.age >=5 && this.state.age <= 15){
            (this.state.fiveToFifteen).map((x) =>

              PushNotification.localNotificationSchedule({
                message: x, // (required)
                date: new Date(Date.now() + (1000)), // in 60 secs
                repeatType: 'year'
              }),
          );
        }*/
    //}
  }


  handleAppStateChange(appState) {
    if(appState === 'background') {
        if(this.state.age >= 16) {
            (this.state.sixteenPlus).map((x) =>

              PushNotification.localNotificationSchedule({
                message: x, // (required)
                date: new Date(Date.now() + (1000)),
              }),
          );
        }

        //if you have a criteria, you can change the notifications you wish to display
        if (this.state.age >=5 && this.state.age <= 15) {
            (this.state.fiveToFifteen).map((x) =>

              PushNotification.localNotificationSchedule({
                message: x, // (required)
                date: new Date(Date.now() + (1000)) // in 60 secs
              }),
          );
        }
    }
  }

  render() {
    return null;
  }
}
