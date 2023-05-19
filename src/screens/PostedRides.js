import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Dimensions, FlatList, Image } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { db, authentication, database } from '../config/firebase'
import { getDatabase, ref, query, orderByChild, equalTo, onValue, off, orderByValue, orderByKey, set, push, remove } from "firebase/database";
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { primary } from '../theme/Theme';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PostedRides = ({ route }) => {
  const { fromLat, fromLng, toLat, toLng } = route.params;
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [postedRides, setPostedRides] = useState([]);
  const [token, setToken] = useState()
  const [seats, setSeats] = useState(1);
  const mapRef = useRef()
  const id = authentication.currentUser.uid;
  const ridesRef = ref(database, 'rides');
  const ridesQuery = query(ridesRef);
  const newRideRef = push(ridesRef);
  const newRequestKey = newRideRef.key;
  // }, []);

  useEffect(() => {
    

    // orderByChild('to'), equalTo('Karachi, Karachi City, Sindh, Pakistan')
    const onRidesValue = onValue(ridesQuery, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        let trip = { ...data };
        console.log(trip.token)
        const rides = Object.values(trip);
        const filteredRides = Object.values(data)
          .filter((data) => {
            // Distance between user's location and ride 'from' location (in kilometers)
            const distance = getDistanceFromLatLonInKm(fromLat, fromLng, data.fromLat, data.fromLng);
            return distance < 10; // Only return rides within 1 km distance
          });
        function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {

          const R = 6371; // Radius of the earth in km
          const dLat = deg2rad(lat2 - lat1);
          const dLon = deg2rad(lon2 - lon1);
          const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const d = R * c; // Distance in km
          return d;
        }
        function deg2rad(deg) {
          return deg * (Math.PI / 180)
        }
        setPostedRides(filteredRides);
        setIsLoading(false);
      } else {
        setPostedRides([]);
        setIsLoading(true);
      }
    });

    return () => {
      off(ridesRef, onRidesValue);
    };
  }, []);

  const sendRequest = (rId, driverId, start, destination, date) => {

    const Data = {
      userRequesting: id,
      date: date,
      rideId: rId,
      accepted: false,
      declined: false,
      driverId: driverId,
      passengerName: authentication.currentUser.displayName,
      start: start, 
      destination: destination,
      requestId: newRequestKey
    }
    const requestRef = ref(database, `users/${driverId}/requests`)
    const newRequestRef = push(requestRef)
    set(newRequestRef, Data)
    console.log('sent')
  }

  const handleDecreaseSeats = () => {
    if (seats > 1) {
      setSeats(seats - 1);
    }
  };

  const handleIncreaseSeats = () => {
    setSeats(seats + 1);
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {
        isLoading ?
          (
            <Text>Loading...</Text>
          )
          :

          <View style={styles.container}>
          <Text style={styles.heading}> Available rides</Text>
            <View style={{flexDirection:'row', justifyContent:'center'}}> 
              <Text style={styles.head1}>slide right</Text>
              <Image source={require('../../assets/right-arrow.png')} style={{width:10, height:10, alignSelf:'center'}}/>
            </View>
            <ScrollView horizontal>
              {postedRides.map((ride) => (
                <View key={ride.id}>
                  <View key={ride.rideId} style={styles.rideContainer}>
                    <View style={styles.timeContainer}>
                      <Text style={styles.timeDayTxt}>{ride.day}, {ride.time}</Text>
                      <Text style={styles.timeDayTxt}>{new Date(ride.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</Text>
                    </View>
                    <View style={styles.btnView}>
                      <Text style={{ alignSelf: 'center', color: '#4B5563' }}>Seats</Text>
                      <View style={styles.seatsContainer}>

                        <TouchableOpacity style={styles.button} onPress={handleDecreaseSeats}>
                          <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>
                        <TextInput
                          style={styles.input}
                          value={seats.toString()}
                          keyboardType="numeric"
                          onChangeText={(text) => setSeats(parseInt(text) || 1)}
                        />
                        <TouchableOpacity style={styles.button} onPress={handleIncreaseSeats}>
                          <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                      </View>

                      <TouchableOpacity style={styles.btn} onPress={()=>sendRequest(ride.rideId, ride.id, ride.to, ride.from, ride.date)}>
                        <Image source={require('../../assets/send.png')} style={{ height: 20, width: 20 }} />
                        <Text style={styles.btnTxt}>Request</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between' }}>
                      <Text style={[styles.seatsTxt, { fontWeight: '600' }]}>Empty Seats: {ride.availableSeats} / {ride.seat}</Text>
                      <Text style={styles.seatsTxt}>Distance: {ride.distance}</Text>
                    </View>

                  </View>
                  <MapView
                    ref={mapRef}
                    mapType='mutedStandard'

                    style={styles.map}
                    initialRegion={{
                      latitude: ride.fromLat,
                      longitude: ride.fromLng,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                    // initialRegion={{
                    //   ...curLoc,
                    //   latitudeDelta: latDelta,
                    //   longitudeDelta: lngDelta,
                    // }}
                  >


                    <Marker
                      
                      coordinate={{latitude:ride.fromLat, longitude:ride.fromLng}}
                    >

                      <Image
                        source={require('../../assets/marker.png')}
                        style={{
                          width: 40,
                          height: 40,

                        }}
                        resizeMode="contain"
                      />
                    </Marker>


                    <Marker
                      coordinate={{ latitude: ride.toLat, longitude: ride.toLng }}
                    >
                      <Image source={require('../../assets/marker1.png')} style={{ width: 40, height: 40 }} />
                    </Marker>


                    <MapViewDirections
                      origin={{latitude:ride.fromLat, longitude:ride.fromLng}}
                      destination={{latitude:ride.toLat, longitude: ride.toLng}}
                      apikey='AIzaSyBjgdKGcG0IesW0_bk-IeF9HMbMZaUQ5OE'
                      strokeWidth={1.5}
                      strokeColor="red"
                      optimizeWaypoints={true}
                      onStart={(params) => {
                        console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                      }}
                      onReady={result => {
                        console.log(`Distance: ${result.distance} km`)
                        console.log(`Duration: ${result.duration} min.`)
                        mapRef.current.fitToCoordinates(result.coordinates, {});
                      }}
                      onError={(errorMessage) => {
                        console.log('GOT AN ERROR:', errorMessage);
                      }}
                    />
                  </MapView>
                </View>
              ))}
            </ScrollView>
          </View>
      }
    </View>

  )
}

export default PostedRides

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  heading:{
    fontSize:22, 
    alignSelf:'center',
    fontWeight:'600', 
    marginTop: windowHeight*0.1
  },
  head1:{
    alignSelf:'center', 
    fontSize:11
  },
  rideContainer: {
    backgroundColor: primary,
    height: windowHeight * 0.20,
    width: windowWidth * 0.9,
    margin: 10,
    borderRadius: 15,
    justifyContent: 'space-between',
    marginBottom:0
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    padding: 5,
    marginVertical: 5
  },
  timeDayTxt: {
    color: '#FFFFFF',
    fontWeight: '500'
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10
  },
  btn: {
    height: windowHeight * 0.07,
    backgroundColor: '#FFFFFF',
    width: windowWidth * 0.30,
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5
  },
  btnTxt: {
    fontWeight: '500',
    color: '#4B5563'
  },
  seatsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 10
  },
  button: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
  },
  input: {
    width: 20,
    height: 30,
    borderWidth: 1,
    borderColor: 'gray',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  seatsTxt: {
    fontSize: 16,
    color: '#FFFFFF',
    marginVertical: 10
  }, 
  map:{
    height:windowHeight*0.5,
    width: windowWidth * 0.9,
    alignSelf:'center',
    borderRadius:10
  }
})