import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView,
  AppState,
  PushNotificationIOS,
  TouchableHighlight,
  Switch,
  ScrollView
}
  from 'react-native';
import {
  Header,
  Button
  }
  from 'react-native-elements';

  const Realm = require('realm');

import PushNotification from 'react-native-push-notification';
import NotificationPreference from './NotificationPreference.js'

const reasonToToggle = 'Please toggle if you have already scheduled an appointment. You will receive notifications based on if you have toggled the entry; we will notify you based on the recommendation of the surveillance guidelines. For more information, check out the Surveillance tab on the VHL side';

const eyeRetinalString = 'Eye/retinal examination with indirect ophthalmoscope by an ophthalmologist skilled in diagnosis and management of retinal disease, especially for children known to carry the VHL mutation.';
const pediatrician = 'Pediatrician to look for signs of neurological disturbance, nystagmus, strabismus, white pupil, and abnormalities in blood pressure, vision, or hearing.';

const physicalExaminationString = 'Physical examination and neurological assessment by pediatrician informed about VHL, with particular attention to blood pressure (taken while lying down and standing), hearing impairment, neurological disturbance, nystagmus, strabismus, white pupil, and other signs indicating retinal problems.'
const dilatedEyeRetinal = 'Dilated eye/retinal examination with indirect ophthalmoscope by ophthalmologist informed about VHL.';
const fractionatedString = 'Test for fractionated metanephrines, especially normetanephrine in a “plasma free metanephrine” blood test or in a 24-hour urine test. Abdominal ultrasonography annually from 8 years or earlier if indicated. Abdominal MRI or MIBG scan only if biochemical abnormalities found.';


const MRI16String = 'MRI scans should be ordered as no less than a 1.5T MRI with and without contrast of brain, cervical, thoracic, and lumbar spine, with thin cuts through the posterior fossa, and attention to inner ear/petrous temporal bone to rule out both ELST and hemangioblastomas of the neuraxis.';

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
        item: "Select Item",
        isVisible: false,
        isLessThan5: false,
        isBetween5And15: false,
        isOver16: false,
        hasDoneEye: false,
        hasDoneAudio: false,
        hasDonePediatrician: false,
        hasDonePhysicalExamination: false,
        hasDoneDilated: false,
        hasDoneFractionated: false,
        hasDoneMRI16: false,
        realm:null,
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
    console.log('im leaving ', this.state.hasDoneAudio);


    Realm.open({
    schema: [
              {name: 'Notification',
              primaryKey: 'id',
               properties:
                  {
                    id: 'int',
                    isLessThan5: 'bool',
                    isBetween5And15: 'bool',
                    isOver16: 'bool',
                    hasDoneEye: 'bool',
                    hasDoneAudio: 'bool',
                    hasDonePediatrician: 'bool',
                    hasDonePhysicalExamination: 'bool',
                    hasDoneDilated: 'bool',
                    hasDoneFractionated: 'bool',
                    hasDoneMRI16: 'bool',
                  }
              }
            ]
  }).then(realm => {

      realm.write(() => {
        realm.create('Notification',
                        {
                          id:1,
                          isLessThan5: this.state.isLessThan5,
                          isBetween5And15: this.state.isBetween5And15,
                          isOver16: this.state.isOver16,
                          hasDoneEye: this.state.hasDoneEye,
                          hasDoneAudio: this.state.hasDoneAudio,
                          hasDonePediatrician: this.state.hasDonePediatrician,
                          hasDonePhysicalExamination: this.state.hasDonePhysicalExamination,
                          hasDoneDilated: this.state.hasDoneDilated,
                          hasDoneFractionated: this.state.hasDoneFractionated,
                          hasDoneMRI16: this.state.hasDoneMRI16,

                        },
                      true);
      });

      console.log(realm.objects('Notification').length);
  });

  //

  }

  componentDidMount(){
    AppState.addEventListener('change', this.handleAppStateChange);

    PushNotification.configure( {
      onNotification: function(notification) {
          console.log( 'NOTIFICATION:', notification );
          console.log( 'Did they click', notification.userInteraction);
      },
    })
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

  _renderAppointmentButton(text,isOn){

      return(
      <View style={{flexDirection:'row'}}>
        <View style={{flexDirection:'column'}}>
          <Switch
           onValueChange={isOn => this.setState({isOn})}
           value={this.state.isOn}
         />
       </View>

       <View style={{flexDirection:'column'}}>
         <Text>{text}</Text>
       </View>
     </View>
    );
  }

  consoleStuff(isOn){
    this.setState({isOn});
    console.log(isOn, " isOn");
  }


    render() {

      

    if(this.state.isLessThan5){

     return (
       <View>
         <Text>Please select your age range. Switching ages will reset your notification preferences</Text>


          <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
            <Switch
              onValueChange={isLessThan5 =>
                this.setState({
                    isLessThan5,
                    isBetween5And15:false,
                    isOver16:false,
                    hasDoneEye: false,
                    hasDoneAudio: false,
                    hasDonePediatrician: false,
                    hasDonePhysicalExamination: false,
                    hasDoneDilated: false,
                    hasDoneFractionated: false,
                    hasDoneMRI16: false
                  })}
              value={this.state.isLessThan5}
            />

            <Text>1-4</Text>
          {/* </View> */}

          {/* <View style={{flexDirection:'row'}}> */}
            <Switch
             onValueChange={isBetween5And15 =>
                this.setState({
                  isBetween5And15,
                  isLessThan5:false,
                  isOver16:false,
                  hasDoneEye: false,
                  hasDoneAudio: false,
                  hasDonePediatrician: false,
                  hasDonePhysicalExamination: false,
                  hasDoneDilated: false,
                  hasDoneFractionated: false,
                  hasDoneMRI16: false
                })}
             value={this.state.isBetween5And15}
           />
           <Text>5-15</Text>
         {/* </View> */}
         {/* <View style={{flexDirection:'row'}}> */}
           <Switch
            onValueChange={isOver16 =>
              this.setState({
                isOver16,
                isBetween5And15:false,
                isLessThan5:false,
                hasDoneEye: false,
                hasDoneAudio: false,
                hasDonePediatrician: false,
                hasDonePhysicalExamination: false,
                hasDoneDilated: false,
                hasDoneFractionated: false,
                hasDoneMRI16: false
              })}
            value={this.state.isOver16}
          />
          <Text> 16+</Text>
        </View>


        <Text>{reasonToToggle}</Text>


      <ScrollView style={{paddingTop: 50 }}>
        <View style={{flexDirection:'row'}}>
          <View style={{flexDirection:'column'}}>
            <Switch
             onValueChange={hasDoneEye => this.setState({hasDoneEye})}
             value={this.state.hasDoneEye}
           />
         </View>

         <View style={{flexDirection:'column'}}>
           <Text>{eyeRetinalString}</Text>
         </View>
       </View>


        <View style={{flexDirection:'row'}}>
          <View style={{flexDirection:'column'}}>
            <Switch
             onValueChange={hasDonePediatrician => this.setState({hasDonePediatrician})}
             value={this.state.hasDonePediatrician}
           />
         </View>

         <View style={{flexDirection:'column'}}>
           <Text>{pediatrician}</Text>
         </View>
       </View>

      </ScrollView>


      </View>
     );
   }


//######################### Starts 5-15 ###################################//


   else if(this.state.isBetween5And15){
     return(
       <View>
         <Text>Please select your age range. Switching ages will reset your notification preferences</Text>


          <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
            <Switch
              onValueChange={isLessThan5 =>
                this.setState({
                    isLessThan5,
                    isBetween5And15:false,
                    isOver16:false,
                    hasDoneEye: false,
                    hasDoneAudio: false,
                    hasDonePediatrician: false,
                    hasDonePhysicalExamination: false,
                    hasDoneDilated: false,
                    hasDoneFractionated: false,
                    hasDoneMRI16: false
                  })}
              value={this.state.isLessThan5}
            />

            <Text>1-4</Text>
          {/* </View> */}

          {/* <View style={{flexDirection:'row'}}> */}
            <Switch
             onValueChange={isBetween5And15 =>
                this.setState({
                  isBetween5And15,
                  isLessThan5:false,
                  isOver16:false,
                  hasDoneEye: false,
                  hasDoneAudio: false,
                  hasDonePediatrician: false,
                  hasDonePhysicalExamination: false,
                  hasDoneDilated: false,
                  hasDoneFractionated: false,
                  hasDoneMRI16: false
                })}
             value={this.state.isBetween5And15}
           />
           <Text>5-15</Text>
         {/* </View> */}
         {/* <View style={{flexDirection:'row'}}> */}
           <Switch
            onValueChange={isOver16 =>
              this.setState({
                isOver16,
                isBetween5And15:false,
                isLessThan5:false,
                hasDoneEye: false,
                hasDoneAudio: false,
                hasDonePediatrician: false,
                hasDonePhysicalExamination: false,
                hasDoneDilated: false,
                hasDoneFractionated: false,
                hasDoneMRI16: false
              })}
            value={this.state.isOver16}
          />
          <Text> 16+</Text>
        </View>


        <Text>{reasonToToggle}</Text>


      <ScrollView style={{paddingTop: 50 }}>
        <View style={{flexDirection:'row'}}>
          <View style={{flexDirection:'column'}}>
            <Switch
             onValueChange={hasDonePhysicalExamination => this.setState({hasDonePhysicalExamination})}
             value={this.state.hasDonePhysicalExamination}
           />
         </View>

         <View style={{flexDirection:'column'}}>
           <Text>{physicalExaminationString}</Text>
         </View>
       </View>


        <View style={{flexDirection:'row'}}>
          <View style={{flexDirection:'column'}}>
            <Switch
             onValueChange={hasDoneDilated => this.setState({hasDoneDilated})}
             value={this.state.hasDoneDilated}
           />
         </View>

         <View style={{flexDirection:'column'}}>
           <Text>{dilatedEyeRetinal}</Text>
         </View>
       </View>

       <View style={{flexDirection:'row'}}>
         <View style={{flexDirection:'column'}}>
           <Switch
            onValueChange={hasDoneFractionated => this.setState({hasDoneFractionated})}
            value={this.state.hasDoneFractionated}
          />
        </View>

        <View style={{flexDirection:'column'}}>
          <Text>{fractionatedString}</Text>
        </View>
      </View>

      </ScrollView>


      </View>
     )
   }

//####################### Starts 16+ #########################//

else if(this.state.isOver16){
  return(

    <View>
      <Text>Please select your age range. Switching ages will reset your notification preferences</Text>


       <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
         <Switch
           onValueChange={isLessThan5 =>
             this.setState({
                 isLessThan5,
                 isBetween5And15:false,
                 isOver16:false,
                 hasDoneEye: false,
                 hasDoneAudio: false,
                 hasDonePediatrician: false,
                 hasDonePhysicalExamination: false,
                 hasDoneDilated: false,
                 hasDoneFractionated: false,
                 hasDoneMRI16: false
               })}
           value={this.state.isLessThan5}
         />

         <Text>1-4</Text>
       {/* </View> */}

       {/* <View style={{flexDirection:'row'}}> */}
         <Switch
          onValueChange={isBetween5And15 =>
             this.setState({
               isBetween5And15,
               isLessThan5:false,
               isOver16:false,
               hasDoneEye: false,
               hasDoneAudio: false,
               hasDonePediatrician: false,
               hasDonePhysicalExamination: false,
               hasDoneDilated: false,
               hasDoneFractionated: false,
               hasDoneMRI16: false
             })}
          value={this.state.isBetween5And15}
        />
        <Text>5-15</Text>
      {/* </View> */}
      {/* <View style={{flexDirection:'row'}}> */}
        <Switch
         onValueChange={isOver16 =>
           this.setState({
             isOver16,
             isBetween5And15:false,
             isLessThan5:false,
             hasDoneEye: false,
             hasDoneAudio: false,
             hasDonePediatrician: false,
             hasDonePhysicalExamination: false,
             hasDoneDilated: false,
             hasDoneFractionated: false,
             hasDoneMRI16: false
           })}
         value={this.state.isOver16}
       />
       <Text> 16+</Text>
     </View>


     <Text>{reasonToToggle}</Text>


   <ScrollView style={{paddingTop: 50 }}>
     <View style={{flexDirection:'row'}}>
       <View style={{flexDirection:'column'}}>
         <Switch
          onValueChange={hasDonePhysicalExamination => this.setState({hasDonePhysicalExamination})}
          value={this.state.hasDonePhysicalExamination}
        />
      </View>

      <View style={{flexDirection:'column'}}>
        <Text>{physicalExaminationString}</Text>
      </View>
    </View>


     <View style={{flexDirection:'row'}}>
       <View style={{flexDirection:'column'}}>
         <Switch
          onValueChange={hasDoneDilated => this.setState({hasDoneDilated})}
          value={this.state.hasDoneDilated}
        />
      </View>

      <View style={{flexDirection:'column'}}>
        <Text>{dilatedEyeRetinal}</Text>
      </View>
    </View>

    <View style={{flexDirection:'row'}}>
      <View style={{flexDirection:'column'}}>
        <Switch
         onValueChange={hasDoneFractionated => this.setState({hasDoneFractionated})}
         value={this.state.hasDoneFractionated}
       />
     </View>

     <View style={{flexDirection:'column'}}>
       <Text>{fractionatedString}</Text>
     </View>
   </View>

   <View style={{flexDirection:'row'}}>
     <View style={{flexDirection:'column'}}>
       <Switch
        onValueChange={hasDoneMRI16 => this.setState({hasDoneMRI16})}
        value={this.state.hasDoneMRI16}
      />
    </View>

    <View style={{flexDirection:'column'}}>
      <Text>{MRI16String}</Text>
    </View>
  </View>

   </ScrollView>


   </View>

  );
}

     else{
       return(
         <View>
           <Text>Please select your age range. Switching ages will reset your notification preferences</Text>


            <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
              <Switch
                onValueChange={isLessThan5 => this.setState({isLessThan5, isBetween5And15:false, isOver16:false})}
                value={this.state.isLessThan5}
              />
              <Text>1-4</Text>
            {/* </View> */}

            {/* <View style={{flexDirection:'row'}}> */}
              <Switch
               onValueChange={isBetween5And15 => this.setState({isBetween5And15, isLessThan5:false, isOver16:false})}
               value={this.state.isBetween5And15}
             />
             <Text>5-15</Text>
           {/* </View> */}
           {/* <View style={{flexDirection:'row'}}> */}
             <Switch
              onValueChange={isOver16 => this.setState({isOver16, isBetween5And15:false, isLessThan5:false})}
              value={this.state.isOver16}
            />
            <Text>16+</Text>
          </View>

        </View>


       );
     }

   }
}

{/* <NotificationPreference isLessThan5={this.state.isLessThan5} isBetween5And15={this.state.isBetween5And15} isOver16={this.state.isOver16}/> */}
