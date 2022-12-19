import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import { primary } from '../theme/Theme'

const Settings = () => {
  return (
    <View style={styles.mainContainer}>
    <SafeAreaView>
    <ScrollView > 
      <BtnCard></BtnCard>
      <BtnCard1></BtnCard1> 
      <BtnCard2></BtnCard2>
      <BtnCard3></BtnCard3>
      <BtnCard4></BtnCard4>
    </ScrollView>
    
    </SafeAreaView>
    <TouchableOpacity style={{backgroundColor:primary, width:200, height:60, justifyContent:'center', alignItems:'center', borderRadius:35, alignSelf:'center', marginTop:50}}>
      <Text style={{fontWeight:'500', color:'white', fontSize:16}}>
        Delete My Account
      </Text>
    </TouchableOpacity>
    </View>
  )
}

const BtnCard =({text})=>{
  const [mode, setMode] = useState(false)
  return(
    <View style={styles.card}>
    <Text style={styles.cardtxt}>Dark Mode</Text>
    <Switch style={styles.switch} value={mode}></Switch>
    </View>
  )
}

const BtnCard1 =({text})=>{
  return(
    <View style={styles.card}>
    <Text style={styles.cardtxt}>Language</Text>
    </View>
  )
}
const BtnCard2 =({text})=>{
  const [mode, setMode] = useState(false)
  return(
    <View style={styles.card}>
    <Text style={styles.cardtxt}>Privacy</Text>

    </View>
  )
}
const BtnCard3 =({text})=>{
  const [mode, setMode] = useState(false)
  return(
    <View style={styles.card}>
    <Text style={styles.cardtxt}>Help</Text>

    </View>
  )
}
const BtnCard4 =({text})=>{
  const [mode, setMode] = useState(false)
  return(
    <View style={styles.card} >
    <Text style={styles.cardtxt}>Complaints/Suggestions</Text>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  card:{
    flex:1,
    height:60,
    padding:10,
    margin:3,
    borderRadius:5,
    flexDirection:'row',
    borderBottomWidth:0.2,
    justifyContent:'space-between'
  },
  cardtxt:{
    color:'black',
    fontWeight:'500',
    fontSize:18,
    
  },
  switch:{

  },
  mainContainer:{
    flex:1,
    margin:15, 
    borderRadius:15
  }
})