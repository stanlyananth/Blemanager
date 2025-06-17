import React from "react";
import { useEffect,useState } from "react";

import {NativeModules,NativeEventEmitter, StyleSheet, Text, View ,TouchableOpacity,FlatList } from "react-native";
import { useNavigation,useRoute } from "@react-navigation/native";
import BleManager from 'react-native-ble-manager'
import { GLobalConstants } from "../src/constants";
const BleManagerModule= NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule); 

export default function TagListPage(){

const navigation = useNavigation();
const route = useRoute();
const [tagId,setTagId] = useState([]);

const  { peripheralId } = route.params ||  {};

const [readings, setReadings] = useState([]);

  const [seenValues, setSeenValues] = useState(new Set());

const handleRFIDRead = (value) => {

    if (!seenValues.has(value)) {
  
      setSeenValues(new Set(seenValues.add(value)));
  
      setReadings(readings => [...readings, value]);
  
      console.log('New value accepted:', value);
  
    } else {
  
      console.log('Duplicate value ignored:', value);
  
    }
  
  };

useEffect(() => {



    let characteristicValueupdate = BleManagerEmitter.addListener(
        'BleManagerDidUpdateValueForCharacteristic', ({value, peripheral, characteristic, service }) => {

            console.log("Event Blemanager",toHexString(value)  )
               const tagData = toHexString(value);
               handleRFIDRead(tagData)
               
        }
    )
return () =>{
    characteristicValueupdate.remove();
}


},[])


function toHexString(byteArray) {
      let hexString=  Array.from(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
    hexString = hexString.replace(/0+$/, '');

  return hexString;
  }


const startScanning = (periPheralId) =>{

BleManager.retrieveServices(periPheralId).then((peripheralInfo) => {
console.log("periperi",peripheralInfo)

const RFIDCONTROLID = GLobalConstants.RFID_CONTROL;
  const RFIDSERVICE = GLobalConstants.RFID_SERVICE;
  const RFID = GLobalConstants.RFID

BleManager.write(periPheralId,RFIDSERVICE,RFIDCONTROLID,[0]).then(() => {
   console.log("write")

BleManager.startNotification(periPheralId,RFIDSERVICE,RFID).then(() => {
   console.log("notificationservice started")


  }).catch((e) => {
     console.log(e,"notifyerror")
  })



}).catch((e) =>{
    console.log(e,"no write")
})



}).catch((e) => {
console.log(e)
})
console.log(periPheralId,"start")
}


const stopScanning = (periPheralId) =>{

    const RFIDCONTROLID = GLobalConstants.RFID_CONTROL;
  const RFIDSERVICE = GLobalConstants.RFID_SERVICE;
  const RFID = GLobalConstants.RFID
  
    BleManager.stopNotification(periPheralId,RFIDSERVICE,RFID).then(() => {
        console.log("stop notify")
    }).catch((e) => {
        console.log((e,"eeee"))
    })

}

const restTagValue = () =>{
  setReadings(prevReadings => {[...prevReadings,[]]} );
  console.log("Reset array",readings)
}









    return(
        <View style={styles.container}>
            <Text style={{marginBottom:10}}>
                Peripheral-ID: {peripheralId ? peripheralId :  'no peripheral'}   Total Count: {readings.length}
            </Text>

            <View style={styles.btnAllign}>
        <TouchableOpacity style={styles.scanStart}><Text style={styles.scanbtnTxt} onPress={() => { startScanning(peripheralId)}}>START</Text></TouchableOpacity>
        <TouchableOpacity style={styles.scanStart}><Text style={styles.scanbtnTxt} onPress={restTagValue}>RESET</Text></TouchableOpacity>
        <TouchableOpacity style={styles.scanStart}><Text style={styles.scanbtnTxt} onPress={() => { stopScanning(peripheralId)}}>STOP</Text></TouchableOpacity>
        </View>
        {readings && <FlatList   
         data={readings}
         renderItem = {({item,index}) => (
            <View style={styles.scanValues}>
            <Text>Scan Tag:{item}</Text>
           </View>
         )}
         keyExtractor={(item,index) => index.toString()}
         /> }
      
        </View>
    )
}

const styles= StyleSheet.create({

    container:{
      flex:1,
      backgroundColor:'#fff',
      padding: 15,
      
    },

    scanStart:{
       
      backgroundColor:'#6D95FC',
      justifyContent:'center',
      paddingTop:8,
      paddingBottom:8,
      paddingLeft:20,
      paddingRight:20,
      borderRadius:5
    },
    btnAllign:{
      width: 330,
      flexDirection:'row',
      justifyContent: 'space-between'
    }
,
scanbtnTxt:{
  color:'white'
 },

 scanValues:{
  marginTop:20,
  width:330,
   backgroundColor:'#6D95FC',
   paddingTop:8,
   paddingBottom:8,
  paddingLeft:7,
  paddingRight:7,
  borderRadius: 5
 }

  })