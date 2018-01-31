
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
import RowForContacts from './RowForContacts.js'

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
   this.getPrevContacts = this.getPrevContacts.bind(this);
   // this.getEventProperties = this.getEventProperties.bind(this)
   // this.forLoop = this.forLoop.bind(this)
   this.getEventById = this.getEventById.bind(this)
   this.getEventsProperty = this.getEventsProperty.bind(this)
   this.gettingContact = this.gettingContact.bind(this)

   //const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      cal_auth: '',

      //totalCalendarEvents: [{}]
    };
  }
  async componentDidMount (){
    // Let's get access before doing anything
    Contacts.checkPermission( (err, permission) => {
       // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
       if(permission === 'undefined'){
         Contacts.requestPermission( (err, permission) => {
           // ...
         })
       }
       if(permission === 'authorized'){
         // yay!
       }
       if(permission === 'denied'){
         // x.x
       }
      })

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
async gettingContact(contactInfo){
  var Contacts = require('react-native-contacts')

  let gettingContact = await Contacts.getContact(contactInfo, (newContact) => {
    console.log('In DoctorContacts.js Contacts.getContact, promise from react-native-contacts: ', newContact);
    console.log(newContact)
    gettingContact = newContact['recordID']
    //console.log('gettingContact value: ', gettingContact)

      //   this.setState({currentContact: newContact}, function() {
      //   console.log('Current state of currentContact: ', this.state.currentContact);
      // });
      return newContact
})

  return gettingContact

}


async getEventById(contactRecordID){
  // let updatedContact ='test'
      var Contacts = require('react-native-contacts')
      //let fetchContact = this.props.contactRecordID['recordID']
      let currentContact
      let err
      let test = '410FE041-5C4E-48DA-B4DE-04C15EA3DBAC'

      //console.log('this.props.contactRecordID[recordID]: ',  this.props.contactRecordID['recordID'] )
      //console.log('type of this.props.contactRecordID[recordID]: ', typeof this.props.contactRecordID['recordID'])




      //NEED TO SOMEHOW GET THIS TO RETURN THE newContact SO THAT IT CAN BE USED IN THE await Promise.all FUNCTION
      let updatedContact = await this.gettingContact(contactRecordID)
      await Contacts.getContact(contactRecordID, (newContact) => {
        console.log('In DoctorContacts.js Contacts.getContact, promise from react-native-contacts: ', newContact);
        console.log(newContact)
        //gettingContact = newContact['recordID']
        //console.log('gettingContact value: ', gettingContact)

          //   this.setState({currentContact: newContact}, function() {
          //   console.log('Current state of currentContact: ', this.state.currentContact);
          // });

          console.log('Current newContact[recordID]: ', newContact['recordID'])
          gettingContact = newContact['recordID']
    })





      //updatedContact = this.state.currentContact
      // await Contacts.getContact(contactRecordID, (newContact) => {
      //   console.log('In DoctorContacts.js Contacts.getContact, promise from react-native-contacts: ', newContact);
      //   console.log(newContact)
      //   this.gettingContact(newContact)
      //   .then((takeContact) => {
      //     updatedContact = takeContact
      //   })
      // })



    return gettingContact


}


async getEventsProperty(){
    totalContacts = []
    const contacts = await this.getPrevContacts();
    console.log('Current {contacts} in getEventsProperty: ', contacts)

    await Promise.all(contacts.map(async (contactRecordID) => {
      const contents = await this.getEventById(contactRecordID)
      console.log('Contents: ', contents)
      totalContacts.push(contents)

    }));
    console.log('total events: ', totalContacts)
    return totalContacts
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

  async getPrevContacts() {
    //console.log('getPrevCalendar Events was called when component mounted')
      var accessAppStorage2 = new AppStorage();
      console.log('Get Item with key: totalRecordIds'  );
      const prevContacts = await accessAppStorage2.GetItem('totalRecordIds')
      this.setState({totalRecordIds: JSON.parse(prevContacts)});
      // if (prevCal === []){
      //   this.state.totalCalendarEvents = ['']
      // }
      console.log(this.state.totalRecordIds);
      // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      // const newDataSource = ds.cloneWithRows(this.state.totalCalendarEvents)
      // console.log('NewDataSourceTotal ', newDataSource)
      // console.log('New data source with title ', newDataSource['title'])
      // this.setState({dataSource: newDataSource})
      // console.log('State of dataSource: ', this.state.dataSource)
      //return newDataSource
      //this.setState({dataSource: ds.cloneWithRows(this.state.totalCalendarEvents)})
      console.log(typeof prevContacts)
      console.log(typeof JSON.parse(prevContacts))
      return JSON.parse(prevContacts)
    }



  render() {
    if(this.state.dataSource) {
      console.log('In render: this.state. dataSource: ', this.state.dataSource, 'typeof: ', typeof this.state.dataSource)
      return (

          <ListView
            style={styles.container}
            dataSource={this.state.dataSource}
            enableEmptySections={true}
            renderRow={(data) => <RowForContacts dataFromContacts={data} navigation={this.props.navigation} />}
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
