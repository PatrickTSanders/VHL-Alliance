
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';
import { AppStorage } from '../StorageWrapper';
import CalendarViewEvent from './CalendarViewEvent.js'

class CalendarAdd extends Component{
  constructor(props){
    super(props);

    const utcDateToString = (momentInUTC: moment): string => {
      let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
      // console.warn(s);
      return s;
      };
    const startDateUTC = moment.now();

    this.state = {

    }
  }
  componentDidMount() {
    //Decide whether to ask for permission on app open for notifications
      this.setState({momentInUTC: moment.now()});
      this.getPrevCalendarEvents();
      this.addToCalendar();


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
    async addCalendarEvent(calendarEvent) {
      console.log('addCalendarEvent reached')
        var accessAppStorage1 = new AppStorage();
          await accessAppStorage1.SetItem('totalCalendarEvents', calendarEvent)
          .then(console.log('Set Item with key: totalCalendarEvents and value: ', calendarEvent ))
          .then(console.log(await accessAppStorage1.GetItem('totalCalendarEvents')))
          .then(await this.getPrevCalendarEvents())

        }

  async getPrevCalendarEvents() {
    //console.log('getPrevCalendar Events was called when component mounted')
      var accessAppStorage2 = new AppStorage();
      console.log('Get Item with key: totalCalendarEvents'  );
      const prevCal = await accessAppStorage2.GetItem('totalCalendarEvents')
      this.setState({totalCalendarEvents: JSON.parse(prevCal)});
      if (!this.state.totalCalendarEvents){
        this.state.totalCalendarEvents = []
      }
      console.log(this.state.totalCalendarEvents);
    }

 addToCalendar(){
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

        AddCalendarEvent.presentNewCalendarEventDialog(eventConfig)
          .then(eventId => {
            //handle success (receives event id) or dismissing the modal (receives false)
            if (eventId) {
              console.log(eventId)
              this.setState({currentEventId: eventId})
              console.log('Showing currentEventId state: ', this.state.currentEventId)
              this.getPrevCalendarEvents();
              const prevCalendarEvents= this.state.totalCalendarEvents;

              console.log(prevCalendarEvents);
              console.log(Array.isArray(prevCalendarEvents))
              prevCalendarEvents.push(eventId);

              console.log('Called state on totalCalendarEvents ', this.state.totalCalendarEvents)
              this.addCalendarEvent(JSON.stringify(prevCalendarEvents));

              // async (eventId) => {
              //
              //     }
              }
            else {
              console.warn('dismissed');
            }
          })
          .catch((error: string) => {
            // handle error such as when user rejected permissions
            console.warn(error);
          });
      };

  render(){
    return(
      <CalendarViewEvent currentEventId={this.state.currentEventId} />
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

export default CalendarAdd;
