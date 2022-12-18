import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Rides from '../screens/Rides';
import Posts from '../screens/Posts';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { primary } from '../theme/Theme';
import { getDoc, doc, } from "firebase/firestore";
import { authentication, db, } from '../../src/config/firebase';
import Basic from '../components/Basic';
import { useNavigation } from '@react-navigation/native';



const Home = () => {
    const [isFirstTime, setIsFirstTime] = useState(true)
    const navigation = useNavigation();
    useEffect(() => {     

    const id = authentication.currentUser.uid;
      getDoc(doc(db, "users", id))
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            const userData = documentSnapshot.data()
            console.log(userData.name)
            // setName(userData.name)
            // setAge(userData.age)
            // setPhone(userData.phone)
            // setGender(userData.gender)
            // setEmail(userData.email)
            setIsFirstTime(false)
          }
        })
        }, []);


    return (
        <Screen/>
            

        // <Tab.Navigator screenOptions={{tabBarShowLabel:false, headerShown:false}}>
        
        //     <Tab.Screen name='Rides' component={Rides} options={{tabBarIcon: ()=>(
        //         <>
        //         <Ionicons name='body' color={primary} size={28}></Ionicons>
        //         <Text> Rides</Text>
        //         </>

        //     ),tabBarActiveBackgroundColor:'lightblue'
        //      }}/>
        //     <Tab.Screen name='Posts' component={Posts} options={{tabBarIcon: ()=>(
        //         <>
        //          <Ionicons name='car' color={primary} size={28}></Ionicons>
        //         <Text style={{fontSize:18}}>Posts</Text>
        //         </>
        //     ),tabBarActiveBackgroundColor:'lightblue' 
        //     }}/>


        // </Tab.Navigator>
    )
}


const Screen = ()=>{
    const listTab = [
        { status: 'Ride' },
        { status: 'Post' },
    ]
    const [status, setStatus] = useState('Ride')
    const setStatusFilter = status => {
        setStatus(status)
    }
    return(
    <SafeAreaView style={styles.container}>
            <View style={styles.listTab}>
                {listTab.map(e => (
                    <TouchableOpacity style={[styles.btnTab, status === e.status && styles.btnTabActive]} onPress={() => setStatusFilter(e.status)}>
                        <Text style={[styles.textTab, status === e.status && styles.textTabActive]}>{e.status}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View>
                {status==='Ride'
                ?
                <Rides></Rides>
                :
                <Posts></Posts>
                }
            </View>
        </SafeAreaView>
    )
}
export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        
    },
    listTab: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop:15
    },
    btnTab: {
        width: Dimensions.get('window').width / 3.5,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius:5,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    },
    textTab: {
        fontSize: 16,
        fontWeight:'500'
    },
    btnTabActive: {
        backgroundColor: primary
    },
    textTabActive: {
        color: 'white'
    }
})