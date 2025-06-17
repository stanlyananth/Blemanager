import React from "react";
import { View,Text,TouchableOpacity,StyleSheet,ScrollView } from "react-native";



export default function DeviceList({peripheral,connect,disconnect}){

    const {name,rssi,connected} = peripheral;
    const buttonStyle = connected ? styles.disconnectButton: styles.connectButton
    return(
        <>
       {name && (
        
        <View style={styles.container}>
            
            <View>
            <Text style={styles.font}>Device name: {name}</Text>
            <Text style={styles.font}>RSSI:{rssi}</Text>
            </View>
             <View>
            <TouchableOpacity onPress={() =>
              connected ? disconnect(peripheral) : connect(peripheral)} style={buttonStyle}>{connected ?  <Text style={styles.buttonTxt}>Disconnect</Text>: <Text style={styles.buttonTxt}>Connect</Text>}</TouchableOpacity>
           </View>

         
         
            </View>
            
          )
        }
         </>
    )
}

const styles = StyleSheet.create({

    container: {
       
      width: 322,
      height:80,
      backgroundColor:'#6D95FC',
      borderRadius:5,
      padding:8,
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems:'center',
      marginTop:20
            },
            font:{
                fontSize:11,
                color: '#fff',
            },
            containerConnected:{
           flex:1,
           alignItems:'start',
           justifyContent:'center'
            }, buttonTxt:{
                color: '#000',
                textAlign: 'center'
              },
            connectButton:{
                backgroundColor:'#fff',
                marginTop:0,
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 20,
                paddingRight: 17,
                borderRadius:8,
              },
              disconnectButton:{
                backgroundColor:'lightgreen',
                marginTop:0,
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 10,
                paddingRight: 10,
                borderRadius:8,
              }
})

