import { Share, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './src/screens/Login';
import Dashboard from './src/screens/Dashboard';
import { Store } from './src/store/Store';
import Otp from './src/components/Otp';
import DriverRegistration from './src/Registration/DriverRegistration';
import Posts from './src/screens/Posts';
import License from './src/Registration/License';
import Cnic from './src/Registration/Cnic';
import Vehicle from './src/Registration/Vehicle';
import Home from './src/screens/Home';
import Rides from './src/screens/Rides';
import CreateRide from './src/screens/CreateRide';
import { getDoc, doc, } from "firebase/firestore";
import { authentication, db, } from './src/config/firebase';
import SearchRide from './src/components/SearchRide';
import Messages from './src/message/Messages';
import Chat from './src/message/Chat';
import PostedRides from './src/screens/PostedRides';
import Notifications from './src/screens/Notifications';
    // useEffect(() => {     
    // const id = authentication.currentUser.uid;

    //   getDoc(doc(db, "users", id))
    //     .then(documentSnapshot => {
    //       if (documentSnapshot.exists) {
    //         const userData = documentSnapshot.data()
    //         console.log(userData.name)
    //         // setName(userData.name)
    //         // setAge(userData.age)
    //         // setPhone(userData.phone)
    //         // setGender(userData.gender)
    //         // setEmail(userData.email)
    //         setIsFirstTime(false);
    //       }else{
    //         setIsFirstTime(true)
    //       }
    //     })
    //     }, []);

export default function App() {
  const Stack = createStackNavigator();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false)

  onAuthStateChanged(authentication, (user) => {
    if (user) {
      setIsSignedIn(true)

    } else {
      setIsSignedIn(false)

    }
  });
  
  return (

    <Provider store={Store}>
    <NavigationContainer>
      <SafeAreaProvider>
        {
          isSignedIn
            ?
            <Stack.Navigator>
              <Stack.Screen name='Dashboard' component={Dashboard} options={{ headerShown: false, headerLeftLabelVisible:true}}/>
              <Stack.Screen name='Home' component={Home} options={{ headerShown: false, headerLeftLabelVisible:false}} />
              <Stack.Screen name='Posts' component={Posts} options={{ headerShown: false,}} />
              <Stack.Screen name='Ride' component={Rides} options={{ headerShown: false,}} />
              <Stack.Screen name='Search' component={SearchRide} options={{headerLeftLabelVisible:false, headerBackAccessibilityLabel:false, headerStyle:({backgroundColor: 'transparent',})}} />
              <Stack.Screen name='Create' component={CreateRide} options={{ headerShown: false,}} />
              <Stack.Screen name='Registration' component={DriverRegistration} options={{ headerShown: true,}} />
              <Stack.Screen name='License' component={License} options={{ headerShown: false,}} />
              <Stack.Screen name='Cnic' component={Cnic} options={{ headerShown: false,}} />
              <Stack.Screen name='Vehicle' component={Vehicle} options={{ headerShown: false,}} />
              <Stack.Screen name='Message' component={Messages} options={{ headerShown: false,}} />
              <Stack.Screen name='Chat' component={Chat} options={{headerBackAccessibilityLabel:false,headerLeftLabelVisible:false,}} />
              <Stack.Screen name='Share' component={Share} options={{headerBackAccessibilityLabel:false,headerLeftLabelVisible:false,}} />
              <Stack.Screen name='Notifications' component={Notifications} options={{ headerShown: false,}} />
              <Stack.Screen name='Posted' component={PostedRides} options={{headerShown:false}} />
            </Stack.Navigator>

            :

            <Stack.Navigator>               
              <Stack.Screen name='Login' component={Login}  options={{headerShown:false}}  />
              <Stack.Screen name='Verify' component={Otp}  options={{headerShown:false}}  />
            </Stack.Navigator>
        }

      </SafeAreaProvider>
    </NavigationContainer>
  </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
