import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
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
      //currentEventId: this.props.currentEventId

    }
  }
  componentWillMount(){
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

      this.setState({momentInUTC: moment.now()});
      this.setState({currentEventId: this.props.currentEventId})
      console.log('Showing currentEvent Id state in Calendar view ', this.state.currentEventId)
      // this.addToCalendar();
      // this.getPrevCalendarEvents();
      console.log('In file Calendar View Event')
      if (this.state.currentEventId){
        RNCalendarEvents.findEventById(this.state.currentEventId)
          .then(event => {
            console.log('In calendar view event with, promise from react-native-calendar event: ', event)
          })
          .catch(error => {
           console.log('Error in RNCalendarEvents.findEventById');
          });
      }


    }
  render(){
    return(
      <View>
        <Text>
          {this.state.currentEventId}
        </Text>
      </View>
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

export default CalendarViewEvent;
