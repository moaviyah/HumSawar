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
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.txt}> Saad Shafqat</Text>
                    <FontAwesome name='car' size={18} color='white' style={{ paddingLeft: 15 }} />
                </View>
                <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <TouchableOpacity style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name='share-social-outline' size={28} color={primary}></Ionicons>
                        <Text style={{paddingVertical:5, fontSize: 17}}>Tell a Friend</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity  onPress={SignOut} style={{paddingVertical:15}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name='exit-outline' size={28} color={primary}/>
                        <Text style={{ paddingVertical:5, fontSize: 17 }}>
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
        height: 80,
        width: 80,
        borderRadius: 40,
        marginBottom: 10,
        backgroundColor: 'light-blue',
        margin: 10
    },
    txt: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 15
    }
})