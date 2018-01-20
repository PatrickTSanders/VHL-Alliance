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
//var toArrayBuffer = require('to-array-buffer');
//var resolveAssetSource = require("react-native/Libraries/Image/resolveAssetSource");


const Realm = require('realm');


//rn once and audio file is stopped, it is saved to some file path
//once you press play and there is something that has been recorded, it goes and looks up the audioPath and r
  //reads (plays?) from there
//I want to have realm s.t. once you stop recording, instead of saving to some file path, it saves to the realm as
  //an array buffer

//and when you press play, i want it to open the correct entry in realm, and encode the file from arraybuffer ->
  // .aac file and go from there


//Want to try converting an array buffer back to .aac
// but i would need to be able to convert it to array buffer in order to do so :(

//Thinking that if i am able to use this library and encode / decode, that when we come back from toArrayBuffer
// that we will need to save it as a file somewhere so when we create a Sound object it has somewhere to lookup?
// - maybe it can just look up in realm if we call the right title
// - will having the realm open for that long end up slowing down the app

// stuff needed in the Realm
// Title of it
// length of recording
// audio file name (sort by this)

class VoiceRecordingsAndNotes extends Component {

  // constructor(props){
  //   super(props);
  //
  //   console.log('props ', props);

    state = {
      //title: null,
      currentTime: 0.0,
      recording: false,
      stoppedRecording: false,
      finished: false,
      audioPath: AudioUtils.DocumentDirectoryPath +'/' + Date.now().toString() + '.aac',// + '/test.aac', //change this bc it looks ugly
      file: AudioUtils.DocumentDirectoryPath,
      hasPermission: true,
      realm: null,
      myRecording:null
    };
//  }

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



    componentDidMount() {
    /*  this._checkPermission().then((hasPermission) => {
        this.setState({ hasPermission });
        if (!hasPermission) return; */

        console.log(this.props.navigation);

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
        //var sound = new Sound(this.state.audioPath, '', (error) => { //here we go
        var sound = new Sound(this.state.file + "/1516308354467.aac", '', (error) => {
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

      //console.log(resolveAssetSource(this.state.audioPath), "resolve");
      console.log(this.state.audioPath," audio path");
      console.log(new Sound(this.state.audioPath, '',null,null));

      //var reader = new FileReader();
      //var arrayBuff = reader.result;
      //reader.readAsArrayBuffer(this.state.audioPath);



      Realm.open({
        schema: [
                  {name: 'Recordings', properties:
                                          {
                                            name: 'string',
                                            title: 'string',
                                            lengthOfRecording: 'int',
                                            //audioFile: 'data'
                                          }
                  }
                ]
      }).then(realm => {

          realm.write(() => {
            realm.create('Recordings',
                            {
                              //think i need to save this as just /date.aac, so then when i need to look it up from realm,
                              //i just create this.state.audio path and then append the filename to it
                              name: this.state.audioPath.toString(),
                              title: 'First Recording',
                              lengthOfRecording: this.state.currentTime,
                              //audioFile: arrayBuff
                            });
          });

          this.setState({ realm });
          let myRecordings = this.state.realm.objects('Recordings');
          console.log(myRecordings.map( (x) => x.name ));
          //console.log(this.state.realm.objects('Recordings').name, "we are in the realm");

      });

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
