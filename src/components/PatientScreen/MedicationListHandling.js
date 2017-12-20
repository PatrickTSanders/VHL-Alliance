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
  Button as rnButton,
  TouchableHighlight,
  KeyboardAvoidingView
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
import Swipeout from 'react-native-swipeout';



class MedicationListHandling extends Component {
    constructor(props) {
    super(props);
    this.handleSwipeout = this.handleSwipeout.bind(this);
    this.getInitialState = this.getInitialState.bind(this);
    this.updateDataSource = this.updateDataSource.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.onAddMed = this.onAddMed.bind(this);
    // var accessAppStorage = new AppStorage();
    // const getCurrent = {async fetchMedList(){
    //   var accessAppStorage2 = new AppStorage();
    //   console.log('Get Item with key: totalMedList'  );
    //   return await accessAppStorage2.GetItem('totalMedList')
    // }};
    //console.log(AStotalMedList)
    const swipeBtns = [{
      text: 'Delete',
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      //onPress: () => { this.deleteNote(rowData) }
    }];
    const test1 = ['water', '150 mg', '1x per morning', 'Shams'];
    const test2 = ['soda', '200 mg', '2x per night', 'Puryear'];
    let totalMedList = [test1, test2];
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      //console.log(this.state.totalMedList);;
    this.state = {
      dataSource: ds.cloneWithRows(this.props.beforeAppOpenMedList),
      sectionID: null,
      rowID: null,
      value: '',
      totalMedList: this.props.beforeAppOpenMedList,
      currentMed: '',
      medication: '',
      dosage: '',
      frequency: '',
      rXBy: '',


    };
  }
  getInitialState() {
      //  datasource rerendered when change is made (used to set Swipeout to active)
      var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true})

      return {
        dataSource: ds.cloneWithRows(this.props.beforeAppOpenMedList)
      }
    }



async onAddMed(totalMedList) {
  console.log('onAddmed reached')
    var accessAppStorage2 = new AppStorage();
    const testArray = [1,2,3]
    //testArray.push(currentMed)
    //totalMedList.push(currentMed)
    //this.setState(totalMedList);
      await accessAppStorage2.SetItem('totalMedList', totalMedList)
      .then(console.log('Set Item with key: totalMedList and value: ', totalMedList ))
      .then(console.log(await accessAppStorage2.GetItem('totalMedList')))

    }

  async getPrevMedList() {
    var accessAppStorage2 = new AppStorage();
    console.log('Get Item with key: totalMedList'  );
    const prevList = await accessAppStorage2.GetItem('totalMedList')
    this.setState({totalMedList: JSON.parse(prevList)});
    //console.log(this.state.totalMedList);
  }

updateDataSource(data) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data)
  });
}
handleSwipeout(sectionID, rowID) {
  console.log('sectionID: ', sectionID, ' rowID: ', rowID);
  for (let i = 0; i < this.state.dataSource.length; i++) {
    if (i !== rowID) {
      this.state.dataSource[i].active = false;
    } else {
      this.state.dataSource[i].active = true;
    }
  }
  this.updateDataSource(this.state.dataSource);
}
renderRow(rowData, sectionID, rowID) {
  return (
        <Swipeout
          rowID={rowID}
          close={!rowData.active}
          onOpen={
            this.handleSwipeout.bind(sectionID, rowID)

        }

        >
              <View style={styles.headerColumnView}>
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
        </Swipeout>
  );
}
  // onAddMedInfor = async function(){
  //
  // }

  // componentDidMount() {
  //    requestAnimationFrame(() => {
  //       // HACK TO RELOAD DATA
  //       this.refs._list.scrollTo({x: 1, y: 0, animated: false})
  //     });
  // }

  render() {
    var appStorage = new AppStorage();
    // onSubmitMedEdit = () => {
    //   let updatingMedList =  appStorage.SetItem('TestMed', this.state.text);
    //   console.log(updatingMedList);
    //   console.log('called AppStorage.SetItem to submit updated Meds');
    // }


    console.log(this.state.value);
    return (
      <KeyboardAvoidingView {...this.props} behavior="padding" style={{ flex: 1 }}>
        {/* //{...this.onAddMed.bind(this)} */}
        <View style={{flex: 3}}>
          <ListView
            ref="_list"
            style={{ flex: 8 }}
            //removeClippedSubViews={false}
            //dataSource={this.state.dataSource}
            dataSource={this.state.dataSource}
            //renderRow={this.renderRow.bind(this)}
            renderRow={(rowData, sectionID, rowID) =>
              <View style={{ flex: 1 }}>
                <Swipeout
                  rowID={rowID}
                  right={[{
                  text: 'Delete',
                  backgroundColor: 'red',
                  //backgroundColor: '#fff',
                  onPress: async () => {
                    console.log('the delete was actually pressed', { rowData });
                    console.log('Curren rowID: ', { rowID });

                    const currentIndex = this.props.beforeAppOpenMedList;
                    console.log('Current datasource index about to be popped: ',
                    currentIndex.splice(rowID, 1));

                    console.log('Current datasource arrays: ', JSON.stringify(currentIndex));
                    await this.onAddMed(JSON.stringify(currentIndex));
                    console.log('onAddMed was attempted');

                    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                    console.log(ds);
                    this.setState({ dataSource: ds.cloneWithRows(currentIndex) });
                    console.log(this.state.dataSource);
                  }
                  }]
                  }
                  // onPress={() =>
                  //   console.log('the delete was actually pressed')
                  // }
                  autoClose={true}
                  backgroundColor='transparent'
                >
                  <TouchableHighlight
                    //underlayColor='rgba(192,192,192,1,0.6)'
                    onPress={
                      console.log('delete was pressed')
                    }
                  >
                    <View style={styles.listColumnView}>

                      { /* rowData.map((name, index) => ( {
                        return {name};
                      }))
                      */
                      }

                      <Text style={styles.listColumnText}>
                        {rowData[0]}
                      </Text>
                      <Text style={styles.listColumnText}>
                        {rowData[1]}
                      </Text>
                      <Text style={styles.listColumnText}>
                        {rowData[2]}
                      </Text>
                      <Text style={styles.listColumnText}>
                        {rowData[3]}
                      </Text>

                    </View>
                  </TouchableHighlight>
                </Swipeout>
              </View>

            }
            renderSectionHeader={() =>
              <View style={{ flex: 1 }}>
                <View style={styles.headerColumnView}>
                  <Text style={styles.headerColumnText}>
                    Medication
                  </Text>
                  <Text style={styles.headerColumnText}>
                    Dosage
                  </Text>
                  <Text style={styles.headerColumnText}>
                    Frequency
                  </Text>
                  <Text style={styles.headerColumnText}>
                    Prescribed By
                  </Text>
                </View>
              </View>


            }
          />
        </View>

        <View style={{ flex: 1}}>
          <View style={{ flex: 1 }}>
            <View style={styles.headerColumnView}>
              <TextInput
                style={styles.headerColumnText}
                onChangeText={(medication) => {
                  // this.state.medication
                  this.setState({medication: medication});
                  }
                }
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
                placeholder='Medication'
                //blurOnSubmit= {true}
                multiline={true}
                onSubmitEditing={
                  async () => {
                  console.log([this.state.medication,
                    JSON.stringify([
                      this.state.medication,
                      this.state.dosage,
                      this.state.frequency,
                      this.state.rXBy])]);
                  const pushingCurrentMed = [
                    this.state.medication,
                    this.state.dosage,
                    this.state.frequency,
                    this.state.rXBy];

                  console.log(pushingCurrentMed);
                  const prevMedList = this.state.totalMedList;
                  console.log(prevMedList);
                  console.log(Array.isArray(prevMedList))
                  prevMedList.push(pushingCurrentMed);
                  // console.log(prevMedList);
                  // const updatingMedList = appStorage.SetItem('totalMedList',
                  //                 JSON.stringify(prevMedList));
                  // console.log(updatingMedList);
                  // console.log('called AppStorage.SetItem to submit updated Meds');

                  //const currentIndex = this.props.beforeAppOpenMedList;

                  await this.onAddMed(JSON.stringify(prevMedList));
                  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                  console.log(ds);
                  this.setState({ dataSource: ds.cloneWithRows(prevMedList) });
                  console.log(this.state.dataSource);

                  //!!! Clear Values of TextInput
                  this.setState({ medication: '' });
                  this.setState({ frequency: '' });
                  this.setState({ dosage: '' });
                  this.setState({ rXBy: '' });
                  }
                }
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
                this.setState({dosage: dosage});
                }
                }
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
                placeholder='Dosage'
                //blurOnSubmit= {true}
                multiline={true}
                onSubmitEditing={
                  async () => {
                  console.log([this.state.medication,
                    JSON.stringify([
                      this.state.medication,
                      this.state.dosage,
                      this.state.frequency,
                      this.state.rXBy])]);
                  const pushingCurrentMed = [
                    this.state.medication,
                    this.state.dosage,
                    this.state.frequency,
                    this.state.rXBy];

                  console.log(pushingCurrentMed);
                  const prevMedList = this.state.totalMedList;
                  console.log(prevMedList);
                  console.log(Array.isArray(prevMedList))
                  prevMedList.push(pushingCurrentMed);
                  // console.log(prevMedList);
                  // const updatingMedList = appStorage.SetItem('totalMedList',
                  //                 JSON.stringify(prevMedList));
                  // console.log(updatingMedList);
                  // console.log('called AppStorage.SetItem to submit updated Meds');

                  //const currentIndex = this.props.beforeAppOpenMedList;

                  await this.onAddMed(JSON.stringify(prevMedList));
                  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                  console.log(ds);
                  this.setState({ dataSource: ds.cloneWithRows(prevMedList) });
                  console.log(this.state.dataSource);

                  //!!! Clear Values of TextInput
                  this.setState({ medication: '' });
                  this.setState({ frequency: '' });
                  this.setState({ dosage: '' });
                  this.setState({ rXBy: '' });
                  }
                }
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
                this.setState({frequency: frequency})
                }}
                value={ this.state.frequency

                //   JSON.stringify(
                //   (value) =>{
                //     if (this.state.text){
                //       this.state.text
                //     }
                //     }
                //     else{
                //       'Place Holder'
                //     console.log(value)
                //   }
                // )
                }
                placeholder='Frequency'
                //blurOnSubmit= {true}
                multiline={true}
                onSubmitEditing={
                  async () => {
                  console.log([this.state.medication,
                    JSON.stringify([
                      this.state.medication,
                      this.state.dosage,
                      this.state.frequency,
                      this.state.rXBy])]);
                  const pushingCurrentMed = [
                    this.state.medication,
                    this.state.dosage,
                    this.state.frequency,
                    this.state.rXBy];

                  console.log(pushingCurrentMed);
                  const prevMedList = this.state.totalMedList;
                  console.log(prevMedList);
                  console.log(Array.isArray(prevMedList))
                  prevMedList.push(pushingCurrentMed);
                  // console.log(prevMedList);
                  // const updatingMedList = appStorage.SetItem('totalMedList',
                  //                 JSON.stringify(prevMedList));
                  // console.log(updatingMedList);
                  // console.log('called AppStorage.SetItem to submit updated Meds');

                  //const currentIndex = this.props.beforeAppOpenMedList;

                  await this.onAddMed(JSON.stringify(prevMedList));
                  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                  console.log(ds);
                  this.setState({ dataSource: ds.cloneWithRows(prevMedList) });
                  console.log(this.state.dataSource);

                  //!!! Clear Values of TextInput
                  this.setState({ medication: '' });
                  this.setState({ frequency: '' });
                  this.setState({ dosage: '' });
                  this.setState({ rXBy: '' });
                  }
                }
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
                this.setState({rXBy: rXBy})
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
                placeholder='Prescribed By'
                //blurOnSubmit= {true}
                multiline={true}
                onSubmitEditing={
                  async () => {
                  console.log([this.state.medication,
                    JSON.stringify([
                      this.state.medication,
                      this.state.dosage,
                      this.state.frequency,
                      this.state.rXBy])]);
                  const pushingCurrentMed = [
                    this.state.medication,
                    this.state.dosage,
                    this.state.frequency,
                    this.state.rXBy];

                  console.log(pushingCurrentMed);
                  const prevMedList = this.state.totalMedList;
                  console.log(prevMedList);
                  console.log(Array.isArray(prevMedList))
                  prevMedList.push(pushingCurrentMed);
                  // console.log(prevMedList);
                  // const updatingMedList = appStorage.SetItem('totalMedList',
                  //                 JSON.stringify(prevMedList));
                  // console.log(updatingMedList);
                  // console.log('called AppStorage.SetItem to submit updated Meds');

                  //const currentIndex = this.props.beforeAppOpenMedList;

                  await this.onAddMed(JSON.stringify(prevMedList));
                  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                  console.log(ds);
                  this.setState({ dataSource: ds.cloneWithRows(prevMedList) });
                  console.log(this.state.dataSource);

                  //!!! Clear Values of TextInput
                  this.setState({ medication: '' });
                  this.setState({ frequency: '' });
                  this.setState({ dosage: '' });
                  this.setState({ rXBy: '' });
                  }
                  // async function(){
                  //
                  //   console.log('attempting to update parent state');
                  //   var inChildStorage = new AppStorage;
                  //   const currentTotalMedList = await inChildStorage.GetItem('MedicationList')
                  //   this.onAddMedName(this.state.medication, currentTotalMedList)
                  // }


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

          {/* <Button
            title='Get Prev List'
            onPress={()=>{ this.getPrevMedList()
              console.log('Button was pressed')
          }}
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
          /> */}
        </View>
      <View style={{ height: 60, backgroundColor: '#46BBE7' }} >
        <Text style={styles.instructions}>
          Add Medication: Press Enter When Done
        </Text>
        <Text style={styles.instructions}>
          Swipe Row Left to Delete
        </Text>
      </View>
      </KeyboardAvoidingView>

    );
  }
}
const styles = StyleSheet.create({
  headerColumnView: {
   flexDirection: 'row',
   flex: 4,
   borderRadius: 4,
   borderWidth: 2.0,
   borderColor: '#d6d7da',
   //backgroundColor: '#46BBR7'
 },
 listColumnView: {
   flexDirection: 'row',
   flex: 1,
   borderRadius: 4,
   borderWidth: 0.5,
   borderColor: '#d6d7da',
 },
 headerColumnText: {
  justifyContent: 'center',
  textAlign: 'center',
  flex: 4,
  borderRadius: 4,
  borderWidth: 0.5,
  borderColor: '#d6d7da',
  //backgroundColor: '#46BBE7'
},
listColumnText: {
  justifyContent: 'center',
  textAlign: 'center',
  flex: 4,
  borderRadius: 4,
  borderWidth: 0.5,
  borderColor: '#d6d7da',
},
instructions: {
  justifyContent: 'center',
  textAlign: 'center',
  flex: 4,
  borderRadius: 4,
  borderWidth: 0.5,
  borderColor: '#d6d7da',
  color: '#333333',
  //fontStyle: 'Open Sans'
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
  // instructions: {
  //   textAlign: 'center',
  //   color: '#333333',s
  //   marginBottom: 5,
  // },
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
