
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ListView, TouchableHighlight, TouchableOpacity } from 'react-native';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';
import Row from './Row.js';
import testData from './Data.js';
import RNCalendarEvents from 'react-native-calendar-events';
import { AppStorage } from '../StorageWrapper';
import ContactsWrapper from 'react-native-contacts-wrapper';
const Contacts = require('react-native-contacts')

const utcDateToString = (momentInUTC: moment): string => {
  let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  // console.warn(s);
  return s;
};

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  // more items
]

export default class DoctorContacts extends Component {
  constructor(props) {
   super(props);
   const Contacts = require('react-native-contacts')
   this.onButtonPressed = this.onButtonPressed.bind(this);
   this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)

   this.getPrevContacts = this.getPrevContacts.bind(this);
   this.addToContact = this.addToContact.bind(this)
   // // this.forLoop = this.forLoop.bind(this)
   // this.getEventById = this.getEventById.bind(this)
   // this.getEventsProperty = this.getEventsProperty.bind(this)

   //const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      //dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      cal_auth: '',
      //contactRecordID: this.props.navigation.state.params.contactRecordID

      //totalCalendarEvents: [{}]
    };
  }
  settingStateFromProps(){
      console.log('this.props.navigation.state.params', this.props.navigation.state.params)
      console.log('this.props.navigation.state.params.contactRecordID', this.props.navigation.state.params.contactRecordID)
      const oldEventId = this.props.navigation.state.params.contactRecordID
      console.log('oldEventId: ', oldEventId)
      this.setState({testing: oldEventId})
      console.log('State for testing if setState workds: ', this.state.testing)
      this.setState({ currentEventId: oldEventId })
      //console.log('This.props.currentEventId: ', this.props.navigation.state.params.currentEventId)
      console.log('In Calendar Add componentDidMount with check this.props.navigation.state.params')
      console.log('Current state componentDidMount of currentEventId: ', this.state.contactRecordID)
      return oldEventId
    }
  async componentDidMount() {
      //Decide whether to ask for permission on app open for notifications
        //this.setState({momentInUTC: moment.now()});
        this.getPrevContacts();
        console.log('In componentDidMount of DoctorContacts testing props params: ', this.props.navigation.state.params)
        if(this.props.navigation.state.params !== undefined){
          console.log('About to call settingStateFromProps')

          //Not sure why this works RMS
          await this.settingStateFromProps()
          this.setState({ currentEventId: this.props.navigation.state.params.contactRecordID })



        }

        else{
          console.log('Calling this.addToCalendar because this.props.navigation.state.params is undefined?')
          console.log(this.props.navigation.state.params == undefined)
          //this.addToContact();
        }

        console.log('State for testing if setState workds: ', this.state.testing),
        console.log('Current state componentDidMount of currentEventId: ', this.state.currentEventId)
        var Contacts = require('react-native-contacts')

        // Contacts.getAll((err, contacts) => {
        //   if(err === 'denied'){
        //     // error
        //   } else {
        //     // contacts returned in []
        //     console.log(contacts)
        //   }
        // })
        //Let's get access before doing anything
        Contacts.checkPermission( (err, permission) => {
           // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
           if(permission === 'undefined'){
             Contacts.requestPermission( (err, permission) => {
              console.log('In Contacts.checkPermission with err: ', err)
              console.log('In Contacts.checkPermission with err:', permission)

             })
           }
           if(permission === 'authorized'){
             console.log('In Contacts.checkPermission with permission === authorized: ', permission)
           }
           if(permission === 'denied'){
             console.log('In Contacts.checkPermission with permission === denied: ', permission)
           }
          })
        // await this.getEventsProperty()
        //       .then((data) => {
        //         this.setState({
        //                 dataSource: this.state.dataSource.cloneWithRows(data),
        //               })
        //         console.log('Updated dataSource for ListRow: ', this.state.dataSource)

        console.log('In componentDidMount with this.state.contactRecordID: ', this.state.contactRecordID)
      }

componentWillReceiveProps(){
  console.log('componentWillReceiveProps this.props.navigation.state.params.contactRecordID', this.props.navigation.state.params.contactRecordID)
  this.setState({contactRecordID: this.props.navigation.state.params.contactRecordID})


  //console.log('This.props.currentEventId: ', this.props.navigation.state.params.currentEventId)
  console.log('In DoctorContacts componentWillReceiveProps with check this.props.navigation.state.params')
  console.log('Current state componentWillReceiveProps of currentEventId: ', this.state.contactRecordID)
}



onButtonPressed() {
      ContactsWrapper.getContact()
      .then((contact) => {
          // Replace this code
          console.log(contact);
      })
      .catch((error) => {
          console.log("ERROR CODE: ", error.code);
          console.log("ERROR MESSAGE: ", error.message);
      });
  }


async getEventById(eventId){
  let eventInfo = 'test'
      await RNCalendarEvents.findEventById(eventId)
        .then(eventInfor => {
          console.log('In calendar.js componentDidMount, promise from react-native-calendar event: ', eventInfor);
          console.log(eventInfor)
          eventInfo = eventInfor


        })
        .catch(error => {
         console.log('Error in RNCalendarEvents.findEventById');
         console.log(error)
         eventInfo = error

        });
return eventInfo
}

async getEventsProperty() {
    totalEvents = []
    const dates = await this.getPrevCalendarEvents();

    await Promise.all(dates.map(async (eventId) => {
      const contents = await this.getEventById(eventId)
      console.log('Contents: ', contents)
      totalEvents.push(contents)

    }));
    console.log('total events: ', totalEvents)
    return totalEvents
  }


  async getPrevContacts() {
    //console.log('getPrevCalendar Events was called when component mounted')
    console.log('Was going to getPrevContacts')
      // var accessAppStorage2 = new AppStorage();
      // console.log('Get Item with key: totalCalendarEvents'  );
      // const prevCal = await accessAppStorage2.GetItem('totalCalendarEvents')
      // this.setState({totalCalendarEvents: JSON.parse(prevCal)});
      // // if (prevCal === []){
      // //   this.state.totalCalendarEvents = ['']
      // // }
      // console.log(this.state.totalCalendarEvents);
      // // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      // // const newDataSource = ds.cloneWithRows(this.state.totalCalendarEvents)
      // // console.log('NewDataSourceTotal ', newDataSource)
      // // console.log('New data source with title ', newDataSource['title'])
      // // this.setState({dataSource: newDataSource})
      // // console.log('State of dataSource: ', this.state.dataSource)
      // //return newDataSource
      // //this.setState({dataSource: ds.cloneWithRows(this.state.totalCalendarEvents)})
      // console.log(typeof prevCal)
      // console.log(typeof JSON.parse(prevCal))
      // return JSON.parse(prevCal)

    }
  addToContact(){
  const utcDateToString = () => {
   const s = moment.utc(this.state.momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  // console.warn(s);
  return s;
  };
     //Use this to set update for event already created
     const eventConfig = {
       title: 'Lunch',
       startDate: utcDateToString(this.state.momentInUTC),
       endDate: utcDateToString(moment.utc(this.state.momentInUTC).add(1, 'hours')),
     };
     console.log('Was going to add to contacts!')
     // AddCalendarEvent.presentNewCalendarEventDialog(eventConfig)
     //   .then(eventId => {
     //     //handle success (receives event id) or dismissing the modal (receives false)
     //     if (eventId) {
     //       console.log(eventId)
     //       this.setState({currentEventId: eventId})
     //       console.log('Showing currentEventId state: ', this.state.currentEventId)
     //       this.getPrevCalendarEvents();
     //       const prevCalendarEvents= this.state.totalCalendarEvents;
     //
     //       console.log(prevCalendarEvents);
     //       console.log(Array.isArray(prevCalendarEvents))
     //       prevCalendarEvents.push(eventId);
     //
     //       console.log('Called state on totalCalendarEvents ', this.state.totalCalendarEvents)
     //       this.addCalendarEvent(JSON.stringify(prevCalendarEvents));
     //
     //       }
     //     else {
     //       this.goSomewhere('ViewCalendar')
     //     }
     //   })
     //   .catch((error: string) => {
     //     // handle error such as when user rejected permissions
     //     console.warn(error);
     //   });
   };


  render() {
    // if(this.state.dataSource) {
    //   console.log('In render: this.state. dataSource: ', this.state.dataSource, 'typeof: ', typeof this.state.dataSource)
    //   return (
    //
    //       <ListView
    //         style={styles.container}
    //         dataSource={this.state.dataSource}
    //         enableEmptySections={true}
    //         renderRow={(data) => <Row dataFromCalendar={data} />}
    //         renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
    //       />
    //
    //
    //   );
    // }
    // else{
    //   return(
    //     <View />
    //   );
    //
    // }
    return(
      <View style = {styles.container}>
          <TouchableOpacity onPress = {this.onButtonPressed}>
              <View style = {styles.buttonWrapper}>
                  <Text style = {styles.buttonText}>Open Contact</Text>
              </View>
          </TouchableOpacity>
      </View>
    )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});
