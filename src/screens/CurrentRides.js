import { StyleSheet, Text, View, Dimensions, SafeAreaView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { getDatabase, ref, onValue, off, query, orderByChild, equalTo } from 'firebase/database';
import { authentication } from '../config/firebase';
import { useRoute } from '@react-navigation/native';
import { primary } from '../theme/Theme';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CurrentRides = () => {
    const [currentRides, setCurrentRides] = useState();
    const userId = authentication.currentUser.uid;
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const database = getDatabase();
        const ridesRef = ref(database, 'currentRide');
        // const filteredRidesQuery = query(ridesRef, orderByChild('passengerUid'), equalTo(`${userId}`) );

        const onRidesValue = onValue(ridesRef, (snapshot) => {
          const ridesData = snapshot.val();
           
          if (ridesData) {
            const filteredRides = Object.values(ridesData).filter((ride)=>ride.driverUid !== userId || ride.passengerUid !== userId)
            console.log(ridesData)
            console.log(userId)
            setCurrentRides(filteredRides);
            console.log(currentRides)
            setIsLoading(false);
            console.log('success')
          } else {
            setCurrentRides([]);
            setIsLoading(true);
            console.log('error')
          }
        });
    
        return () => {
          off(ridesRef, onRidesValue);
        };
      }, []);
  return (
      <View>
        {
        isLoading? 
        (
            <Text>Loading...</Text>
        )
        :
        (
            <View style={styles.container}>
                <Text style={styles.heading}>Current Rides</Text>
              {currentRides.map((ride) => (
                  <View>
                      <View style={styles.ridesTab}>
                          <Text>{ride}</Text>
                      </View>
                  </View>
              ))}


              <Text></Text>

          </View>
        )
    }
          
      </View>
  )
}

export default CurrentRides

const styles = StyleSheet.create({
    container:{

    },
    ridesTab:{
        backgroundColor:primary,
        height:windowHeight*0.1,
        marginVertical:windowHeight*0.05,
        width:windowWidth*0.9,
        alignSelf:'center',
        borderRadius:10
    },
    heading:{
        fontSize:22,
        marginTop:windowHeight*0.1,
        marginHorizontal:windowWidth*0.05,
        fontWeight:'500'
    }
})