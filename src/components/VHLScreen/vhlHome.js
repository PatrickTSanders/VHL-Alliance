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
import Databank from './Databank';


const MainVHL= ({ navigation }) => (
  <VHLHome navigation={navigation} />
);

const VHLHome = ({ navigation }) => (
  <View style={{ flex: 1 }}>
    <View style={{ flex: 1 }} >
      <Header
          statusBarProps={{ barStyle: 'light-content' }}
          leftComponent={{ icon: 'menu', color: '#0B92D1' }}
          centerComponent={{ text: 'VHL Homepage', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
          outerContainerStyles={{ backgroundColor: '#3D6DCC' }}

      />
    </View>

    <View style={{ flex: 8 }} >
      <View style={{ flexDirection: 'row' }}>
        <Button
          title='Care Center'
          containerViewStyle={styles.button}
          iconRight={{ type: 'font-awesome' }}
          //onPress ={()=> navigate('patientHome')}
        />
        <Button
          title='Databank'
          containerViewStyle={styles.button}
          onPress={() => navigation.navigate('Databank')}
        />
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Button
          title='Handbook'
          containerViewStyle={styles.button}
          iconRight={{ type: 'font-awesome' }}
        />
        <Button title='Connect' containerViewStyle={styles.button} />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Button
          title='News/Events'
          containerViewStyle={styles.button}
          iconRight={{ type: 'font-awesome' }}
        />
        <Button title='Research' containerViewStyle={styles.button} />
      </View>

    </View>

  </View>
);
/*
class vhlHome extends Component {
  static navigationOptions = {
    headerTitle: 'VHL Homepage'
  }
  render() {
    const { navigate } = this.props.navigation;

      return (
        /*<WebView
          source={{ uri: 'https://www.vhl.org' }}
          style={{ marginTop: 20 }}
        />
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }} >
            <Header
                statusBarProps={{ barStyle: 'light-content' }}
                leftComponent={{ icon: 'menu', color: '#0B92D1' }}
                centerComponent={{ text: 'VHL Homepage', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff' }}
                outerContainerStyles={{ backgroundColor: '#3D6DCC' }}

            />
          </View>

          <View style={{ flex: 8 }} >
            <View style={{ flexDirection: 'row' }}>
              <Button
                title='Care Center'
                containerViewStyle={styles.button}
                iconRight={{ type: 'font-awesome' }}
                //onPress ={()=> navigate('patientHome')}
              />
              <Button
                title='Databank'
                containerViewStyle={styles.button}
                onPress={() => navigate('Databank')}
              />
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Button
                title='Handbook'
                containerViewStyle={styles.button}
                iconRight={{ type: 'font-awesome' }}
              />
              <Button title='Connect' containerViewStyle={styles.button} />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Button
                title='News/Events'
                containerViewStyle={styles.button}
                iconRight={{ type: 'font-awesome' }}
              />
              <Button title='Research' containerViewStyle={styles.button} />
            </View>

          </View>

        </View>
      );
    }
}
*/
const stackNav = StackNavigator({
  Home: {
    screen: MainVHL
  },
    Databank: {
      screen: Databank,
      path: '/'
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

export default stackNav;
