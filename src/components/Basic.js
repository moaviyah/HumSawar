import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { authentication, db , storage} from '../config/firebase';
import DropDownPicker from 'react-native-dropdown-picker';
import { sendPasswordResetEmail } from 'firebase/auth';
import { primary } from '../theme/Theme';
import * as ImagePicker from 'expo-image-picker';
import { uploadBytes } from "firebase/storage";
// import { set, push, ref } from 'firebase/database';



const Basic = ({ navigation }) => {

    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('male')
    const [image, setImage] = useState(null);

    // useEffect(() => {
    //     const uploadImage =async()=>{
    //         const blobImage = await new Promise((resolve, reject)=>{
    //             const xhr = new XMLHttpRequest();
    //             xhr.onload =function(){
    //                 resolve(xhr.response);
    //             };
    //             xhr.onerror = function(){
    //                 reject(new TypeError('Network request failed'));
    //             };
    //             xhr.responseType = "blob";
    //             xhr.open("GET", image, true);
    //             xhr.send(null);
    //         });
    //     }

    //     uploadBytes(storageRef, File).then((snapshot) => {
    //         console.log('Uploaded a blob or file!');
    //       });

    //     const metadata = {
    //         contentType: 'image/jpeg',
    //       };

    //       const storageRef = ref(storage, 'Profileimage/' + Date.now());
    //       const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);
          
    //       uploadTask.on('state_changed',
    //         (snapshot) => {

    //           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //           console.log('Upload is ' + progress + '% done');
    //           switch (snapshot.state) {
    //             case 'paused':
    //               console.log('Upload is paused');
    //               break;
    //             case 'running':
    //               console.log('Upload is running');
    //               break;
    //           }
    //         }, 
    //         (error) => {

    //           switch (error.code) {
    //             case 'storage/unauthorized':

    //               break;
    //             case 'storage/canceled':

    //               break;
          
    //             // ...
          
    //             case 'storage/unknown':
    //               break;
    //           }
    //         }, 
    //         () => {
    //           // Upload completed successfully, now we can get the download URL
    //           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //             console.log('File available at', downloadURL);
    //           });
    //         }
    //       );  

    //     if(image!=null)
    //     {
    //         uploadImage();
    //         setImage(null)
    //     }
    // }, [image])


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          const ref = ref(storage, 'profile_image', "uid")
        }
      };
    
    const Data = {
        name: fullName,
        gender: gender,
        age: age,
        email: email,
    };
    const data = [
        { key: '1', value: 'Female', },
        { key: '2', value: 'Male' },
    ]

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [type, setType] = useState([
        { label: 'Female', value: 'female' },
        { label: 'Male', value: 'male' }

    ]);

    // const sendData=()=>{
    //     push(ref(db, 'users' + 'uid'),
    //     {
    //         name: fullName,
    //         age: age,
    //         gender: gender,
    //         mail:email,
    //     })
    //     .then((err)=>{
    //         console.log('success')
    //     }).catch((err)=>{
    //         console.log(err)
    //     })
    // };

    function sendData() {
        const id = authentication.currentUser.uid;
        setDoc(doc(db, "users", id), Data)
            .then(() => {
                navigation.navigate("Dashboard")
            }).catch((err)=>{
                console.log(err)
            })
    }


    // function SendData(){
    //     const id = authentication.currentUser.uid
    //     const collectionRef = doc(db, "users", id);
    //     const payload = {
    //         name: fullName,
    //         age:age,
    //         phone:phone,
    //         email:email,
    //         gender:gender,
    //         };
    //      setDoc(collectionRef,payload);
    //      navigation.navigate("HomeScreen");
    //  }

    // const SendData = () => {
    //     const id = authentication.currentUser.uid;
    //     setDoc(doc(db, "users", id), {
    //         name: fullName,
    //         age:age,
    //         phone:phone,
    //         email:email,
    //         gender:gender,
    //       })
    //       .then(()=>navigation.navigate('HomeScreen'))
    //       console.log("Document written with ID: ", id);

    // }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ margin: 10, borderRadius: 5, padding: 10 }}>
                <Image
                    style={styles.img}
                    source={require("../pics/ProfileImage.webp")} />
                <TouchableOpacity style={styles.imgbtn}  onPress={pickImage}>
                    <Text style={{ color: primary }}>
                        Add a Photo *
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.scrollView}>
                <TextInput style={styles.input} value={fullName} onChangeText={text => setFullName(text)} placeholder={'Full Name'} placeholderTextColor={'grey'} />
                <DropDownPicker
                    placeholder='Gender'
                    open={open}
                    value={value}
                    items={type}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setType}
                    style={{ borderWidth: 0, backgroundColor: 'transparent', borderBottomWidth: 0.2, marginBottom: 10, width: 350, alignSelf: 'center', height: 50 }}
                    textStyle={{ color: 'black', }}
                    labelStyle={{ color: 'black', alignSelf: 'center', paddingLeft: 0 }}
                    placeholderStyle={{color:'grey'}}
                    arrowIconStyle={{ margin: 5 , shadowColor:'grey'
                }}
                />
                <TextInput style={styles.input} value={age} onChangeText={text => setAge(text)} placeholder='Age' placeholderTextColor={'grey'} />
                <TextInput style={styles.input} value={email} onChangeText={text => setEmail(text)} placeholder='Email' placeholderTextColor={'grey'} />

            </View>

            <TouchableOpacity onPress={sendData} style={styles.btn}>
                <Text style={styles.btntxt}>Submit</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',

    },
    img: {
        height: 90,
        width: 90,
        borderRadius: 50,
        alignSelf: 'center',
        margin: 10,
        borderWidth: 1,
        borderColor: primary
    },
    imgbtn: {
        borderColor: primary,
        height: 40,
        width: 200,
        borderWidth: 0.5,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
    },
    scrollView: {
        margin: 10,
        borderRadius: 15
    },
    input: {
        margin: 10,
        borderRadius: 10,
        borderBottomWidth: 0.2,
        padding: 10
    },
    btn: {
        backgroundColor: primary,
        height: 60,
        width: 250,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginTop: 20
    },
    btntxt: {
        color: 'white',
        fontWeight: '500',
        fontSize: 20
    },

});

export default Basic;