import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, TextInput, TouchableOpacity, View, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { primary } from '../theme/Theme';

const DriverRegistration = ({navigation}) => {
    const toBasic =()=>{navigation.navigate('Basic')}
    const toLicense =()=>{navigation.navigate('License')}
    const toCnic =()=>{navigation.navigate('Cnic')}
    const toDoc =()=>{navigation.navigate('Vehicle')}
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.scrollView}>

                <TouchableOpacity style={styles.btncard} onPress={toBasic}>
                    <Text style={styles.btntxt}>
                        Basic Info
                    </Text>
                    <Ionicons name='arrow-forward' size={20} color={primary}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btncard} onPress={toLicense}>
                    <Text style={styles.btntxt}>
                        Driver License
                    </Text>
                    <Ionicons name='arrow-forward' size={20} color={primary}></Ionicons>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btncard} onPress={toCnic}>
                    <Text style={styles.btntxt}>
                        CNIC
                    </Text>
                    <Ionicons name='arrow-forward' size={20} color={primary}></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btncard} onPress={toDoc}>
                    <Text style={styles.btntxt}>
                        Vehicle Info
                    </Text>
                    <Ionicons name='arrow-forward' size={20} color={primary}></Ionicons>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.btn}>
                <Text style={{color: 'white',fontWeight: '500',fontSize: 20}}>Submit</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default DriverRegistration

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',

    },
    scrollView: {

        margin: 10,
        borderRadius: 15
    },
    btn: {
        borderColor: 'blue',
        height: 60,
        width: 250,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginTop:30,
        borderWidth:1,
        backgroundColor:primary
    },
    btntxt: {
        fontSize: 18,
        
    },
    btncard: {
        height: 60,
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth:0.2,
        flexDirection:'row'
    }
})