import React from 'react';
import {
  Platform,
  AsyncStorage
} from 'react-native';

class AppStorage {
     async SetItem(key, value) {
       var testSet;
       try {
          console.log('AppStorage.SetItem was attempted with key: ', {key});
          testSet = await AsyncStorage.setItem( key, value );
        } catch (error) {
          console.log(error)
        }

        return testSet;

     }

     async GetItem(key) {
       var testGet;
       try {

          console.log('AppStorage.GetItem was attempted with key: ', {key});
          testGet = await AsyncStorage.getItem( key );
          console.log('AppStorage.GetItem result = ', {testGet});

       } catch (error) {
          console.log(error)
     }

      return testGet;
     }

   }

export {AppStorage}
/*
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
*/
