import React from "react";
import { View,Text,StyleSheet } from "react-native";


export default function ListTags({items}) {

    let scanData= items;
    return(
        <View style={styles.container}>
            <Text style={styles.dataTxt}>Sacn Tag ID:<Text>{scanData}</Text></Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        width: 350,
       height: 60,
        padding: 10,
        backgroundColor: '#ffff',
        borderRadius: 10,
      
        marginBottom:10
    },
    dataTxt:{
        color: '#000',
         fontSize: 10,
    fontFamily: 'Courier New', // Ensure a monospace font is used
    textAlign: 'left', // Center align text
    }
})