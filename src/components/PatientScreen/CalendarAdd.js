
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';


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

 addToCalendar(){
   const utcDateToString = () => {
      const s = moment.utc(this.state.momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
     // console.warn(s);
     return s;
   };
        const eventConfig = {
          title: 'Lunch',
          startDate: utcDateToString(this.state.momentInUTC),
          endDate: utcDateToString(moment.utc(this.state.momentInUTC).add(1, 'hours')),
        };

        AddCalendarEvent.presentNewCalendarEventDialog(eventConfig)
          .then(eventId => {
            //handle success (receives event id) or dismissing the modal (receives false)
            if (eventId) {
              console.log(prevCalendarEvents);
              async () => {
                  console.log(eventID)
                  await fetchCalendarEventID()
                  const prevCalendarEvents= this.state.totalCalendarEvents;
                  console.log(prevCalendarEvents);
                  console.log(Array.isArray(prevCalendarEvents))
                  prevCalendarEvents.push(eventID);

                  await this.onAddMed(JSON.stringify(prevCalendarEvents));
                  }
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
      <View />
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
