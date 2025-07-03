import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import Lstyles from '../stylesheets/Lstyles';

import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
    GoogleSignin.configure({
      webClientId: '529913098444-2djfttiajacee3dk2pkp0db3j2t4nrqu.apps.googleusercontent.com',
    });
  

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);
      const user = userCredential.user;
      console.log('Logged in as:', user.email);
      navigation.navigate('Home', { Useremail: user.email });
    } catch (error) {
      console.log('Login error:', error.code, error.message);
      Alert.alert('Login Failed', error.message);
    }
  };
 const onGoogleButtonPress = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    
    const signInResult = await GoogleSignin.signIn();

    let idToken = signInResult?.idToken || signInResult?.data?.idToken;
    if (!idToken) {
      throw new Error('No ID token found');
    }

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const userCredential = await auth().signInWithCredential(googleCredential);

    const user = userCredential.user;
    console.log('Signed in with Google:', user.email);

    
    navigation.navigate('Home', { Useremail: user.email });

  } catch (error) {
    console.log('Google Sign-In Error:', error);
    Alert.alert('Google Sign-In Failed', error.message);
  }
};


  return (
    <View style={Lstyles.container}>
      <View style={Lstyles.top}>
        <Image source={require('../assets/logo.png')} style={Lstyles.logo} />
      </View>

      <View style={Lstyles.bottom}>
        <Text style={Lstyles.heading}>Login with Email</Text>

        <TextInput
          style={Lstyles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={Lstyles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={Lstyles.button} onPress={handleLogin}>
          <Text style={Lstyles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={Lstyles.btnsigup} onPress={() => navigation.navigate('Signup')}>
          <Text>Don't have an account? <Text style={{ color: '#FF6F00', fontWeight: 'bold' }}>Sign Up</Text></Text>
        </TouchableOpacity>

        <Text style={Lstyles.orText}>OR</Text>

        <GoogleSigninButton
          style={{ width: '100%', height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
        />
      </View>
    </View>
  );
};

export default Login;
