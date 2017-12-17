import React from 'react';
import {
  Platform,
  AsyncStorage
} from 'react-native';

//const StorageWrapper = (key, value) => {

  const settingItem = (key, value) =>
      async function() {
        try {
        console.log('setKey in wrapper was pressed');
        const testSet = await AsyncStorage.setItem('testing', 'testValue');
      } catch (error) {
        console.log(error)
      }
      return testSet
    }

  const gettingItem = (key) =>
          async function() {
            try {
            console.log('getKey was attempted with key: ', {key});
            const testGet = await AsyncStorage.getItem('testing');
            } catch (error) {
            console.log(error)
          }
          return testGet
    }
export {settingItem, gettingItem}

  //}
