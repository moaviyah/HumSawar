import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Modal,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default Share = ({ visible, onClose }) => {
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

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Share Your App</Text>
          <View style={styles.shareButtons}>
            <TouchableOpacity style={styles.shareButton} onPress={handleCopyLink}>
              <Icon name="copy" style={styles.icon} />
              <Text style={styles.buttonText}>Copy Link</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton} onPress={handleWhatsApp}>
              <Icon name="whatsapp" style={styles.icon} />
              <Text style={styles.buttonText}>WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton} onPress={handleInstagram}>
              <Icon name="instagram" style={styles.icon} />
              <Text style={styles.buttonText}>Instagram</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton} onPress={handleMessenger}>
              <Icon name="facebook-messenger" style={styles.icon} />
              <Text style={styles.buttonText}>Messenger</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.modalText}>Or enter recipient email address:</Text>
          <TextInput
            style={styles.emailInput}
            placeholder="Email Address"
            placeholderTextColor="#C2C2C2"
            onChangeText={(text) => setMessage(text)}
            value={message}
          />
          <TouchableOpacity style={styles.sendButton} onPress={onClose}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
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
    color: '#FFFFFF',
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
});

