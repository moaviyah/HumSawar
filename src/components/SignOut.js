import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { authentication } from '../config/firebase'
import { signOut } from 'firebase/auth'

const SignOut = () => {
  
  signOut(authentication)
  .then(()=>{
    Alert.alert("Signed Out")
  })
  
}

export default SignOut

const styles = StyleSheet.create({})