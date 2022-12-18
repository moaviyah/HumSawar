import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TouchableOpacity, Button, TextInput } from 'react-native'
import React, {useState} from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env"
import MapView, { Marker } from 'react-native-maps'
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { selectOrigin, setDestination, setOrigin } from '../slices/navSlice';
import { useDispatch, useSelector } from 'react-redux'
import { SelectList } from 'react-native-dropdown-select-list'
import { primary } from '../theme/Theme';

const SearchRide = () => {
  const data = [
    { key: '1', value: 'Any', },
    { key: '2', value: 'Male' },
    { key: '3', value: 'Female (Pink)' },
  ]
  const dispath = useDispatch();
  const origin = useSelector(selectOrigin);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [date, setDate] = useState('09-10-2021');
  const [gender, setGender] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setDate(date)
    hideDatePicker();
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.searchCard}>
        <GooglePlacesAutocomplete
          placeholder='From'
          minLength={2}
          autoFocus={false}
          returnKeyType={'default'}
          fetchDetails={true}
          onPress={(data, details = null) => {
            console.log(details)
            dispath(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
            dispath(setDestination(null));
          }}
          minLenght={5}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en'
          }}
          nearbyPlacesApi="GooglePlacesSearch"
          debounce={400}
          styles={{
            container: {
              flex: 1,
              margin:10,

            },
            textInput: {
              backgroundColor: 'transparent',
              height: 60,
              borderRadius: 5,
              paddingVertical: 5,
              paddingHorizontal: 10,
              fontSize: 18,
              flex: 1,
              borderBottomWidth:0.2
            },
          }}
        />
        <GooglePlacesAutocomplete
          placeholder='Destination'
          fetchDetails={true}

          onPress={(data, details = null) => {
            console.log(details)
            dispath(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
            dispath(setDestination(null));
          }}
          minLenght={5}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en'
          }}
          nearbyPlacesApi="GooglePlacesSearch"
          debounce={400}
          styles={{
            container: {
              flex: 1,
              margin:5,
              marginTop:30,
            },
            textInput: {
              backgroundColor:'transparent',
              height: 60,
              borderRadius: 5,
              paddingVertical: 5,
              paddingHorizontal: 10,
              fontSize: 18,
              flex: 1,
              margin: 5,
              borderBottomWidth:0.2,
              marginTop:10,
            },
          
          }}
        />
        <View style={{flexDirection:'row'}}>
          <TextInput placeholder={'Select Date'} style={styles.travel} placeholderTextColor='black' onPressOut={showDatePicker} editable={false} value={date}></TextInput>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
              <Text style={{marginTop:90}}>Preference:</Text>
              <SelectList
                placeholder='Gender'
                setSelected={(val) => setGender(val)}
                data={data}
                save="value"
                label="Gender"
                search='false'
                searchPlaceholder='gender'
                searchicon={null}
                boxStyles={styles.selector}
                />
        </View>
        {/* <GooglePlacesAutocomplete

          placeholder="From"
          styles={styles.mapSearchTextHolder}
          // fetchDetails={true}

          // onPress={(data, details = null) => {
          //   console.log(details)
          //   dispath(
          //     setOrigin({
          //       location: details.geometry.location,
          //       description: data.description,
          //     })
          //   );
          //   dispath(setDestination(null));
          // }}
          minLenght={5}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en'
          }}
          nearbyPlacesApi="GooglePlacesSearch"
          debounce={400}
        /> */}
        {/* 
        <GooglePlacesAutocomplete
          placeholder="where to"
          styles={styles.mapSearchTextHolder}
          onPress={(data, details = null) => {
            console.log(details)
            dispath(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
              );
              dispath(setDestination(null));
          }}


          returnKeyType={"search"}
          enablePoweredByContainer={false}
          minLenght={2}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en'
          }}
          nearbyPlacesApi="GooglePlacesSearch"
          debounce={400}
        />
        <View style={{ flexDirection: 'row', alignItems:'center', justifyContent:'space-evenly' }}>
          <Text>
            Preference:
          </Text>
 
        </View> */}



        <MapView
        mapType="mutedStandard"
        style={styles.map}
        initialRegion={{
          latitude: origin.lat,
          longitude: origin.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>

        {origin?.lat && (
          <Marker
            coordinate={{
              latitude: origin.lat,
              longitude: origin.lng,
            }}
            title="Origin"
            description={origin.description}
            identifier='origin'
          />
        )}
      </MapView>
        <TouchableOpacity style={styles.btn}>
          <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>Search</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default SearchRide

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  map: {
    height: 400,
    borderRadius: 5,
    margin: 10,
    borderWidth:0.2,
    borderColor:primary,
  },
  searchCard: {
    
  },
  btn: {
    height: 50,
    width: 200,
    backgroundColor: primary,
    borderRadius: 25,
    borderColor: 'black',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  mapSearchTextHolder: {
    textInput: {
      fontSize: 20,
    },
    margin:5,
    container: {
      flex: 0,
    },
  },
  travel: {
    height: 60,
    padding:10,
    borderWidth: 0.5,
    marginTop: 60,
    margin:15,
    borderRadius:15, 
    marginTop:70
  },
  selector:{
    marginTop:75,
    marginLeft:10
  }
})