import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView,
  AppState
}
  from 'react-native';
import {
  Header,
  Button
  }
  from 'react-native-elements';

import PushNotification from 'react-native-push-notification'


export default class PushNotificationsController extends Component {

  constructor (props) {
    super(props);

    this.handleAppStateChange = this.handleAppStateChange.bind(this);


  this.state = {
    appState: AppState.currentState,
    age: 15,
    fiveToFifteen: ["Physical examination and neurological assessment by pediatrician informed about VHL, with particular attention to blood pressure (taken while lying down and standing), hearing impairment, neurological disturbance, nystagmus, strabismus, white pupil, and other signs indicating retinal problems", "Dilated eye/retinal examination with indirect ophthalmoscope by ophthalmologist informed about VHL", "Test for fractionated metanephrines, especially normetanephrine in a “plasma free metanephrine” blood test or in a 24-hour urine test. Abdominal ultrasonography annually from 8 years or earlier if indicated. Abdominal MRI or MIBG scan only if biochemical abnormalities found"],
    sixteenPlus: ["Have you scheduled your annual physical examination by physician informed about VHL?","Dilated eye/retinal examination with indirect ophthalmoscope by ophthalmologist informed about VHL", "Test for fractionated metanephrines, especially normetanephrine in “plasma free metanephrines blood test or 24-hour urine test. Abdominal MRI or MIBG scan if biochemical abnormalities found"]
                      //"Quality ultrasound and at least every other year when not pregnant, an MRI scan) of abdomen with
                      // and without contrast to assess kidneys, pancreas, and adrenals",
  };
}

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  componentDidMount(sixteenPlus){
    AppState.addEventListener('change', this.handleAppStateChange);

    /*PushNotification.configure( {
      onNotification: function(notification) {
          console.log( 'NOTIFICATION:', notification );
      },
    })


  }*/
  }

  /*handleAppStateChange(appState, sixteenPlus){

    console.log(sixteenPlus);

    console.log("asdflkj" , this.state.appState);

    //if(appState === 'background'){
    if(this.state.age === 1)
        PushNotification.localNotificationSchedule({
          message: this.state.sixteenPlus, // (required)
          date: new Date(Date.now() + (1000)) // in 60 secs
        });
    //-}

  }*/

  handleAppStateChange(appState){

    if(appState === 'background'){
        if(this.state.age >= 16){
            (this.state.sixteenPlus).map((x) =>

              PushNotification.localNotificationSchedule({
                message: x, // (required)
                date: new Date(Date.now() + (1000)) // in 60 secs
              }),
          );
        }

        if(this.state.age >=5 && this.state.age <= 15){
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
    return <Text> Current State is {this.state.appState}</Text>;
  }
}


 /*const sixteenPlus = ["Physical examination by physician informed about VHL" ,
                  "Dilated eye/retinal examination with indirect ophthalmoscope by ophthalmologist informed about VHL",
                  "Quality ultrasound and at least every other year when not pregnant, an MRI scan) of abdomen with
                   and without contrast to assess kidneys, pancreas, and adrenals",
                   "Test for fractionated metanephrines, especially normetanephrine in “plasma free metanephrines blood test
                    or 24-hour urine test. Abdominal MRI or MIBG scan if biochemical abnormalities found" ];


  const age = 16;
  */
