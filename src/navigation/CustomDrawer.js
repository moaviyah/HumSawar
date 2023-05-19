import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Modal, TextInput, Linking } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SignOut from '../components/SignOut'
import { primary } from '../theme/Theme'
import { useNavigation } from '@react-navigation/native'


const CustomDrawer = (props, { visible, onClose }) => {

    const [message, setMessage] = useState('');

    const handleCopyLink = () => {
        const link = 'https://yourappstorelink';
        setMessage(link);
    };

    const handleWhatsApp = () => {
        Linking.openURL(
            `whatsapp://send?text=${encodeURIComponent(
                `Check out this cool app: https://yourappstorelink`
            )}`
        );
    };

    const handleInstagram = () => {
        Linking.openURL(
            `instagram://direct_message?text=${encodeURIComponent(
                `Check out this cool app: https://yourappstorelink`
            )}`
        );
    };

    const handleMessenger = () => {
        Linking.openURL(
            `fb-messenger://share/?link=${encodeURIComponent(
                'https://yourappstorelink'
            )}`
        );
    };

    const [modalVisible, setModalVisible] = useState(false);

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{  }} >

                <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <TouchableOpacity style={{ paddingVertical: 15 }} onPress = {handleOpenModal}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name='share-social-outline' size={25} color={primary}></Ionicons>
                        <Text style={{ paddingVertical: 5, fontSize: 17, marginLeft: 20 }}>Tell a Friend</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress = {SignOut} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Ionicons name='exit-outline' size={25} color={primary} />
                        <Text style={{ paddingVertical: 5, fontSize: 17, marginLeft: 20 }}>
                            Sign Out
                        </Text>
                    </View>
                </TouchableOpacity>
                <Modal visible={modalVisible} animationType="fade" transparent={true}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            
                            <View style={styles.shareButtons}>
                                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', padding:10}}>
                            <Text style={styles.shareText}>Share Your App</Text>
                                <TouchableOpacity style={styles.shareButton} onPress={handleCopyLink}>
                                    <Icon name="copy" style={styles.icon} size={25} />
                                </TouchableOpacity>
                                </View>
                                <View style={{flexDirection:'row', justifyContent:'center', alignContent:'center'}}>
                                <TouchableOpacity style={styles.shareButton} onPress={handleWhatsApp}>
                                    <Icon name="whatsapp" style={styles.icon} size={25} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.shareButton} onPress={handleInstagram}>
                                    <Icon name="instagram" style={styles.icon} size={25}/>
                                    
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.shareButton} onPress={handleMessenger}>
                                    <MaterialCommunityIcons name="facebook-messenger" style={styles.icon} size={25} />
                                </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{alignContent:'center', justifyContent:'center'}}>
                            <TouchableOpacity style={styles.cancelButton} onPress={handleCloseModal}>
                                <Text style={styles.cancelButtonText}>Close</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
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
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: 'white'
    },
    txt: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 15,
        alignSelf: 'center'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        height: 300,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    closeIcon: {
        width: 20,
        height: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    input: {
        height: 40,
    },
    button: {
        backgroundColor: '#37474F',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    share: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
    },
    shareText: {
        marginRight: 10,
        fontSize: 16,
    },
    shareIcon: {
        width: 30,
        height: 30,
        marginHorizontal: 10,
    },
    icon:{
        marginLeft:30,
        marginTop: 10
    },
    cancelButton:{
        height:50,
        width:150,
        backgroundColor:primary,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        marginTop:20,
        position:'relative',
        alignSelf:'center'
    },
    cancelButtonText:{
        fontWeight: '500',
    }
})