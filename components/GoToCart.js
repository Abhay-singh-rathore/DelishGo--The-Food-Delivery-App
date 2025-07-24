import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import imageMap from '../assets/imageMap';

const GoToCart = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.cartButton}
      onPress={() => navigation.navigate('Cart')}
    >
      <Image
        source={imageMap.cartIcon}
        style={styles.cartIcon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cartButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#FF6F00',
    padding: 12,
    borderRadius: 30,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  cartIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
});

export default GoToCart;
