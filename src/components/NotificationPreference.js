import React, { Component } from 'react';
import {Text} from 'react-native';

export default class NotificationPreference extends Component {

  constructor(props){
    super(props);

    this.state = {
      isLessThan5: props.isLessThan5,
      isBetween5And15: props.isBetween5And15,
      isOver16: props.isOver16,
    }

  }

  render(){

    console.log(this.state.isLessThan5);
    return(
        <Text>isLessThan5: {this.state.isLessThan5}</Text>
    );
  }

}
