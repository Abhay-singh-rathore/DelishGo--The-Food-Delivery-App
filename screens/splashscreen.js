import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import stylesplashscreen from '../stylesheets/stylesplashscreen';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Navigate after 5 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup
  }, [navigation]);

  return (
    <View style={stylesplashscreen.container}>
      <Image source={require('../assets/logo.png')} style={stylesplashscreen.logo} />
      <Text style={stylesplashscreen.text}>Welcome to Foodvibe</Text>
    </View>
  );
};

export default SplashScreen;
