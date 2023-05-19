import { StyleSheet, Text, View, TouchableOpacity, Button, Dimensions, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import {  authentication, database } from '../config/firebase'
import { getDatabase, ref, query, orderByChild, equalTo, onValue, off, orderByValue, orderByKey, set, push, remove  } from "firebase/database";
import { primary } from '../theme/Theme';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Notifications = ({navigation}) => {
  const [rideRequests, setRideRequests] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userId = authentication.currentUser.uid
    const requestRef = ref(database, `users/${userId}/requests`)
    
    onValue(requestRef, (snapshot)=>{
      const rideRequestsData = snapshot.val();
      
      if (rideRequestsData) {
        const rideRequestsNotAcceptedOrDeclined = Object.values(rideRequestsData).filter(request => !request.accepted && !request.declined);
        setRideRequests(rideRequestsNotAcceptedOrDeclined);
        console.log(rideRequestsNotAcceptedOrDeclined)
        setLoading(false)
      } else {
        setRideRequests([]);
        setLoading(true)
      }
    })
  }, []);
  const currentRideRef = ref(database, "/currentRide");
  const acceptRequest = (requestId, passengerName, passengerUid, driverUid) => {
    const request = rideRequests.find((request) => request.requestId === requestId);
    const { userRequesting } = request;

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long' });
    const formattedTime = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    const formattedDateTime = `${formattedDate}, ${formattedTime}`;

    set(currentRideRef, {
      passengerName:passengerName,
      passengerUid:passengerUid,
      driverUid:driverUid,
      date: formattedDate,
      time: formattedTime
    })
    console.log('request accepted')
  };

  const handleAccept = (rideRequestId) => {
    // Handle accept button click
  };

  const handleDelete = (rideRequestId) => {
    // Handle delete button click
  };

  const handleMsg = (rideRequestId) => {
    // Handle msg button click
  };
  
  return (
    <View>
  {loading ? (
    <View>
      <Text>Loading</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.heading}>Notifications</Text>
      {rideRequests.length > 0 ? (
        rideRequests.map((request, index) => (
          <View key={request.requestId} style={styles.requestContainer}>
            <Text style={styles.requestDate}>Date: {new Date(request.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</Text>
            <Text style={styles.passengerName}>{request.passengerName} has sent you a ride request.</Text>
          
          
          <View style={styles.buttonContainer}>
            
            <TouchableOpacity onPress={()=>acceptRequest(request.requestId, request.passengerName, request.userRequesting, request.driverId)} style={styles.btn}>
              <Image source={require('../../assets/check.png')} style={{height:15, width:15, alignSelf:'center'}}/>
              <Text style={styles.acceptBtnTxt}>
                Accept
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => declineRequest(request.requestId)} style={styles.btn}>
            <Image source={require('../../assets/multiply.png')} style={{height:15, width:15, alignSelf:'center'}}/>
              <Text style={styles.declineBtnTxt}>
                Decline
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        ))
      ) : (
        <View>
          <Text>No ride requests to display</Text>
        </View>
      )}
      {/* Other notifications */}
    </View>
  )}
    </View>
  
  )
}

export default Notifications

const styles = StyleSheet.create({
  heading:{
    fontSize:26,
    fontWeight:'500',
    marginVertical:20
  },
  container:{
    padding:20

  },
  requestContainer:{
    backgroundColor:primary, 
    marginVertical:5,
    borderRadius:15,
    padding:10
  },
  buttonContainer:{
    flexDirection:'row',
    justifyContent:'space-evenly', marginVertical:5
  },
  btn:{
    height:40, 
    backgroundColor:'#FFFFFF',
    width: windowWidth*0.25,
    justifyContent:'space-evenly',
    alignItems:'center',
    borderRadius:10,
    flexDirection:'row'
  },
  requestDate: {
    alignSelf: 'flex-end',
    color: '#FFFFFF'
  },
  acceptBtnTxt: {
    fontWeight:'500'
  },
  declineBtnTxt: {
    fontWeight:'500'
  },
  passengerName:{
    marginVertical:5
  }
})