import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView,
  AsyncStorage,
  TextInput,
  ListView,
  Button as rnButton
} from 'react-native';
import {
  Header,
  Button
} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import storage from 'react-native-storage-wrapper';
import Grid from 'react-native-grid-component';
import { settingItem, gettingItem } from '../StorageWrapper'

class MedicationListHandling extends Component {
  constructor() {
    super();
    const test1 = ['water', '150 mg', '1x per morning', 'Shams'];
    const test2 = ['soda', '200 mg', '2x per night', 'Puryear'];
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([test1, test2]),
      value: 'Place Holder'
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) =>
          <View>
            <View style={styles.headerColumnView}>

              { /* rowData.map((name, index) => ( {
                return {name};
              }))
              */
              }

              <Text style={styles.headerColumnText}>
                {rowData[0]}
              </Text>
              <Text style={styles.headerColumnText}>
                {rowData[1]}
              </Text>
              <Text style={styles.headerColumnText}>
                {rowData[2]}
              </Text>
              <Text style={styles.headerColumnText}>
                {rowData[3]}
              </Text>

            </View>
            <View style={{ flex: 1}}>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={(text) => {
                this.setState({ text });

                }}
                value={this.state.text}
              />
              <Button
                title='Set Key'
                onPress={() => {
                  const setting = settingItem('StorageWrapper', 'Storage Works');
                  console.log(setting);
                  console.log('sending StorageWrapper key to class');
                }
              }
              />
              <Button
                title='Get Key'
                onPress={() => {
                  const getting = gettingItem('testing');
                  console.log('sending StorageWrapper key to get value ');
                  console.log(getting);
                }
              }
              />
            </View>
          </View>

        }
        renderSectionHeader={() =>
          <View style={{ flex: 1 }}>
            <View style={styles.headerColumnView}>
              <Text style={styles.headerColumnText}>
                'medication'
              </Text>
              <Text style={styles.headerColumnText}>
                'dosage'
              </Text>
              <Text style={styles.headerColumnText}>
                'Frequency'
              </Text>
              <Text style={styles.headerColumnText}>
                'Rx By'
              </Text>
            </View>
          </View>


        }
      />
    );
  }
}
const styles = StyleSheet.create({
  headerColumnView: {
   flexDirection: 'row',
   flex: 1,
   borderRadius: 4,
   borderWidth: 0.5,
   borderColor: '#d6d7da',
 },
 headerColumnText: {
  justifyContent: 'center',
  textAlign: 'center',
  flex: 1,
  borderRadius: 4,
  borderWidth: 0.5,
  borderColor: '#d6d7da',
},
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
    tintColor: 'black'
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
export default MedicationListHandling;
