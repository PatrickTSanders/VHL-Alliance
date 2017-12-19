import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView,
  AsyncStorage,
  TextInput
} from 'react-native';
import {
  Header,
  Button
} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import storage from 'react-native-storage-wrapper';
import MedicationListHandling from './MedicationListHandling'
import { AppStorage } from '../StorageWrapper';


class MedicationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beforeAppOpenMedList: []
    };
  }
async componentWillMount() {
  const accessAppStorage2 = new AppStorage();
  console.log('Get Item with key: totalMedList');
  const prevList = await accessAppStorage2.GetItem('totalMedList');

  console.log('Test for retrieving', prevList);
  var parsedList = JSON.parse(prevList);
  if (!parsedList)
    parsedList = [["", "", "", ""]];

  console.log('Test for retrieving', prevList);

  this.setState({ beforeAppOpenMedList: parsedList });

  if (!this.state.beforeAppOpenMedList)
    this.setState( {beforeAppOpenMedList: []} );

  console.log(this.state.beforeAppOpenMedList);
  }


render() {
  console.log('ABout to pass to child', this.state.beforeAppOpenMedList);

    if ( this.state.beforeAppOpenMedList.length === 0 ) {
      return false;
    }
    return (
    <MedicationListHandling beforeAppOpenMedList={this.state.beforeAppOpenMedList} />
);
}
}

// const MedicationList2 = ({ value }) => (
//   /*
//     <View style={styles.container}>
//       <Text style={styles.welcome}>
//         Hello
//         {value}
//       </Text>
//       <Button
//         title='setKey'
//         onPress={
//           async function() {
//             try {
//             console.log('setKey was pressed');
//             await AsyncStorage.setItem('test', 'I hope this works');
//           } catch (error) {
//             console.log(error)
//           }
//           }
//         }
//       />
//
//       <Button
//         title='getKey'
//         onPress={
//           async function() {
//           try {
//             const keyed = await AsyncStorage.getItem('test');
//             console.log(keyed);
//             this.props.value(keyed)
//         } catch(error){
//           console.log(error)
//         }
//       }
//     }
//     />
//     </View>
//     */
//     <MedicationListHandling />
//
// );

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
    marginTop: 10,
    justifyContent: 'space-between'

  },
  textInput: {
    borderColor: 'black',
    backgroundColor: 'green',
    height: 20,
    width: 100
  }
});

export default MedicationList;
