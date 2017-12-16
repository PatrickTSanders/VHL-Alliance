import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';
import {
  Header,
  Button
} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import Calendar from './Calendar'
import MedicationListHandling from './MedicationListHandling'

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
          />
          <Button title='Personal Info' containerViewStyle={styles.button} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Button
            title='Button'
            containerViewStyle={styles.button}
            iconRight={{ type: 'font-awesome' }}
          />
          <Button title='Emergency Card' containerViewStyle={styles.button} />
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
      title: 'Patient HomePage',
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
    screen: MedicationListHandling,
    path: '/',
    headerTitle: 'Medication List',
    navigationOptions: ({ navigation }) => ({
      title: 'Medication List',
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
