import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native'
import React, {useState} from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { primary } from '../theme/Theme'

const Cnic = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.cards}>

        <Text style={styles.label}>CNIC ( Front Side)</Text>
        <FontAwesome name='id-card' size={100} style={{alignSelf:'center'}}/>

      <TouchableOpacity style={styles.uploadbtn}>
                <Text style={{color: primary,fontWeight: '500',fontSize: 18}}>Upload</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.cards}>

      <Text style={styles.label}>CNIC (Back Side)</Text>
      <FontAwesome name='drivers-license-o' size={100} style={{alignSelf:'center'}}/>
          <TouchableOpacity style={styles.uploadbtn}>
                <Text style={{color: primary,fontWeight: '500',fontSize: 18}}>Upload</Text>
            </TouchableOpacity>
      </View>

        <TouchableOpacity style={styles.btn}>
                <Text style={{color: 'white',fontWeight: '500',fontSize: 20}}>Save</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Cnic

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    cards:{
        backgroundColor:'white',
        justifyContent:'center',
        margin:10,
        padding:10,
        borderRadius:10
    },
    input:{
        borderWidth:1,
        height:60,
        borderRadius:10,
        margin:5
    },
    label:{
        alignSelf:'center',
        fontSize:18,
        margin:7
    },
    btn:{
        borderColor: 'blue',
        height: 60,
        width: 250,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginTop:30,
        borderWidth:1,
        backgroundColor:primary
    },
    datepicker:{
        backgroundColor:'white',
        height:60,
        padding:15,
        borderColor:'black',
        borderWidth:1,
        borderRadius:30,
        margin:3,
    },
    uploadbtn:{
      height:50,
      width:250,
      alignSelf:'center',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:30,
      borderWidth:1,
      borderColor:primary,
      margin:10
    }
})