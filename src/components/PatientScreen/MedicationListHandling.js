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
import { AppStorage } from '../StorageWrapper';


class MedicationListHandling extends Component {
  constructor(props) {
    super(props);
    var accessAppStorage = new AppStorage();
    const AStotalMedList = () => ({
      async function(){
        await accessAppStorage.GetItem('MedicationList')
      }
    });
    const test1 = ['water', '150 mg', '1x per morning', 'Shams'];
    const test2 = ['soda', '200 mg', '2x per night', 'Puryear'];
    let totalMedList = [test1, test2];
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([test1, test2]),
      value: '',
      totalMedList: {AStotalMedList},
      currentMed: '',
      medication: '',
      dosage: '',
      frequency: '',
      rXBy: ''

    };
  }
  async onAddMedName(currentMed, totalMedList){
    var accessAppStorage2 = new AppStorage();
    const testArray = [1,2,3]
    testArray.push(currentMed)
    totalMedList.push(currentMed)
    this.setState(totalMedList)
      await accessAppStorage2.SetItem('totalMedList', JSON.stringify(totalMedList))
      .then(console.log('Set Item with key: totalMedList and value: ', totalMedList ))
      .then(console.log( await accessAppStorage2.GetItem('totalMedList')))

    }

  // onAddMedInfor = async function(){
  //
  // }


  render() {
    var appStorage = new AppStorage();
    // onSubmitMedEdit = () => {
    //   let updatingMedList =  appStorage.SetItem('TestMed', this.state.text);
    //   console.log(updatingMedList);
    //   console.log('called AppStorage.SetItem to submit updated Meds');
    // }

    console.log(this.state.value)
    return (
      <View {...this.props } {...this.onAddMedName.bind(this)} style={{ flex: 1 }}>
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
        <View style={{ flex: 1}}>
          <View style={{ flex: 1 }}>
            <View style={styles.headerColumnView}>
              <TextInput
                style={styles.headerColumnText}
                onChangeText={(medication) => {
                this.setState({medication})
                }}
                value={ this.state.medication

                //   JSON.stringify(
                //   (value) =>{
                //     if (this.state.text){
                //       this.state.text
                //     }
                //     else{
                //       'Place Holder'
                //     }
                //     console.log(value)
                //   }
                // )
                }
                placeholder='Enter Med'
                //blurOnSubmit= {true}
                // onSubmitEditing = {() => {
                //   let updatingMedList =  appStorage.SetItem('TestMedicationList', JSON.stringify([test1, test2]));
                //   console.log(updatingMedList);
                //   console.log('called AppStorage.SetItem to submit updated Meds');
                // }
                //
                // }
                //onEndEditing = {this.onSubmitMedEdit}
                // This will only work on iOS, RMS did this
                //onKeyPress={this.onSubmitMedEdit
                //   () => {
                //   if(nativeEvent === 'Enter'){
                //     console.log(this.state.text)
                //   }
                // }

                // }

              />
              <TextInput
                style={styles.headerColumnText}
                onChangeText={(dosage) => {
                this.setState({dosage})
                }}
                value={ this.state.dosage

                //   JSON.stringify(
                //   (value) =>{
                //     if (this.state.text){
                //       this.state.text
                //     }
                //     else{
                //       'Place Holder'
                //     }
                //     console.log(value)
                //   }
                // )
                }
                placeholder='dose'
                //blurOnSubmit= {true}
                // onSubmitEditing = {() => {
                //   let updatingMedList =  appStorage.SetItem('TestMedicationList', JSON.stringify([test1, test2]));
                //   console.log(updatingMedList);
                //   console.log('called AppStorage.SetItem to submit updated Meds');
                // }
                //
                // }
                //onEndEditing = {this.onSubmitMedEdit}
                // This will only work on iOS, RMS did this
                //onKeyPress={this.onSubmitMedEdit
                //   () => {
                //   if(nativeEvent === 'Enter'){
                //     console.log(this.state.text)
                //   }
                // }

                // }

              />
              <TextInput
                style={styles.headerColumnText}
                onChangeText={(frequency) => {
                this.setState({frequency})
                }}
                value={ this.state.frequency

                //   JSON.stringify(
                //   (value) =>{
                //     if (this.state.text){
                //       this.state.text
                //     }
                //     else{
                //       'Place Holder'
                //     }
                //     console.log(value)
                //   }
                // )
                }
                placeholder='freq'
                //blurOnSubmit= {true}
                // onSubmitEditing = {() => {
                //   let updatingMedList =  appStorage.SetItem('TestMedicationList', JSON.stringify([test1, test2]));
                //   console.log(updatingMedList);
                //   console.log('called AppStorage.SetItem to submit updated Meds');
                // }

                //}
                //onEndEditing = {this.onSubmitMedEdit}
                // This will only work on iOS, RMS did this
                //onKeyPress={this.onSubmitMedEdit
                //   () => {
                //   if(nativeEvent === 'Enter'){
                //     console.log(this.state.text)
                //   }
                // }

                // }

              />
              <TextInput
                style={styles.headerColumnText}
                onChangeText={(rXBy) => {
                this.setState({rXBy})
                }}
                value={ this.state.rXBy

                //   JSON.stringify(
                //   (value) =>{
                //     if (this.state.text){
                //       this.state.text
                //     }
                //     else{
                //       'Place Holder'
                //     }
                //     console.log(value)
                //   }
                // )
                }
                placeholder='Enter Rx'
                //blurOnSubmit= {true}

                onSubmitEditing = {

                  // () => {
                  // console.log([ this.state.medication, JSON.stringify([this.state.medication, this.state.dosage, this.state.frequency, this.state.rXBy])]);
                  // let updatingMedList =  appStorage.SetItem(this.state.medication, JSON.stringify([this.state.medication, this.state.dosage, this.state.frequency, this.state.rXBy]));
                  // console.log(updatingMedList);
                  // console.log('called AppStorage.SetItem to submit updated Meds');
                  // }
                  async function(){

                    console.log('attempting to update parent state');
                    var inChildStorage = new AppStorage;
                    const currentTotalMedList = await inChildStorage.GetItem('MedicationList')
                    this.onAddMedName(this.state.medication, currentTotalMedList)
                  }
                }


                //onEndEditing = {this.onSubmitMedEdit}
                // This will only work on iOS, RMS did this
                //onKeyPress={this.onSubmitMedEdit
                //   () => {
                //   if(nativeEvent === 'Enter'){
                //     console.log(this.state.text)
                //   }
                // }

                // }

              />
            </View>
          </View>

          <Button
            title='Set Key'
            onPress={() => {
              //const setting = settingItem('StorageWrapper', 'Storage Works');
              let setting =  appStorage.SetItem('TestKey', 'Storage Works!!');
              console.log(setting);
              console.log('called AppStorage.SetItem');
            }
          }
          />
          <Button
            title='Get Key'
            onPress={
              async function() {

              //const getting = gettingItem('testing');
              let getting =  await appStorage.GetItem('TestKey');
              console.log('called AppStorage.GetItem result = ', {getting});

            }
          }

          />
          <Button
            title='Test Past Med'
            onPress={
              async function() {
              try {

                console.log(await appStorage.GetItem('TestMed'))
            } catch(error){
              console.log(error)
              }
            }


            }
          />
          <Button
            title='Add Med'
            onPress={() =>
              this.state.value = this.state.text
              //onAddMedName()
            }
          />
        </View>
      </View>

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
