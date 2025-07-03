import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

const OtpVerification = ({ route, navigation }) => {
  const { confirmation, phone } = route.params;
  const [code, setCode] = useState('');

  const confirmCode = async () => {
    try {
      await confirmation.confirm(code);
      Alert.alert('Success', 'OTP Verified!');
      navigation.replace('Home'); // You can change this to your actual home screen
    } catch (error) {
      Alert.alert('Invalid OTP', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.bottom}>
        <Text style={styles.heading}>Enter OTP</Text>
        <Text style={styles.subtext}>Sent to: {phone}</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter 6-digit OTP"
          keyboardType="number-pad"
          maxLength={6}
          value={code}
          onChangeText={setCode}
        />

        <TouchableOpacity style={styles.button} onPress={confirmCode}>
          <Text style={styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  top: { flex: 0.45, justifyContent: 'center', alignItems: 'center' },
  logo: { width: 180, height: 180, resizeMode: 'contain' },
  bottom: {
    flex: 0.55,
    backgroundColor: '#FFF',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 8,
  },
  heading: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtext: { textAlign: 'center', marginBottom: 20, color: '#888' },
  input: {
    borderWidth: 1,
    borderColor: '#FF6F00',
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF6F00',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});
