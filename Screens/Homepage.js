import React from "react";
import {Platform,NativeModules,NativeEventEmitter,PermissionsAndroid, StyleSheet, Alert,Text, View,Button, Image,TouchableOpacity,FlatList } from 'react-native';
import BleManager from 'react-native-ble-manager'
import { useEffect,useState } from 'react';
import DeviceList from '../src/DeviceList'
import ListofTags from '../src/ListofTag';
import { GLobalConstants } from '../src/constants';
const BleManagerModule= NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule); 


export default function HomePage({navigation}){


    const peripherals = new Map();
    const [isScanning,setIsScanning] = useState(false);
    const [connecteDevices, setConnectedDevices ] = useState([]);
    const [discoveredDevices,setDiscoveredDevices] = useState([]);
    const [periPheralId,setPeripheralId] = useState(null);
    const [hideScan,setHidescan] = useState(false)
    // const [scanTagData, setScanTagData] = useState([]);

    const handleGetConnectedDevices = () =>{
        BleManager.getConnectedPeripherals([]).then(results => {
          if (results.length === 0) {
            console.log('No connected bluetooth devices');
          }else{
          for (let i =0 ; i < results.length; i++){
            let peripheral = results[i];
            peripheral.connected = true;
            peripheral.set(peripheral.id,peripheral)
            setConnectedDevices(Array.from(peripherals.values()))
            console.log(connecteDevices);
          }
        }
        }).catch((e)=>{
          console.log(e)
        });
      };


      useEffect(() =>{

        BleManager.enableBluetooth().then(() =>{
          console.log("bluetooth turn on");
        })
      
        BleManager.start({showAlert: false}).then(() => {
          console.log('BleManager initialized');
          handleGetConnectedDevices();
        })
      
        let stopDiscoverListener = BleManagerEmitter.addListener('BleManagerDiscoverPeripheral',
          peripheral => { 
            peripherals.set(peripheral.id,peripheral);
            setDiscoveredDevices(Array.from(peripherals.values()));
            console.log(discoveredDevices,"discover",GLobalConstants.ServiceId)
          })
      
        
      
        let stopConnectListener = BleManagerEmitter.addListener(
          'BleManagerConnectPeripheral',
          peripheral => {
            console.log('BleManagerConnectPeripheral:', peripheral);
          },
        );
      
        let stopScanListener = BleManagerEmitter.addListener(
          'BleManagerStopScan',
          () => {
            setIsScanning(false);
            console.log('scan stopped');
          },
        );
      
         
      
      
        if (Platform.OS === 'android' && Platform.Version >= 23) {
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ).then(result => {
            if (result) {
              console.log('Permission is OK');
            } else {
              PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              ).then(result => {
                if (result) {
                  console.log('User accept');
                } else {
                  console.log('User refuse');
                }
              });
            }
          });
          
        }
        return () => {
          stopDiscoverListener.remove();
          stopConnectListener.remove();
         stopScanListener.remove();
        
        }
      },[])


      const startScan = () =>{
        if(!isScanning){
          BleManager.scan([],7,false).then(() =>{
      
            
            console.log('scanning')
            setIsScanning(true)
            setHidescan(true)
          })
         .catch(error =>{ console.error(error);
      
         })
        }
      }


      const connectToPeripheral =  peripheral => {

  
        BleManager.connect(peripheral.id).then(() => {
          peripheral.connected = true;
          peripherals.set(peripheral.id,peripheral)
          setConnectedDevices(Array.from(peripherals.values()))
          setDiscoveredDevices(Array.from(peripherals.values()))
         setPeripheralId(peripheral.id);
          console.log('BLE device paired successfully');
       })
  .catch((e) => {
    console.log('failed to bond',e);
  });
  
  

}

const disconnectFromPeripheral = peripheral => {
    BleManager.disconnect(peripheral.id)
      .then(() => {
        peripheral.connected = false;
        peripherals.set(peripheral.id, peripheral);
        setConnectedDevices(Array.from(peripherals.values()));
        setDiscoveredDevices(Array.from(peripherals.values()));
       
        Alert.alert(`Disconnected from ${peripheral.name}`);
        
      })
      .catch((e) => {
        console.log('fail to remove the bond',e);
      });
  };

    return(
         <View style={styles.container}>
         { hideScan &&   <View  style={styles.nextNewbtn}>
       <Button   color='#6D95FC' title="Scan Tag" onPress={()=> navigation.navigate("List",{peripheralId: periPheralId})}></Button>
       </View>}
             <View style={styles.scanBtnPos}>
            <TouchableOpacity style={styles.loginButton} onPress={startScan}>
        <Text style={styles.buttonTxt}>{isScanning ? 'Scanning': 'Scan Bluetooth devices'}</Text>
      </TouchableOpacity>
      </View>
     
        {discoveredDevices.length > 0 ? (
          <FlatList
            data={discoveredDevices}
            renderItem={({item}) => (
              <DeviceList
                peripheral={item}
                connect={connectToPeripheral}
                disconnect={disconnectFromPeripheral}
              />
            )}
            keyExtractor={item => item.id}
          />
        ) : (
          <Text style={styles.noDevicesText}>No Bluetooth device found</Text>
        )}  
      
       {discoveredDevices.length > 0 ? <Text></Text> : <Text>No Device</Text>}
       
      
       

         </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:'#fff',
      padding: 15
     
    },
    nextNewbtn:{
     width:320,
     flexDirection:'column',
     justifyContent: 'flex-end',
     alignItems:'flex-end'
    },
    hextxt:{
     
      flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
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
  

  loginButton:{
    width:200,
    backgroundColor:'#6D95FC',
    marginTop:10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius:20,
  
  },
    scanBtnPos:{
      flexDirection:'column',
      alignItems:'center'
    }
  });