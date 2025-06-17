import React from "react";
import { View,Text,TouchableOpacity,StyleSheet,ScrollView } from "react-native";


export default function AvailableDeviceList({peripheral,connect,disconnect}){

    const {name,rssi,connected} = peripheral;

    return(
        <>
        
        {name && (
        
        <View style={styles.container}>
            
            <View>
                <Text style={styles.font}>Connected Devices:</Text>
            <Text style={styles.font}>Discovered Device:{name}</Text>
            <Text style={styles.font}>RSSI:{rssi}</Text>
            <TouchableOpacity onPress={() =>
              connected ? disconnect(peripheral) : connect(peripheral)} style={styles.loginButton}>{connected ?  <Text style={styles.buttonTxt}>Disconnect</Text>: <Text style={styles.buttonTxt}>Connect</Text>}</TouchableOpacity>
          </View>

         
         
            </View>
            
          )
        }
        
        </>
    )

}

const styles = StyleSheet.create({

    container: {
       
        width:250,
        height:150,
        backgroundColor:'black',
        marginTop:4,
        borderRadius:10,
        paddingTop:10,
        paddingbottom:10,
        paddingLeft:20,
        paddingRight:20,
            },
            font:{
                fontSize:12,
                color: '#fff',
            },
            styleTxt:{
              fontSize:12,
                color: '#fff'
            },
            buttonTxt:{
                color: '#000',
                textAlign: 'center'
              },
            loginButton:{
               
                backgroundColor:'#fff',
                marginTop:10,
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 30,
                paddingRight: 30,
                borderRadius:20,
              }
        })