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
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import storage from 'react-native-storage-wrapper';
import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
var resolveAssetSource = require("react-native/Libraries/Image/resolveAssetSource");


const Realm = require('realm');

class VoiceRecordingsAndNotes extends Component {


    state = {
      currentTime: 0.0,
      recording: false,
      stoppedRecording: false,
      finished: false,
      audioPath: AudioUtils.DocumentDirectoryPath +'/' + Date.now().toString() + '.aac',// + '/test.aac', //change this bc it looks ugly
      hasPermission: true,
      realm: null,
      myRecording:null
    };

    prepareRecordingPath(audioPath){
      console.log(audioPath, "audioPath");
      AudioRecorder.prepareRecordingAtPath(audioPath, {
        SampleRate: 22050,
        Channels: 1,
        AudioQuality: "Low",
        AudioEncoding: "aac",
        AudioEncodingBitRate: 32000
      });
    }

    /*componentWillUnmount(audioPath) {
      console.log('hello');
    Realm.open({
      schema: [{name: 'Recordings', properties: {name: 'string', lengthOfRecording: 'int'}}]
    }).then(realm => {
      if( 1 > 2){
        realm.write(() => {
          realm.create('Dog', {name: 'Rex'});
        });
        this.setState({ realm });
        console.log(this.state.realm.objects('Dog'));
        console.log('hello2');
    }
    });
  }*/



    componentDidMount() {
    /*  this._checkPermission().then((hasPermission) => {
        this.setState({ hasPermission });
        if (!hasPermission) return; */

        //this.setState({hasPermission});

        this.prepareRecordingPath(this.state.audioPath);

        AudioRecorder.onProgress = (data) => {
          this.setState({currentTime: Math.floor(data.currentTime)});
        };

        AudioRecorder.onFinished = (data) => {
          // Android callback comes in the form of a promise instead.
          if (Platform.OS === 'ios') {
            this.setState({myRecording : data});
            console.log(this.state.myRecording);
            this._finishRecording(data.status === "OK", data.audioFileURL);
          }
        };
      //});
    }

    /*_checkPermission() {
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
    }*/

    _renderButton(title, onPress, active) {
      var style = (active) ? styles.activeButtonText : styles.buttonText;

      return (
        <TouchableHighlight style={styles.button} onPress={onPress}>
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

      try {
        const filePath = await AudioRecorder.stopRecording();

        if (Platform.OS === 'android') {
          this._finishRecording(true, filePath);
        }
        return filePath;
      } catch (error) {
        console.error(error);
      }
    }

    async _play() {
      if (this.state.recording) {
        await this._stop();
      }

      // These timeouts are a hacky workaround for some issues with react-native-sound.
      // See https://github.com/zmxv/react-native-sound/issues/89.
      setTimeout(() => {
        var sound = new Sound(this.state.audioPath, '', (error) => { //here we go
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

    async _record() {
      if (this.state.recording) {
        console.warn('Already recording!');
        return;
      }

      if (!this.state.hasPermission) {
        console.warn('Can\'t record, no permission granted!');
        return;
      }

      if(this.state.stoppedRecording){
        this.prepareRecordingPath(this.state.audioPath);
      }

      this.setState({recording: true});

      try {
        const filePath = await AudioRecorder.startRecording();
      } catch (error) {
        console.error(error);
      }
    }

    _finishRecording(didSucceed, filePath) {
      this.setState({ finished: didSucceed });
      console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath}`);
      //console.log(this.myRecording);

      setTimeout( () => {

        var sound = new Sound(this.state.audioPath, '', (error) => {
          if (error) {
            console.log('failed to load the sound', error);
          }
        });
        console.log(sound, "sound");

      }, 100);

      console.log(resolveAssetSource(this.state.audioPath), "resolve");
      console.log(this.state.audioPath," audio path");
      console.log(new Sound(this.state.audioPath, '',null,null));



      Realm.open({
        schema: [{name: 'Recordings', properties: {name: 'string', lengthOfRecording: 'int'}}]
      }).then(realm => {

          realm.write(() => {
            realm.create('Recordings', {name: this.state.audioPath.toString(), lengthOfRecording: this.state.currentTime});
          });
          this.setState({ realm });
          console.log(this.state.realm.objects('Recordings').length, "we are in the realm");
          //console.log('hello2');
      });

      //console.log(this.state.realm.objects('firstRecord'), "hi");
      //console.log(this.state.realm.objects('Recordings').filtered('name = /Users/Patrick/Library/Developer/CoreSimulator/Devices/FBF25F34-452F-4779-BC9D-40AC561B6624/data/Containers/Data/Application/B31907CA-9EF3-4657-A02B-F42F910B01FE/Documents/1513733030812.aac'));

    }

    render() {
      return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={styles.container}>
          <View style={styles.controls}>

            <View style={{flexDirection: 'row'}}>
            {this._renderButton("RECORD", () => {this._record()}, this.state.recording )}
            {this._renderButton("STOP", () => {this._stop()} )}
            {this._renderButton("PLAY", () => {this._play()} )}
           </View>
            <Text style={styles.timeElapsed}>{this.state.currentTime}s</Text>
          </View>
        </View>


        {/* }{this._renderButton("PLAY", () => {this._play()} )}
        {this._renderButton("PAUSE", () => {this._pause()} )}
        {this._renderButton("Back 10", () => {this.state.setCurrentTime(this.state.getCurrentTime() -1)} )}*/}



      <View style={{flex:1, flexDirection: 'column'}}>

       <TextInput
         style={{flexDirection: 'column'}}
         placeholder="Click to type"
         onChangeText={(text) => this.setState({text})}
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


export default VoiceRecordingsAndNotes;