import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import FontAwesome from'react-native-vector-icons/FontAwesome'
import { primary } from '../theme/Theme'

const Header = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FontAwesome name='bars' color={primary} size={20} style={styles.icon}/>
    </SafeAreaView>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        padding:50,
        marginLeft:20
    },
    icon:{
    }
})