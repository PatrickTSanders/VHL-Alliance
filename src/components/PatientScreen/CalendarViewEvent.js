import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';
import RNCalendarEvents from 'react-native-calendar-events';

class CalendarViewEvent extends Component{
  constructor(props){
    super(props);

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
  componentWillMount(){
    //this.setState({currentRouteKey: this.props.navigation.state.key})
    console.log('In componentWillMount with currentRouteKey: ', this.state.currentRouteKey)
    RNCalendarEvents.authorizationStatus()
    .then(status => {
      // if the status was previous accepted, set the authorized status to state
      this.setState({ cal_auth: status })
      if(status === 'undetermined') {
        // if we made it this far, we need to ask the user for access
        RNCalendarEvents.authorizeEventStore()
        .then((out) => {
          if(out == 'authorized') {
            // set the new status to the auth state
            this.setState({ cal_auth: out })
          }
        })
      }
    })
    .catch(error => console.warn('Auth Error: ', error));
  }

  componentWillReceiveProps() {
    //Decide whether to ask for permission on app open for notifications
    console.log('In componentWillReceiveProps with currentRouteKey: ', this.state.currentRouteKey)
      this.setState({momentInUTC: moment.now()});
      this.setState({currentEventId: this.props.currentEventId})
      console.log('Showing currentEvent Id state in Calendar view ', this.state.currentEventId)
      // this.addToCalendar();
      // this.getPrevCalendarEvents();
      console.log('In file Calendar View Event')
      if (this.state.currentEventId){
        RNCalendarEvents.findEventById(this.state.currentEventId)
          .then(event => {
            console.log('In calendar view event with, promise from react-native-calendar event: ', event);
            console.log(event['endDate'])
            this.setState({currentEventPromise: event})
            console.log(this.state.currentEventPromise)

          })
          .catch(error => {
           console.log('Error in RNCalendarEvents.findEventById');
           console.log(error)
          });
      }


    }
  render(){
    return(
      //Will include iOS only properties for the moment, and decide on deprecation after conferring
      //with PTS
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.container} >
          <View style={styles.header}>
            <Text>
            title
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={styles.description}>
            {this.state.currentEventPromise['title']}
            </Text>
          </View>

          <View style={styles.header}>
            <Text>
            startDate
            </Text>
          </View>
          <View style={styles.header}>
            <Text style={styles.description}>
            {this.state.currentEventPromise['startDate']}
            </Text>
          </View>

          <View style={styles.header}>
            <Text>
            endDate
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={styles.description}>
            {this.state.currentEventPromise['endDate']}
            </Text>
          </View>

          <View style={styles.header}>
            <Text>
            allDay
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={styles.description}>
            {this.state.currentEventPromise['allDay']}
            </Text>
          </View>

          <View style={styles.header}>
            <Text>
          recurrence
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={styles.description}>
            {this.state.currentEventPromise['recurrence']}
            </Text>
          </View>



          <View style={styles.header}>
            <Text>
            occurrenceDate
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={styles.description}>
            {this.state.currentEventPromise['occurrenceDate']}
            </Text>
          </View>

          <View style={styles.header}>
            <Text>
            isDetached
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={styles.description}>
            {this.state.currentEventPromise['isDetached']}
            </Text>
          </View>

          <View style={styles.header}>
            <Text>
            url
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={styles.description}>
            {this.state.currentEventPromise['url']}
            </Text>
          </View>

          <View style={styles.header}>
            <Text>
            location
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={styles.description}>
            {this.state.currentEventPromise['location']}
            </Text>
          </View>

          <View style={styles.header}>
            <Text>
            notes
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={styles.description}>
            {this.state.currentEventPromise['notes']}
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
