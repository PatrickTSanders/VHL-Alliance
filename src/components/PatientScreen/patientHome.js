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
    screen: Calendar,
    path: '/',
    headerTitle: 'Calendar',
    navigationOptions: ({ navigation }) => ({
      title: 'Calendar',
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
