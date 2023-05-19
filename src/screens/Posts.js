import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Image, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { primary, textColor } from '../theme/Theme'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
import { getDoc, doc, } from "firebase/firestore";
import { getDatabase, ref, query, orderByChild, equalTo, onValue, off, orderByValue, orderByKey  } from "firebase/database";
import { authentication, db, database } from '../config/firebase';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Posts = () => {
  const navigation = useNavigation(); 

  const toRegistration =()=>{
  navigation.navigate('Create');
  }
  // const scheduledRides = [
  //   { day: 'Mon', date: 'Feb 14', time: '10:00 AM', from: 'Home', to: 'Work' },
  //   { day: 'Tue', date: 'Feb 15', time: '11:00 AM', from: 'Work', to: 'Gym' },
  //   { day: 'Wed', date: 'Feb 16', time: '12:00 PM', from: 'Gym', to: 'Home' },
  //   { day: 'Thu', date: 'Feb 17', time: '01:00 PM', from: 'Home', to: 'School' },
  //   { day: 'Fri', date: 'Feb 18', time: '02:00 PM', from: 'School', to: 'Home' },
  // ];

  const [scheduledRides, setScheduledRides] = useState([])

  useEffect(() => {
    const id = authentication.currentUser.uid;
    const ridesRef = ref(database, 'rides');
    const ridesQuery = query(ridesRef, orderByChild('id'), equalTo(id));
    const onRidesValue = onValue(ridesQuery, (snapshot) => {
      const data = snapshot.val();
      // console.log(data)
      if (data) {
        let trip = {...data};
        const rides = Object.values(trip);
        setScheduledRides(rides);

      } else {
        setScheduledRides([]);

      }
    })
    return () => {
      // Unsubscribe from the database to prevent memory leaks
      off(ridesRef, onRidesValue);
    };
  },
  
  []
  )
  
  return (
    <View>
      <View>
        <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10}}>
        <Text style={styles.label}>Publish Ride</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Notifications')}>
          <Image source={require('../../assets/notification-on.png')} style={{ height: 25, width: 25, alignSelf:'center', marginTop:10, marginRight:7}} />
        </TouchableOpacity >
        </View>
      
      <TouchableOpacity style={styles.tab} onPress={toRegistration}>
      <View style={styles.tabContent}>
        <Image source={require('../../assets/carpool.png')} style={{height:35, width:35}}/>
        <Text style={styles.tabText}>Going Somewhere? Catch a passenger</Text>
      </View>
    </TouchableOpacity>
    </View>

      <Text style={styles.label}>Scheduled Routes</Text>
      <ScrollView horizontal>
        {scheduledRides.map((ride, index) => (
          <View style={styles.card} key={ride.rideId}>

            <View style={styles.cardHeader}>
              <Text style={styles.seatsLeft}>Seats left: {ride.availableSeats}/{ride.seat}</Text>
              <Text style={styles.time}>{ride.day}</Text>
            </View>

            <View style={styles.cardContent}>
              <Image source={require('../../assets/freelance-work.png')} style={{height:30, width:30}}/>
              <Text numberOfLines={2} ellipsizeMode='tail' style={styles.from}>{ride.from} </Text>
            </View>

            <View style={styles.cardContent}>
              <Image source={require('../../assets/journey.png')} style={{height:30, width:30}}/>
              <Text numberOfLines={2} ellipsizeMode='tail' style={styles.from}>{ride.to}</Text>
            </View>

            <View style={styles.statusTimeContainer}>
              <View>
                <Text style={{color:'#929292', fontSize:11}} >
                  Status:
                </Text>
                <Text style={{color:'#929292'}}>
                  {ride.status}
                </Text>
              </View>
              <View style={styles.timeDate}>
                <View style={{flexDirection:'row',  marginHorizontal:windowWidth*0.05}}>
                <Image source={require('../../assets/calendar2.png')} style={{height:25, width:25,}}/>
                <Text style={{color:textColor, margin:4}}>
                {new Date(ride.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                </Text>
                </View>
                <View style={{flexDirection:'row',  marginHorizontal:windowWidth*0.02}}>
                <Image source={require('../../assets/clock1.png')} style={{height:25, width:25}}/>
                <Text style={{color:textColor, margin:4}}>
                  {ride.time}
                </Text>
                </View>
                
              </View>
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
    marginHorizontal: windowWidth*0.02
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
    fontWeight:'500',
    
  },
  to:{
    marginTop:50,
    fontWeight:'500',
  },
  time: {
    fontSize: 16,
    marginRight:5
  },
  seatsLeft:{
    color:'#929292',
    fontSize:16,
    alignSelf:'center'
  },
  statusTimeContainer:{
    flexDirection:'row',
    marginHorizontal:windowWidth*0.04,
    alignContent:'center',
    marginVertical:windowWidth*0.02,
    alignItems:'center',
    justifyContent:'space-between'
  },
  timeDate:{
    flexDirection:'row',

  }
})