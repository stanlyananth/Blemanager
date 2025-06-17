import React from "react";
import { View,Text,StyleSheet} from "react-native";



export default function HeaderPage () {


    return(
        <View style={styles.container}>
        <Text style={styles.hederTxt}>Scan RFID Reader</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
       
        backgroundColor:'#6D95FC',
        width: 360,
        height: 50,
       justifyContent:'center'
    },
hederTxt:{
 textAlign: 'center',
 color:'#fff',
 fontSize: 20,
}

})