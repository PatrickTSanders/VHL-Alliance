import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import { StackNavigator } from 'react-navigation';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import storage from 'react-native-storage-wrapper';
import AudioUtils from 'react-native-audio';

const Realm = require('realm');

class ListOfSaved extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [{date: 'Decemeber 7, 2017', blurb: 'Opthamalogist exam was ..'}],
      page: 1,
      seed: 1,
      audioPath: AudioUtils.DocumentDirectoryPath,
      error: null,
      refreshing: false,
      realm : null
    };
  }

  componentWillMount() {

    console.log("componentWillMount");
    Realm.open({
      schema: [
                {name: 'Recordings', properties:
                                        {
                                          filePath: 'string',
                                          title: 'string',
                                          lengthOfRecording: 'int',
                                          notes: 'string',
                                          date: 'string',
                                        }
                }
              ]
    }).then(realm => {

        this.setState({ realm });
    });
  }
  /*renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };*/

  /*renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };*/

  /*renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };*/

  render() {
    const info = this.state.realm ? 1 : 2; //1 means that the state of the realm has been set (accessible)

    if(info === 1){
      let myRecord = this.state.realm.objects('Recordings');
      var values = [];
      for(i=0; i < myRecord.length; i++) {
        values.push({filePath: myRecord[i].filePath, title: myRecord[i].title,
                    lengthOfRecording: myRecord[i].lengthOfRecording, notes: myRecord[i].notes,
                    date: myRecord[i].date
                  });
      }

      const {navigate} = this.props.navigation;

      return (
        <View style = {{flex:10}}>
          <FlatList style = {{flex: 3}}
            data={values}
            renderItem={({ item }) => (
              <ListItem
                title = {`${item.title}`}
                subtitle = {item.date}
                //avatar={{ uri: item.picture.thumbnail }}
                containerStyle={{ borderBottomWidth: 0 }}
                onPress={function() {navigate('PlayRecording', {
                      title: item.title,
                      filePath: item.filePath,
                      lengthOfRecording: item.lengthOfRecording,
                      notes: item.notes
                    })

                        }
                      }
              />
            )}
            keyExtractor={item => item.filePath}
          />
          </View>
      );
    }
    else {
      return (
          <Text>Loading ... </Text>
      );
    }
  }
}

export default ListOfSaved;
