
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ListView, TouchableHighlight } from 'react-native';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';
import Row from './Row.js';
import testData from './Data.js';
import RNCalendarEvents from 'react-native-calendar-events';


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
   const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(testData),
      cal_auth: ''
    };
  }
  componentDidMount (){
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

  }



  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(data) => <Row {...data} />}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
    );
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
