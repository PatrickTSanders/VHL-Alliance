import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import CalendarViewEvent from './CalendarViewEvent.js';
import { StackNavigator, NavigationActions } from 'react-navigation';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
});
//const {navigate} = this.props.navigation;

const Row = (props) => (


  <View style={styles.container}>
    <TouchableOpacity
      style={styles.button}
      onPress={function(){
          //console.log('TouchableOpacity was pressed with id: ', props.dataFromCalendar.id)
          navigate('ViewCalendar', {
                          currentEventId: props.dataFromCalendar.id,

                        })
          // props.navigation('PlayRecording', {
          //
          //           })

      }
    }

    >

      <Text style={styles.text}>
        {`${props.dataFromCalendar.title}`}
      </Text>
    </TouchableOpacity>
  </View>
);

// class Row extends Component{
//   constructor(props){
//     super(props);
//
//     this.state = {
//       eventInfo: this.props.dataFromCalendar
//     }
//   }
//
//   componentDidMount() {
//     //Decide whether to ask for permission on app open for notifications
//       console.log(this.state.eventInfo)
//     }
//
//
//   render(){
//     if(this.state.eventInfo){
//     return(
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={()=>{
//             console.log('TouchableOpacity was pressed with id: ', this.eventInfo.id)
//
//         }
//
//         }
//       >
//
//         <Text style={styles.text}>
//           {`${this.eventInfo.title}`}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   )
//
//     }
//     else{
//       return(
//         <View />
//
//       )
//     }
//
//
//   }
// }







export default Row;
