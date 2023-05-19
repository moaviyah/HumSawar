import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Rides from '../screens/Rides';
import Posts from '../screens/Posts';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { primary } from '../theme/Theme';
import * as ImagePicker from 'expo-image-picker';
import { getDoc, doc, } from "firebase/firestore";
import { authentication, db, } from '../../src/config/firebase';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
import { getDatabase, ref, set, push, onValue,  } from 'firebase/database';
import { updateProfile } from 'firebase/auth';

const Home = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [cnic, setCnic] = useState('');
  const [gmail, setGmail] = useState('');
  const date = new Date()
  const database = getDatabase();
  const id = authentication.currentUser.uid
  const user = authentication.currentUser
  const ridesRef = ref(database, `users/${id}`);
  
  useEffect(() => {

    const authRef = ref(database, `users/${id}`);
    onValue(authRef, (snapshot) => {
      const auth = snapshot.val();
      console.log(auth)
      if (snapshot.val == null || auth == null) {
        setIsModalVisible(true);
      }
      else if (snapshot) {
        setIsModalVisible(false)
      }
    });

  }, []);

  function sendData() {
    if (fullName == ' ') {
      Alert.alert('Full Name is Required')
    }
    else if (gender == ' ') {

      Alert.alert('Gender is Required')
    }
    else if (age == ' ') {

      Alert.alert('Age is Required')
    }
    else if (cnic == ' ') {

      Alert.alert('Cnic is Required')
    }
    else if (gmail == ' '){
      Alert.alert('Gmail is Required')
    }
    else {
      console.log(fullName, age, gender)
      console.log(date.getMonth())
      set(ridesRef, {
        name: fullName,
        gender: gender,
        age: age,
        cnic: cnic,
        email: gmail,
        userId: id,
        status: 'Not Approved',
        month: date.getMonth() + 1 
      }); 

      console.log(`New user created.`);
      
updateProfile(user, {
  displayName: fullName,
  gender: gender
}).then(() => {
  console.log('Profile updated successfully!');
}).catch((error) => {
  console.log(error);
});
      setIsModalVisible(false)
    }
    // const id = authentication.currentUser.uid;

    // addDoc(collection(db, "trips" ), Data)
    //     .then(() => {
    //       Alert.alert('Trip Published')
    //         navigation.navigate("Dashboard")
    //     }).catch(error => {
    //       console.error('Error adding document: ', error);
    //     });
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {

    }
  };


  const listTab = [
    { status: 'Ride', id: 1 },
    { status: 'Post', id: 2 },
  ]
  const [status, setStatus] = useState('Ride')
  const setStatusFilter = status => {
    setStatus(status)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              style={styles.img}
              source={require("../pics/ProfileImage.webp")} />
            <TouchableOpacity style={styles.imgbtn} onPress={pickImage}>
              <Text style={{ color: primary }}>
                Add a Photo *
              </Text>
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <AntDesign name="user" size={24} color="black" />
              <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor={'grey'} onChangeText={(text) => { setFullName(text) }} />
            </View>
            <View style={styles.inputContainer}>
              <FontAwesome name="venus-mars" size={24} color="black" style={styles.inputIcon} />
              <TextInput style={styles.input} placeholder="Gender" placeholderTextColor={'grey'} onChangeText={(text) => { setGender(text) }} />
            </View>
            <View style={styles.inputContainer}>
              <FontAwesome name="birthday-cake" size={24} color="black" style={styles.inputIcon} />
              <TextInput style={styles.input} placeholder="Age" placeholderTextColor={'grey'} onChangeText={(text) => { setAge(text) }} />
            </View>
            <View style={styles.inputContainer}>
              <FontAwesome name="id-card" size={24} color="black" />
              <TextInput style={styles.input} placeholder="CNIC" placeholderTextColor={'grey'} onChangeText={(text) => { setCnic(text) }} />
            </View>
            <View style={styles.inputContainer}>
              <AntDesign name="mail" size={24} color="black" />
              <TextInput style={styles.input} placeholder="Email" placeholderTextColor={'grey'} onChangeText={(text) => { setGmail(text) }} />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => { sendData() }}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={{
       
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        
        
      }}>
        
        <View style={styles.listTab} >
          
          {listTab.map(e => (
            <TouchableOpacity style={[styles.btnTab, status === e.status && styles.btnTabActive]} onPress={() => setStatusFilter(e.status)} key={e.id}>
              <Text style={[styles.textTab, status === e.status && styles.textTabActive]}>{e.status}</Text>
            </TouchableOpacity>
          ))}
        </View>
        

      </View>
      <View>
        {status === 'Ride'
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
    paddingVertical:15,
  },
  listTab: {
    flex:1,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent:'center',
    marginTop: 20
  },
  btnTab: {
    width: Dimensions.get('window').width / 3.5,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  textTab: {
    fontSize: 16,
    fontWeight: '500'
  },
  btnTabActive: {
    backgroundColor: primary
  },
  textTabActive: {
    color: 'white'
  },
  modalContainer: {
    flex: 1,
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
    width: 350,
    height: 60,
    justifyContent: 'center',
    margin: 20,

  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  button: {
    backgroundColor: primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  img: {
    height: 90,
    width: 90,
    borderRadius: 50,
    alignSelf: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: primary
  },
  imgbtn: {
    borderColor: primary,
    height: 40,
    width: 200,
    borderWidth: 0.5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginBottom: 25
  },
})