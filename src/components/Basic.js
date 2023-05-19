import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';

const Basic = ({  onClose }) => {
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [cnic, setCnic] = useState('');
  const [gmail, setGmail] = useState('');
const [visible, setVisible]=useState(false)
  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity
          onPress={onClose}
          style={styles.closeButton}
        >
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={24} color="black" style={styles.inputIcon} />
          <TextInput
            placeholder="Full Name"
            onChangeText={setFullName}
            value={fullName}
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome name="venus-mars" size={24} color="black" style={styles.inputIcon} />
          <TextInput
            placeholder="Gender"
            onChangeText={setGender}
            value={gender}
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome name="birthday-cake" size={24} color="black" style={styles.inputIcon} />
          <TextInput
            placeholder="Age"
            onChangeText={setAge}
            value={age}
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputContainer}>
          <Entypo name="id-card" size={24} color="black" style={styles.inputIcon} />
          <TextInput
            placeholder="CNIC"
            onChangeText={setCnic}
            value={cnic}
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome name="envelope" size={24} color="black" style={styles.inputIcon} />
          <TextInput
            placeholder="Gmail (optional)"
            onChangeText={setGmail}
            value={gmail}
            style={styles.textInput}
          />
        </View>
        <TouchableOpacity
          onPress={onClose}
          style={styles.submitButton}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default Basic();

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#008CBA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  submit:{

  }
})
