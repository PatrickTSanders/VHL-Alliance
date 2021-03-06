import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView,
  TouchableOpacity
} from 'react-native';
import {
  Header,
  Button
} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import Calendar from './Calendar'
import EmergencyCard from './EmergencyCard';
import EmergencyCardUpdate from './EmergencyCardUpdate';
import MedicationList from './MedicationList'
import DoctorInfo from './DoctorInfo'
import MedicationListHandling from './MedicationListHandling'
import PushNotifications from '../PushNotifications'
import VoiceRecordingsAndNotes from './VoiceDataStorage/VoiceRecordingsAndNotes'
import ListOfSaved from './VoiceDataStorage/ListOfSaved'
import ViewCalendar from './Calendar.js'
import CalendarAdd from './CalendarAdd.js'
import moment from 'moment';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import { AppStorage } from '../StorageWrapper';



/*
Old Header that shows Time and Cell Service in Header Area
<View style={{ flex: 1 }} >
  <Header
      statusBarProps={{ barStyle: 'light-content' }}
      leftComponent={{ icon: 'menu', color: '#0B92D1' }}
      centerComponent={{ text: 'Patient Homepage', style: { color: '#fff' } }}
      rightComponent={{ icon: 'home', color: '#fff' }}
      outerContainerStyles={{ backgroundColor: '#3D6DCC' }}
  />
</View>
*/

//RMS CALENDAR
// const utcDateToString = (momentInUTC: moment): string => {
//   let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
//   // console.warn(s);
//   return s;
// };
//
// const addToCalendar = (title: string, startDateUTC: moment) => {
//   const eventConfig = {
//     title,
//     startDate: utcDateToString(startDateUTC),
//     endDate: utcDateToString(moment.utc(startDateUTC).add(1, 'hours')),
//   };
//
//   AddCalendarEvent.presentNewCalendarEventDialog(eventConfig)
//     .then(eventId => {
//       //handle success (receives event id) or dismissing the modal (receives false)
//       if (eventId) {
//           async () => {
//           console.log(eventID)
//           const prevDocList = this.state.totalDocList;
//           console.log(prevDocList);
//           console.log(Array.isArray(prevDocList))
//           prevDocList.push(pushingCurrentDoc);
//           // console.log(prevMedList);
//           // const updatingMedList = appStorage.SetItem('totalMedList',
//           //                 JSON.stringify(prevMedList));
//           // console.log(updatingMedList);
//           // console.log('called AppStorage.SetItem to submit updated Meds');
//
//           //const currentIndex = this.props.beforeAppOpenMedList;
//
//           await this.onAddMed(JSON.stringify(prevDocList));
//           const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
//           console.log(ds);
//           this.setState({ dataSource: ds.cloneWithRows(prevDocList) });
//           console.log(this.state.dataSource);
//
//           //!!! Clear Values of TextInput
//           this.setState({ doctor: '' });
//           this.setState({ specialty: '' });
//           this.setState({ appointments: '' });
//           this.setState({ location: '' });
//           }
//         }
//       } else {
//         console.warn('dismissed');
//       }
//     })
//     .catch((error: string) => {
//       // handle error such as when user rejected permissions
//       console.warn(error);
//     });
// };
// const eventTitle = 'Lunch';
// const nowUTC = moment.utc();
//
// async addCalendarEventID(calendarID) {
//   console.log('AddCalendarEvent reached')
//     var accessAppStorage = new AppStorage();
//       await accessAppStorage.SetItem('CalendarID', calendarID)
//       .then(console.log('Set Item with key: CalendarIDs and value: ', calendarID ))
//       .then(console.log(await accessAppStorage2.GetItem('CalendarID')))
//
//     }
//
// async fetchCalendarEventID() {
//     var accessAppStorage = new AppStorage();
//     console.log('Get Item with key: CalendarID'  );
//     const prevID = await accessAppStorage.GetItem('CalendarID')
//     this.setState({totalCalendarEvents: JSON.parse(prevID)});
//     //console.log(this.state.totalMedList);
//   }

//END RMS CALENDAR



const MainPatient= ({ navigation }) => (
  <PatientHome navigation={navigation} title={'VHL'} />
);

const PatientHome = ( {navigation} ) => (
    <View style={{ flex: 1 }}>

      <View style={{ flex: 8 }} >
        <View style={{ flexDirection: 'row' }}>
          <Button
            title='Calendar'
            containerViewStyle={styles.button}
            iconRight={{ type: 'font-awesome' }}
            onPress={() => navigation.navigate('ViewCalendar')}
          />
          <Button
            title='Medication List'
            containerViewStyle={styles.button}
            onPress={() => navigation.navigate('MedicationList')}
          />
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Button
            title='Doctor Info'
            containerViewStyle={styles.button}
            iconRight={{ type: 'font-awesome' }}
            onPress={() => navigation.navigate('DoctorInfo')}

          />
          <Button
            title='Notification Hub' containerViewStyle={styles.button}
            onPress={() => navigation.navigate('PushNotifications')}

          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Button
            title='My Recordings'
            containerViewStyle={styles.button}
            iconRight={{ type: 'font-awesome' }}
            onPress={() => navigation.navigate('ListOfSaved')}
          />
          <Button
            title='Emergency Card'
            containerViewStyle={styles.button}
            onPress={() => navigation.navigate('EmergencyCard')}
          />
        </View>

      </View>

    </View>
);

const stackNavPatient = StackNavigator({
  PatientHome: {
    screen: MainPatient,
    navigationOptions: ({ navigation, defaultHeader }) => ({
      ...defaultHeader,
      backgroundColor: '#3D6DCC',
      title: 'Patient Home',
      headerTintColor: '#3D6DCC',
    })
  },
  ViewCalendar: {
    screen: ViewCalendar,
    path: '/',
    headerTitle: 'Calendar',
    navigationOptions: ({ navigation }) => ({
      title: 'Calendar',
      headerRight: <TouchableOpacity
        title="Info"
        style={{ flex: 1 }}
        onPress={() => {
          console.log('Pressed');
          navigation.navigate('CalendarAdd')
        }}
        >
        <Text style={{ flex: 1, fontSize: 20, justifyContent: 'center', color: 'blue' }}>
          Add
        </Text>
      </TouchableOpacity>
  }),
},
CalendarAdd: {
    screen: CalendarAdd,
    path:'/',
    headerTitle: 'Test',
    navigationOptions: ({ navigation }) => ({
      title: 'Add Calendar',
    }),
},
MedicationList: {
  screen: MedicationList,
  path: '/',
  headerTitle: 'Medication List',
  //headerRight: <rnButton title="Info" />,
  navigationOptions: ({ navigation }) => ({
    title: 'Medication List',
    // headerRight: <TouchableOpacity title="Info" style={{ flex: 1 }} >
    //   <Text style={{ flex: 1, fontSize: 20, justifyContent: 'center', color: 'blue' }}>
    //     Info
    //   </Text>
    // </TouchableOpacity>
  }),
},
VoiceRecordings: {
    screen: VoiceRecordingsAndNotes,
    path: '/',
    headerTitle: 'Voice Recordings1',
    navigationOptions: ({ navigation }) => ({
      title: 'Add new Recording',

      //headerRight: <Button title='Done'
                     /* this would be something like
                         take current state
                         update to realm
                         pop this screen from current stack (so back doesnt take me back to same place)
                      onPress={() => navigation.navigate('VoiceRecordings')} */
      //              />
    }),
  },

  ListOfSaved: {
    screen: ListOfSaved,
    path: '/',
    headerTitle: 'idk',
    navigationOptions: ({ navigation }) => ({
      backgroundColor: '#3D6DCC',
      title: 'My Recordings',
      headerTintColor: '#3D6DCC',
      headerRight : <TouchableOpacity title='Add'
                    onPress={() => navigation.navigate('VoiceRecordings')}
                    >
                      <Text style={{ flex: 1, fontSize: 20, justifyContent: 'center', color: 'blue' }}>
                        Add
                      </Text>
                    </TouchableOpacity>

    }),
  },

DoctorInfo: {
  screen: DoctorInfo,
  path: '/',

  headerTitle: 'Doctor Info',
  //headerRight: <rnButton title="Info" />,
  navigationOptions: ({ navigation }) => ({
    title: 'Doctor Info',

    // headerRight: <TouchableOpacity title="Info" style={{ flex: 1 }} >
    //   <Text style={{ flex: 1, fontSize: 20, justifyContent: 'center', color: 'blue' }}>
    //     Info
    //   </Text>
    // </TouchableOpacity>

    }),
  },

  PushNotifications: {
    screen: PushNotifications,
    path: '/',
    headerTitle: 'Medication List',
    navigationOptions: ({ navigation }) => ({
      title: 'Notification Hub',
    }),
  },

EmergencyCard: {
  screen: EmergencyCard,
  path: '/',
  headerTitle: 'Patient Info',
  //headerRight: <rnButton title="Info" />,
  navigationOptions: ({ navigation }) => ({
    title: 'Emergency Card',
    headerRight: <TouchableOpacity
      title="Info"
      style={{ flex: 1 }}
      onPress={() => navigation.navigate('EmergencyCardUpdate')}

      >
      <Text style={{ flex: 1, fontSize: 20, justifyContent: 'center', color: 'blue' }}>
        Update
      </Text>
    </TouchableOpacity>
}),
},
EmergencyCardUpdate: {
  screen: EmergencyCardUpdate,
  path: '/',
  headerTitle: 'Update Emergency Card',
  //headerRight: <rnButton title="Info" />,
  navigationOptions: ({ navigation }) => ({
    title: 'Update Emergency Card',
    // headerRight: <TouchableOpacity
    //   title="Info"
    //   style={{ flex: 1 }}
    //   onPress={() => navigation.navigate('EmergencyCardUpdate')}
    //
    //   >
    //   <Text style={{ flex: 1, fontSize: 20, justifyContent: 'center', color: 'blue' }}>
    //     Update
    //   </Text>
    // </TouchableOpacity>
}),
}


});

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
  button: {
    flex: 1,
    marginTop: 100,
    justifyContent: 'space-between'

  }
});

export default stackNavPatient;
