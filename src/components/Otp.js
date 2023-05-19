import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { primary } from '../theme/Theme';
import firebaseConfig from '../config/firebase';
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha'
import { initializeApp, getApp } from 'firebase/app';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';

export default Otp = ({route, navigation}) => {
  const app = getApp();
  const auth = getAuth(app)
  const [code, setCode] = useState('');
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);
  const inputRef6 = useRef(null);
  const database = getDatabase();
//   const handleOtpChange = (value, index) => {
//     const otp = [...code];
//     otp[index] = value;
//     setCode(otp.join(''));
// }
const handleInput = (text, ref, index) => {
  if (text.length === 1 && ref.current) {
    ref.current.focus();
    const otp = [...code];
    otp[index] = text;
    setCode(otp.join(''));
  }
};
const fetchData = ()=>{
    
  onValue(ref (database, '/rides/') , querySnapShot => {
       let data = querySnapShot.val() || {};
       if (data){
        
     }else {
       setPostedRides([])
       setIsLoading(true)
     }
     });
 
 }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Otp Sent to Your number</Text>
      <View style={styles.otpContainer}>
        {/* {
        [0, 1, 2, 3,].map(
          (index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={code[index]}
            onChangeText={(value) => handleOtpChange(value, index)}
            onSubmitEditing={() => {}}
            blurOnSubmit={false}
          />
        )
        )
        } */}
        <TextInput
        ref={inputRef1}
        style={styles.otpInput}
        onChangeText={(text) => handleInput(text, inputRef2, 0)}
        maxLength={1}
        keyboardType='number-pad'
      />
        <TextInput
        ref={inputRef2}
        style={styles.otpInput}
        onChangeText={(text) => handleInput(text, inputRef3, 1)}
        maxLength={1}
        keyboardType='number-pad'
      />
              <TextInput
        ref={inputRef3}
        style={styles.otpInput}
        onChangeText={(text) => handleInput(text, inputRef4, 2)}
        maxLength={1}
        keyboardType='number-pad'
      />
              <TextInput
        ref={inputRef4}
        style={styles.otpInput}
        onChangeText={(text) => handleInput(text, inputRef5, 3)}
        maxLength={1}
        keyboardType='number-pad'
      />
              <TextInput
        ref={inputRef5}
        style={styles.otpInput}
        onChangeText={(text) => handleInput(text, inputRef6, 4)}
        maxLength={1}
        keyboardType='number-pad'
      />
              <TextInput
        ref={inputRef6}
        style={styles.otpInput}
        onChangeText={(text) => handleInput(text, inputRef6, 5)}
        maxLength={1}
        keyboardType='number-pad'
      />
      </View>

                 <TouchableOpacity 
             style={styles.btn}
             onPress={
              async () => {
                try {
                  const credential = PhoneAuthProvider.credential(route.params.paramKey, code);
                  
                  await signInWithCredential(auth, credential);
                  console.log('success')
                  console.log('success')
                }
                catch (err) {
                  console.log(err)
                }
              }
            }
            >
                
                <Text style={styles.btntext}>Confirm</Text>
            </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    marginTop:50
  },
  phoneNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  countryCode: {
    fontSize: 18,
    marginRight: 8,
  },
  phoneNumberInput: {
    flex: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 8,
  },
  sendOtpButton: {
    backgroundColor: '#0099ff',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  sendOtpButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 32,
  },
  otpInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    textAlign: 'center',
    width: '15%',
    height: 50,
    fontSize: 24,
  },
  btn:{
    width:250,
    backgroundColor: primary,
    alignSelf:'center',
    height: 50,
    borderRadius:10,
    marginTop:50,
    alignContent:'center', 
    justifyContent:'center',
    alignItems:'center'
  },
  btntext:{
    color:'white',
    fontWeight:'bold'
  }
}
)