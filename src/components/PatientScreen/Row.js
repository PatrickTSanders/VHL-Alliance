import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableOpacity } from 'react-native';

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

const Row = (props) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.button}
      onPress={()=>console.log('TouchableOpacity')}
    >
      <Image source={{ uri: props.picture.large}} style={styles.photo} />
      <Text style={styles.text}>
        {`${props.name.first} ${props.name.last}`}
      </Text>
    </TouchableOpacity>
  </View>
);

export default Row;
