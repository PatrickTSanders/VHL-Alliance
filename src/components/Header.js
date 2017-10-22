import React from 'react';
import { Text, View, TouchableOpacity, StatusBar } from 'react-native';

const Header = () => {
  const { textStyle, viewStyle, buttonStyle } = styles;
  return (
    //StatusBar.setBarStyle('dark-content'),
    <View style={viewStyle}>
      <TouchableOpacity style={buttonStyle} />
      <Text style={textStyle}> VHL </Text>
      <TouchableOpacity style={buttonStyle} />
    </View>

  );
};
const styles = {
  viewStyle: {
    backgroundColor: '#0B92D1',
    //justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    flex: 4,
    fontSize: 20,
    flexDirection: 'row'
  },
  buttonStyle: {
  //flex: 1,
  //flexDirection: 'row',
  alignSelf: 'flex-end',
  backgroundColor: '#fff',
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#007aff',
  marginLeft: 5,
  marginRight: 5
}
};

export { Header };
