import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity, Image, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { primary } from '../theme/Theme';
import firebaseConfig from '../config/firebase';
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha'
import { initializeApp, getApp } from 'firebase/app';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';




const Login = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber]= useState('');
    const [verificationId, setVerificationId] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const recaptchaVerifier = useRef(null);
    const app = getApp();
    const auth = getAuth(app)

  return (
    <SafeAreaView style={styles.container}>
        <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} containerStyle={styles.captcha} title='Are You Robot?'/>
            
        <View style={styles.card}>


            <Text style={styles.txt}>Login to book or offer a ride</Text>
   
            <View style={{flexDirection:'row', justifyContent:'center', paddingHorizontal:12, borderRadius:10, alignItems:'center'}}>
                <Text style={{flexDirection:'row', alignItems:'center', justifyContent:'center', fontSize:20, marginTop:10, fontWeight:'300',marginBottom:10}}> +92| </Text>
                <TextInput
                 placeholder='Your Phone Number' 
                 style={styles.input}
                 placeholderTextColor='#949494' 
                 keyboardType='decimal-pad'
                 returnKeyLabel='true' 
                 onChangeText={(text) => setPhoneNumber('+92'+text)}
                />
            </View>
            
        </View>
            
            <TouchableOpacity 
             style={styles.btn}
             onPress={
            async()=>{
                try
                {
                    const phoneProvider = new PhoneAuthProvider(auth);
                    const verificationId = await phoneProvider.verifyPhoneNumber(
                     phoneNumber,
                     recaptchaVerifier.current
                );
                setVerificationId(verificationId);
                console.log('Sent')
                navigation.navigate('Verify', {
                    paramKey: verificationId,
                    phone: phoneNumber,
                })
                }
                catch (error) 
                {
                    console.log(error);
                }
                 }
                }
                
             >
                <Text style={styles.btntext}>Continue</Text>
            </TouchableOpacity>
        </SafeAreaView>
  )
}

export default Login;


const styles = StyleSheet.create({
    card:{

        margin:10,
        borderRadius:15,
        padding:10
    },
    container: {
        flex: 1,
        alignContent:'center',
    },
    input: {
        marginLeft:5,
        flex:1,
        fontWeight:'400',
        marginTop:10,
        fontSize:19,
        borderBottomWidth:0.2,
        marginBottom:10
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
        fontSize: 20,
        fontWeight: '500',
    },
    txt:{
      fontWeight: '700',
      fontSize: 25, 
      margin: 10,
    },
    captcha:{
        margin:50,
    },
})