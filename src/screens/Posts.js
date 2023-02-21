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
  const scheduledRides = [
    { day: 'Mon', date: 'Feb 14', time: '10:00 AM', from: 'Home', to: 'Work' },
    { day: 'Tue', date: 'Feb 15', time: '11:00 AM', from: 'Work', to: 'Gym' },
    { day: 'Wed', date: 'Feb 16', time: '12:00 PM', from: 'Gym', to: 'Home' },
    { day: 'Thu', date: 'Feb 17', time: '01:00 PM', from: 'Home', to: 'School' },
    { day: 'Fri', date: 'Feb 18', time: '02:00 PM', from: 'School', to: 'Home' },
  ];
  
  return (
    <View>
      <View>
      <Text style={styles.label}>Publish Route</Text>
      <TouchableOpacity style={styles.tab} onPress={toRegistration}>
      <View style={styles.tabContent}>
        <MaterialIcons name="location-on" size={24} color="#37474F" />
        <Text style={styles.tabText}>location</Text>
      </View>
    </TouchableOpacity>
    </View>
      {/* <TouchableOpacity style={styles.find} onPress={toRegistration}>
        <View style={{ flexDirection: 'row', borderBottomWidth: 0.2 }}>
          <FontAwesome name='location-arrow' size={16} color={primary} style={{ margin: 15 }}></FontAwesome>
          <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: '200' }}>Where</Text>
          <FontAwesome name='search' color={primary} style={{ alignSelf: 'center', marginLeft: 230 }} size={16}></FontAwesome>
        </View>
      </TouchableOpacity> */}
      <Text style={styles.label}>Scheduled Routes</Text>
      <ScrollView horizontal>
        {scheduledRides.map((ride, index) => (
          <View style={styles.card} key={index}>
            <View style={styles.cardHeader}>
              <Text style={styles.day}>{ride.day}, {ride.date}</Text>
              <Text style={styles.time}>{ride.time}</Text>
            </View>
            <View style={styles.cardContent}>
              <MaterialCommunityIcons name="map-marker-outline" size={24} color="black" />
              <Text style={styles.from}>{ride.from} </Text>
              </View>
              <View style={styles.cardContent}>
              <MaterialCommunityIcons name="map-marker-outline" size={24} color="black" />
              <Text style={styles.from}>{ride.to}</Text>

            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

export default Posts

const styles = StyleSheet.create({
  tab: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width:350,
    height:60,
    justifyContent:'center'
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabText: {
    color: '#37474F',
    fontSize: 16,
    marginLeft: 10,
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
  },
  container: {
    backgroundColor: '#F5F5F5',
    paddingBottom: 20,
  },
  header: {
    height: 60,
    backgroundColor: '#37474F',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 10,
    width: 300,
    height: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  day: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 20,
  },
  cardContent: {
    flexDirection: 'row',

    padding: 10,
  },
  from: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,
    fontWeight:'500'
  },
  to:{
    marginTop:50,
    fontWeight:'500',
  },
  time: {
    fontSize: 16,
    marginRight:5
  },
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