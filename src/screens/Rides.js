import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Image, Alert, SafeAreaView, Dimensions } from 'react-native';
import React, { useState , useEffect, useRef } from 'react'
import { primary } from '../theme/Theme'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { setOrigin, setDestination, selectOrigin, selectDestination } from '../slices/navSlice'
import * as Location from 'expo-location'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Rides = () => {

  const origin = useSelector(selectOrigin);
  const GOOGLE_PLACES_API_KEY = 'AIzaSyCCcNKPvn4Y6Ai-yauzHHiJW7igh4x1ky8';
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true)
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [filled, setFilled] = useState(false)
  const [searchData, setSearchData] = useState({});

  const [fromLat, setFromLat] =useState();
  const [fromLng, setFromLng] =useState();

  const [toLat, setToLat] = useState();
  const [toLng, setToLng] =useState();
  const [lat, setLat] =useState();
  const [lng, setLng]= useState()

    const mapRef = useRef()
    const markerRef = useRef()

    const latDelta = 0.0922
    const lngDelta= 0.0421
    const [state, setState] = useState({
      curLoc:{},
      destinationCords:{},
      coordinate:new AnimatedRegion({
        latituteDelta: latDelta,
        longitudeDelta:lngDelta
      })
    })

    const {curLoc, destinationCords, coordinate} = state
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const getLiveLocation = async()=>{
      let { status } = Location.requestForegroundPermissionsAsync()
      if (status = 'granted') {
        console.log('Permission granted')
      } else {
        console.log("No Success")
      }

      const loc  = await Location.getCurrentPositionAsync({});
      const add = await Location.reverseGeocodeAsync(loc.coords)
      
      for (let item of add) {
        const address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}, ${item.country}, `
      }
      const latitude = loc.coords.latitude
      const longitude = loc.coords.longitude

      
      updateState({
        
        curLoc: { latitude, longitude },
        coordinate: new AnimatedRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: latDelta,
            longitudeDelta: lngDelta
        }),
        destinationCords:{}
    })
     
      setLat(lat);
      console.log(lat, lng)
      setLng(lng);
      setIsLoading(false)
      onCenter(latitude, longitude)
    }

  useEffect(() => {
    getLiveLocation()
  }, []);

  
 

  const toSearch = () => {
    if (filled === false) {
      Alert.alert('Please enter start and destination location');
    } else {
      navigation.navigate('Posted', {
        fromLat: state.curLoc.latitude,
        fromLng: state.curLoc.longitude,
      });
    }
  };

  const fetchValue = (data, details) => {
    console.log("this is data", data)
    updateState({
        destinationCords: {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
        }
    })
    setFilled(true)
}
const fetchOrigin = (data, details) => {
  console.log("this is origin", data)
  const latitude = details.geometry.location.lat
  const longitude = details.geometry.location.lng

  updateState({
    curLoc : {latitude, longitude},
      coordinate: {
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.ln,
      }
  })
  onCenter(latitude, longitude)
}

const onCenter = (latitude, longitude) => {
  mapRef.current.animateToRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: latDelta,
      longitudeDelta: lngDelta,
  })
}

  
  return (
isLoading ? 
<View>
  <Text>Loading</Text>
</View>
:
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.find} >
        <View style={styles.tabContent}>
          <View style={styles.fromToContainer}>

            <View style={styles.fromContainer}>
            <Image source={require('../../assets/freelance-work.png')} style={{height:30, width:30}}/>
              <GooglePlacesAutocomplete
                placeholder='Starting Location'
                minLength={2}
                autoFocus={false}
                returnKeyType={'default'}
                fetchDetails={true}
                onPress={(data, details = null) => {
                  // console.log(data.description); // location name
                  // console.log(details.geometry.location.lat); // latitude
                  // console.log(details.geometry.location.lng); // longitude
                  // const from_lat = details.geometry.location.lat
                  // const from_lng = details.geometry.location.lng
                  // setFromLat(from_lat)
                  // setFromLng(from_lng)
                  // setFrom('filled')
                  // setTo('filled')
                  fetchOrigin(data, details)
                }}
                minLenght={5}
                query={{
                  key: GOOGLE_PLACES_API_KEY,
                  language: 'en'
                }}
                nearbyPlacesApi="GooglePlacesSearch"
                debounce={400}
                styles={{
                  container: {
                    width: '80%'
                  },
                  textInput: {
                    borderRadius: 5,
                    fontSize: 18,
                    borderBottomWidth: 0.2
                  },
                }}
              />
            </View>

            <Image source={require('../../assets/swap1.png')} style={{height:25, width:25, justifyContent:'center'}}/>

            <View style={styles.toContainer}>
            <Image source={require('../../assets/journey.png')} style={{height:30, width:30}}/>
              <GooglePlacesAutocomplete
                placeholder='Destination'
                minLength={2}
                autoFocus={false}
                returnKeyType={'default'}
                fetchDetails={true}
                onPress={(data, details = null) => {
                  // console.log(details)
                  // const to_lat = details.geometry.location.lat
                  // const to_lng = details.geometry.location.lng
                  // setToLat(to_lat)
                  // setToLng(to_lng)
                  fetchValue(data, details)
  
                }}
                minLenght={5}
                query={{
                  key: GOOGLE_PLACES_API_KEY,
                  language: 'en'
                }}
                nearbyPlacesApi="GooglePlacesSearch"
                debounce={400}
                styles={{
                  container: {
                    width: '80%'
                  },
                  textInput: {
                    borderRadius: 5,
                    fontSize: 18,
                    borderBottomWidth: 0.2
                  },
                }}
              />
            </View>
          </View>
        </View>
      </View>
        <MapView
          ref={mapRef}
          mapType='mutedStandard'
          
          style={styles.map}
          // initialRegion={{
          //   latitude: lat,
          //   longitude: lng,
          //   latitudeDelta: 0.0922,
          //   longitudeDelta: 0.0421,
          // }}
          initialRegion={{
            ...curLoc,
            latitudeDelta: latDelta,
            longitudeDelta: lngDelta,
          }}
        >
          
        
          <Marker.Animated
            ref={markerRef}
            coordinate={curLoc}
          >

            <Image
              source={require('../../assets/marker.png')}
              style={{
                width: 40,
                height: 40,

              }}
              resizeMode="contain"
            />
          </Marker.Animated>


          {Object.keys(destinationCords).length > 0 && (<Marker.Animated
                        coordinate={destinationCords}
                        
                    >
                      <Image source={require('../../assets/marker1.png')} style={{width:40, height:40}}/>
                    </Marker.Animated>
                    )}

          {Object.keys(destinationCords).length > 0 && (<MapViewDirections
            origin={curLoc}
            destination={destinationCords}
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
              
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    // right: 30,
                    // bottom: 300,
                    // left: 30,
                    // top: 100,
                  },
                });
            }}
            onError={(errorMessage) => {
              console.log('GOT AN ERROR:', errorMessage);
            }}
          />)}


          {/* {Object.keys({toLat, toLng}).length > 0 && (<MapViewDirections
          origin={{
            latitude: lat,
            longitude: lng,
        }}
          apikey='AIzaSyBjgdKGcG0IesW0_bk-IeF9HMbMZaUQ5OE'
          destination={{
            latitude:toLat,
            longitude:toLng,
          }}

          strokeWidth={3}
          strokeColor={primary}
          />) }  */}
        
        {/* {Object.keys({toLat, toLng}).length > 0 && (<Marker
            coordinate={{
                latitude: toLat,
                longitude: toLng,
            }}
            
          />) }  */}
      </MapView>
      <TouchableOpacity style={styles.serachBtn}
        onPress={toSearch}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
          Search
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default Rides

const styles = StyleSheet.create({
  mainContainer:{
    marginVertical:5,
  },
  label: {
    alignSelf: 'flex-start',
    fontWeight: '600',
    fontSize: 25,
  },
  find: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    
    marginHorizontal:windowWidth*0.02
  },
  tabContent: {
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  fromToContainer: {
    justifyContent: 'center',
    alignItems:'center',
    
  },
  fromContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fromToText: {
    marginLeft: 10,
    color: '#444',
    fontWeight: 'bold',
    width: '90%'
  },
  toContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
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
    marginTop: 8,
    height: 4,
    backgroundColor: '#DDD',
    marginBottom: 4
  },
  tabIndicatorActive: {
    backgroundColor: '#1E90FF',
  },
  map: {
    height: windowHeight*0.5,
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: primary,
    marginTop:windowHeight*0.02,
    marginHorizontal:windowWidth*0.02
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    marginVertical: 5,
    
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
    justifyContent: 'flex-end'
  },
  time: {
    marginLeft: 8,
  },
  date: {
    marginLeft: 8,
    color: '#777',
  },
  serachBtn:{
    height: windowHeight*0.085, 
    width: windowWidth*0.8, 
    backgroundColor: primary, 
    justifyContent: 'center', 
    alignItems: 'center', 
    alignSelf: 'center', 
    borderRadius: 10, 
    margin: 5, 
    marginTop: 7 
  }
})

{/* <RideCard style={styles.card} /> */ }
{/* <TouchableOpacity  onPress={()=>{navigation.navigate("LiveLocation")}} style={styles.btn}>
        <FontAwesome5 name='search-location' color='white' size={40} onPress={()=>{navigation.navigate("Basic")}} style={styles.floatingbtn}/>
      </TouchableOpacity> */}

