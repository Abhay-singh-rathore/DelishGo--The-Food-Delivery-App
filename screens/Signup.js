import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { login } from '../redux/AuthSlice';
import { getAuth, createUserWithEmailAndPassword } from '@react-native-firebase/auth';
import styles from '../stylesheets/Sistyles';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSignup = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    createUserWithEmailAndPassword(getAuth(), email, password)
      .then(userCredential => {
        dispatch(login({ email, password }));
        console.log('User created:', userCredential.user.email);
        navigation.navigate('Home', { Useremail: email });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Email In Use', 'That email address is already registered!');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('Invalid Email', 'Please enter a valid email address.');
        } else if (error.code === 'auth/weak-password') {
          Alert.alert('Weak Password', 'Password must be at least 6 characters long.');
        } else {
          Alert.alert('Signup Failed', error.message);
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>

      <View style={styles.bottom}>
        <Text style={styles.heading}>Create your DelishGo Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnsigup} onPress={() => navigation.navigate('Login')}>
          <Text>Already have an account? <Text style={{ color: '#FF6F00', fontWeight: 'bold' }}>Login</Text></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
