import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Hum Sawar</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>About</Text>
        <Text style={styles.text}>
          HumSawar is a platform that connects drivers with riders. With our
          easy-to-use app, you can quickly request a ride, and a nearby driver
          will be on their way to pick you up in minutes.
        </Text>
        <Text style={styles.text}>
          Our goal is to provide a safe, reliable, and affordable transportation
          solution for people all over the Country.
        </Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Contact Us</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    paddingVertical: 20,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#F9A602',
  },
  textContainer: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#F9A602',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AboutScreen;
