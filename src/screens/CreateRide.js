import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, ScrollView , Image, Modal, Dimensions, Switch} from 'react-native';
import DatePicker from 'react-native-modern-datepicker'
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { primary } from '../theme/Theme';
import {db, authentication} from '../config/firebase'
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { getDatabase ,ref, set, push, remove, onValue } from 'firebase/database';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env"
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { askAsync, NOTIFICATIONS } from 'expo-permissions';
import { TEST_ID } from 'react-native-gifted-chat';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AddRideScreen = ({navigation}) => {

  const GOOGLE_PLACES_API_KEY = 'AIzaSyCCcNKPvn4Y6Ai-yauzHHiJW7igh4x1ky8';
  const [price, setPrice] = useState('');
  const [seats, setSeats] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('14 May 2023');
  const [time, setTime] = useState();
  const [day, setDay] = useState()
  const today = new Date()
  const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'YYYY/MM/DD')
  const [fromLat, setFromLat] =useState()
  const [fromLng, setFromLng] =useState()
  const [toLat, setToLat] =useState()
  const [toLng, setToLng] =useState()
  const [token, setToken] =useState()
  const [distance, setDistance] = useState()
  const [pinkEnabled, setPinkEnabled] = useState(false)
  const database = getDatabase();
  const ridesRef = ref(database, "/rides");
  const newRideRef = push(ridesRef);
  const newRideKey = newRideRef.key;
  const [gender, setGender] =useState()
  const id= authentication.currentUser.uid;
  const [disableSwitch, setDisableSwitch] = useState(true);
  useEffect(() => {

    const authRef = ref(database, `users/${id}`);
    onValue(authRef, (snapshot) => {
      const user = snapshot.val();
      
      if (user.gender !== 'male') {
        setDisableSwitch(true)
        console.log('male')
      }
      else  {
        setDisableSwitch(false)
        console.log('female')
      }
    });

  }, []);

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {

    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    const formattedDistance = d.toFixed(1);
    console.log(d)
    setDistance(formattedDistance)
  }
function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

async function sendData() {
getDistanceFromLatLonInKm(fromLat, fromLng, toLat, toLng)
  if (!startLocation || !destination || !date || !time || !price) {
    
    Alert.alert('Error', 'Please fill in all required fields');
    return;
  }

  const token = (await Notifications.getDevicePushTokenAsync()).data;
  console.log(token)
    setToken(token)
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  console.log(existingStatus)
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      console.log('Notfication Permission Not Granted')
      return;
    }else
    {
      console.log('Notification Permission granted')
    }
  }

  
    set(newRideRef,  {
      price: price,
      seat: seats,
      from: startLocation,
      to: destination,
      date: date,
      id: id,
      fromLat: fromLat,
      fromLng: fromLng,
      toLat:toLat,
      toLng:toLng,
      token:token,
      rideId: newRideKey, 
      status: 'Not Started',
      pinkEnabled: pinkEnabled,
      availableSeats: seats,
      time: time,
      day: day, 
      distance: distance,
      driverName: authentication.currentUser.displayName,


  });
    console.log(`New ride created with key: ${newRideKey}`);
    Alert.alert('Ride published successfully')
}

  const handleSelectPlaceFrom = (place) => {
    const selectedAddress = place?.formatted_address || '';
    setStartLocation(selectedAddress);

  };
  const handleSelectPlaceTo = (place) => {
    const selectedAddress = place?.formatted_address || '';
    setDestination(selectedAddress);

  };

  const [open, setOpen] =useState(false)
  const [clockOpen, setClockOpen] =useState(false)


  function handleOnPress(){
    setOpen(!open)
  }
  
  function handleOnClockPress(){
    setClockOpen(!clockOpen)
  }


  function handleChange(propsDate){
    setDate(propsDate)
    const selectedDateObj = new Date(date);
    const options = { weekday: 'long' };
    const dayName = selectedDateObj.toLocaleDateString('en-US', options);
    setDay(dayName)
    setOpen(!open)
    
  }

  function handleTimeChange(selectedTime) {
    setTime(selectedTime);
    setClockOpen(!clockOpen)
  }

  function formatTime(date) {
    return format(parseISO(date), 'h a');
  }

  function formatDate(date) {
    return format(parseISO(date), 'dd MMM');
  }

  const toggleSwitch = () => {
    if (!disableSwitch){
    setPinkEnabled(previousState => !previousState)
  }
  };

  return (
    
    <View style={styles.container}>
      
        
      <View style={styles.title}>
        <Text style={styles.headingTxt}>Enter your details</Text>
        <Text style={styles.heading1Txt}>Tell us where you are going?</Text>
      </View>
      
      <View style={styles.form}>
      <View style={styles.inputContainer}>
      <Image source={require('../../assets/flag.png')} style={{height:35, width:35}}/>
        <GooglePlacesAutocomplete
        enablePoweredByContainer={false}
          placeholder='Start Location'
          minLength={2}
          autoFocus={true}
          returnKeyType={'default'}
          fetchDetails={true}
          onPress={(data, details = null) => {
            console.log(details.geometry.location.lat, details.geometry.location.lng)
            const from_lat = details.geometry.location.lat
            const from_lng = details.geometry.location.lng
            setFromLat(from_lat)
            setFromLng(from_lng)
            handleSelectPlaceFrom(details)
            // dispath(
            //   setOrigin({
            //     location: details.geometry.location,
            //     description: data.description,
            //   })
            // );
            // dispath(setDestination(null));
          }}
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: 'en'
          }}
          nearbyPlacesApi="GooglePlacesSearch"
          debounce={400}
          styles={{
            container: {
              margin:10, 
              
            },
            textInput: {
              borderRadius: 5,
              fontSize: 18,
              
            },
          }}
        />
      </View>
      <SafeAreaView style={styles.inputContainer}>
      <Image source={require('../../assets/location.png')} style={{height:35, width:35}}/>
        <GooglePlacesAutocomplete
          placeholder='Destination'
          minLength={2}
          autoFocus={false}
          returnKeyType={'default'}
          fetchDetails={true}
          onPress={(data, details = null) => {
            console.log(details)
            const to_lat = details.geometry.location.lat
            const to_lng = details.geometry.location.lng
            setToLat(to_lat)
            setToLng(to_lng)
            handleSelectPlaceTo(details)
            // dispath(
            //   setOrigin({
            //     location: details.geometry.location,
            //     description: data.description,
            //   })
            // );
            // dispath(setDestination(null));
          }}
          minLenght={5}
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: 'en'
          }}
          nearbyPlacesApi="GooglePlacesSearch"
          debounce={400}
          enablePoweredByContainer={false}
          styles={{
            container: {
              width : '100%',
              justifyContent:'center',
              margin:10
            },
            textInputContainer: {
              width: '100%',
            },
            textInput: {
              height: '100%',
              borderRadius: 5,
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop:15,
              paddingBottom: 0,
              marginLeft: 0,
              marginRight: 0,
              marginTop: 0,
              marginBottom: 0,
              fontSize: 16,
              
              justifyContent:'center'
            },

          }}
          suppressDefaultStyles={false}
        />
      </SafeAreaView>
      
      <View style={{flexDirection:'row', marginVertical:windowHeight*0.02}}>
      <View style={styles.inputContainer}>
      
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          onChangeText={(text) => setPrice(text)}
          placeholderTextColor='lightgray'
        />
      </View>

      <View style={styles.inputContainer}>
          
        <TextInput
          style={styles.input}
          placeholder="#Seats"
          value={seats}
          onChangeText={(text) => setSeats(text)}
          placeholderTextColor='lightgray'
        />
      </View>

          <View style={{flexDirection:'row', alignItems:'center'}}>
            <TouchableOpacity style={styles.datePicker} onPress={handleOnPress}>
              <Image source={require('../../assets/calendar1.png')} style={{ height: 35, width: 35, }} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.datePicker} onPress={handleOnClockPress}>
              <Image source={require('../../assets/clock.png')} style={{ height: 35, width: 35, }} />
            </TouchableOpacity>
          </View>
        </View>


       <Modal animationType='slide' transparent={true} visible={open} style={{}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            
            <DatePicker
                mode='calendar'
                selected={date}
                onDateChange={handleChange}
                minimumDate={startDate}
                style={{ blockSize: 50 }}
                formatTime={formatTime}
                formatDate={formatDate}
            />
          
          </View>
        </View>
       </Modal>

       <Modal animationType='slide' transparent={true} visible={clockOpen} style={{}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            
            <DatePicker
                mode='time'
                selected={time}
                style={{ blockSize: 50 }}
                formatTime={formatTime}
                formatDate={formatDate}
                onTimeChange={handleTimeChange}
            />
          
          </View>
        </View>
       </Modal>
        
      </View>
      <View style={{flexDirection:'row', alignSelf:'flex-end',justifyContent:'center', margin:20}}>
        <Text style={{alignSelf:'center', color:'#929292', marginHorizontal:5}}>Pink</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#f7ede2' }}
        thumbColor={pinkEnabled ? '#FF6583' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={pinkEnabled}
        
      />
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={sendData}>
          <Text style={styles.submitButtonText}>Publish Ride</Text>
        </TouchableOpacity>
      
      
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop:windowHeight*0.1

  },
  title: {
    height: windowHeight*0.15,
    alignSelf:'center',
    backgroundColor:primary,
    width:windowWidth*0.9,
    borderRadius:10,
    marginVertical:windowWidth*0.05,
    padding:25,
    justifyContent:'space-between'
  },
  headingTxt:{
    fontSize:22,
    fontWeight:'600',
    color:'#fff'
  },
  heading1Txt:{
    fontWeight:'400',
    fontSize:16,
    color:'#fff'
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
    justifyContent:'center',
  },
  input: {
    width: windowWidth*0.15,
    height: 40,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderRadius: 5,
    justifyContent:'center',
    backgroundColor:'#929292',
    fontSize:11,
    
  },
  submitButton: {
    backgroundColor: primary,
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    width:windowWidth*0.8,
    alignSelf:'center'
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  datePicker: {
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3, // Shadow radius (spread)
    elevation: 5, // Elevation for Android devices

    // Additional styles for the view
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 8,
    marginHorizontal:windowWidth*0.02,
    
  },
  centeredView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginTop:10
  },
  modalView:{
    margin:5,
    backgroundColor:'white',
    borderRadius:20,
    width:'90%',
    padding:10,
    alignItems:'center',
    shadowColor:'#000',
    shadowOpacity:0.25,
    shadowRadius:4,
    elevation:5
  }
});

export default AddRideScreen;
