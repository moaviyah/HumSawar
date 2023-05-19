// import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
// import React, {useState} from 'react'
// import { primary } from '../theme/Theme'

// const Settings = () => {
//   return (
//     <View style={styles.mainContainer}>
//     <SafeAreaView>
//     <ScrollView > 
//       <BtnCard></BtnCard>
//       <BtnCard1></BtnCard1> 
//       <BtnCard2></BtnCard2>
//       <BtnCard3></BtnCard3>
//       <BtnCard4></BtnCard4>
//     </ScrollView>
    
//     </SafeAreaView>
//     <TouchableOpacity style={{backgroundColor:primary, width:200, height:60, justifyContent:'center', alignItems:'center', borderRadius:35, alignSelf:'center', marginTop:50}}>
//       <Text style={{fontWeight:'500', color:'white', fontSize:16}}>
//         Delete My Account
//       </Text>
//     </TouchableOpacity>
//     </View>
//   )
// }

// const BtnCard =({text})=>{
//   const [mode, setMode] = useState(false)
//   return(
//     <View style={styles.card}>
//     <Text style={styles.cardtxt}>Dark Mode</Text>
//     <Switch style={styles.switch} value={mode}></Switch>
//     </View>
//   )
// }

// const BtnCard1 =({text})=>{
//   return(
//     <View style={styles.card}>
//     <Text style={styles.cardtxt}>Language</Text>
//     </View>
//   )
// }
// const BtnCard2 =({text})=>{
//   const [mode, setMode] = useState(false)
//   return(
//     <View style={styles.card}>
//     <Text style={styles.cardtxt}>Privacy</Text>

//     </View>
//   )
// }
// const BtnCard3 =({text})=>{
//   const [mode, setMode] = useState(false)
//   return(
//     <View style={styles.card}>
//     <Text style={styles.cardtxt}>Help</Text>

//     </View>
//   )
// }
// const BtnCard4 =({text})=>{
//   const [mode, setMode] = useState(false)
//   return(
//     <View style={styles.card} >
//     <Text style={styles.cardtxt}>Complaints/Suggestions</Text>
//     </View>
//   )
// }

// export default Settings

// const styles = StyleSheet.create({
//   card:{
//     flex:1,
//     height:60,
//     padding:10,
//     margin:3,
//     borderRadius:5,
//     flexDirection:'row',
//     borderBottomWidth:0.2,
//     justifyContent:'space-between'
//   },
//   cardtxt:{
//     color:'black',
//     fontWeight:'500',
//     fontSize:18,
    
//   },
//   switch:{

//   },
//   mainContainer:{
//     flex:1,
//     margin:15, 
//     borderRadius:15
//   }
// })
import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = () => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const [isLanguageSelected, setIsLanguageSelected] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkModeEnabled(!isDarkModeEnabled);
  }

  const toggleLanguage = () => {
    setIsLanguageSelected(!isLanguageSelected);
  }

  const renderSettingItem = (iconName, title, onPress) => {
    return (
      <TouchableOpacity style={styles.settingItem} onPress={onPress}>
        <Ionicons name={iconName} size={24} color="black" />
        <Text style={styles.settingTitle}>{title}</Text>
        <Ionicons name="chevron-forward" size={24} color="black" />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.settingsContainer}>
        {renderSettingItem('moon-outline', 'Dark mode', toggleDarkMode)}
        {renderSettingItem('globe-outline', 'Language', toggleLanguage)}
        {renderSettingItem('shield-checkmark-outline', 'Privacy', () => {})}
        {renderSettingItem('help-circle-outline', 'Help', () => {})}
        {renderSettingItem('chatbubble-ellipses-outline', 'Complaints and suggestions', () => {})}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  settingTitle: {
    flex: 1,
    fontSize: 18,
    marginLeft: 20,
  },
});

export default SettingsScreen;
