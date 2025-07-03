import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import stylesplashscreen from '../stylesheets/stylesplashscreen';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setTimeout(() => {
        if (user) {
          navigation.replace('Home', { Useremail: user.email });
        } else {
          navigation.replace('Login');
        }
      }, 2000); // optional delay for logo animation
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={stylesplashscreen.container}>
      <Image source={require('../assets/logo.png')} style={stylesplashscreen.logo} />
      <Text style={stylesplashscreen.text}>Welcome to Foodvibe</Text>
    </View>
  );
};

export default SplashScreen;
