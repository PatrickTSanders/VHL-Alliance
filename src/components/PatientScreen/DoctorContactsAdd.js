
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';
import { AppStorage } from '../StorageWrapper';
import CalendarViewEvent from './CalendarViewEvent.js'
import ContactsWrapper from 'react-native-contacts-wrapper';
import DoctorContactsViewContact from './DoctorContactsViewContact.js';


class DoctorContactsAdd extends Component{
  constructor(props){
    super(props);
    const Contacts = require('react-native-contacts')
    this.onButtonPressed = this.onButtonPressed.bind(this);
    //this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)

    this.getPrevContacts = this.getPrevContacts.bind(this);
    this.addToContacts = this.addToContacts.bind(this)
    this.addContactToStorage = this.addContactToStorage.bind(this)
    //this.func = this.func.bind(this)
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
          console.log('In componentDidMount of DoctorContactAdd testing props params: ', this.props.navigation.state.params)
          if(this.props.navigation.state.params !== undefined){
            console.log('About to call settingStateFromProps')

            //Not sure why this works RMS
            await this.settingStateFromProps()
            this.setState({ contactRecordID: this.props.navigation.state.params.contactRecordID })



          }

          else{
            console.log('Calling this.addToContacts because this.props.navigation.state.params is undefined?')
            console.log(this.props.navigation.state.params == undefined)
            this.addToContacts();
          }

          console.log('State for testing if setState workds: ', this.state.testing),
          console.log('Current state componentDidMount of contactRecordID: ', this.state.contactRecordID)

        }

        async addContactToStorage(contactList) {
          console.log('addCalendarEvent reached')
            var accessAppStorage1 = new AppStorage();
              console.log('About to Set Item with key: totalRecordIds and value: ', contactList)
              await accessAppStorage1.SetItem('totalRecordIds', contactList)
              .then(console.log(await accessAppStorage1.GetItem('totalRecordIds')))
              .then(await this.getPrevContacts())

            }

      async getPrevContacts() {
        //console.log('getPrevCalendar Events was called when component mounted')
          var accessAppStorage2 = new AppStorage();
          console.log('Get Item with key: totalRecordIds'  );
          const prevRecordIds = await accessAppStorage2.GetItem('totalRecordIds')
          this.setState({totalContactRecordID: JSON.parse(prevRecordIds)});
          if (!this.state.totalContactRecordID){
            console.log('In if statement of getPrevContacts because !this.state.totalContactRecordID')
            this.state.totalContactRecordID = []
            //console.log('Current state of this.state.totalContactRecordID: ', this.state.totalContactRecordID)
          }

          console.log('Current state of this.state.totalContactRecordID in getPrevContacts', this.state.totalContactRecordID);
        }
    goSomewhere(screen){
        console.log('In else')
        console.warn('dismissed');
        const {navigate} = this.props.navigation;
        navigate({screen})
    }
  async   addToContacts(){
       console.log('Got to addToContacts in DoctorContactAdd')
       let prevContacts
        ContactsWrapper.getContact()
        .then(async (contact) => {
            // Replace this code
            console.log('Finished getting selected contact from user')
            console.log(contact);
            this.setState({contactRecordID: contact})
            console.log('Showing contactRecordID state: ', this.state.contactRecordID)
            await this.getPrevContacts()
            .then(() =>{
              console.log('Showing this.state.totalContactRecordID after this.getPrevContacts()', this.state.totalContactRecordID),
              prevContacts = this.state.totalContactRecordID,
              console.log('After asinging prevContacts to this.state.totalContactRecordID', prevContacts),
              console.log(Array.isArray(prevContacts)),
              prevContacts.push(contact['recordID']),
              console.log('prevContacts after prevContacts.push(contact[recordID]): ', prevContacts),
              console.log('Called state on totalContactRecordID ', this.state.totalContactRecordID),
              console.log(''),
              this.addContactToStorage(JSON.stringify(prevContacts));
           })
            // .then(
            //
            //
            // )

            //   console.log('Showing this.state.totalContactRecordID after this.getPrevContacts()', this.state.totalContactRecordID),
            //   prevContacts = this.state.totalContactRecordID,
            //   console.log('After asinging prevContacts to this.state.totalContactRecordID', prevContacts),
            //   console.log(Array.isArray(prevContacts)),
            //   prevContacts.push(contact['recordID']),
            //   console.log('prevContacts after prevContacts.push(contact[recordID]): ', prevContacts),
            // )
            // .then(
            //
            //
            // )

          }
        )






        .catch((error) => {
            console.log("ERROR CODE: ", error.code);
            console.log("ERROR MESSAGE: ", error.message);
        });

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

      render(){
        if(this.state.contactRecordID !== undefined){
          return(
            <DoctorContactsViewContact contactRecordID={this.state.contactRecordID}/>
          )
        }
        return(
          null
        )
}

}






// async addCalendarEventID(calendarID) {
//   console.log('AddCalendarEvent reached')
//     var accessAppStorage = new AppStorage();
//       await accessAppStorage.SetItem('CalendarID', calendarID)
//       .then(console.log('Set Item with key: CalendarIDs and value: ', calendarID ))
//       .then(console.log(await accessAppStorage2.GetItem('CalendarID')))
//
//     };
//
// async fetchCalendarEventID() => {
//     var accessAppStorage = new AppStorage();
//     console.log('Get Item with key: CalendarID'  );
//     const prevID = await accessAppStorage.GetItem('CalendarID')
//     this.setState({totalCalendarEvents: JSON.parse(prevID)});
//     //console.log(this.state.totalMedList);
//   };
//
// const addToCalendar = () => {
//     const eventConfig = {
//       title: 'Lunch',
//       startDate: utcDateToString(startDateUTC),
//       endDate: utcDateToString(moment.utc(startDateUTC).add(1, 'hours')),
//     };
//
//     AddCalendarEvent.presentNewCalendarEventDialog(eventConfig)
//       .then(eventId => {
//         //handle success (receives event id) or dismissing the modal (receives false)
//         if (eventId) {
//           console.log(prevCalendarEvents);
//           async () => {
//               console.log(eventID)
//               await fetchCalendarEventID()
//               const prevCalendarEvents= this.state.totalCalendarEvents;
//               console.log(prevCalendarEvents);
//               console.log(Array.isArray(prevCalendarEvents))
//               prevCalendarEvents.push(eventID);
//
//               await this.onAddMed(JSON.stringify(prevCalendarEvents));
//               }
//             }
//         } else {
//           console.warn('dismissed');
//         }
//       })
//       .catch((error: string) => {
//         // handle error such as when user rejected permissions
//         console.warn(error);
//       });
//   };


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
});

export default DoctorContactsAdd;
