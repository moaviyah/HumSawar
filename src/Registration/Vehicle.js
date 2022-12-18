import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Vehicle = ({navigation}) => {
    return (
    <><SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}> 
        <TouchableOpacity style={styles.btncard} >
            <Text style={styles.btntxt}>
                Type
            </Text>
            <Ionicons name='arrow-forward' size={20} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.btncard} >
                <Text style={styles.btntxt}>
                Number Plate
                </Text>
                <Ionicons name='arrow-forward' size={20}></Ionicons>
            </TouchableOpacity><TouchableOpacity style={styles.btncard} >
                <Text style={styles.btntxt}>
                    CNIC
                </Text>
                <Ionicons name='arrow-forward' size={20}></Ionicons>
            </TouchableOpacity><TouchableOpacity style={styles.btncard}>
                <Text style={styles.btntxt}>
                    Vehicle Info
                </Text>
                <Ionicons name='arrow-forward' size={20}></Ionicons>

            </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
            </>
    )
}

export default Vehicle

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',

    },
    scrollView: {
        backgroundColor: 'white',
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
        borderWidth:1
    },
    btntxt: {
        fontSize: 18
    },
    btncard: {
        height: 60,
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth:0.2,
        flexDirection:'row'
    }
})