import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { primary } from '../theme/Theme'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
import { getDoc, doc, } from "firebase/firestore";
import { authentication, db, } from '../config/firebase';

const Posts = () => {
  const navigation = useNavigation(); 

  const toRegistration =()=>{
  navigation.navigate('Create');
  }
  
  return (
    <View style={styles.container}>

      <Text style={styles.label}>Publish Route</Text>
      <TouchableOpacity style={styles.find} onPress={toRegistration}>
        <View style={{ flexDirection: 'row', borderBottomWidth: 0.2 }}>
          <FontAwesome name='location-arrow' size={16} color={primary} style={{ margin: 15 }}></FontAwesome>
          <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: '200' }}>Where</Text>
          <FontAwesome name='search' color={primary} style={{ alignSelf: 'center', marginLeft: 230 }} size={16}></FontAwesome>
        </View>
      </TouchableOpacity>
      <ScrollView>
        <Text style={styles.label}>Scheduled Trips</Text>
        <UpcomingTrips></UpcomingTrips>
      </ScrollView>
    </View>
  )
}

export default Posts

const styles = StyleSheet.create({
  container: {

  },
  label: {
    alignSelf: 'flex-start',
    fontWeight: '600',
    fontSize: 25,
    margin: 10
  },
  find: {
    backgroundColor: 'white',
    margin: 10,
    marginTop: 2,
    borderRadius: 10,
    padding: 5
  },
  input: {
    borderBottomWidth: 0.5,
    height: 50,
    borderRadius: 3,
    margin: 5
  },
  genderSelector: {
    borderBottomWidth: 1,
    borderWidth: 0,
    paddingLeft: 15,
    margin: 5,
    height: 50,
    width: 100
  },
  btnTab: {
    justifyContent: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    marginTop: 2,
    marginBottom: 2.5
  },
  tripPic: {
    borderRadius: 25,
    margin: 3
  }
})

{/* <RideCard style={styles.card} /> */ }
{/* <TouchableOpacity  onPress={()=>{navigation.navigate("LiveLocation")}} style={styles.btn}>
        <FontAwesome5 name='search-location' color='white' size={40} onPress={()=>{navigation.navigate("Basic")}} style={styles.floatingbtn}/>
      </TouchableOpacity> */}

const UpcomingTrips = () => {
  const [startLocation, setStartLocation] = useState('');
  const [destination, setDestination] = useState('')
  useEffect(() => {     
    const id = authentication.currentUser.uid;

      getDoc(doc(db, "trips", id))
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            const userData = documentSnapshot.data()
            console.log(userData.price)
            setStartLocation(userData.startLocation)
            setDestination(userData.destination)
          }else{
            console.log('No data') 
          }
        })
        }, []);
  const items = [
    {
      image: '../../src/assets/Images/ProfileImage.webp',
      day: 'Friday',
      date: '30 Dec 2022',
      time: '10.21',
      from: startLocation,
      to: destination,
}
  ]
  return (
    <View>
      {items.map(e => (
        <TouchableOpacity style={styles.btnTab}>
          <View style={{ flexDirection: 'row', alignContent: 'space-around', borderBottomWidth: 0.2 }}>
            <MaterialIcons name='person-outline' size={30} color={primary} style={styles.tripPic}></MaterialIcons>

            <View style={{ marginLeft: 15 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{e.day}</Text>
              <Text>{e.date}</Text>
            </View>
            <Text style={{ alignSelf: 'center', marginLeft: 170, fontWeight: '500' }}>{e.time}</Text>
          </View>

          <View style={{ flexDirection: 'row', padding:10, alignItems:'center', justifyContent:'flex-start'}}>
            <FontAwesome name='circle-o' size={16} color={primary} style={{ marginTop:5 }}></FontAwesome>
            <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: '500', marginLeft:25 }}> {e.from}</Text>
          </View>

          <MaterialCommunityIcons name='dots-vertical' size={24} color={primary} style={{ marginLeft: 5 }}></MaterialCommunityIcons>

          <View style={{ flexDirection: 'row', padding:10, alignItems:'center', justifyContent:'flex-start'}}>
            <FontAwesome name='circle-o' size={16} color={primary} style={{ marginTop:5 }}></FontAwesome>
            <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: '500', marginLeft:25 }}> {e.to}</Text>
          </View>

        </TouchableOpacity>
      ))}
    </View>
  )
}