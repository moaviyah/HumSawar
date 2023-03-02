// import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView, Alert } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import Ionicons from 'react-native-vector-icons/Ionicons'
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import { primary } from '../theme/Theme';
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import { doc, setDoc, addDoc, collection } from "firebase/firestore";
// import { authentication, db , storage} from '../config/firebase';

// const CreateRide = ({ navigation }) => {

//   const [price, setPrice] = useState('');
//   const [seat, setSeat] = useState('')
//   const [startLocation, setStartLocation] = useState('')
//   const [destination, setDestination] = useState('')
//   const [image, setImage] = useState(null);

//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const [isVerified, setIsVerified] = useState(true);
//   const [date, setDate] = useState('09-10-2021');

//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleConfirm = (date) => {
//     console.warn("A date has been picked: ", date);
//     setDate(date)
//     hideDatePicker();
//   };
//   const handle_navigation = () => {
//     navigation.navigate('Driver Registration')
//   }
//   const Data = {
//     price: price,
//     seats: seat,
//     startLocation: startLocation,
//     destination: destination,
//     time: date,
// };
//   function sendData() {
//     const id = authentication.currentUser.uid;
//     setDoc(doc(db, "trips", id+destination, ), Data)
//         .then(() => {
//           Alert.alert('Trip Published')
//             navigation.navigate("Dashboard")
//         }).catch((err)=>{
//             console.log(err)
//         })
// }
//   return (
//     <SafeAreaView style={styles.mainContainer}>
//       <View style={styles.card}>

//       <View style={{ flexDirection: 'row', margin: 5, backgroundColor: 'white' }}>
//         <Ionicons name='pricetag' size={24} color={primary} style={{ margin: 5, marginTop: 20, borderBottomWidth:1 }}></Ionicons>
//         <TextInput style={styles.priceInput} placeholderTextColor='black' placeholder='Price' keyboardType='number-pad' onChangeText={(text)=>setPrice(text)} />
//       </View>

//       <View style={{ flexDirection: 'row', backgroundColor:'white'}}>
//         <MaterialCommunityIcons name='car-seat' color={primary}  size={28} style={{ margin: 5,  }}></MaterialCommunityIcons>
//         <TextInput style={styles.seatInput} placeholderTextColor='black' placeholder='Seats' keyboardType='number-pad' onChangeText={(text)=>setSeat(text)}/>
//       </View>
//       <TextInput placeholder='Start Location' style={styles.travel} placeholderTextColor='black' onChangeText={(text)=>setStartLocation(text)}></TextInput>
//       <TextInput placeholder='Destination' style={styles.travel} placeholderTextColor='black' onChangeText={(text)=>setDestination(text)}></TextInput>
//       <TouchableOpacity placeholder='Destination' style={styles.travel} placeholderTextColor='black' onPress={showDatePicker}>
//         <Text>{date.toString()}</Text>
//       </TouchableOpacity>
// {/* 
//       <DatePicker
//       modal
//         open={open}
//         date= {date}
//         display={Platform.OS === 'ios'? 'spinner':'default'}
//         onChange={onDateSelected}
//         onCancel={cancel_datePicker}
//         style={styles.datePicker}
//         onConfirm={setDate(date)}
//         /> */}

//       </View>
//       {isVerified
//         ?
//         <TouchableOpacity style={styles.searchbtn} onPress={sendData}>
//           <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>Confirm</Text>
//         </TouchableOpacity>
//         :
//         <TouchableOpacity style={styles.searchbtn} >
//           <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>Continue</Text>
//         </TouchableOpacity>
//       }

// <DateTimePickerModal
//         isVisible={isDatePickerVisible}
//         mode='datetime'
//         onConfirm={handleConfirm}
//         onCancel={hideDatePicker}
//       />
//     </SafeAreaView>
//   )
//     }
// export default CreateRide

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,

//   },
//   card:{
//     backgroundColor:'transparent',
//     margin:15,
//     borderRadius:10,
//     padding:10
//   },
//   priceInput: {
//     height: 60,
//     borderRadius: 5,
//     margin: 5,
//     padding: 5,
//     alignContent: 'stretch',
//     width: 300,
//     backgroundColor: 'transparent',
//     borderBottomWidth: 0.2

//   },
//   seatInput: {
//     height: 60,
//     borderRadius: 5,
//     margin: 5,
//     padding: 5,
//     alignContent: 'stretch',
//     width: 300,
//     backgroundColor: 'transparent',
//     borderBottomWidth: 0.2,
//     marginBottom: 35
//   },
//   travel: {
//     height: 60,
//     padding: 15,
//     borderColor: 'black',
//     borderBottomWidth: 0.2,
//   },
//   searchbtn: {
//     height: 60,
//     padding: 15,
//     borderRadius: 30,
//     margin: 3,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: primary,
//     marginTop: 50,
//     width:300,
//     alignSelf:'center'
//   },
//   datePicker:{
    
//   }
// })

//       {/* {
//       !timePicker && (
//     <TouchableOpacity style={styles.travel} onPress={showDatePicker}>
//       <Text>Select Date</Text>
//     </TouchableOpacity>
//       )
//       };
//         {
//       datePicker&&(
//         <DateTimePicker
//         value= {date}
//         mode={'date'}
//         display={Platform.OS === 'ios'? 'spinner':'default'}
//         is24Hour={true}
//         onChange={onDateSelected}
//         style={styles.datePicker}
//         />
//       )
//       } */}
//       {/* 
      
     


//       {
//       !datePicker && (
//         <View>
//           <TouchableOpacity style={styles.travel} onPress={setTimePicker}>
//           <Text>
//             Select Time
//           </Text>
//           </TouchableOpacity>
//         </View>
//       )
//       };

    

//       {
//         timePicker && (
//           <DateTimePicker 
//           value={time}
//           mode={'time'}
//           display={Platform.OS === 'ios'? 'spinner':'default'}
//           is24Hour={true}
//           onChange={onTimeSelected}
//           style={styles.datePicker}
//           />
//         )
//       };
//  */}


import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { primary } from '../theme/Theme';
import {db, authentication} from '../config/firebase'
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { getDatabase ,ref, set, push } from 'firebase/database';


const AddRideScreen = ({navigation}) => {
  const [price, setPrice] = useState('');
  const [seats, setSeats] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(date.toLocaleTimeString());
  const database = getDatabase();
  const ridesRef = ref(database, "rides");
  const newRideRef = push(ridesRef);
const newRideKey = newRideRef.key;

    const Data = {
    price: price,
    seat: seats,
    from: startLocation,
    to: destination,
    time: time,
    date: date,
};


  function sendData() {
    set(newRideRef, Data);
    console.log(`New ride created with key: ${newRideKey}`);
    // const id = authentication.currentUser.uid;

    // addDoc(collection(db, "trips" ), Data)
    //     .then(() => {
    //       Alert.alert('Trip Published')
    //         navigation.navigate("Dashboard")
    //     }).catch(error => {
    //       console.error('Error adding document: ', error);
    //     });
}

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setTime(currentDate.toLocaleTimeString());
  };

  const handleSubmit = () => {
    // Add code to submit ride details to Firebase
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Ride</Text>
      <View style={styles.form}>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="currency-usd" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Price"
          keyboardType="numeric"
          value={price}
          onChangeText={(text) => setPrice(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="seat" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Number of seats"
          keyboardType="numeric"
          value={seats}
          onChangeText={(text) => setSeats(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="map-marker-outline" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Start location"
          value={startLocation}
          onChangeText={(text) => setStartLocation(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="map-marker" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Destination"
          value={destination}
          onChangeText={(text) => setDestination(text)}
        />
      </View>
      <View style={{flexDirection:'row',}}>
      <MaterialCommunityIcons name="calendar" size={24} color="black" style={{marginTop:20}}/>
        <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.datePickerButtonText}>Choose a date</Text>
        </TouchableOpacity>
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="datetime"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <TouchableOpacity style={styles.submitButton} onPress={sendData}>
          <Text style={styles.submitButtonText}>Publish Ride</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  form: {
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
    width:'90%',
    height:'70%',
    justifyContent:'center',
  },
  input: {
    width: 250,
    height: 40,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  datePickerButton: {
    width: 250,
    height: 40,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin:15,
    justifyContent:'center'
  },
  datePickerButtonText: {
    color: '#666',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: primary,
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default AddRideScreen;
