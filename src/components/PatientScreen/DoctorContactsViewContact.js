import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';
import RNCalendarEvents from 'react-native-calendar-events';

class CalendarViewEvent extends Component{
  constructor(props){
    super(props);
    this.gettingContact = this.gettingContact.bind(this)

    const utcDateToString = (momentInUTC: moment): string => {
      let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
      // console.warn(s);
      return s;
      };
    const startDateUTC = moment.now();

    this.state = {
      currentEventPromise: {
        id: '',
        calendarId: '',
        title: '',
        startDate: '',
        endDate: '',
        allDay: '',
        recurrence: '',
        recurrenceRule: '',
        occurrenceDate: '',
        isDetached: '',
        url: '',
        location: '',
        notes: '',
        description: '',
        alarms: '',
        calendar: ''
      },
      //currentRouteKey: props.navigation.state.key

    }
  }
  componentDidMount(){
    // var Contacts = require('react-native-contacts')
    // Contacts.getContact('D014D8BE-C89D-4816-93FA-A6021CC9F0AE:ABPerson', (err, contact) => {
    //   if(err === 'denied'){
    //       console.log('In componentDidMount DoctorContactsViewContact with err: ', err)
    //     } else {
    //     // Contains only contacts matching "filter"
    //     console.log('In componentDidMount DoctorContactsViewContact with contact: ', contact)
    //   }
    // })
    //
    // Contacts.getContactsMatchingString('177C371E-701D-42F8-A03B-C61CA31627F6', (err, contacts))
    // .then( () => {
    // if(err === 'denied'){
    //   console.log('In componentDidMount DoctorContactsViewContact with err: ', err)
    // } else {
    //   // Contains only contacts matching "filter"
    //   console.log('In componentDidMount DoctorContactsViewContact with contact: ', contact)
    // }
    // })

  }
  // componentWillMount(){
  //   //this.setState({currentRouteKey: this.props.navigation.state.key})
  //   console.log('In componentWillMount with currentRouteKey: ', this.state.currentRouteKey)
  //   RNCalendarEvents.authorizationStatus()
  //   .then(status => {
  //     // if the status was previous accepted, set the authorized status to state
  //     this.setState({ cal_auth: status })
  //     if(status === 'undetermined') {
  //       // if we made it this far, we need to ask the user for access
  //       RNCalendarEvents.authorizeEventStore()
  //       .then((out) => {
  //         if(out == 'authorized') {
  //           // set the new status to the auth state
  //           this.setState({ cal_auth: out })
  //         }
  //       })
  //     }
  //   })
  //   .catch(error => console.warn('Auth Error: ', error));
  // }
  //
  gettingContact(){
    var Contacts = require('react-native-contacts')
    Contacts.getContact(this.state.contactRecordID, (err, contact) => {
    if(err === 'denied'){
        console.log('In componentDidMount DoctorContactsViewContact with err: ', err)
      } else {
      // Contains only contacts matching "filter"
      console.log('In componentDidMount DoctorContactsViewContact with contact: ', contact)
      console.log()
      this.setState({currentEventPromise: contact}, function(){
        console.log('In gettingContact checking currentEventPromise[\phoneNumbers][0]', this.state.currentEventPromise['phoneNumbers'][0]['number'])
      })
    }
  })
  }
  componentDidMount() {
    //Decide whether to ask for permission on app open for notifications
    //console.log('In componentWillReceiveProps with currentRouteKey: ', this.state.currentRouteKey)

    console.log('In componentWillReceiveProps of DoctorContactViewContact with this.state.contactRecordID: ', this.state.courtRecordID)
    console.log('In componentWillReceiveProps of DoctorContactViewContact with this.props.navigation.state.params.contactRecordID: ', this.props.navigation.state.params.contactRecordID)
    this.setState({contactRecordID: this.props.navigation.state.params.contactRecordID}, function(){
      this.gettingContact();
    }

    );


    // if (this.props.navigation.state.params.contactRecordID){
    //   Contacts.getContact(this.props.navigation.state.params.contactRecordID, (err, contact) => {
    //     if(err === 'denied'){
    //         console.log('In componentDidMount DoctorContactsViewContact with err: ', err)
    //       } else {
    //       // Contains only contacts matching "filter"
    //       console.log('In componentDidMount DoctorContactsViewContact with contact: ', contact)
    //       console.log()
    //     }
    //   });
    // }
  }

  //
  //
  //   }
  render(){
    return(

      // <Text>
      //   PlaceHolder Text
      // </Text>
      //Will include iOS only properties for the moment, and decide on deprecation after conferring
      //with PTS
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.container} >
          <View style={styles.header}>
            <Text>
            RecordID
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={styles.description}>
            {this.state.currentEventPromise['recordID']}
            </Text>
          </View>

          <View style={styles.header}>
            <Text>
            givenName
            </Text>
          </View>
          <View style={styles.header}>
            <Text style={styles.description}>
            {this.state.currentEventPromise['givenName']}
            </Text>
          </View>

          <View style={styles.header}>
            <Text>
            familyName
            </Text>
          </View>
          <View style={styles.header}>
            <Text style={styles.description}>
            {this.state.currentEventPromise['familyName']}
            </Text>
          </View>

          <View style={styles.header}>
            <Text>
            phoneNumbers COULD HAVE MORE THAN 1
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={styles.description}>
            /* PlaceHolder until configure display for phone numbers */
            </Text>
          </View>

          <View style={styles.header}>
            <Text>
              postalAddresses COULD HAVE MORE THAN 1
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={styles.description}>
            /* PlaceHolder until configure display for postal address */
            </Text>
          </View>

          <View style={styles.header}>
            <Text>
          thumbnailPath
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={styles.description}>
            {this.state.currentEventPromise['thumbnailPath']}
            </Text>
          </View>



          <View style={styles.header}>
            <Text>
            hasThumbnail
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={styles.description}>
            {this.state.currentEventPromise['hasThumbnail']}
            </Text>
          </View>

          <View style={styles.header}>
            <Text>
            company
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={styles.description}>
            {this.state.currentEventPromise['company']}
            </Text>
          </View>





        </View>

      </ScrollView>

      // Can't have comments in render
      // <View style={styles.header}>
      //   <Text>
      //   recurrenceRule
      //   </Text>
      // </View>
      //
      // <View style={styles.header}>
      //   <Text style={styles.description}>
      //   {this.state.currentEventPromise['recurrenceRule']}
      //   </Text>
      // </View>
      //Android only
      // <View style={styles.header}>
      //   <Text>
      //   this.state.currentEventPromise['description']
      //   </Text>
      // </View>
      // <View style={styles.header}>
      //   <Text>
      //   this.state.currentEventPromise['alarms']
      //   </Text>
      // </View>
      // <View style={styles.header}>
      //   <Text>
      //   this.state.currentEventPromise['calendar']
      //   </Text>
      // </View>


      // Testing
      //   <View style={styles.container} >
      //     <Text style={styles.header} >
      //       {this.state.currentEventPromise['title']}
      //     </Text>
      // </View>

    )
  }
}




const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingVertical: 20
  },
  header: {
    //fontSize: 20,
    //textAlign: 'center',
    margin: 10,
  },
  description: {
    textAlign: 'center',
    color: '#333333',
    //marginBottom: 5,
  },
});

export default CalendarViewEvent;
