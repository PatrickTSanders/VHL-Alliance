
/*import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView,
  AsyncStorage,
  FlatList
} from 'react-native';
import {
  Header,
  Button,
   List,
   ListItem
} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import storage from 'react-native-storage-wrapper';
class ListOfSaved extends Component {
  constructor(props) {
      super(props);
      console.log("do i make it in ListOfSaved");
    }
  render() {
    return (
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList>
              <ListItem> <Text> hi </Text> </ListItem>
          </FlatList>
        </List>
      );
    }
}
export default ListOfSaved;
/*const MedicationList = ({ value }) => (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Hello
        {value}
      </Text>
      <Button
        title='setKey'
        onPress={
          async function() {
            try {
            console.log('setKey was pressed');
            await AsyncStorage.setItem('test', 'I hope this works');
          } catch (error) {
            console.log(error)
          }
          }
        }
      />
      <Button
        title='getKey'
        onPress={
          async function() {
          try {
            const value = await AsyncStorage.getItem('test');
            console.log(value)
        } catch(error){
          console.log(error)
        }
      }
    }
    />
  </View>
);
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
  }
});
//export default MedicationList;
*/

import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import { StackNavigator } from 'react-navigation';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import storage from 'react-native-storage-wrapper';

class ListOfSaved extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

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
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              //roundAvatar
              title={`${item.name.first} ${item.name.last}`}
              subtitle={item.email}
              //avatar={{ uri: item.picture.thumbnail }}
              containerStyle={{ borderBottomWidth: 0 }}
            />
          )}
          keyExtractor={item => item.email}
          /*ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}*/
        />
      </List>
    );
  }
}

export default ListOfSaved;
