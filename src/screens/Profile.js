// import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ScrollView, Button, TextInput, Modal, SafeAreaView, Alert } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import { authentication, db } from '../config/firebase';
// import { getDoc, doc, query, onSnapshot, collection ,setDoc} from 'firebase/firestore'
// import  FontAwesome  from 'react-native-vector-icons/FontAwesome'
// import  Ionicons  from 'react-native-vector-icons/Ionicons'
// import { primary } from '../theme/Theme';

// const Profile = ({ navigation }) => {
//     const [user, setUser] = useState([]);
//     const [name, setName] = useState('Hum Sawar')
//     const [email, setEmail] = useState('Humsawar@gmail.com')
//     const [address, setAddress] = useState('Not Set') 
//     const [cnic, setCnic] =useState('not set')
//     const [show, setShow] =useState(false)
//     useEffect(() => {     
//         const id = authentication.currentUser.uid;
    
//           getDoc(doc(db, "users", id))
//             .then(documentSnapshot => {
//               if (documentSnapshot.exists) {
//                 const userData = documentSnapshot.data()
//                 setName(userData.name)
//                 setEmail(userData.email)
//                 setCnic(userData.cnic)
//               }else{
//                 console.log('No data') 
//               }
//             })
//             }, []);


//             const Data = {
//                 cnic: cnic, 
//             };
//         const updateData=async()=>{
//             const id = authentication.currentUser.uid;
//            await setDoc(doc(db, "users", id), Data)
//              .then(() => {
//                 Alert.alert('Saved')
//                 navigation.goBack();
//             }).catch((err)=>{
//                 console.log(err)
//             })
//     }


//     return (
//         <>
//         <View style={styles.container}>

//         <View style={styles.profile}>

//             <Image source ={require('../pics/Saad-dp.png')} style={styles.profile_image}/>
//             <Text style={styles.name_txt}> {name}</Text>
//             <Text style={{color:primary}}>{email}</Text>
        
//         </View>

//         <View style ={styles.edit_profile}>
//             <TouchableOpacity style={styles.cards} onPress={() => setShow(true)}>
//                     <Ionicons style={styles.icon} name='mail' color={primary} size={25}></Ionicons>
//                     <View style={{alignSelf:'center'}}>                 
//                       <Text style={styles.txt}>Email</Text>
//                       <Text>{email}</Text>
//                     </View>
  
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.cards}>
//                     <Ionicons style={styles.icon} name='person' size={25}></Ionicons>
//                     <View style={{alignSelf:'center'}}>                 
//                       <Text style={styles.txt}>CNIC</Text>
//                       <Text>{cnic}</Text>
//                     </View> 
//             </TouchableOpacity>
//             {/* <TouchableOpacity style={styles.cards}>
//                   <Ionicons style={styles.icon} name='home' size={25}></Ionicons>
//                   <View style={{alignSelf:'center'}}>                 
//                     <Text style={styles.txt}>Address</Text>
//                     <Text>{address}</Text>
//                   </View>
//                   <FontAwesome name='edit' style={{alignSelf:'center', color:primary, position:'absolute', right:15}} size={25} ></FontAwesome>  
//           </TouchableOpacity> */}

//             <TouchableOpacity style={styles.cards} onPress={()=>navigation.navigate('Registration')}>
//                     <Ionicons style={styles.icon} name='document-outline' size={25}></Ionicons>
//                     <View style={{alignSelf:'center'}}>                 
//                       <Text style={styles.txt}>Vehicle</Text>
//                       <Text>
//                         Complete Registration
//                       </Text>
//                     </View>
//             </TouchableOpacity>
//         </View>

//         </View>
        
        
//         </>
//     );
// }


// export default Profile

// const styles = StyleSheet.create({
//     btn:{
//         alignSelf:'center',
//         backgroundColor:primary,
//         height:60,
//         width:250,
//         alignItems:'center', 
//         justifyContent:'center', 
//         marginTop:10, 
//         borderRadius:35,
//     },
//     container:{
//         flex:1
//     },
//     profile:{
//         borderRadius:25,
//         margin:10,
//         justifyContent:'flex-start',
//         alignItems:'center',
//         padding:10
//     },
//     edit_profile:{
//         backgroundColor:'white',
//         borderRadius:15,
//         margin:10,
//     },
//     profile_image:{
//         height: 110,
//         width: 110,
//         borderRadius: 60,
//         backgroundColor: '#8200d6',
//         margin: 10,
//         borderColor:'blue',
//         borderWidth:2
//     },
//     name_txt:{
//         fontWeight:'500',
//         alignSelf:'center',
//         fontSize:23,
//     },
//     edit_icon:{
//         fontSize:23,
//         paddingLeft:45
//     },
//     cards:{
//         flexDirection:'row',
//         height:60,
//         backgroundColor:'white',
//         margin:10,
//         justifyContent:'flex-start',
//         borderBottomWidth:0.5
//     },
//     icon:{
//         padding:10,
//         color:primary, 
//         alignSelf:'center'
//     },
//     txt:{
//         fontWeight:'500',
//         fontSize:20,
//     },
//     btntxt: {
//         fontSize: 18
//     },

// })import React from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Pressable, Modal} from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Profile = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleVehicleInfoPress = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../pics/Saad-dp.png')} style={styles.profileImage} />
        <Text style={styles.name}>John Doe</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <TextInput style={styles.input} defaultValue="John Doe" />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <TextInput style={styles.input} defaultValue="johndoe@gmail.com" />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone:</Text>
            <TextInput style={styles.input} defaultValue="123-456-7890" />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>CNIC:</Text>
            <TextInput style={styles.input} defaultValue="12345-1234567-1" />
          </View>
          <Pressable onPress={handleVehicleInfoPress} style={styles.vehicleInfoButton}>
        <Text style={styles.vehicleInfoButtonText}>Vehicle Information</Text>
        <Icon name="chevron-right" size={25} color="#A2A2A2" />
      </Pressable>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>Vehicle Information</Text>
            <Pressable onPress={handleModalClose}>
              <Icon name="close" size={30} color="#A2A2A2" />
            </Pressable>
          </View>
          <View style={styles.modalContent}>
            <View style={styles.vehicleInfoRow}>
              <Text style={styles.vehicleInfoLabel}>Number Plate:</Text>
              <Text style={styles.vehicleInfoValue}>ABC-123</Text>
            </View>
            <View style={styles.vehicleInfoRow}>
              <Text style={styles.vehicleInfoLabel}>License:</Text>
              <Text style={styles.vehicleInfoValue}>1234567</Text>
            </View>
            <View style={styles.vehicleInfoRow}>
              <Text style={styles.vehicleInfoLabel}>Registration:</Text>
              <Text style={styles.vehicleInfoValue}>2021</Text>
            </View>
          </View>
        </View>
      </Modal>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555',
  },
  body: {
    flex: 1,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding:5
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: '#888',
  },
  input: {
    flex: 2,
    fontSize: 16,
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
    vehicleInfoButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 20,
      shadowColor: '#000000',
      shadowOpacity: 0.1,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#FFF',
      width: '100%',
      padding: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    modalHeaderText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    handleModalClose: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    modalContent: {
      backgroundColor: '#FFF',
      padding: 20,
      width: '100%',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    vehicleInfoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    vehicleInfoLabel: {
      flex: 1,
      fontWeight: 'bold',
    },
    vehicleInfoValue: {
      flex: 2,
    },
  });

  export default Profile