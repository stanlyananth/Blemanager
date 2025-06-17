import { StatusBar } from 'expo-status-bar';
import React from 'react';
import HeaderPage from './src/component/Header';
import {Platform,NativeModules,NativeEventEmitter,PermissionsAndroid, StyleSheet, Alert,Text, View,Button, Image,TouchableOpacity,FlatList } from 'react-native';
import BleManager from 'react-native-ble-manager'
import { useEffect,useState } from 'react';
import DeviceList from './src/DeviceList'
import ListofTags from './src/ListofTag';
import HomePage from './Screens/Homepage';
import TagListPage from './Screens/TagListPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AvailableDeviceList from './src/AvailableDeviceList';
import { DeviceEventEmitter } from 'react-native';
import { GLobalConstants } from './src/constants';
//  import { Buffer } from 'react-native-buffer';
const BleManagerModule= NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule); 
const Stack = createNativeStackNavigator();



export default function App() {

  





















  return (
    
   
    

<NavigationContainer>
    
    <Stack.Navigator initialRouteName="Home" screenOptions={({headerStyle: {backgroundColor: '#6D95FC'} ,headerTitleAlign:'center'})}>
                <Stack.Screen
                name="Home"
                options={{title:"Scan Bluetooth Device"}}
                
             component={HomePage} />
             <Stack.Screen name="List" options={{title:"Scan Tag List"}} component={TagListPage}  />
            </Stack.Navigator>
    
    </NavigationContainer>
     
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'start',
   
  },
  hextxt:{
   
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
  },
  textColor:{
    display:'block',
    padding: '10px 20px',
   
    marginTop:20,
    color: '#6D95FC',
  },
  logo:{
    height:50
  }
  ,
  button:{
    backgroundColor:'#6D95FC',
    marginBottom: 20,
    marginTop:20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius:10,
  
  },
  buttonTxt:{
    color: '#ffff',
    textAlign: 'center'
  },
  contentBox:{
    width:200,
    height:100,
    textAlign: 'center',
    backgroundColor:'#6D95FC',
     borderRadius: 20,
     padding:20,
  },
profileImage:{
marginTop: 30,
},
loginTxt:{
  marginTop:10,
},
nextbtn:{
  backgroundColor:'#6D95FC',
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 30,
  paddingRight: 30,
  borderRadius:20,
},
loginButton:{
  backgroundColor:'#6D95FC',
  marginTop:10,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 30,
  paddingRight: 30,
  borderRadius:20,
},
  footer:{
    flex:1,
    flexDirection:'row',
    
    alignItems:'flex-end',
    justifyContent:'flex-end',
  }
});
