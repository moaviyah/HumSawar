import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SignOut from '../components/SignOut'
import { primary } from '../theme/Theme'

const CustomDrawer = (props) => {
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: primary }} >
                <ImageBackground >
                    <Image source={require('../pics/Saad-dp.png')} style={styles.image_bg} />
                </ImageBackground>
                    <Text style={styles.txt}> Saad Shafqat</Text>

                <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <TouchableOpacity style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name='share-social-outline' size={25} color={primary}></Ionicons>
                        <Text style={{paddingVertical:5, fontSize: 17, marginLeft:20}}>Tell a Friend</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity  onPress={SignOut} style={{paddingVertical:15}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Ionicons name='exit-outline' size={25} color={primary}/>
                        <Text style={{ paddingVertical:5, fontSize: 17, marginLeft:20 }}>
                            Sign Out
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    image_bg: {
        height: 90,
        width: 90,
        borderRadius: 50,
        marginBottom: 10,
        backgroundColor: 'light-blue',
        margin: 10,
        alignSelf:'center',
        borderWidth:2,
        borderColor:'white'
    },
    txt: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 15,
        alignSelf:'center'
    }
})