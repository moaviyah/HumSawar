import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ScrollView, Button, TextInput, Modal, SafeAreaView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { authentication, db } from '../config/firebase';
import { getDoc, doc, query, onSnapshot, collection ,setDoc} from 'firebase/firestore'
import  FontAwesome  from 'react-native-vector-icons/FontAwesome'
import  Ionicons  from 'react-native-vector-icons/Ionicons'
import { primary } from '../theme/Theme';

const Profile = ({ navigation }) => {
    const [user, setUser] = useState([]);
    const [name, setName] = useState('Hum Sawar')
    const [email, setEmail] = useState('Humsawar@gmail.com')
    const [address, setAddress] = useState('Not Set') 
    const [cnic, setCnic] =useState('not set')
    const [show, setShow] =useState(false)
    useEffect(() => {     
        const id = authentication.currentUser.uid;
    
          getDoc(doc(db, "users", id))
            .then(documentSnapshot => {
              if (documentSnapshot.exists) {
                const userData = documentSnapshot.data()
                setName(userData.name)
                setEmail(userData.email)
              }else{
                console.log('No data') 
              }
            })
            }, []);


            const Data = {
                cnic: cnic, 
            };
        const updateData=async()=>{
            const id = authentication.currentUser.uid;
           await setDoc(doc(db, "users", id), Data)
             .then(() => {
                Alert.alert('Saved')
                navigation.goBack();
            }).catch((err)=>{
                console.log(err)
            })
    }


    return (
        <>
        <View style={styles.container}>

        <View style={styles.profile}>

            <Image source ={require('../pics/Saad-dp.png')} style={styles.profile_image}/>
            <Text style={styles.name_txt}> {name}</Text>
            <Text style={{color:primary}}>{email}</Text>
        
        </View>

        <View style ={styles.edit_profile}>
            <TouchableOpacity style={styles.cards} onPress={() => setShow(true)}>
                    <Ionicons style={styles.icon} name='mail' color={primary} size={25}></Ionicons>
                    <View style={{alignSelf:'center'}}>                 
                      <Text style={styles.txt}>Email</Text>
                      <Text>{email}</Text>
                    </View>
  
            </TouchableOpacity>

            <TouchableOpacity style={styles.cards}>
                    <Ionicons style={styles.icon} name='person' size={25}></Ionicons>
                    <View style={{alignSelf:'center'}}>                 
                      <Text style={styles.txt}>CNIC</Text>
                      <Text>35123-987654321031-5</Text>
                    </View> 
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.cards}>
                  <Ionicons style={styles.icon} name='home' size={25}></Ionicons>
                  <View style={{alignSelf:'center'}}>                 
                    <Text style={styles.txt}>Address</Text>
                    <Text>{address}</Text>
                  </View>
                  <FontAwesome name='edit' style={{alignSelf:'center', color:primary, position:'absolute', right:15}} size={25} ></FontAwesome>  
          </TouchableOpacity> */}

            <TouchableOpacity style={styles.cards} onPress={()=>navigation.navigate('Registration')}>
                    <Ionicons style={styles.icon} name='document-outline' size={25}></Ionicons>
                    <View style={{alignSelf:'center'}}>                 
                      <Text style={styles.txt}>Vehicle</Text>
                      <Text>
                        Complete Registration
                      </Text>
                    </View>
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btn} onPress={()=>updateData}>
                <Text style={{fontSize:20, fontWeight:'500', color:'white'}}>
                    Save
                </Text>
            </TouchableOpacity>
        </View>
        
        
        </>
    );
}


export default Profile

const styles = StyleSheet.create({
    btn:{
        alignSelf:'center',
        backgroundColor:primary,
        height:60,
        width:250,
        alignItems:'center', 
        justifyContent:'center', 
        marginTop:10, 
        borderRadius:35,
    },
    container:{
        flex:1
    },
    profile:{
        borderRadius:25,
        margin:10,
        justifyContent:'flex-start',
        alignItems:'center',
        padding:10
    },
    edit_profile:{
        backgroundColor:'white',
        borderRadius:15,
        margin:10,
    },
    profile_image:{
        height: 110,
        width: 110,
        borderRadius: 60,
        backgroundColor: '#8200d6',
        margin: 10,
        borderColor:'blue',
        borderWidth:2
    },
    name_txt:{
        fontWeight:'500',
        alignSelf:'center',
        fontSize:23,
    },
    edit_icon:{
        fontSize:23,
        paddingLeft:45
    },
    cards:{
        flexDirection:'row',
        height:60,
        backgroundColor:'white',
        margin:10,
        justifyContent:'flex-start',
        borderBottomWidth:0.5
    },
    icon:{
        padding:10,
        color:primary, 
        alignSelf:'center'
    },
    txt:{
        fontWeight:'500',
        fontSize:20,
    },
    btntxt: {
        fontSize: 18
    },

})
