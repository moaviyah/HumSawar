import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native'
import React, { useState, useCallback, useRef, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { primary } from '../theme/Theme'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { setOrigin, origin } from '../slices/navSlice'
import * as Location from 'expo-location'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env"
import MapView,  {Marker} from 'react-native-maps'
import { AntDesign } from '@expo/vector-icons';

const Rides = () => {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [address, setAddress] = useState();
  const [items, setItems] = useState([
    { label: 'Female', value: 'female' },
    { label: 'Male', value: 'male' }
  ]);

  const [location, setLocation] = useState();
  const [name, setName] = useState();
  const [errorMsg, setErrorMsg] = useState(null);
  const [from, setFrom] = useState('from');
  const [to, setTo] = useState('to');
  const dispath = useDispatch();
  useEffect(() => {
    (async () => {

      let { status } = Location.requestForegroundPermissionsAsync()

      if (status = 'granted') {
        console.log('Permission granted')
      } else {
        console.log("No Success")
      }

      const loc = await Location.getCurrentPositionAsync({});
      const add = (await Location.reverseGeocodeAsync(loc.coords))
      setAddress(add)

      for (let item of add) {
        const address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}, ${item.country}, `
      }
      setLocation(loc);
      // console.warn(loc)
      // console.warn(add)
      dispath(
        setOrigin({
          lat: loc.coords.latitude,
          lng: loc.coords.longitude,
        })
      );
    })();
  }, []);

  const toSearch = (to, from) => {
    navigation.navigate('Posted'), {to, from}
  }
  const [isActive, setIsActive] = useState(false);

  const handlePress = () => {
    setIsActive(!isActive);
    onPress();
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  };
  return (
    <View>
      {/* <Text style={styles.label}>Find Rides</Text> */}

      <View style={styles.find} onPress={toSearch}>
        <View style={styles.tabContent}>
          <View style={styles.fromToContainer}>
            <View style={styles.fromContainer}>
              <MaterialIcons name='my-location' size={22} color='#444' />
              <TextInput placeholder="from" style={styles.fromToText} onChangeText={(text)=>{setFrom(text)}}></TextInput>
            </View>
            <Ionicons name='md-swap-vertical' size={20} color='#777' style={{alignSelf:'center'}}/>
            <View style={styles.toContainer}>
              <MaterialIcons name='location-on' size={22} color='#444' />
              <TextInput placeholder='To' onChangeText={(text)=>{setTo(text)}} style={styles.fromToText}></TextInput>
            </View>
          </View>
        </View>

        <View style={[styles.tabIndicator, isActive && styles.tabIndicatorActive]} />
        <View style={styles.optionsContainer}>
          <View style={styles.option}>
            <MaterialIcons name='event' size={22} color='#777' />
            <TextInput style={styles.optionText}>Date</TextInput>
          </View>
          <View style={styles.option}>
            <MaterialIcons name='person' size={22} color='#777' />
            <TextInput style={styles.optionText} keyboardType='numeric'>Seats</TextInput>
          </View>
          <View style={styles.option}>
            <Ionicons name='md-moon' size={22} color='#777' />
            <TextInput style={styles.optionText}>Pink</TextInput>
          </View>
        </View>
      </View>
      <MapView
        mapType='standard'
        style={styles.map}
        initialRegion={{
          latitude: 33.6439,
          longitude: 73.08621,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>

        {origin?.lat && (
          <Marker
            coordinate={{
              latitude: 33.6439,
              longitude: 73.08621,
            }}
            title="Origin"
            description='hello'
            identifier='origin'
          />
        )}
      </MapView>
      <TouchableOpacity style={{height:50, width:200, backgroundColor:primary, justifyContent:'center', alignItems:'center', alignSelf:'center', borderRadius:10, margin:5, marginTop:7}}
      onPress={toSearch}
      >
        <Text style={{color:'#fff', fontWeight:'bold', fontSize:16}}>
            Search 
        </Text>
      </TouchableOpacity>
      <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="event" size={24} color="#fff" />
      </View>
      <View style={styles.content}>
      <View style={styles.details}>
          <MaterialIcons name="access-time" size={16} color="#000" />
          <Text style={styles.time}>9.45</Text>
          <Text style={styles.date}>24 Feb</Text>
        </View>
        <Text style={styles.destination}>Air University, E-9 Islambad</Text>

      </View>
    </View>
    </View>
  )
}

export default Rides

const styles = StyleSheet.create({
  label: {
    alignSelf: 'flex-start',
    fontWeight: '600',
    fontSize: 25,
  },
  find: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginTop:10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    alignSelf: 'center',
    marginBottom:2
  },
  tabContent: {
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  fromToContainer: {
    justifyContent:'center',
  },
  fromContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fromToText: {
    marginLeft: 10,
    color: '#444',
    fontWeight: 'bold',
    width:'90%'
  },
  toContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  tabIndicator: {
    marginTop:8,
    height: 4,
    backgroundColor: '#DDD',
    marginBottom:4
  },
  tabIndicatorActive: {
    backgroundColor: '#1E90FF',
  },
  map: {
    height:'53%',
    borderRadius: 5,
    borderWidth:0.2,
    borderColor:primary,
  }, 
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    marginVertical: 8,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    backgroundColor: '#FF416C',
    borderRadius: 16,
    padding: 8,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  destination: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'flex-end'
  },
  time: {
    marginLeft: 8,
  },
  date: {
    marginLeft: 8,
    color: '#777',
  },
})

{/* <RideCard style={styles.card} /> */ }
{/* <TouchableOpacity  onPress={()=>{navigation.navigate("LiveLocation")}} style={styles.btn}>
        <FontAwesome5 name='search-location' color='white' size={40} onPress={()=>{navigation.navigate("Basic")}} style={styles.floatingbtn}/>
      </TouchableOpacity> */}

