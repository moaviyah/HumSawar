import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { db, authentication } from '../config/firebase'
import { doc, setDoc, getDoc } from "firebase/firestore";
const PostedRides = (to, from) => {
    const [postedRides, setPostedRides] = useState([]);
    const id = authentication.currentUser.uid;
    useEffect(() => {
        const fetchPostedRides = async () => {
          const snapshot = await db
            .getDoc('trips')
            .where('from', '==', {from}) // replace with user input
            .where('to', '==', {to}) // replace with user input
            
    
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
    
          setPostedRides(data);
        };
    
        fetchPostedRides();
      }, []);

  return (
    <View style={styles.container}>
    <ScrollView>
      {postedRides.map((ride) => (
        <View key={ride.id} style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>From:</Text>
            <Text style={styles.value}>{ride.from}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>To:</Text>
            <Text style={styles.value}>{ride.to}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{ride.date}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Time:</Text>
            <Text style={styles.value}>{ride.time}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Seats:</Text>
            <Text style={styles.value}>{ride.seats}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  </View>
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
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
      },
      label: {
        flex: 1,
        fontWeight: 'bold',
        marginRight: 10,
        backgroundColor:'black'
      },
      value: {
        flex: 2,
      },
})