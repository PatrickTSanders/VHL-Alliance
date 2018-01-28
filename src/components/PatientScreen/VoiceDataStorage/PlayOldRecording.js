import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  WebView,
  AsyncStorage,
  TouchableHighlight,
  PermissionsAndroid
} from 'react-native';

import {
  Header,
  Button
} from 'react-native-elements';

import { StackNavigator } from 'react-navigation';
import storage from 'react-native-storage-wrapper';
import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';

const Realm = require('realm');



class PlayOldRecording extends Component {

    state = {
      currentTime: 0.0,
      recording: false,
      stoppedRecording: false,
      finished: false,
      file: AudioUtils.DocumentDirectoryPath,
      hasPermission: false,
      myRecording: null,
      text: ''
    };



    componentDidMount() {
     this._checkPermission().then((hasPermission) => {
        this.setState({ hasPermission });
        if (!hasPermission) return;

        console.log(this.props.navigation);

        this.setState({hasPermission});

        AudioRecorder.onProgress = (data) => {
          this.setState({currentTime: Math.floor(data.currentTime)});
        };

        AudioRecorder.onFinished = (data) => {
          // Android callback comes in the form of a promise instead.
          if (Platform.OS === 'ios') {
            this.setState({myRecording : data});
            console.log(this.state.myRecording);
          }
        };
      });
    }

    componentWillUnmount(){
      console.log(this.state.text);

      Realm.open({
      schema: [
                {name: 'Recordings',
                  primaryKey: 'filePath',
                  properties:
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

        realm.write(() => {
          realm.create('Recordings',
                          {
                            filePath: this.props.navigation.state.params.filePath,
                            title: this.props.navigation.state.params.title,
                            notes: this.state.text,
                          },
                        true);
        });

        //this.setState({ realm });

    });
    }

    _checkPermission() {
      if (Platform.OS !== 'android') {
        return Promise.resolve(true);
      }
      const rationale = {
        'title': 'Microphone Permission',
        'message': 'AudioExample needs access to your microphone so you can record audio.'
      };
      return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
        .then((result) => {
          console.log('Permission result:', result);
          return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
        });
    }

    _renderButton(title, onPress, active) {
      var style = (active) ? styles.activeButtonText : styles.buttonText;

      return (
        <TouchableHighlight  style={styles.button} onPress={onPress}>
          <Text style={style}>
            {title}
          </Text>
        </TouchableHighlight>
      );
    }

    async _pause() {
      if (!this.state.recording) {
        console.warn('Can\'t pause, not recording!');
        return;
      }

      this.setState({stoppedRecording: true, recording: false});

      try {
        const filePath = await AudioRecorder.pauseRecording();

        // Pause is currently equivalent to stop on Android.
        if (Platform.OS === 'android') {
          this._finishRecording(true, filePath);
        }
      } catch (error) {
        console.error(error);
      }
    }

    async _stop() {
      if (!this.state.recording) {
        console.warn('Can\'t stop, not recording!');
        return;
      }

      this.setState({stoppedRecording: true, recording: false});
    }

    async _play() {
      if (this.state.recording) {
        await this._stop();
      }

      // These timeouts are a hacky workaround for some issues with react-native-sound.
      // See https://github.com/zmxv/react-native-sound/issues/89.
      setTimeout(() => {
        var sound = new Sound(this.state.file + '/' + this.props.navigation.state.params.filePath, '', (error) => { //here we go
        if (error) {
            console.log('failed to load the sound', error);
          }
        });

        setTimeout(() => {
          sound.play((success) => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
          });
        }, 100);
      }, 100);
    }


    render() {
      return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={styles.container}>
          <View style={styles.controls}>

            <View style={{flexDirection: 'row'}}>
            {this._renderButton("STOP", () => {this._stop()} )}
            {this._renderButton("PLAY", () => {this._play()} )}
           </View>
            <Text style={styles.timeElapsed}>{this.state.currentTime}s</Text>
          </View>
        </View>



      <View style={{flex:1, flexDirection: 'column'}}>

       <TextInput
         style={{flexDirection: 'column'}}
         placeholder="Click to type"
         editable = {true}
         onChangeText={(text) => this.setState({text})}
         defaultValue = {this.props.navigation.state.params.notes}
         multiline = {true}
       />
     </View>

   </View>


      );
    }
  }

  var styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#2b608a",
    },
    controls: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    timeElapsed: {
      //paddingTop: 50,
      fontSize: 50,
      color: "#fff"
    },
    button: {
      padding: 10
    },
    disabledButtonText: {
      color: '#eee'
    },
    buttonText: {
      fontSize: 15,
      color: "#fff"
    },
    activeButtonText: {
      fontSize: 15,
      color: "#B81F00"
    }

  });


export default PlayOldRecording;
