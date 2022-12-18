import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { primary } from '../theme/Theme';
import firebaseConfig from '../config/firebase';
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha'
import { initializeApp, getApp } from 'firebase/app';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

const Otp = ({route, navigation}) => {
    const [verificationCode, setVerificationCode] = useState('');
    const [isFirstTime, setIsFirstTime] = useState(false);
    const app = getApp();
    const auth = getAuth(app)
  return (
    <SafeAreaView>
        <View style={styles.card}>
        <Text style={styles.txt}>Enter Code Sent to your number</Text>
            <TextInput
                 placeholder='12345' 
                 style={styles.input} 
                 placeholderTextColor='#949494' 
                 returnKeyLabel='true' 
                 keyboardType='number-pad'
                 onChangeText={(text) => setVerificationCode(text)}
            />
            </View>
            <TouchableOpacity 
             style={styles.btn}
             onPress={async () => {
                try {
                  const credential = PhoneAuthProvider.credential(route.params.paramKey, verificationCode);

                  {isFirstTime 
                  ?
                  navigation.navigate('Basic')
                  :
                  await signInWithCredential(auth, credential);}
                  console.log('success')
                  console.log('success')
                } 
                catch (err) {
                  console.log(err)
                }
              }}
            >
                
                <Text style={styles.btntext}>Confirm</Text>
            </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Otp

const styles = StyleSheet.create({
    input: {
        height:50,
        fontWeight:'300',
        borderRadius:15,
        margin:10,
        borderBottomWidth:0.2,
        padding:10,
        fontSize:18,
    },
    btn: {
        marginTop: 10,
        backgroundColor: primary,
        alignSelf:'center',
        height: 60,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:15
    },
    btntext: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',

    },
    captcha:{
        flex:1,
        paddingHorizontal:50,
        backgroundColor:'red'
    },
    card:{
        margin:10,
        borderRadius:15,
        padding:10
    },
    txt:{
        fontWeight: '700',
        fontSize: 22, 
        margin: 10,
      },
})