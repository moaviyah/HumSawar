import { StyleSheet, Text, View, ScrollView , TextInput} from 'react-native'
import React, {useState, useEffect} from 'react'
import { db, authentication, database } from '../config/firebase'
import { doc, setDoc, getDoc, collection, where } from "firebase/firestore";
import { getDatabase, ref, query, orderByChild, equalTo, onValue,  } from "firebase/database";
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'

const PostedRides = (to, from) => {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [postedRides, setPostedRides] = useState([]);
  const id = authentication.currentUser.uid;
  useEffect(() =>  {
    
    return onValue(ref (database, '/rides', orderByChild='to') , querySnapShot => {
      let data = querySnapShot.val() || {};
      if (data){
      let rides = {...data};
      const trip = Object.values(rides)
      setPostedRides(trip);
      console.log(postedRides)
      setIsLoading(false)
    }else {
      setPostedRides([])
      setIsLoading(true)
    }
    });

  }, []);
  const rides = [
    {
      id: '1',
      time: '8:00 AM',
      date: 'Feb 28',
      price: '$20',
      from: 'San Francisco',
      to: 'Los Angeles',
      seat:'2'
    },
    {
      id: '2',
      time: '10:00 AM',
      date: 'Mar 1',
      price: '$25',
      from: 'San Francisco',
      to: 'Los Angeles',
      seat:'2'
    },
    {
      id: '3',
      time: '12:00 PM',
      date: 'Mar 2',
      price: '$30',
      from: 'San Francisco',
      to: 'Los Angeles',
      seat:'2'
    },
    {
      id: '4',
      time: '2:00 PM',
      date: 'Mar 3',
      price: '$35',
      from: 'San Francisco',
      to: 'Los Angeles',
      seat:'2'
    },
  ];
 
        // const fetchPostedRides = async () => {
        //   const snapshot = await db.
        //     getDoc(collection('trips'))
        //     .where('startLocation', '==', 'london') // replace with user input
        //     .where('destination', '==', 'paris') // replace with user input
            
    
        //   const data = snapshot.docs.map((doc) => ({
        //     id: doc.id,
        //     ...doc.data(),
        //   }));
    
        //   setPostedRides(data);
        // };
    
        // fetchPostedRides();


  return (
    // <View>
    //   {isLoading ? 
    //   (
    //     <Text>Loading...</Text>
    //   ) 
    //   : (
    //     postedRides.map(trip => (
    //       <View>
    //         <Text>{trip.from}</Text>
    //         <Text>{trip.to}</Text>
    //         <Text>{trip.date}</Text>
    //         <Text>{trip.time}</Text>
    //         <Text>{trip.price}</Text>
    //       </View>
    //     )
    //     )
    //   )}
    // </View>
    <ScrollView style={styles.container}>
      
     {isLoading?(
      <Text>Loading...</Text>
     )
     :
     postedRides.map((ride) => (
        <View style={styles.card}>
          <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
          <View style={styles.cardRow}>
            <Ionicons name="time-outline" size={20} color="gray" />
            <Text style={styles.cardText}>{ride.time}</Text>
          </View>
          <View style={styles.cardRow}>
            <Ionicons name="calendar-outline" size={20} color="gray" />
            <Text style={styles.cardText}>{ride.date}</Text>
          </View>

          <View style={styles.cardRow}>
            <Ionicons name="cash-outline" size={20} color="gray" />
            <Text style={styles.cardText}>{ride.price}</Text>
          </View>
          <View style={styles.cardRow}>
            <MaterialIcons name="event-seat" size={20} color="gray" />
            <Text style={styles.cardText}>{ride.seat}</Text>
          </View>
          </View>
          <View style={styles.cardRow}>
            <MaterialIcons name="my-location" size={20} color="gray" />
            <Text style={styles.cardText}>{ride.from}</Text>
          </View>
          <View style={styles.cardRow}>
            <MaterialIcons name="location-on" size={20} color="gray" />
            <Text style={styles.cardText}>{ride.to}</Text>
          </View>

          <View style={[styles.tabIndicator, isActive && styles.tabIndicatorActive]} />
        <View style={styles.optionsContainer}>
          <View style={styles.option}>
            <MaterialIcons name='send-to-mobile' size={22} color='#777' />
            <Text style={styles.optionText}>Request</Text>
          </View>
          <View style={styles.option}>
            <MaterialIcons name='person' size={22} color='#777' />
            <Text style={styles.optionText} keyboardType='numeric'>Profile</Text>
          </View>
          <View style={styles.option}>
            <AntDesign name='delete' size={22} color='#777' />
            <Text style={styles.optionText}>Delete</Text>
          </View>
        </View>
        </View>
      ))}
    </ScrollView>
    
  )
}

export default PostedRides

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f8f8f8',
      },
      card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
      },
      cardText: {
        fontWeight: 'bold',
      },
      value: {
        flex: 2,
      },

  tabIndicator: {
    marginTop:8,
    height: 4,
    backgroundColor: '#DDD',
    marginBottom:4
  },
  tabIndicatorActive: {
    backgroundColor: '#1E90FF',
  },
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    marginBottom:3,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 25,
  },
  optionText: {
    marginLeft: 5,
    color: '#777',
  },
})