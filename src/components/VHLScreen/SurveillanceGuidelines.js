import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView,
  Dimensions
} from 'react-native';
import {
  Header,
  Button
} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import Pdf from 'react-native-pdf';

const source = require('./Active-Surveillance-Guidelines.pdf');



class SurveillanceGuidelines extends Component {
  constructor(props) {
    super(props);
    this.pdf = null;
  }

    render() {

        return (
          <View style={styles.container}>
                <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    style={styles.pdf}/>
            </View>
        )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        //marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
    }
});
export default SurveillanceGuidelines;
