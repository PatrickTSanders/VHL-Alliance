
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ListView, TouchableHighlight } from 'react-native';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';
import Row from './Row.js';
import testData from './Data.js';
import RNCalendarEvents from 'react-native-calendar-events';
import { AppStorage } from '../StorageWrapper';


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

export default class ViewCalendar extends Component {
  constructor(props) {
   super(props);
   this.getPrevCalendarEvents = this.getPrevCalendarEvents.bind(this);
   // this.getEventProperties = this.getEventProperties.bind(this)
   // this.forLoop = this.forLoop.bind(this)
   this.getEventById = this.getEventById.bind(this)
   this.getEventsProperty = this.getEventsProperty.bind(this)

   //const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      cal_auth: '',

      //totalCalendarEvents: [{}]
    };
  }
async componentDidMount (){
    // Let's get access before doing anything
     RNCalendarEvents.authorizationStatus()
      .then(status => {
        // if the status was previous accepted, set the authorized status to state
        this.setState({ cal_auth: status })
        console.log('State of cal_auth: ', this.state.cal_auth)
        console.log('Status variable of authorizationStatus: ', status)
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
    await this.getEventsProperty()
          .then((data) => {
            this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(data),
                  })
            console.log('Updated dataSource for ListRow: ', this.state.dataSource)

              //const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

      }


            //=> {
            //   console.log('In .then of componentDidMount ', data)
            //   let calendarData = []
            //   for(let i = 0; i < data.length; i++){
            //     console.log(data[i])
            //     RNCalendarEvents.findEventById(data[i])
            //       .then(event => {
            //         console.log('In calendar.js componentDidMount, promise from react-native-calendar event: ', event);
            //         console.log(event)
            //         calendarData.push(event)
            //         console.log(calendarData)
            //
            //       })
            //       .catch(error => {
            //        console.log('Error in RNCalendarEvents.findEventById');
            //        console.log(error)
            //       });
            //   }
            //   console.log(calendarData)
            //   const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            //   this.setState({
            //     dataSource: this.state.dataSource.cloneWithRows(calendarData),
            //   })
            //   console.log('componentDidMount end this.state.dataSource: ', this.state.dataSource)
            // });
)
}

  // async setDataSource() {
  //   this.getPrevCalendarEvents()
  //   const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  //   this.setState({dataSource: ds.cloneWithRows(this.state.totalCalendarEvents)});
  // }
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

  // async getEventProperties(eventList){
  //     console.log('In .then of componentDidMount ', eventList)
  //     await this.forLoop(eventList)
  //     .then((loopList) =>{
  //       console.log('Here is comepletedForLoop: ', loopList)
  //
  //       const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  //       this.setState({
  //         dataSource: this.state.dataSource.cloneWithRows(loopList),
  //       })
  //       console.log('componentDidMount end this.state.dataSource: ', this.state.dataSource)
  //     }
  //
  //     )
  //
  //
  //   }

  async getPrevCalendarEvents() {
    //console.log('getPrevCalendar Events was called when component mounted')
      var accessAppStorage2 = new AppStorage();
      console.log('Get Item with key: totalCalendarEvents'  );
      const prevCal = await accessAppStorage2.GetItem('totalCalendarEvents')
      this.setState({totalCalendarEvents: JSON.parse(prevCal)});
      // if (prevCal === []){
      //   this.state.totalCalendarEvents = ['']
      // }
      console.log(this.state.totalCalendarEvents);
      // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      // const newDataSource = ds.cloneWithRows(this.state.totalCalendarEvents)
      // console.log('NewDataSourceTotal ', newDataSource)
      // console.log('New data source with title ', newDataSource['title'])
      // this.setState({dataSource: newDataSource})
      // console.log('State of dataSource: ', this.state.dataSource)
      //return newDataSource
      //this.setState({dataSource: ds.cloneWithRows(this.state.totalCalendarEvents)})
      console.log(typeof prevCal)
      console.log(typeof JSON.parse(prevCal))
      return JSON.parse(prevCal)
    }



  render() {
    if(this.state.dataSource) {
      console.log('In render: this.state. dataSource: ', this.state.dataSource, 'typeof: ', typeof this.state.dataSource)
      return (

          <ListView
            style={styles.container}
            dataSource={this.state.dataSource}
            enableEmptySections={true}
            renderRow={(data) => <Row dataFromCalendar={data} navigation={this.props.navigation} />}
            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          />


      );
    }
    else{
      return(
        <View />
      );

    }

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
