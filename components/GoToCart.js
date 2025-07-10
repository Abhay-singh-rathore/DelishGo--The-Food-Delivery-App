
import React from 'react';
import { TouchableOpacity, Text, StyleSheet ,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import imageMap from '../assets/imageMap';


const GoToCart = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Cart')}
    >
      <Image source={imageMap.cartIcon} style={styles.cartIcon} />
    </TouchableOpacity>
  );
};

export default GoToCart;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF6F00',
    paddingVertical: 1,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 4,
    alignSelf: 'flex-end', // 👈 moves button to right
  },

cartIcon: {
  width: 26,
  height: 26,
  tintColor: '#fff',
},
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
