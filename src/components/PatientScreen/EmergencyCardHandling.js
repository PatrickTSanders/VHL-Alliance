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
  KeyboardAvoidingView,
  Image
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



class EmergencyCardHandling extends Component {
    constructor(props) {
    super(props);
    this.handleSwipeout = this.handleSwipeout.bind(this);
    this.getInitialState = this.getInitialState.bind(this);
    this.updateDataSource = this.updateDataSource.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.onAddMed = this.onAddMed.bind(this);

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
      dataSource: ds.cloneWithRows(this.props.beforeAppOpenERCardList),
      sectionID: null,
      rowID: null,
      value: '',
      totalMedList: this.props.beforeAppOpenERCardList,
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
        dataSource: ds.cloneWithRows(this.props.beforeAppOpenERCardList)
      }
    }

async onAddMed(totalMedList) {
  console.log('onAddmed reached')
    var accessAppStorage2 = new AppStorage();
    const testArray = [1,2,3]
      await accessAppStorage2.SetItem('totalMedList', totalMedList)
      .then(console.log('Set Item with key: totalMedList and value: ', totalMedList ))
      .then(console.log(await accessAppStorage2.GetItem('totalMedList')))

    }

  async getPrevMedList() {
    var accessAppStorage2 = new AppStorage();
    console.log('Get Item with key: totalMedList'  );
    const prevList = await accessAppStorage2.GetItem('totalMedList')
    this.setState({totalMedList: JSON.parse(prevList)});
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

  render() {
    var appStorage = new AppStorage();

    console.log(this.state.value);
    return (
      <KeyboardAvoidingView {...this.props} behavior="padding" style={{ flex: 1 }}>
        <View style={{flex: 3}}>
          <ListView
            enableEmptySections={true}
            ref="_list"
            style={{ flex: 8 }}
            dataSource={this.state.dataSource}
            renderRow={(rowData, sectionID, rowID) =>
              <View style={{ flex: 1 }}>

                <View style={styles.listColumnView}>
                  <Text style={styles.listColumnText}>
                    {rowData[0]}
                  </Text>
                  <Text style={styles.listColumnText}>
                    {rowData[1]}
                  </Text>

                </View>
              </View>

            }
          />
        </View>

        <View style = {{flex:6}}>
        <Image
         style={{width: null, height: null}}
         source={require('./EmergencyCard.png')}
         //resizeMode="stretch"
         position= 'absolute'
         top = {0}
         left= {0}
         bottom= {0}
         right= {0}
         padding= {10}
       />
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
  //   color: '#333333',
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
export default EmergencyCardHandling;
